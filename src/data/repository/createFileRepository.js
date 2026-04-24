const { readState, writeState } = require("../fileDatabase");

function createFileRepository() {
  return {
    async getWorkspace(workspaceId = "") {
      const state = await readState();
      ensureCollections(state);
      return getWorkspaceRecord(state, workspaceId);
    },

    async getWorkspaceById(workspaceId) {
      const state = await readState();
      ensureCollections(state);
      return getWorkspaceRecord(state, workspaceId);
    },

    async createWorkspace(workspace) {
      const state = await readState();
      ensureCollections(state);
      state.workspaces.unshift(workspace);
      await writeState(state);
      return workspace;
    },

    async getUserByEmail(email) {
      const state = await readState();
      ensureCollections(state);
      return state.users.find((user) => String(user.email || "").toLowerCase() === String(email || "").toLowerCase()) || null;
    },

    async getUserById(id) {
      const state = await readState();
      ensureCollections(state);
      return state.users.find((user) => user.id === id) || null;
    },

    async createUser(user) {
      const state = await readState();
      ensureCollections(state);
      state.users.unshift(user);
      await writeState(state);
      return user;
    },

    async getState() {
      const state = await readState();
      ensureCollections(state);
      return state;
    },

    async list(resourceName) {
      const state = await readState();
      ensureCollections(state);
      return state[resourceName] || [];
    },

    async getById(resourceName, id) {
      const state = await readState();
      ensureCollections(state);
      return (state[resourceName] || []).find((item) => item.id === id) || null;
    },

    async create(resourceName, record) {
      const state = await readState();
      ensureCollections(state);
      state[resourceName].unshift(record);
      await writeState(state);
      return record;
    },

    async remove(resourceName, id) {
      const state = await readState();
      ensureCollections(state);
      const collection = state[resourceName] || [];
      const index = collection.findIndex((item) => item.id === id);
      if (index === -1) {
        return false;
      }

      collection.splice(index, 1);
      await writeState(state);
      return true;
    },

    async update(resourceName, id, nextRecord) {
      const state = await readState();
      ensureCollections(state);
      const collection = state[resourceName] || [];
      const index = collection.findIndex((item) => item.id === id);
      if (index === -1) {
        return null;
      }

      collection[index] = nextRecord;
      await writeState(state);
      return nextRecord;
    },

    async listQuestionnairesForEntity(linkedType, linkedId) {
      const state = await readState();
      ensureCollections(state);
      const questionnaires = state.questionnaires || [];
      return questionnaires.filter((item) => item.linkedType === linkedType && item.linkedId === linkedId);
    },

    async getQuestionnaire(linkedType, linkedId, stage) {
      const state = await readState();
      ensureCollections(state);
      const questionnaires = state.questionnaires || [];
      return questionnaires.find((item) => item.linkedType === linkedType && item.linkedId === linkedId && item.stage === stage) || null;
    },

    async saveQuestionnaire(questionnaire) {
      const state = await readState();
      ensureCollections(state);

      const now = questionnaire.answeredAt || new Date().toISOString();
      const index = state.questionnaires.findIndex(
        (item) => item.linkedType === questionnaire.linkedType && item.linkedId === questionnaire.linkedId && item.stage === questionnaire.stage
      );

      const nextRecord = index === -1
        ? {
            id: createQuestionnaireId(questionnaire.linkedType, questionnaire.stage),
            ...questionnaire,
            createdAt: now,
            updatedAt: now
          }
        : {
            ...state.questionnaires[index],
            ...questionnaire,
            updatedAt: now
          };

      if (index === -1) {
        state.questionnaires.unshift(nextRecord);
      } else {
        state.questionnaires[index] = nextRecord;
      }

      await writeState(state);
      return nextRecord;
    }
  };
}

function ensureCollections(state) {
  if (!Array.isArray(state.workspaces)) {
    state.workspaces = state.workspace ? [state.workspace] : [];
  }

  if (!Array.isArray(state.users)) {
    state.users = [];
  }

  if (!state.users.length && state.workspaces.some((workspace) => workspace.id === "ws-1")) {
    state.users.push({
      id: "user-demo",
      workspaceId: "ws-1",
      email: "demo@papertrail.app",
      fullName: "Alex River",
      role: "owner",
      passwordHash: "demo-salt-1234:347a5ed50fadff51d3f96ed92aa16500674c3c97b190f339dcdc45c657bcdb1d63b65d7e9e01de2755f949d0bcf18a09773b46dc790f304e1b624625b8485cf2",
      createdAt: "2026-04-10T09:00:00Z",
      updatedAt: "2026-04-18T12:00:00Z"
    });
  }

  for (const key of ["projects", "trips", "productions", "expenses", "people", "reminders", "documents", "captures", "ideas", "knowledge", "invoices", "payments", "questionnaires", "auditEvents"]) {
    if (!Array.isArray(state[key])) {
      state[key] = [];
    }
  }

  if (!state.workspace && state.workspaces[0]) {
    state.workspace = state.workspaces[0];
  }
}

function getWorkspaceRecord(state, workspaceId = "") {
  if (workspaceId) {
    return state.workspaces.find((workspace) => workspace.id === workspaceId) || null;
  }

  return state.workspaces[0] || state.workspace || null;
}

function createQuestionnaireId(linkedType, stage) {
  return `q-${linkedType}-${stage}-${Math.random().toString(36).slice(2, 8)}`;
}

module.exports = { createFileRepository };
