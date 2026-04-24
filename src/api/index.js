const { buildAuthRoutes } = require("./routes/authRoutes");
const { buildMetaRoutes } = require("./routes/metaRoutes");
const { buildDocumentRoutes } = require("./routes/documentRoutes");
const { buildCaptureRoutes } = require("./routes/captureRoutes");
const { buildQuestionnaireRoutes } = require("./routes/questionnaireRoutes");
const { buildResourceRoutes } = require("./routes/resourceRoutes");
const { buildWorkflowRoutes } = require("./routes/workflowRoutes");

function buildApi() {
  return {
    routes: [
      ...buildAuthRoutes(),
      ...buildMetaRoutes(),
      ...buildDocumentRoutes(),
      ...buildCaptureRoutes(),
      ...buildWorkflowRoutes(),
      ...buildQuestionnaireRoutes(),
      ...buildResourceRoutes("projects"),
      ...buildResourceRoutes("trips"),
      ...buildResourceRoutes("productions"),
      ...buildResourceRoutes("expenses"),
      ...buildResourceRoutes("people"),
      ...buildResourceRoutes("reminders"),
      ...buildResourceRoutes("documents"),
      ...buildResourceRoutes("ideas"),
      ...buildResourceRoutes("knowledge"),
      ...buildResourceRoutes("invoices"),
      ...buildResourceRoutes("payments")
    ]
  };
}

module.exports = { buildApi };
