const collectionNames = [
  "projects",
  "trips",
  "productions",
  "expenses",
  "people",
  "reminders",
  "documents",
  "captures",
  "ideas",
  "knowledge",
  "invoices",
  "payments",
  "questionnaires"
];

function toVisibleState(state) {
  return toVisibleWorkspaceState(state, "");
}

function toVisibleWorkspaceState(state, workspaceId = "") {
  const scoped = scopeStateToWorkspace(state, workspaceId);
  const next = {
    ...scoped
  };

  for (const name of collectionNames) {
    const collection = Array.isArray(scoped[name]) ? scoped[name] : [];
    next[name] = collection.filter((record) => isVisibleRecord(record));
  }

  return next;
}

function scopeStateToWorkspace(state, workspaceId = "") {
  if (!workspaceId) {
    return {
      ...state,
      workspace: state.workspace || state.workspaces?.[0] || null
    };
  }

  const next = {
    ...state,
    workspace: (state.workspaces || []).find((workspace) => workspace.id === workspaceId) || state.workspace || null
  };

  for (const name of collectionNames) {
    const collection = Array.isArray(state[name]) ? state[name] : [];
    next[name] = collection.filter((record) => record.workspaceId === workspaceId);
  }

  return next;
}

function isVisibleRecord(record) {
  return Boolean(record) && !record.deletedAt && !record.archivedAt;
}

function isSoftDeleted(record) {
  return Boolean(record?.deletedAt);
}

function isArchived(record) {
  return Boolean(record?.archivedAt) && !record?.deletedAt;
}

module.exports = {
  isArchived,
  isSoftDeleted,
  isVisibleRecord,
  scopeStateToWorkspace,
  toVisibleState: toVisibleWorkspaceState
};
