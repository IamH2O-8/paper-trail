const { readJsonBody } = require("../../server/readJsonBody");
const { badRequest, notFound, sendJson } = require("../../server/responses");
const { createRecord, getRecordById } = require("../../services/recordService");
const { loadDocumentFile, saveUploadedDocument } = require("../../services/documentFileService");
const { requireRequestAuth } = require("../../services/requestAuth");

function buildDocumentRoutes() {
  return [
    {
      method: "POST",
      path: "/api/documents/upload",
      handler: async (req, res) => {
        try {
          const auth = requireRequestAuth();
          const input = await readJsonBody(req);

          const stored = await saveUploadedDocument({
            workspaceId: auth.workspaceId,
            linkedType: input.linkedType,
            linkedId: input.linkedId,
            fileName: input.fileName,
            mimeType: input.mimeType,
            base64Data: input.base64Data
          });

          const record = await createRecord("documents", {
            fileName: input.fileName,
            documentType: input.documentType,
            linkedType: input.linkedType,
            linkedId: input.linkedId,
            mimeType: stored.mimeType,
            storagePath: stored.storagePath,
            status: input.status || "Linked",
            note: input.note
          });

          sendJson(res, 201, {
            data: record
          });
        } catch (error) {
          badRequest(res, "Could not upload document", error.message);
        }
      }
    },
    {
      method: "GET",
      path: "/api/documents/:id/file",
      handler: async (_req, res, params) => {
        try {
          const record = await getRecordById("documents", params.id);
          if (!record) {
            notFound(res, "document not found");
            return;
          }

          const file = await loadDocumentFile(record);
          res.writeHead(200, {
            "Content-Type": file.mimeType || "application/octet-stream",
            "Content-Disposition": buildContentDisposition(file.fileName)
          });
          res.end(file.body);
        } catch (error) {
          badRequest(res, "Could not load document", error.message);
        }
      }
    }
  ];
}

function buildContentDisposition(fileName) {
  const safe = String(fileName || "document").replaceAll(/[^a-zA-Z0-9._-]/g, "-");
  return `inline; filename="${safe}"`;
}

module.exports = { buildDocumentRoutes };
