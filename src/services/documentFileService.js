const fs = require("fs/promises");
const path = require("path");
const { uploadsRoot, repositoryMode, supabaseServiceRoleKey, supabaseStorageBucket, supabaseUrl } = require("../config");

async function saveUploadedDocument({ workspaceId, linkedType, linkedId, fileName, mimeType, base64Data }) {
  const parsed = parseBase64Payload(base64Data);
  const safeFileName = sanitizeFileName(fileName || "document.bin");
  const objectPath = buildObjectPath({
    workspaceId,
    linkedType,
    linkedId,
    fileName: safeFileName
  });

  if (repositoryMode === "supabase") {
    await uploadToSupabase({
      objectPath,
      bytes: parsed.buffer,
      mimeType: mimeType || parsed.mimeType || "application/octet-stream"
    });

    return {
      storagePath: objectPath,
      mimeType: mimeType || parsed.mimeType || "application/octet-stream"
    };
  }

  const absolutePath = path.join(uploadsRoot, objectPath);
  await fs.mkdir(path.dirname(absolutePath), { recursive: true });
  await fs.writeFile(absolutePath, parsed.buffer);

  return {
    storagePath: objectPath,
    mimeType: mimeType || parsed.mimeType || "application/octet-stream"
  };
}

async function loadDocumentFile(documentRecord) {
  if (repositoryMode === "supabase") {
    return loadSupabaseObject(documentRecord);
  }

  const absolutePath = path.join(uploadsRoot, documentRecord.storagePath || "");
  const body = await fs.readFile(absolutePath);
  return {
    body,
    mimeType: documentRecord.mimeType || "application/octet-stream",
    fileName: documentRecord.fileName
  };
}

function parseBase64Payload(value) {
  const raw = String(value || "").trim();
  if (!raw) {
    throw new Error("File payload is required");
  }

  const dataUrlMatch = raw.match(/^data:([^;]+);base64,(.+)$/);
  if (dataUrlMatch) {
    return {
      mimeType: dataUrlMatch[1],
      buffer: Buffer.from(dataUrlMatch[2], "base64")
    };
  }

  return {
    mimeType: "",
    buffer: Buffer.from(raw, "base64")
  };
}

function buildObjectPath({ workspaceId, linkedType, linkedId, fileName }) {
  const normalizedType = sanitizePathPart(String(linkedType || "general").toLowerCase());
  const normalizedId = sanitizePathPart(linkedId || "unlinked");
  const stamp = new Date().toISOString().replaceAll(/[:.]/g, "-");
  return path.posix.join(workspaceId, normalizedType, normalizedId, `${stamp}-${fileName}`);
}

function sanitizeFileName(value) {
  return String(value || "document.bin")
    .trim()
    .replaceAll(/[^a-zA-Z0-9._-]/g, "-")
    .replaceAll(/-+/g, "-");
}

function sanitizePathPart(value) {
  return String(value || "general")
    .trim()
    .replaceAll(/[^a-zA-Z0-9_-]/g, "-")
    .replaceAll(/-+/g, "-");
}

async function uploadToSupabase({ objectPath, bytes, mimeType }) {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Supabase storage upload requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  }

  await ensureSupabaseBucket();

  const response = await fetch(`${supabaseUrl}/storage/v1/object/${encodeURIComponent(supabaseStorageBucket)}/${encodeStoragePath(objectPath)}`, {
    method: "POST",
    headers: {
      apikey: supabaseServiceRoleKey,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
      "Content-Type": mimeType || "application/octet-stream",
      "x-upsert": "false"
    },
    body: bytes
  });

  if (!response.ok) {
    const payload = await readStorageError(response);
    throw new Error(payload);
  }
}

async function loadSupabaseObject(documentRecord) {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Supabase storage access requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  }

  const response = await fetch(
    `${supabaseUrl}/storage/v1/object/${encodeURIComponent(supabaseStorageBucket)}/${encodeStoragePath(documentRecord.storagePath)}`,
    {
      headers: {
        apikey: supabaseServiceRoleKey,
        Authorization: `Bearer ${supabaseServiceRoleKey}`
      }
    }
  );

  if (!response.ok) {
    throw new Error(await readStorageError(response));
  }

  const body = Buffer.from(await response.arrayBuffer());
  return {
    body,
    mimeType: response.headers.get("content-type") || documentRecord.mimeType || "application/octet-stream",
    fileName: documentRecord.fileName
  };
}

let bucketEnsured = false;

async function ensureSupabaseBucket() {
  if (bucketEnsured) {
    return;
  }

  const response = await fetch(`${supabaseUrl}/storage/v1/bucket`, {
    method: "POST",
    headers: {
      apikey: supabaseServiceRoleKey,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: supabaseStorageBucket,
      name: supabaseStorageBucket,
      public: false
    })
  });

  if (!response.ok) {
    const message = await readStorageError(response);
    const normalized = message.toLowerCase();
    if (!normalized.includes("already") && !normalized.includes("duplicate")) {
      throw new Error(message);
    }
  }

  bucketEnsured = true;
}

async function readStorageError(response) {
  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json") ? await response.json() : await response.text();
  return typeof payload === "string" ? payload : payload.message || payload.error || "Storage request failed";
}

function encodeStoragePath(value) {
  return String(value || "")
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

module.exports = {
  loadDocumentFile,
  saveUploadedDocument
};
