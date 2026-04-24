const { sendJson, badRequest, notFound, sendText } = require("../../server/responses");
const { getBootstrapPayload, getDashboardPayload, getEntityCompliance, getExportBundle, getExportDocument, getExportPreview, searchWorkspace } = require("../../services/queryService");

function buildMetaRoutes() {
  return [
    {
      method: "GET",
      path: "/api/health",
      public: true,
      handler: async (_req, res) => {
        sendJson(res, 200, {
          ok: true,
          service: "content-business-documentation-app"
        });
      }
    },
    {
      method: "GET",
      path: "/api/bootstrap",
      handler: async (_req, res) => {
        const payload = await getBootstrapPayload();
        sendJson(res, 200, payload);
      }
    },
    {
      method: "GET",
      path: "/api/dashboard",
      handler: async (_req, res) => {
        const payload = await getDashboardPayload();
        sendJson(res, 200, payload);
      }
    },
    {
      method: "GET",
      path: "/api/search",
      handler: async (req, res) => {
        try {
          const url = new URL(req.url, "http://localhost");
          const payload = await searchWorkspace({
            q: url.searchParams.get("q") || "",
            resource: url.searchParams.get("resource") || "",
            projectId: url.searchParams.get("projectId") || "",
            personId: url.searchParams.get("personId") || "",
            from: url.searchParams.get("from") || "",
            to: url.searchParams.get("to") || "",
            hasBlocker: url.searchParams.get("hasBlocker") || "",
            hasDocument: url.searchParams.get("hasDocument") || ""
          });

          sendJson(res, 200, payload);
        } catch (error) {
          badRequest(res, "Could not search workspace", error.message);
        }
      }
    },
    {
      method: "GET",
      path: "/api/entities/:type/:id/compliance-summary",
      handler: async (_req, res, params) => {
        const payload = await getEntityCompliance(params.type, params.id);

        if (!payload) {
          notFound(res, "Entity not found");
          return;
        }

        sendJson(res, 200, payload);
      }
    },
    {
      method: "GET",
      path: "/api/exports/:type/:id",
      handler: async (_req, res, params) => {
        try {
          const payload = await getExportPreview(params.type, params.id);

          if (!payload) {
            notFound(res, "Export target not found");
            return;
          }

          sendText(res, 200, payload, {
            "Content-Type": "text/plain; charset=utf-8"
          });
        } catch (error) {
          badRequest(res, "Unsupported export type", error.message);
        }
      }
    },
    {
      method: "GET",
      path: "/api/exports/:type/:id/html",
      handler: async (_req, res, params) => {
        try {
          const payload = await getExportDocument(params.type, params.id, "html");

          if (!payload) {
            notFound(res, "Export target not found");
            return;
          }

          sendText(res, 200, payload.body, {
            "Content-Type": payload.contentType
          });
        } catch (error) {
          badRequest(res, "Unsupported export type", error.message);
        }
      }
    },
    {
      method: "GET",
      path: "/api/exports/:type/:id/download",
      handler: async (_req, res, params) => {
        try {
          const payload = await getExportDocument(params.type, params.id, "txt");

          if (!payload) {
            notFound(res, "Export target not found");
            return;
          }

          sendText(res, 200, payload.body, {
            "Content-Type": payload.contentType,
            "Content-Disposition": `attachment; filename="${payload.fileName}"`
          });
        } catch (error) {
          badRequest(res, "Unsupported export type", error.message);
        }
      }
    },
    {
      method: "GET",
      path: "/api/exports/:type/:id/pdf",
      handler: async (_req, res, params) => {
        try {
          const payload = await getExportDocument(params.type, params.id, "pdf");

          if (!payload) {
            notFound(res, "Export target not found");
            return;
          }

          res.writeHead(200, {
            "Content-Type": payload.contentType,
            "Content-Disposition": `attachment; filename="${payload.fileName}"`
          });
          res.end(payload.body);
        } catch (error) {
          badRequest(res, "Unsupported export type", error.message);
        }
      }
    },
    {
      method: "GET",
      path: "/api/exports/:type/:id/bundle",
      handler: async (_req, res, params) => {
        try {
          const payload = await getExportBundle(params.type, params.id);

          if (!payload) {
            notFound(res, "Export target not found");
            return;
          }

          res.writeHead(200, {
            "Content-Type": payload.contentType,
            "Content-Disposition": `attachment; filename="${payload.fileName}"`
          });
          res.end(payload.body);
        } catch (error) {
          badRequest(res, "Unsupported export type", error.message);
        }
      }
    }
  ];
}

module.exports = { buildMetaRoutes };
