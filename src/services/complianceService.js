const { toVisibleState } = require("./workspaceState");

function buildComplianceSummary(state, resourceName, record) {
  state = toVisibleState(state);
  const blockers = [];
  const warnings = [];

  if (resourceName === "projects") {
    if (!record.commercialObjective) {
      blockers.push("Commercial objective is missing.");
    }

    const linkedTrips = state.trips.filter((trip) => (record.linkedTripIds || []).includes(trip.id));
    const linkedProductions = state.productions.filter((production) => (record.linkedProductionIds || []).includes(production.id));
    const linkedExpenses = state.expenses.filter((expense) => (record.linkedExpenseIds || []).includes(expense.id));

    if (linkedTrips.some((trip) => trip.closureStatus !== "Final Close")) {
      blockers.push("One or more linked trips are not finally closed.");
    }

    if (linkedProductions.some((production) => production.closureStatus !== "Final Close")) {
      blockers.push("One or more linked productions are not finally closed.");
    }

    if (linkedExpenses.some((expense) => !expense.businessPurpose)) {
      warnings.push("Linked expenses still need business purpose statements.");
    }
  }

  if (resourceName === "trips") {
    if (!record.purpose) {
      blockers.push("Business purpose is required.");
    }

    if ((record.tripType === "International" || record.tripType === "Major") && !record.preTripComplete) {
      blockers.push("International or major trips require a completed pre-trip checklist.");
    }

    if (!record.briefSaved) {
      warnings.push("Pre-trip content brief is missing.");
    }

    if (!record.postTripComplete) {
      warnings.push("Post-trip questionnaire is incomplete.");
    }

    if (hasEnded(record.endDate) && record.closureStatus !== "Final Close") {
      blockers.push("Trip has ended but is not finally closed.");
    }
  }

  if (resourceName === "productions") {
    if (!record.title || !record.location || !record.platformIntent) {
      blockers.push("Core production fields are incomplete.");
    }

    if (!record.businessPurpose) {
      blockers.push("Business purpose is required.");
    }

    if (!record.roleDocumentationComplete) {
      warnings.push("Role documentation is incomplete.");
    }

    if (!record.publishedUrl) {
      warnings.push("Publication state still needs follow-up.");
    }
  }

  if (resourceName === "expenses") {
    if (!record.businessPurpose) {
      blockers.push("Business purpose is required.");
    }

    if (Number(record.amount || 0) >= 75 && !record.receiptAttached) {
      blockers.push("Receipt is missing above the reminder threshold.");
    }

    if (record.category === "Capital Asset" && !record.assetLinked) {
      warnings.push("Capital asset entry should be added to the asset register.");
    }

    if (!record.contentConnection) {
      warnings.push("Content connection should be filled for better linkage.");
    }

    if (entryLagDays(record) > 2) {
      warnings.push("Entry lag is elevated and should be visible in audit output.");
    }
  }

  if (resourceName === "people") {
    const contractorLike = ["Contractor", "Editor", "Assistant"].includes(record.personType);

    if (contractorLike && !record.agreementOnFile) {
      blockers.push("Agreement is missing.");
    }

    if (contractorLike && !record.workLogsLinked) {
      warnings.push("Work logs are missing.");
    }

    if (contractorLike && !record.marketRateJustified) {
      warnings.push("Market-rate justification is missing.");
    }
  }

  if (resourceName === "reminders") {
    if (hasEnded(record.dueDate)) {
      blockers.push("Reminder is overdue.");
    }
  }

  if (resourceName === "ideas") {
    if (!record.summary) {
      blockers.push("Idea summary is required.");
    }

    if (!record.commercialAngle) {
      warnings.push("Commercial angle is still missing.");
    }
  }

  if (resourceName === "knowledge") {
    if (!record.summary) {
      blockers.push("Knowledge summary is required.");
    }

    if (!record.content) {
      warnings.push("Full note content is still missing.");
    }
  }

  if (resourceName === "documents") {
    if (!record.fileName) {
      blockers.push("File name is required.");
    }

    if (!record.storagePath) {
      blockers.push("Storage path is missing.");
    }

    if (!record.linkedType || !record.linkedId) {
      blockers.push("Documents must be linked to a record.");
    } else if (!findLinkedEntity(state, record.linkedType, record.linkedId)) {
      blockers.push("Linked record could not be found.");
    }

    if (!record.mimeType) {
      warnings.push("MIME type is missing.");
    }

    if (!record.note) {
      warnings.push("Evidence note is missing.");
    }
  }

  if (resourceName === "invoices") {
    if (!record.invoiceNumber) {
      blockers.push("Invoice number is required.");
    }

    if (Number(record.totalAmount || 0) <= 0) {
      blockers.push("Invoice amount must be greater than zero.");
    }

    if (!record.issueDate) {
      warnings.push("Issue date is missing.");
    }

    if (!record.dueDate) {
      warnings.push("Due date is missing.");
    }

    if (hasEnded(record.dueDate) && !["Paid", "Collected"].includes(record.status)) {
      blockers.push("Invoice is overdue.");
    }

    if (!record.projectId) {
      warnings.push("Invoice is not linked to a project.");
    }

    if (!state.documents.some((document) => document.linkedType === "Invoice" && document.linkedId === record.id)) {
      warnings.push("Invoice file is missing.");
    }
  }

  if (resourceName === "payments") {
    if (!record.invoiceId || !state.invoices.some((invoice) => invoice.id === record.invoiceId)) {
      blockers.push("Payment must be linked to an invoice.");
    }

    if (Number(record.amount || 0) <= 0) {
      blockers.push("Payment amount must be greater than zero.");
    }

    if (!record.paidAt) {
      warnings.push("Payment date is missing.");
    }

    if (!record.method) {
      warnings.push("Payment method is missing.");
    }

    if (!record.proofDocumentId) {
      warnings.push("Proof document is missing.");
    } else if (!state.documents.some((document) => document.id === record.proofDocumentId)) {
      blockers.push("Linked proof document could not be found.");
    }
  }

  return {
    blockers,
    warnings,
    score: Math.max(28, 100 - blockers.length * 22 - warnings.length * 9)
  };
}

function decorateRecord(state, resourceName, record) {
  state = toVisibleState(state);
  const compliance = buildComplianceSummary(state, resourceName, record);
  const questionnaires = summarizeQuestionnaires(state, resourceName, record.id);

  return {
    ...record,
    compliance,
    questionnaires,
    exportPreview: buildExportPreview(state, resourceName, record, compliance)
  };
}

function buildDashboardSummary(state) {
  state = toVisibleState(state);
  const entities = [
    ...state.projects.map((record) => ({ resourceName: "projects", record: decorateRecord(state, "projects", record), type: "Project" })),
    ...state.trips.map((record) => ({ resourceName: "trips", record: decorateRecord(state, "trips", record), type: "Trip" })),
    ...state.productions.map((record) => ({ resourceName: "productions", record: decorateRecord(state, "productions", record), type: "Production" })),
    ...state.expenses.map((record) => ({ resourceName: "expenses", record: decorateRecord(state, "expenses", record), type: "Expense" })),
    ...state.documents.map((record) => ({ resourceName: "documents", record: decorateRecord(state, "documents", record), type: "Document" })),
    ...state.ideas.map((record) => ({ resourceName: "ideas", record: decorateRecord(state, "ideas", record), type: "Idea" })),
    ...state.knowledge.map((record) => ({ resourceName: "knowledge", record: decorateRecord(state, "knowledge", record), type: "Knowledge" })),
    ...state.invoices.map((record) => ({ resourceName: "invoices", record: decorateRecord(state, "invoices", record), type: "Invoice" })),
    ...state.payments.map((record) => ({ resourceName: "payments", record: decorateRecord(state, "payments", record), type: "Payment" }))
  ];

  const scores = entities.map((entity) => entity.record.compliance.score);
  const focusItems = entities
    .filter((entity) => entity.record.compliance.blockers.length || entity.record.compliance.warnings.length)
    .sort((left, right) => severityWeight(right.record.compliance) - severityWeight(left.record.compliance))
    .slice(0, 4)
    .map((entity) => ({
      type: entity.type,
      id: entity.record.id,
      resourceName: entity.resourceName,
      title: entity.record.title || entity.record.fullName || entity.record.fileName || entity.record.invoiceNumber || entity.record.id,
      context: `${entity.type} record`,
      tag: `${entity.record.compliance.blockers.length} blocker(s)`,
      tone: entity.record.compliance.blockers.length ? "status-open" : "status-review",
      issues: [...entity.record.compliance.blockers, ...entity.record.compliance.warnings].slice(0, 3)
    }));

  return {
    openItems: state.projects.length + state.trips.length + state.productions.length + state.reminders.length + state.documents.length + state.ideas.length + state.knowledge.length + state.invoices.length + state.payments.length,
    averageScore: scores.length ? Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length) : 0,
    highPriorityIssues: focusItems.reduce((sum, item) => sum + item.issues.length, 0),
    focusItems
  };
}

function buildExportPreview(state, resourceName, record, compliance) {
  state = toVisibleState(state);
  if (resourceName === "projects") {
    const linkedTrips = state.trips.filter((trip) => (record.linkedTripIds || []).includes(trip.id));
    const linkedProductions = state.productions.filter((production) => (record.linkedProductionIds || []).includes(production.id));

    return [
      "PROJECT DOSSIER PREVIEW",
      "",
      `Title: ${record.title}`,
      `Status: ${record.closureStatus || record.status}`,
      `Commercial objective: ${record.commercialObjective}`,
      `Revenue outcome: ${record.revenueOutcome || "Not captured"}`,
      "",
      `Linked trips: ${linkedTrips.map((trip) => `${trip.title} (${trip.closureStatus})`).join(", ") || "None"}`,
      `Linked productions: ${linkedProductions.map((production) => `${production.title} (${production.closureStatus})`).join(", ") || "None"}`,
      "",
      `Compliance blockers: ${compliance.blockers.length || 0}`,
      `${compliance.blockers.map((line) => `- ${line}`).join("\n") || "- None"}`,
      "",
      "Narrative draft:",
      `${record.narrative || "No narrative draft yet."}`
    ].join("\n");
  }

  if (resourceName === "trips") {
    return [
      "TRIP DOSSIER PREVIEW",
      "",
      `Title: ${record.title}`,
      `Trip type: ${record.tripType}`,
      `Route: ${record.originSummary} -> ${record.destinationSummary}`,
      `Dates: ${record.startDate} to ${record.endDate}`,
      "",
      "Intent record:",
      `${record.purpose}`,
      "",
      "Evidence state:",
      `- Pre-trip complete: ${yesNo(record.preTripComplete)}`,
      `- During-trip logging: ${yesNo(record.duringTripComplete)}`,
      `- Post-trip questionnaire: ${yesNo(record.postTripComplete)}`,
      `- Brief saved: ${yesNo(record.briefSaved)}`,
      "",
      `Budget reconciliation: ${record.estimatedBudget || 0} estimated vs ${record.actualSpend || 0} actual`,
      "",
      "Narrative draft:",
      `${record.outcomeNotes}`
    ].join("\n");
  }

  if (resourceName === "productions") {
    return [
      "PRODUCTION DOSSIER PREVIEW",
      "",
      `Title: ${record.title}`,
      `Format: ${record.contentType}`,
      `Platform intent: ${record.platformIntent}`,
      `Shoot date: ${record.shootDate}`,
      `Location: ${record.location}`,
      "",
      "Business purpose:",
      `${record.businessPurpose}`,
      "",
      `Role documentation complete: ${yesNo(record.roleDocumentationComplete)}`,
      `Publication: ${record.publishedUrl || "Not published yet"}`,
      "",
      "Outcome note:",
      `${record.outcomeNotes}`
    ].join("\n");
  }

  if (resourceName === "expenses") {
    return [
      "EXPENSE EVIDENCE PREVIEW",
      "",
      `Title: ${record.title}`,
      `Category: ${record.category}`,
      `Amount: ${record.amount}`,
      `Expense date: ${record.expenseDate}`,
      `Created at: ${record.createdAt}`,
      "",
      "Business purpose:",
      `${record.businessPurpose || "Missing"}`,
      "",
      `Receipt attached: ${yesNo(record.receiptAttached)}`,
      `Content connection: ${record.contentConnection || "Missing"}`,
      "",
      "Compliance notes:",
      `${[...compliance.blockers, ...compliance.warnings].map((line) => `- ${line}`).join("\n") || "- No issues"}`
    ].join("\n");
  }

  if (resourceName === "people") {
    return [
      "PERSON DOSSIER PREVIEW",
      "",
      `Name: ${record.fullName}`,
      `Type: ${record.personType}`,
      `Role summary: ${record.roleSummary}`,
      "",
      `Agreement on file: ${yesNo(record.agreementOnFile)}`,
      `Work logs linked: ${yesNo(record.workLogsLinked)}`,
      `Market rate justified: ${yesNo(record.marketRateJustified)}`,
      "",
      `Linked projects: ${(record.linkedProjectIds || []).join(", ") || "None"}`
    ].join("\n");
  }

  if (resourceName === "documents") {
    const linkedEntity = findLinkedEntity(state, record.linkedType, record.linkedId);

    return [
      "DOCUMENT EVIDENCE PREVIEW",
      "",
      `File name: ${record.fileName}`,
      `Document type: ${record.documentType || "Evidence"}`,
      `Linked record: ${linkedEntity ? linkedEntity.title || linkedEntity.fullName || record.linkedId : record.linkedId}`,
      `Linked type: ${record.linkedType}`,
      `Status: ${record.status || "Linked"}`,
      "",
      `MIME type: ${record.mimeType || "Missing"}`,
      `Storage path: ${record.storagePath || "Missing"}`,
      "",
      "Evidence note:",
      `${record.note || "No note provided."}`,
      "",
      "Compliance notes:",
      `${[...compliance.blockers, ...compliance.warnings].map((line) => `- ${line}`).join("\n") || "- No issues"}`
    ].join("\n");
  }

  if (resourceName === "invoices") {
    const linkedProject = state.projects.find((project) => project.id === record.projectId);
    const linkedPerson = state.people.find((person) => person.id === record.personId);
    const invoiceDocuments = state.documents.filter((document) => document.linkedType === "Invoice" && document.linkedId === record.id);

    return [
      "INVOICE PREVIEW",
      "",
      `Invoice number: ${record.invoiceNumber}`,
      `Direction: ${record.direction}`,
      `Status: ${record.status}`,
      `Issue date: ${record.issueDate || "Missing"}`,
      `Due date: ${record.dueDate || "Missing"}`,
      `Total amount: ${record.totalAmount}`,
      "",
      `Project: ${linkedProject?.title || "Unlinked"}`,
      `Counterparty: ${linkedPerson?.fullName || "Not set"}`,
      `Linked files: ${invoiceDocuments.map((document) => document.fileName).join(", ") || "None"}`,
      "",
      "Notes:",
      `${record.note || "No note provided."}`
    ].join("\n");
  }

  if (resourceName === "payments") {
    const invoice = state.invoices.find((item) => item.id === record.invoiceId);
    const proof = state.documents.find((document) => document.id === record.proofDocumentId);

    return [
      "PAYMENT PREVIEW",
      "",
      `Invoice: ${invoice?.invoiceNumber || record.invoiceId || "Missing"}`,
      `Amount: ${record.amount}`,
      `Paid at: ${record.paidAt || "Missing"}`,
      `Method: ${record.method || "Missing"}`,
      `Proof file: ${proof?.fileName || "Missing"}`,
      "",
      "Notes:",
      `${record.note || "No note provided."}`
    ].join("\n");
  }

  if (resourceName === "ideas") {
    return [
      "IDEA PREVIEW",
      "",
      `Title: ${record.title}`,
      `Status: ${record.status}`,
      `Platform fit: ${record.platformFit || "Not captured"}`,
      `Commercial angle: ${record.commercialAngle || "Missing"}`,
      `Promoted project: ${record.promotedProjectId || "Not yet promoted"}`,
      "",
      `${record.summary || "No summary provided."}`
    ].join("\n");
  }

  if (resourceName === "knowledge") {
    return [
      "KNOWLEDGE NOTE PREVIEW",
      "",
      `Title: ${record.title}`,
      `Category: ${record.category}`,
      `Linked type: ${record.linkedType || "None"}`,
      `Linked id: ${record.linkedId || "None"}`,
      "",
      `${record.summary || "No summary provided."}`,
      "",
      `${record.content || "No long-form content yet."}`
    ].join("\n");
  }

  return [
    "REMINDER PREVIEW",
    "",
    `Title: ${record.title}`,
    `Due date: ${record.dueDate}`,
    `Severity: ${record.severity}`,
    `Linked type: ${record.linkedType}`,
    "",
    `${record.note || "No note provided."}`
  ].join("\n");
}

function severityWeight(compliance) {
  return compliance.blockers.length * 3 + compliance.warnings.length;
}

function summarizeQuestionnaires(state, resourceName, recordId) {
  const questionnaires = state.questionnaires || [];
  const entityQuestionnaires = questionnaires.filter((item) => item.linkedType === resourceName && item.linkedId === recordId);

  return {
    opening: mapQuestionnaireSummary(entityQuestionnaires.find((item) => item.stage === "opening")),
    closure: mapQuestionnaireSummary(entityQuestionnaires.find((item) => item.stage === "closure"))
  };
}

function mapQuestionnaireSummary(questionnaire) {
  if (!questionnaire) {
    return {
      exists: false,
      status: "Not started",
      answeredAt: ""
    };
  }

  return {
    exists: true,
    status: questionnaire.status || "completed",
    answeredAt: questionnaire.answeredAt || questionnaire.updatedAt || ""
  };
}

function findLinkedEntity(state, linkedType, linkedId) {
  state = toVisibleState(state);
  const normalized = String(linkedType || "").trim().toLowerCase();
  if (!normalized || !linkedId) {
    return null;
  }

  const resourceMap = {
    project: "projects",
    projects: "projects",
    trip: "trips",
    trips: "trips",
    production: "productions",
    productions: "productions",
    expense: "expenses",
    expenses: "expenses",
    person: "people",
    people: "people",
    reminder: "reminders",
    reminders: "reminders",
    document: "documents",
    documents: "documents",
    idea: "ideas",
    ideas: "ideas",
    knowledge: "knowledge",
    invoice: "invoices",
    invoices: "invoices",
    payment: "payments",
    payments: "payments"
  };

  const resourceName = resourceMap[normalized];
  if (!resourceName || !Array.isArray(state[resourceName])) {
    return null;
  }

  return state[resourceName].find((item) => item.id === linkedId) || null;
}

function hasEnded(dateString) {
  if (!dateString) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return new Date(dateString) < today;
}

function entryLagDays(record) {
  if (!record.expenseDate || !record.createdAt) {
    return 0;
  }

  const expenseDate = new Date(record.expenseDate);
  const createdAt = new Date(record.createdAt);
  return Math.round((createdAt - expenseDate) / (1000 * 60 * 60 * 24));
}

function yesNo(value) {
  return value ? "Yes" : "No";
}

module.exports = {
  buildComplianceSummary,
  buildDashboardSummary,
  buildExportPreview,
  decorateRecord
};
