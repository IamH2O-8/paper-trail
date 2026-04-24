const { getRepository } = require("../data/repository");
const { createRecord } = require("./recordService");
const { decorateRecord } = require("./complianceService");
const { requireRequestAuth } = require("./requestAuth");
const { toVisibleState } = require("./workspaceState");

async function promoteIdea(id) {
  const auth = requireRequestAuth();
  const repository = getRepository();
  const state = toVisibleState(await repository.getState(), auth.workspaceId);
  const idea = await repository.getById("ideas", id);

  if (!idea || idea.workspaceId !== auth.workspaceId || idea.deletedAt) {
    return null;
  }

  const project = await createRecord("projects", {
    title: idea.title,
    projectType: "Idea Promotion",
    status: "Planning",
    commercialObjective: idea.commercialAngle || idea.summary,
    revenueOutcome: idea.platformFit || "",
    plannedStart: new Date().toISOString().slice(0, 10)
  });

  const nextIdea = {
    ...idea,
    status: "Promoted",
    promotedProjectId: project.id,
    updatedAt: new Date().toISOString()
  };

  await repository.update("ideas", id, nextIdea);

  return {
    idea: decorateRecord(toVisibleState(await repository.getState(), auth.workspaceId), "ideas", nextIdea),
    project
  };
}

module.exports = {
  promoteIdea
};
