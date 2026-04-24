const { getRepository } = require("../data/repository");
const { resourceDefinitions } = require("../domain/resourceDefinitions");
const { decorateRecord } = require("./complianceService");
const { requireRequestAuth } = require("./requestAuth");
const { toVisibleState, isVisibleRecord } = require("./workspaceState");

async function listRecords(resourceName) {
  const auth = requireRequestAuth();
  const repository = getRepository();
  const state = toVisibleState(await repository.getState(), auth.workspaceId);
  const collection = getCollection(state, resourceName);
  return collection.map((record) => decorateRecord(state, resourceName, record));
}

async function getRecordById(resourceName, id) {
  const auth = requireRequestAuth();
  const repository = getRepository();
  const state = toVisibleState(await repository.getState(), auth.workspaceId);
  const record = await repository.getById(resourceName, id);
  return record && record.workspaceId === auth.workspaceId && isVisibleRecord(record) ? decorateRecord(state, resourceName, record) : null;
}

async function createRecord(resourceName, input) {
  const auth = requireRequestAuth();
  const definition = getDefinition(resourceName);
  const repository = getRepository();
  const state = toVisibleState(await repository.getState(), auth.workspaceId);
  const now = new Date().toISOString();
  const normalized = definition.normalize(input);

  validateRequired(definition, normalized);

  const nextRecord = {
    id: createId(definition.singular),
    workspaceId: auth.workspaceId,
    ...definition.defaults,
    ...normalized,
    archivedAt: "",
    deletedAt: "",
    createdAt: now,
    updatedAt: now
  };

  await repository.create(resourceName, nextRecord);
  state[resourceName].unshift(nextRecord);
  await syncProjectLinks({ repository, state, resourceName, nextRecord });

  return decorateRecord(state, resourceName, nextRecord);
}

async function updateRecord(resourceName, id, input) {
  const auth = requireRequestAuth();
  const definition = getDefinition(resourceName);
  const repository = getRepository();
  const state = toVisibleState(await repository.getState(), auth.workspaceId);
  const collection = getCollection(state, resourceName);
  const index = collection.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  const current = collection[index];
  const normalized = definition.normalize({
    ...current,
    ...input
  });

  validateRequired(definition, normalized);

  const nextRecord = {
    ...current,
    ...normalized,
    archivedAt: asLifecycleValue(input.archivedAt, current.archivedAt),
    deletedAt: asLifecycleValue(input.deletedAt, current.deletedAt),
    updatedAt: new Date().toISOString()
  };

  const updated = await repository.update(resourceName, id, nextRecord);
  if (!updated) {
    return null;
  }

  collection[index] = updated;
  await syncProjectLinks({ repository, state, resourceName, currentRecord: current, nextRecord: updated });

  return decorateRecord(state, resourceName, updated);
}

async function archiveRecord(resourceName, id) {
  return updateRecord(resourceName, id, {
    archivedAt: new Date().toISOString()
  });
}

async function deleteRecord(resourceName, id) {
  return updateRecord(resourceName, id, {
    deletedAt: new Date().toISOString()
  });
}

async function syncProjectLinks({ repository, state, resourceName, currentRecord = null, nextRecord }) {
  const projectFieldMap = {
    trips: "linkedTripIds",
    productions: "linkedProductionIds",
    expenses: "linkedExpenseIds"
  };

  const projectArrayField = projectFieldMap[resourceName];
  if (!projectArrayField) {
    return;
  }

  const previousProjectId = currentRecord?.linkedProjectId || "";
  const nextProjectId = nextRecord?.deletedAt || nextRecord?.archivedAt ? "" : (nextRecord?.linkedProjectId || "");

  if (previousProjectId && previousProjectId !== nextProjectId) {
    await updateProjectLink(state, repository, previousProjectId, projectArrayField, nextRecord.id, false);
  }

  if (nextProjectId) {
    await updateProjectLink(state, repository, nextProjectId, projectArrayField, nextRecord.id, true);
  }
}

async function updateProjectLink(state, repository, projectId, arrayField, recordId, shouldInclude) {
  const index = state.projects.findIndex((project) => project.id === projectId);
  if (index === -1) {
    return;
  }

  const project = state.projects[index];
  const currentIds = Array.isArray(project[arrayField]) ? project[arrayField] : [];
  const nextIds = shouldInclude
    ? Array.from(new Set([...currentIds, recordId]))
    : currentIds.filter((id) => id !== recordId);

  if (currentIds.length === nextIds.length && currentIds.every((value, itemIndex) => value === nextIds[itemIndex])) {
    return;
  }

  const updatedProject = {
    ...project,
    [arrayField]: nextIds,
    updatedAt: new Date().toISOString()
  };

  const persisted = await repository.update("projects", projectId, updatedProject);
  state.projects[index] = persisted || updatedProject;
}

function getCollection(state, resourceName) {
  const collection = state[resourceName];
  if (!Array.isArray(collection)) {
    throw new Error(`Unknown resource '${resourceName}'`);
  }
  return collection;
}

function getDefinition(resourceName) {
  const definition = resourceDefinitions[resourceName];
  if (!definition) {
    throw new Error(`Unknown resource '${resourceName}'`);
  }
  return definition;
}

function validateRequired(definition, record) {
  for (const field of definition.required) {
    const value = record[field];
    if (value === "" || value == null || (typeof value === "number" && !Number.isFinite(value))) {
      throw new Error(`Field '${field}' is required`);
    }
  }
}

function createId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

module.exports = {
  archiveRecord,
  createRecord,
  deleteRecord,
  getRecordById,
  listRecords,
  updateRecord
};

function asLifecycleValue(nextValue, currentValue) {
  if (nextValue === undefined) {
    return currentValue || "";
  }

  return nextValue || "";
}
