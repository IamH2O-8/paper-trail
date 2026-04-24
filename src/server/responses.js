function sendJson(res, status, payload, headers = {}) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    ...headers
  });
  res.end(JSON.stringify(payload, null, 2));
}

function sendText(res, status, body, headers = {}) {
  res.writeHead(status, {
    "Content-Type": "text/plain; charset=utf-8",
    ...headers
  });
  res.end(body);
}

function sendNoContent(res) {
  res.writeHead(204);
  res.end();
}

function badRequest(res, message, detail) {
  sendJson(res, 400, {
    error: "bad_request",
    message,
    detail
  });
}

function unauthorized(res, message = "Authentication required") {
  sendJson(res, 401, {
    error: "unauthorized",
    message
  });
}

function conflict(res, message, detail) {
  sendJson(res, 409, {
    error: "conflict",
    message,
    detail
  });
}

function notFound(res, message = "Not found") {
  sendJson(res, 404, {
    error: "not_found",
    message
  });
}

module.exports = {
  badRequest,
  conflict,
  notFound,
  sendJson,
  sendNoContent,
  sendText,
  unauthorized
};
