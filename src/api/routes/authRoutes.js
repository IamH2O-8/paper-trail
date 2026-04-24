const { readJsonBody } = require("../../server/readJsonBody");
const { badRequest, conflict, sendJson } = require("../../server/responses");
const { buildLogoutCookie, buildSessionCookie, buildSessionResponse, loginAccount, registerAccount } = require("../../services/authService");
const { getOptionalRequestAuth, HttpError } = require("../../services/requestAuth");

function buildAuthRoutes() {
  return [
    {
      method: "GET",
      path: "/api/auth/session",
      public: true,
      handler: async (_req, res) => {
        const auth = getOptionalRequestAuth();
        sendJson(res, 200, auth ? buildSessionResponse(auth) : { authenticated: false });
      }
    },
    {
      method: "POST",
      path: "/api/auth/register",
      public: true,
      handler: async (req, res) => {
        try {
          const input = await readJsonBody(req);
          const auth = await registerAccount(input);
          sendJson(res, 201, buildSessionResponse(auth), {
            "Set-Cookie": buildSessionCookie(auth)
          });
        } catch (error) {
          if (error instanceof HttpError && error.statusCode === 409) {
            conflict(res, error.message);
            return;
          }

          badRequest(res, "Could not create account", error.message);
        }
      }
    },
    {
      method: "POST",
      path: "/api/auth/login",
      public: true,
      handler: async (req, res) => {
        try {
          const input = await readJsonBody(req);
          const auth = await loginAccount(input);
          sendJson(res, 200, buildSessionResponse(auth), {
            "Set-Cookie": buildSessionCookie(auth)
          });
        } catch (error) {
          const status = error instanceof HttpError ? error.statusCode : 400;
          sendJson(res, status, {
            error: status === 401 ? "unauthorized" : "bad_request",
            message: error.message
          });
        }
      }
    },
    {
      method: "POST",
      path: "/api/auth/logout",
      public: true,
      handler: async (_req, res) => {
        res.writeHead(204, {
          "Set-Cookie": buildLogoutCookie()
        });
        res.end();
      }
    }
  ];
}

module.exports = { buildAuthRoutes };
