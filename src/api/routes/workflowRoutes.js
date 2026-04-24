const { readJsonBody } = require("../../server/readJsonBody");
const { badRequest, notFound, sendJson } = require("../../server/responses");
const { promoteIdea } = require("../../services/ideaService");
const { getProjectActivity } = require("../../services/queryService");

function buildWorkflowRoutes() {
  return [
    {
      method: "GET",
      path: "/api/projects/:id/activity",
      handler: async (_req, res, params) => {
        const payload = await getProjectActivity(params.id);
        if (!payload) {
          notFound(res, "Project not found");
          return;
        }

        sendJson(res, 200, {
          data: payload
        });
      }
    },
    {
      method: "POST",
      path: "/api/ideas/:id/promote",
      handler: async (_req, res, params) => {
        try {
          const payload = await promoteIdea(params.id);
          if (!payload) {
            notFound(res, "Idea not found");
            return;
          }

          sendJson(res, 200, {
            data: payload
          });
        } catch (error) {
          badRequest(res, "Could not promote idea", error.message);
        }
      }
    }
  ];
}

module.exports = { buildWorkflowRoutes };
