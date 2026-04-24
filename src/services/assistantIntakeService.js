const { getRepository } = require("../data/repository");
const { createRecord, deleteRecord } = require("./recordService");
const { loadDocumentFile, saveUploadedDocument } = require("./documentFileService");
const { requireRequestAuth } = require("./requestAuth");
const { toVisibleState } = require("./workspaceState");
const {
  openaiApiKey,
  openaiBaseUrl,
  openaiClassificationModel,
  openaiTranscriptionModel,
  openaiVisionModel
} = require("../config");

async function intakeCapture(input) {
  const auth = requireRequestAuth();
  const repository = getRepository();
  const state = toVisibleState(await repository.getState(), auth.workspaceId);
  const now = new Date().toISOString();
  const captureId = createId("capture");
  const summary = asString(input.summary);
  const fileName = asString(input.fileName) || defaultCaptureFileName(input.captureType, input.mimeType);
  const userIntent = asString(input.captureType || input.userIntent || "auto");

  if (!summary && !input.base64Data) {
    throw new Error("A summary or file is required for inbox capture.");
  }

  const normalizedMimeType = asString(input.mimeType) || inferMimeTypeFromIntent(userIntent);
  const storage = await persistCaptureFile({
    workspaceId: state.workspace.id,
    captureId,
    fileName,
    mimeType: normalizedMimeType,
    base64Data: input.base64Data,
    summary
  });

  const sourceType = detectSourceType(storage.mimeType || normalizedMimeType, input.base64Data ? "file" : "text");
  const analysis = await analyzeCapture({
    summary,
    title: asString(input.title),
    amount: Number(input.amount || 0),
    category: asString(input.category),
    allocation: asString(input.allocation),
    captureDate: asString(input.captureDate),
    projectId: asString(input.projectId),
    fileName,
    mimeType: storage.mimeType || normalizedMimeType,
    base64Data: input.base64Data || textToDataUrl(summary || fileName),
    sourceType,
    userIntent,
    projects: state.projects
  });

  const record = {
    id: captureId,
    workspaceId: state.workspace.id,
    sourceType,
    userIntent,
    title: analysis.title || asString(input.title) || deriveTitle(summary, fileName),
    summary,
    rawText: summary,
    extractedText: analysis.extractedText || summary,
    suggestedResourceType: analysis.suggestedResourceType,
    suggestedProjectId: analysis.suggestedProjectId || asString(input.projectId),
    suggestedDocumentType: analysis.suggestedDocumentType,
    suggestedCategory: analysis.suggestedCategory || asString(input.category),
    suggestedAmount: analysis.suggestedAmount || Number(input.amount || 0),
    suggestedExpenseDate: analysis.suggestedExpenseDate || asString(input.captureDate),
    confidence: analysis.confidence || 0,
    reasoning: analysis.reasoning || "",
    status: "needs_review",
    processingStatus: analysis.processingStatus || "completed",
    fileName,
    mimeType: storage.mimeType || normalizedMimeType,
    storagePath: storage.storagePath,
    appliedResourceType: "",
    appliedResourceId: "",
    auditTrail: [buildAuditEntry("captured", "Capture saved to inbox.")],
    createdAt: now,
    updatedAt: now
  };

  await repository.create("captures", record);
  return record;
}

async function listCaptures() {
  const auth = requireRequestAuth();
  const state = toVisibleState(await getRepository().getState(), auth.workspaceId);
  return state.captures;
}

async function getCaptureById(id) {
  const auth = requireRequestAuth();
  const capture = await getRepository().getById("captures", id);
  return capture && capture.workspaceId === auth.workspaceId ? capture : null;
}

async function updateCapture(id, input) {
  const auth = requireRequestAuth();
  const repository = getRepository();
  const current = await repository.getById("captures", id);
  if (!current || current.workspaceId !== auth.workspaceId) {
    return null;
  }

  const next = {
    ...current,
    ...normalizeCaptureInput(input),
    auditTrail: appendAuditEntry(current.auditTrail, buildAuditEntry("updated", "Capture details were updated.")),
    updatedAt: new Date().toISOString()
  };

  return repository.update("captures", id, next);
}

async function applyCapture(id, input = {}) {
  const auth = requireRequestAuth();
  const repository = getRepository();
  const capture = await repository.getById("captures", id);
  if (!capture || capture.workspaceId !== auth.workspaceId) {
    return null;
  }

  const targetType = asString(input.resourceType) || capture.suggestedResourceType || mapIntentToResourceType(capture.userIntent);
  const targetProjectId = asString(input.projectId) || capture.suggestedProjectId || "";
  const title = capture.title || deriveTitle(capture.summary, capture.fileName);
  const expenseDate = asString(input.expenseDate) || capture.suggestedExpenseDate || todayString();
  const amount = Number(input.amount || capture.suggestedAmount || 0);
  const note = capture.summary || capture.extractedText || "";

  let appliedRecord = null;

  if (targetType === "projects") {
    appliedRecord = await createRecord("projects", {
      title,
      projectType: "Content Project",
      status: "Active",
      plannedStart: expenseDate,
      commercialObjective: note || "Project captured from inbox.",
      revenueOutcome: ""
    });

    if (capture.storagePath) {
      await cloneCaptureIntoDocument(capture, {
        linkedType: "Project",
        linkedId: appliedRecord.id,
        documentType: capture.suggestedDocumentType || "Evidence",
        note
      });
    }
  } else if (targetType === "ideas") {
    appliedRecord = await createRecord("ideas", {
      title,
      summary: note || "Idea captured from inbox.",
      hook: title,
      commercialAngle: note,
      sourceCaptureId: capture.id
    });
  } else if (targetType === "knowledge") {
    appliedRecord = await createRecord("knowledge", {
      title,
      summary: note || "Knowledge note captured from inbox.",
      content: note,
      sourceCaptureId: capture.id,
      linkedType: targetProjectId ? "Project" : "",
      linkedId: targetProjectId
    });
  } else if (targetType === "expenses") {
    appliedRecord = await createRecord("expenses", {
      title,
      category: asString(input.category) || capture.suggestedCategory || "Production",
      amount,
      expenseDate,
      businessPurpose: note || "Expense captured from inbox.",
      contentConnection: targetProjectId ? `Linked to ${targetProjectId}` : "",
      linkedProjectId: targetProjectId,
      receiptAttached: Boolean(capture.storagePath)
    });

    if (capture.storagePath) {
      await cloneCaptureIntoDocument(capture, {
        linkedType: "Expense",
        linkedId: appliedRecord.id,
        documentType: capture.suggestedDocumentType || "Receipt",
        note
      });
    }
  } else if (targetType === "updates") {
    if (!targetProjectId) {
      throw new Error("Project updates need a suggested or chosen project.");
    }

    appliedRecord = await cloneCaptureIntoDocument(capture, {
      linkedType: "Project",
      linkedId: targetProjectId,
      documentType: "Update Note",
      note
    });
  } else {
    if (!targetProjectId) {
      throw new Error("Proof items need a suggested or chosen project.");
    }

    appliedRecord = await cloneCaptureIntoDocument(capture, {
      linkedType: "Project",
      linkedId: targetProjectId,
      documentType: capture.suggestedDocumentType || "Evidence",
      note
    });
  }

  const updatedCapture = {
    ...capture,
    suggestedProjectId: targetProjectId || capture.suggestedProjectId,
    suggestedResourceType: targetType,
    status: "applied",
    appliedResourceType: targetType,
    appliedResourceId: appliedRecord.id,
    auditTrail: appendAuditEntry(capture.auditTrail, buildAuditEntry("applied", `Capture was applied as ${targetType}:${appliedRecord.id}.`)),
    updatedAt: new Date().toISOString()
  };

  await repository.update("captures", id, updatedCapture);

  return {
    capture: updatedCapture,
    appliedRecord
  };
}

async function loadCaptureFile(id) {
  const capture = await getCaptureById(id);
  if (!capture || !capture.storagePath) {
    return null;
  }

  return loadDocumentFile(capture);
}

async function archiveCapture(id) {
  const auth = requireRequestAuth();
  const repository = getRepository();
  const capture = await repository.getById("captures", id);
  if (!capture || capture.workspaceId !== auth.workspaceId) {
    return null;
  }

  const next = {
    ...capture,
    status: "archived",
    archivedAt: new Date().toISOString(),
    auditTrail: appendAuditEntry(capture.auditTrail, buildAuditEntry("archived", "Capture was archived.")),
    updatedAt: new Date().toISOString()
  };

  return repository.update("captures", id, next);
}

async function deleteCapture(id) {
  const auth = requireRequestAuth();
  const repository = getRepository();
  const capture = await repository.getById("captures", id);
  if (!capture || capture.workspaceId !== auth.workspaceId) {
    return null;
  }

  const next = {
    ...capture,
    status: "deleted",
    deletedAt: new Date().toISOString(),
    auditTrail: appendAuditEntry(capture.auditTrail, buildAuditEntry("deleted", "Capture was soft-deleted.")),
    updatedAt: new Date().toISOString()
  };

  return repository.update("captures", id, next);
}

async function unapplyCapture(id) {
  const auth = requireRequestAuth();
  const repository = getRepository();
  const capture = await repository.getById("captures", id);
  if (!capture || capture.workspaceId !== auth.workspaceId) {
    return null;
  }

  if (!capture.appliedResourceType || !capture.appliedResourceId) {
    throw new Error("Capture has not been applied yet.");
  }

  await deleteRecord(mapAppliedResourceName(capture.appliedResourceType), capture.appliedResourceId);

  const next = {
    ...capture,
    status: "needs_review",
    appliedResourceType: "",
    appliedResourceId: "",
    auditTrail: appendAuditEntry(capture.auditTrail, buildAuditEntry("unapplied", "Most recent apply action was undone.")),
    updatedAt: new Date().toISOString()
  };

  return repository.update("captures", id, next);
}

async function cloneCaptureIntoDocument(capture, { linkedType, linkedId, documentType, note }) {
  if (capture.storagePath) {
    return createRecord("documents", {
      fileName: capture.fileName,
      documentType,
      linkedType,
      linkedId,
      mimeType: capture.mimeType,
      storagePath: capture.storagePath,
      status: "Linked",
      note
    });
  }

  return createRecord("documents", {
    fileName: `${slugify(capture.title || "capture-note")}.txt`,
    documentType,
    linkedType,
    linkedId,
    mimeType: "text/plain",
    storagePath: capture.storagePath || `${capture.workspaceId}/captures/${capture.id}/note.txt`,
    status: "Linked",
    note
  });
}

async function persistCaptureFile({ workspaceId, captureId, fileName, mimeType, base64Data, summary }) {
  const safeBase64Data = base64Data || textToDataUrl(summary || fileName);
  return saveUploadedDocument({
    workspaceId,
    linkedType: "captures",
    linkedId: captureId,
    fileName,
    mimeType: mimeType || "text/plain",
    base64Data: safeBase64Data
  });
}

async function analyzeCapture(context) {
  try {
    if (!openaiApiKey) {
      return heuristicCaptureAnalysis(context, "heuristic_fallback");
    }

    const extractedText = await extractCaptureText(context);
    const ai = await classifyCaptureWithOpenAI({
      ...context,
      extractedText
    });

    return {
      ...ai,
      extractedText: extractedText || context.summary,
      processingStatus: "completed"
    };
  } catch (error) {
    const fallback = heuristicCaptureAnalysis(context, "heuristic_fallback");
    return {
      ...fallback,
      reasoning: `${fallback.reasoning} OpenAI processing fell back locally: ${error.message}`,
      processingStatus: "completed"
    };
  }
}

async function extractCaptureText(context) {
  if (context.sourceType === "audio") {
    return transcribeAudio(context);
  }

  if (context.sourceType === "image") {
    const extraction = await openaiJsonResponse({
      model: openaiVisionModel,
      systemPrompt:
        "You extract useful receipt, invoice, and note text from creator-business capture images. Return JSON only.",
      userText: `Summary from user: ${context.summary || "None"}. File name: ${context.fileName || "Unknown"}. Extract readable text and important financial details when present.`,
      imageDataUrl: context.base64Data,
      schemaHint:
        '{"extractedText":"string","documentKind":"receipt|invoice|agreement|proof|note|other","merchant":"string","amount":"string","date":"string"}'
    });

    return [
      extraction.extractedText,
      extraction.merchant ? `Merchant: ${extraction.merchant}` : "",
      extraction.amount ? `Amount: ${extraction.amount}` : "",
      extraction.date ? `Date: ${extraction.date}` : ""
    ]
      .filter(Boolean)
      .join("\n");
  }

  return context.summary;
}

async function transcribeAudio(context) {
  const { buffer } = parseBase64Payload(context.base64Data);
  const form = new FormData();
  const blob = new Blob([buffer], { type: context.mimeType || "audio/mpeg" });
  form.append("file", blob, context.fileName || "capture-audio.m4a");
  form.append("model", openaiTranscriptionModel);

  const response = await fetch(`${openaiBaseUrl}/audio/transcriptions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openaiApiKey}`
    },
    body: form
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json") ? await response.json() : await response.text();

  if (!response.ok) {
    throw new Error(typeof payload === "string" ? payload : payload.error?.message || "Audio transcription failed");
  }

  return typeof payload === "string" ? payload : payload.text || "";
}

async function classifyCaptureWithOpenAI(context) {
  const projectContext = context.projects
    .map((project) => `${project.id}: ${project.title} | ${project.projectType || "Project"} | ${project.commercialObjective}`)
    .join("\n");

  const payload = await openaiJsonResponse({
    model: openaiClassificationModel,
    systemPrompt:
      "You classify creator-business inbox captures into actionable business records. Return JSON only and prefer the supplied project IDs when choosing a project.",
    userText: [
      `User intent: ${context.userIntent}`,
      `Title hint: ${context.title || "None"}`,
      `Summary: ${context.summary || "None"}`,
      `Extracted text: ${context.extractedText || "None"}`,
      `Amount hint: ${context.amount || 0}`,
      `Category hint: ${context.category || "None"}`,
      `Allocation hint: ${context.allocation || "None"}`,
      `Date hint: ${context.captureDate || "None"}`,
      `Suggested project from UI: ${context.projectId || "None"}`,
      `Available projects:\n${projectContext || "None"}`
    ].join("\n\n"),
    schemaHint:
      '{"title":"string","suggestedResourceType":"projects|expenses|updates|proof|ideas|knowledge","suggestedProjectId":"string","suggestedDocumentType":"Receipt|Invoice|Payment Proof|Agreement|Update Note|Evidence","suggestedCategory":"Travel|Meals|Equipment|Production|Capital Asset|Fuel|","suggestedAmount":0,"suggestedExpenseDate":"YYYY-MM-DD","confidence":0,"reasoning":"string"}'
  });

  return {
    title: asString(payload.title),
    suggestedResourceType: normalizeSuggestedResourceType(payload.suggestedResourceType, context.userIntent),
    suggestedProjectId: asString(payload.suggestedProjectId || context.projectId),
    suggestedDocumentType: asString(payload.suggestedDocumentType || guessDocumentType(context.summary, context.fileName, context.mimeType)),
    suggestedCategory: asString(payload.suggestedCategory),
    suggestedAmount: Number(payload.suggestedAmount || context.amount || 0),
    suggestedExpenseDate: asString(payload.suggestedExpenseDate || context.captureDate),
    confidence: clampConfidence(payload.confidence),
    reasoning: asString(payload.reasoning || "Classified with OpenAI.")
  };
}

async function openaiJsonResponse({ model, systemPrompt, userText, imageDataUrl, schemaHint }) {
  const input = [
    {
      role: "system",
      content: [{ type: "input_text", text: `${systemPrompt}\nSchema:\n${schemaHint}` }]
    },
    {
      role: "user",
      content: [
        { type: "input_text", text: `${userText}\nReturn JSON only.` },
        ...(imageDataUrl ? [{ type: "input_image", image_url: imageDataUrl }] : [])
      ]
    }
  ];

  const response = await fetch(`${openaiBaseUrl}/responses`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openaiApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      input,
      text: {
        format: {
          type: "json_object"
        }
      }
    })
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error?.message || "OpenAI request failed");
  }

  const jsonText = payload.output_text || extractOutputText(payload.output);
  return JSON.parse(cleanJsonText(jsonText));
}

function extractOutputText(output = []) {
  for (const item of output) {
    for (const content of item.content || []) {
      if (content.type === "output_text" || content.type === "text") {
        return content.text || "";
      }
    }
  }

  return "";
}

function cleanJsonText(value) {
  const raw = String(value || "").trim();
  if (!raw) {
    throw new Error("OpenAI returned an empty response");
  }

  const fenceMatch = raw.match(/```(?:json)?\s*([\s\S]+?)```/i);
  return fenceMatch ? fenceMatch[1].trim() : raw;
}

function heuristicCaptureAnalysis(context, source = "heuristic_fallback") {
  const normalized = `${context.summary || ""} ${context.fileName || ""}`.toLowerCase();
  const suggestedProjectId = context.projectId || suggestProjectFromProjects(context.projects, normalized);
  const isExpense = context.userIntent === "expense" || /receipt|hotel|meal|uber|flight|taxi|bill|expense/.test(normalized) || Number(context.amount || 0) > 0;
  const isProject = context.userIntent === "project";
  const isIdea = context.userIntent === "idea" || /idea|series|concept|angle|hook|format/.test(normalized);
  const isKnowledge = context.userIntent === "knowledge" || /checklist|process|policy|guide|reference|note/.test(normalized);
  const isUpdate = context.userIntent === "update" || context.sourceType === "audio";
  const suggestedResourceType = isProject ? "projects" : isExpense ? "expenses" : isIdea ? "ideas" : isKnowledge ? "knowledge" : isUpdate ? "updates" : "proof";

  return {
    title: asString(context.title) || deriveTitle(context.summary, context.fileName),
    extractedText: context.summary,
    suggestedResourceType,
    suggestedProjectId,
    suggestedDocumentType: guessDocumentType(context.summary, context.fileName, context.mimeType),
    suggestedCategory: isExpense ? (context.category || guessExpenseCategory(normalized)) : "",
    suggestedAmount: Number(context.amount || findAmount(normalized) || 0),
    suggestedExpenseDate: asString(context.captureDate),
    confidence: suggestedProjectId ? 0.74 : 0.56,
    reasoning: `Classified with ${source} rules using intent, keywords, and active project context.`
  };
}

function suggestProjectFromProjects(projects, normalizedText) {
  const ranked = projects
    .map((project) => ({
      id: project.id,
      score: normalizedText
        .split(/\s+/)
        .filter((token) => token.length > 3)
        .reduce((sum, token) => sum + (`${project.title} ${project.commercialObjective}`.toLowerCase().includes(token) ? 1 : 0), 0)
    }))
    .sort((left, right) => right.score - left.score);

  return ranked[0]?.score > 0 ? ranked[0].id : projects.find((project) => project.status === "Active")?.id || projects[0]?.id || "";
}

function guessDocumentType(summary, fileName, mimeType = "") {
  const combined = `${summary || ""} ${fileName || ""} ${mimeType || ""}`.toLowerCase();
  if (combined.includes("receipt")) return "Receipt";
  if (combined.includes("invoice")) return "Invoice";
  if (combined.includes("proof")) return "Payment Proof";
  if (combined.includes("agreement") || combined.includes("contract")) return "Agreement";
  if (combined.includes("update") || mimeType.includes("audio")) return "Update Note";
  return "Evidence";
}

function guessExpenseCategory(normalized) {
  if (/flight|uber|taxi|hotel|airbnb|train|fuel/.test(normalized)) return "Travel";
  if (/meal|dinner|lunch|coffee/.test(normalized)) return "Meals";
  if (/camera|lens|monitor|mic|gear|equipment/.test(normalized)) return "Equipment";
  return "Production";
}

function findAmount(normalized) {
  const match = normalized.match(/\$?\s?(\d+(?:\.\d{1,2})?)/);
  return match ? Number(match[1]) : 0;
}

function normalizeSuggestedResourceType(value, userIntent) {
  const normalized = asString(value).toLowerCase();
  if (["projects", "expenses", "updates", "proof", "ideas", "knowledge"].includes(normalized)) {
    return normalized;
  }

  return mapIntentToResourceType(userIntent);
}

function mapIntentToResourceType(intent) {
  const normalized = asString(intent).toLowerCase();
  if (normalized === "idea") return "ideas";
  if (normalized === "knowledge") return "knowledge";
  if (normalized === "project") return "projects";
  if (normalized === "expense") return "expenses";
  if (normalized === "update") return "updates";
  return "proof";
}

function detectSourceType(mimeType, fallback = "text") {
  const normalized = asString(mimeType).toLowerCase();
  if (normalized.startsWith("image/")) return "image";
  if (normalized.startsWith("audio/")) return "audio";
  if (normalized.includes("pdf")) return "pdf";
  return fallback;
}

function inferMimeTypeFromIntent(intent) {
  return asString(intent).toLowerCase() === "update" ? "text/plain" : "application/octet-stream";
}

function textToDataUrl(text) {
  return `data:text/plain;base64,${Buffer.from(String(text || ""), "utf8").toString("base64")}`;
}

function parseBase64Payload(value) {
  const raw = String(value || "").trim();
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

function defaultCaptureFileName(intent, mimeType) {
  const normalizedIntent = asString(intent).toLowerCase() || "capture";
  const extension = extensionForMimeType(mimeType);
  return `${normalizedIntent}-${Date.now()}${extension}`;
}

function extensionForMimeType(mimeType) {
  const normalized = asString(mimeType).toLowerCase();
  if (normalized.includes("jpeg")) return ".jpg";
  if (normalized.includes("png")) return ".png";
  if (normalized.includes("webp")) return ".webp";
  if (normalized.includes("pdf")) return ".pdf";
  if (normalized.includes("mpeg") || normalized.includes("mp3")) return ".mp3";
  if (normalized.includes("wav")) return ".wav";
  if (normalized.includes("m4a")) return ".m4a";
  return ".txt";
}

function deriveTitle(summary, fileName) {
  const source = asString(summary) || asString(fileName) || "Inbox capture";
  return source.length > 64 ? `${source.slice(0, 61)}...` : source;
}

function normalizeCaptureInput(input) {
  return {
    title: asString(input.title),
    summary: asString(input.summary),
    suggestedProjectId: asString(input.suggestedProjectId || input.projectId),
    suggestedResourceType: asString(input.suggestedResourceType || input.resourceType),
    status: asString(input.status),
    reasoning: asString(input.reasoning),
    confidence: input.confidence == null ? undefined : Number(input.confidence || 0)
  };
}

function mapAppliedResourceName(value) {
  if (value === "proof" || value === "updates") {
    return "documents";
  }

  return value;
}

function appendAuditEntry(currentTrail, entry) {
  return [...(Array.isArray(currentTrail) ? currentTrail : []), entry];
}

function buildAuditEntry(action, note) {
  return {
    action,
    note,
    timestamp: new Date().toISOString()
  };
}

function createId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

function slugify(value) {
  return String(value || "capture")
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "") || "capture";
}

function asString(value) {
  return typeof value === "string" ? value.trim() : value == null ? "" : String(value).trim();
}

function clampConfidence(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 0.6;
  if (numeric > 1) return Math.min(1, numeric / 100);
  return Math.max(0, Math.min(1, numeric));
}

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

module.exports = {
  archiveCapture,
  applyCapture,
  deleteCapture,
  getCaptureById,
  intakeCapture,
  listCaptures,
  loadCaptureFile,
  unapplyCapture,
  updateCapture
};
