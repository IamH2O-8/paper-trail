const { readJsonBody } = require("../../server/readJsonBody");
const { badRequest, notFound, sendJson } = require("../../server/responses");
const {
  archiveCapture,
  applyCapture,
  deleteCapture,
  getCaptureById,
  intakeCapture,
  listCaptures,
  loadCaptureFile,
  unapplyCapture,
  updateCapture
} = require("../../services/assistantIntakeService");

function buildCaptureRoutes() {
  return [
    {
      method: "GET",
      path: "/api/captures",
      handler: async (_req, res) => {
        sendJson(res, 200, {
          data: await listCaptures()
        });
      }
    },
    {
      method: "GET",
      path: "/api/captures/:id",
      handler: async (_req, res, params) => {
        const capture = await getCaptureById(params.id);
        if (!capture) {
          notFound(res, "capture not found");
          return;
        }

        sendJson(res, 200, {
          data: capture
        });
      }
    },
    {
      method: "POST",
      path: "/api/captures/intake",
      handler: async (req, res) => {
        try {
          const input = await readJsonBody(req);
          const capture = await intakeCapture(input);
          sendJson(res, 201, {
            data: capture
          });
        } catch (error) {
          badRequest(res, "Could not intake capture", error.message);
        }
      }
    },
    {
      method: "PATCH",
      path: "/api/captures/:id",
      handler: async (req, res, params) => {
        try {
          const input = await readJsonBody(req);
          const capture = await updateCapture(params.id, input);
          if (!capture) {
            notFound(res, "capture not found");
            return;
          }

          sendJson(res, 200, {
            data: capture
          });
        } catch (error) {
          badRequest(res, "Could not update capture", error.message);
        }
      }
    },
    {
      method: "POST",
      path: "/api/captures/:id/archive",
      handler: async (_req, res, params) => {
        const capture = await archiveCapture(params.id);
        if (!capture) {
          notFound(res, "capture not found");
          return;
        }

        sendJson(res, 200, {
          data: capture
        });
      }
    },
    {
      method: "DELETE",
      path: "/api/captures/:id",
      handler: async (_req, res, params) => {
        const capture = await deleteCapture(params.id);
        if (!capture) {
          notFound(res, "capture not found");
          return;
        }

        sendJson(res, 200, {
          data: capture
        });
      }
    },
    {
      method: "POST",
      path: "/api/captures/:id/apply",
      handler: async (req, res, params) => {
        try {
          const input = await readJsonBody(req);
          const result = await applyCapture(params.id, input);
          if (!result) {
            notFound(res, "capture not found");
            return;
          }

          sendJson(res, 200, {
            data: result
          });
        } catch (error) {
          badRequest(res, "Could not apply capture", error.message);
        }
      }
    },
    {
      method: "POST",
      path: "/api/captures/:id/unapply",
      handler: async (_req, res, params) => {
        try {
          const capture = await unapplyCapture(params.id);
          if (!capture) {
            notFound(res, "capture not found");
            return;
          }

          sendJson(res, 200, {
            data: capture
          });
        } catch (error) {
          badRequest(res, "Could not unapply capture", error.message);
        }
      }
    },
    {
      method: "GET",
      path: "/api/captures/:id/file",
      handler: async (_req, res, params) => {
        try {
          const file = await loadCaptureFile(params.id);
          if (!file) {
            notFound(res, "capture file not found");
            return;
          }

          res.writeHead(200, {
            "Content-Type": file.mimeType || "application/octet-stream",
            "Content-Disposition": buildInlineDisposition(file.fileName)
          });
          res.end(file.body);
        } catch (error) {
          badRequest(res, "Could not load capture file", error.message);
        }
      }
    }
  ];
}

function buildInlineDisposition(fileName) {
  const safe = String(fileName || "capture").replaceAll(/[^a-zA-Z0-9._-]/g, "-");
  return `inline; filename="${safe}"`;
}

module.exports = { buildCaptureRoutes };
