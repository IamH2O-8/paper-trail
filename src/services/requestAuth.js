const { getRequestContext } = require("../server/requestContext");

class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
  }
}

function getOptionalRequestAuth() {
  return getRequestContext().auth || null;
}

function requireRequestAuth() {
  const auth = getOptionalRequestAuth();
  if (!auth?.user || !auth?.workspaceId) {
    throw new HttpError(401, "Authentication required");
  }

  return auth;
}

module.exports = {
  HttpError,
  getOptionalRequestAuth,
  requireRequestAuth
};
