const { badRequest, notFound, sendJson } = require("../../server/responses");
const { readJsonBody } = require("../../server/readJsonBody");
const { getEntityQuestionnaire, listEntityQuestionnaires, submitEntityQuestionnaire } = require("../../services/questionnaireService");

function buildQuestionnaireRoutes() {
  return [
    {
      method: "GET",
      path: "/api/entities/:type/:id/questionnaires",
      handler: async (_req, res, params) => {
        const payload = await listEntityQuestionnaires(params.type, params.id);
        sendJson(res, 200, payload);
      }
    },
    {
      method: "GET",
      path: "/api/entities/:type/:id/questionnaires/:stage",
      handler: async (_req, res, params) => {
        try {
          const payload = await getEntityQuestionnaire(params.type, params.id, params.stage);
          if (!payload) {
            notFound(res, "Entity not found");
            return;
          }

          sendJson(res, 200, payload);
        } catch (error) {
          badRequest(res, "Could not load questionnaire", error.message);
        }
      }
    },
    {
      method: "POST",
      path: "/api/entities/:type/:id/questionnaires/:stage/submit",
      handler: async (req, res, params) => {
        try {
          const body = await readJsonBody(req);
          const payload = await submitEntityQuestionnaire(params.type, params.id, params.stage, body.answers || {});
          if (!payload) {
            notFound(res, "Entity not found");
            return;
          }

          sendJson(res, 200, payload);
        } catch (error) {
          badRequest(res, "Could not submit questionnaire", error.message);
        }
      }
    }
  ];
}

module.exports = { buildQuestionnaireRoutes };
