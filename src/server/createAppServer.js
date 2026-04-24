const http = require("http");
const { webRoot } = require("../config");
const { createRouter } = require("./router");
const { runWithRequestContext } = require("./requestContext");
const { serveStatic } = require("./serveStatic");
const { sendJson, notFound, unauthorized } = require("./responses");
const { buildApi } = require("../api");
const { resolveRequestAuth } = require("../services/authService");
const { HttpError } = require("../services/requestAuth");

function createAppServer() {
  const api = buildApi();
  const router = createRouter(api.routes);

  return http.createServer(async (req, res) => {
    try {
      const matched = await router.match(req);
      const auth = req.url.startsWith("/api/") ? await resolveRequestAuth(req) : null;

      await runWithRequestContext({ auth, req, res }, async () => {
        if (matched) {
          if (req.url.startsWith("/api/") && !matched.route.public && !auth?.user) {
            unauthorized(res);
            return;
          }

          await matched.handler(req, res, matched.params);
          return;
        }

        if (req.url.startsWith("/api/")) {
          notFound(res, "API route not found");
          return;
        }

        await serveStatic(req, res, webRoot);
      });
    } catch (error) {
      if (error instanceof HttpError || error?.statusCode) {
        sendJson(res, error.statusCode || 500, {
          error: "request_error",
          message: error.message
        });
        return;
      }

      sendJson(res, 500, {
        error: "internal_error",
        message: "Unexpected server error",
        detail: error.message
      });
    }
  });
}

module.exports = { createAppServer };
