const crypto = require("crypto");
const { promisify } = require("util");
const { getRepository } = require("../data/repository");
const { appBaseUrl, secureCookies, sessionCookieName, sessionSecret } = require("../config");
const { HttpError } = require("./requestAuth");

const scrypt = promisify(crypto.scrypt);
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;

async function registerAccount(input) {
  const repository = getRepository();
  const email = normalizeEmail(input.email);
  const password = String(input.password || "");
  const fullName = String(input.fullName || "").trim();
  const workspaceName = String(input.workspaceName || "").trim();

  if (!email || !password || !workspaceName) {
    throw new HttpError(400, "Email, password, and workspace name are required");
  }

  if (password.length < 8) {
    throw new HttpError(400, "Password must be at least 8 characters");
  }

  const existing = await repository.getUserByEmail(email);
  if (existing) {
    throw new HttpError(409, "An account with that email already exists");
  }

  const now = new Date().toISOString();
  const workspace = await repository.createWorkspace({
    id: createId("ws"),
    name: workspaceName,
    slug: slugify(workspaceName),
    focus: "Independent creator workspace",
    defaultCurrency: "CAD",
    createdAt: now,
    updatedAt: now
  });

  const user = await repository.createUser({
    id: createId("user"),
    workspaceId: workspace.id,
    email,
    fullName: fullName || email.split("@")[0],
    role: "owner",
    passwordHash: await hashPassword(password),
    createdAt: now,
    updatedAt: now
  });

  return buildSessionAuth(user, workspace);
}

async function loginAccount(input) {
  const repository = getRepository();
  const email = normalizeEmail(input.email);
  const password = String(input.password || "");
  const user = await repository.getUserByEmail(email);

  if (!user || !user.passwordHash) {
    throw new HttpError(401, "Invalid email or password");
  }

  const passwordOk = await verifyPassword(password, user.passwordHash);
  if (!passwordOk) {
    throw new HttpError(401, "Invalid email or password");
  }

  const workspace = await repository.getWorkspaceById(user.workspaceId);
  if (!workspace) {
    throw new HttpError(401, "Workspace not found for this account");
  }

  return buildSessionAuth(user, workspace);
}

async function resolveRequestAuth(req) {
  const token = parseCookies(req.headers.cookie || "")[sessionCookieName];
  if (!token) {
    return null;
  }

  const payload = verifySignedToken(token);
  if (!payload?.userId || !payload?.workspaceId) {
    return null;
  }

  const repository = getRepository();
  const user = await repository.getUserById(payload.userId);
  if (!user || user.workspaceId !== payload.workspaceId) {
    return null;
  }

  const workspace = await repository.getWorkspaceById(payload.workspaceId);
  if (!workspace) {
    return null;
  }

  return buildSessionAuth(user, workspace);
}

function buildSessionResponse(auth) {
  return {
    authenticated: true,
    user: auth.user,
    workspace: auth.workspace
  };
}

function buildSessionCookie(auth) {
  const now = Math.floor(Date.now() / 1000);
  const token = signPayload({
    userId: auth.user.id,
    workspaceId: auth.workspace.id,
    exp: now + SESSION_TTL_SECONDS
  });

  return serializeCookie(sessionCookieName, token, {
    httpOnly: true,
    sameSite: "Lax",
    maxAge: SESSION_TTL_SECONDS,
    secure: secureCookies,
    path: "/"
  });
}

function buildLogoutCookie() {
  return serializeCookie(sessionCookieName, "", {
    httpOnly: true,
    sameSite: "Lax",
    maxAge: 0,
    secure: secureCookies,
    path: "/"
  });
}

async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = await scrypt(password, salt, 64);
  return `${salt}:${derived.toString("hex")}`;
}

async function verifyPassword(password, stored) {
  const [salt, digest] = String(stored || "").split(":");
  if (!salt || !digest) {
    return false;
  }

  const derived = await scrypt(password, salt, 64);
  const left = Buffer.from(digest, "hex");
  if (left.length !== derived.length) {
    return false;
  }

  return crypto.timingSafeEqual(left, derived);
}

function buildSessionAuth(user, workspace) {
  return {
    user: sanitizeUser(user),
    workspace: sanitizeWorkspace(workspace),
    workspaceId: workspace.id
  };
}

function sanitizeUser(user) {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName || "",
    role: user.role || "owner",
    workspaceId: user.workspaceId
  };
}

function sanitizeWorkspace(workspace) {
  return {
    id: workspace.id,
    name: workspace.name,
    slug: workspace.slug || "",
    focus: workspace.focus || "",
    defaultCurrency: workspace.defaultCurrency || "CAD"
  };
}

function signPayload(payload) {
  const rawPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = crypto.createHmac("sha256", sessionSecret).update(rawPayload).digest("base64url");
  return `${rawPayload}.${signature}`;
}

function verifySignedToken(token) {
  const [rawPayload, signature] = String(token || "").split(".");
  if (!rawPayload || !signature) {
    return null;
  }

  const expected = crypto.createHmac("sha256", sessionSecret).update(rawPayload).digest("base64url");
  if (!safeCompare(signature, expected)) {
    return null;
  }

  const payload = JSON.parse(Buffer.from(rawPayload, "base64url").toString("utf8"));
  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return payload;
}

function serializeCookie(name, value, options = {}) {
  const parts = [`${name}=${value}`];
  parts.push(`Path=${options.path || "/"}`);
  if (options.httpOnly) parts.push("HttpOnly");
  if (options.sameSite) parts.push(`SameSite=${options.sameSite}`);
  if (options.maxAge != null) parts.push(`Max-Age=${options.maxAge}`);
  if (options.secure) parts.push("Secure");

  if (appBaseUrl && /^https:/i.test(appBaseUrl)) {
    parts.push("Priority=High");
  }

  return parts.join("; ");
}

function parseCookies(header) {
  return String(header || "")
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce((cookies, pair) => {
      const index = pair.indexOf("=");
      if (index === -1) {
        return cookies;
      }

      const key = pair.slice(0, index).trim();
      const value = pair.slice(index + 1).trim();
      cookies[key] = decodeURIComponent(value);
      return cookies;
    }, {});
}

function safeCompare(left, right) {
  const leftBuffer = Buffer.from(String(left || ""));
  const rightBuffer = Buffer.from(String(right || ""));
  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function createId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "") || "workspace";
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function base64UrlEncode(value) {
  return Buffer.from(String(value || ""), "utf8").toString("base64url");
}

module.exports = {
  buildLogoutCookie,
  buildSessionCookie,
  buildSessionResponse,
  loginAccount,
  registerAccount,
  resolveRequestAuth
};
