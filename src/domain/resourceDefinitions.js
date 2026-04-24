const resourceDefinitions = {
  projects: {
    singular: "project",
    required: ["title", "commercialObjective"],
    defaults: {
      projectType: "",
      status: "Planning",
      plannedStart: "",
      plannedEnd: "",
      budgetEstimate: 0,
      revenueOutcome: "",
      timeline: "",
      linkedTripIds: [],
      linkedProductionIds: [],
      linkedExpenseIds: [],
      linkedPersonIds: [],
      closureStatus: "Open",
      narrative: "Opening interview is captured. Evidence and closure summary will develop as linked records accumulate."
    },
    normalize(input) {
      return {
        title: asString(input.title),
        projectType: asString(input.projectType),
        status: asString(input.status || "Planning"),
        plannedStart: asString(input.plannedStart),
        plannedEnd: asString(input.plannedEnd),
        commercialObjective: asString(input.commercialObjective),
        revenueOutcome: asString(input.revenueOutcome),
        timeline: asString(input.timeline) || buildTimeline(input.plannedStart, input.plannedEnd)
      };
    }
  },
  trips: {
    singular: "trip",
    required: ["title", "purpose"],
    defaults: {
      tripType: "Work",
      originSummary: "",
      destinationSummary: "",
      startDate: "",
      endDate: "",
      linkedProjectId: "",
      preTripComplete: false,
      duringTripComplete: false,
      postTripComplete: false,
      spouseOrContractor: false,
      briefSaved: false,
      estimatedBudget: 0,
      actualSpend: 0,
      closureStatus: "Open",
      outcomeNotes: "Opening interview is captured. Pre-trip brief and closure questionnaire still need completion."
    },
    normalize(input) {
      return {
        title: asString(input.title),
        tripType: asString(input.tripType || "Work"),
        purpose: asString(input.purpose),
        originSummary: asString(input.originSummary),
        destinationSummary: asString(input.destinationSummary),
        startDate: asString(input.startDate),
        endDate: asString(input.endDate),
        linkedProjectId: asString(input.linkedProjectId)
      };
    }
  },
  productions: {
    singular: "production",
    required: ["title", "platformIntent", "location", "businessPurpose"],
    defaults: {
      contentType: "",
      shootDate: "",
      linkedProjectId: "",
      publishedUrl: "",
      publishTargetDate: "",
      roleDocumentationComplete: false,
      linkedExpenseIds: [],
      linkedPersonIds: [],
      closureStatus: "Open",
      outcomeNotes: "Opening capture exists. Role confirmation and publish state still need to be documented."
    },
    normalize(input) {
      return {
        title: asString(input.title),
        contentType: asString(input.contentType),
        platformIntent: asString(input.platformIntent),
        shootDate: asString(input.shootDate),
        location: asString(input.location),
        businessPurpose: asString(input.businessPurpose),
        linkedProjectId: asString(input.linkedProjectId)
      };
    }
  },
  expenses: {
    singular: "expense",
    required: ["title", "amount", "businessPurpose"],
    defaults: {
      category: "Production",
      expenseDate: "",
      contentConnection: "",
      receiptAttached: false,
      assetLinked: false,
      linkedProjectId: "",
      linkedTripId: "",
      linkedProductionId: ""
    },
    normalize(input) {
      return {
        title: asString(input.title),
        category: asString(input.category || "Production"),
        amount: asNumber(input.amount),
        expenseDate: asString(input.expenseDate),
        businessPurpose: asString(input.businessPurpose),
        contentConnection: asString(input.contentConnection),
        receiptAttached: asBoolean(input.receiptAttached),
        assetLinked: asBoolean(input.assetLinked),
        linkedProjectId: asString(input.linkedProjectId),
        linkedTripId: asString(input.linkedTripId),
        linkedProductionId: asString(input.linkedProductionId)
      };
    }
  },
  people: {
    singular: "person",
    required: ["fullName", "roleSummary"],
    defaults: {
      personType: "Contractor",
      agreementOnFile: false,
      marketRateJustified: false,
      workLogsLinked: false,
      linkedProjectIds: []
    },
    normalize(input) {
      return {
        fullName: asString(input.fullName),
        personType: asString(input.personType || "Contractor"),
        roleSummary: asString(input.roleSummary),
        agreementOnFile: asBoolean(input.agreementOnFile),
        marketRateJustified: asBoolean(input.marketRateJustified)
      };
    }
  },
  reminders: {
    singular: "reminder",
    required: ["title", "dueDate"],
    defaults: {
      linkedType: "General",
      linkedId: "",
      severity: "Medium",
      note: ""
    },
    normalize(input) {
      return {
        title: asString(input.title),
        linkedType: asString(input.linkedType || "General"),
        linkedId: asString(input.linkedId),
        dueDate: asString(input.dueDate),
        severity: asString(input.severity || "Medium"),
        note: asString(input.note)
      };
    }
  },
  documents: {
    singular: "document",
    required: ["fileName", "linkedType", "linkedId", "storagePath"],
    defaults: {
      documentType: "Evidence",
      mimeType: "",
      status: "Linked",
      note: ""
    },
    normalize(input) {
      return {
        fileName: asString(input.fileName),
        documentType: asString(input.documentType || "Evidence"),
        linkedType: asString(input.linkedType || "Project"),
        linkedId: asString(input.linkedId),
        mimeType: asString(input.mimeType),
        storagePath: asString(input.storagePath),
        status: asString(input.status || "Linked"),
        note: asString(input.note)
      };
    }
  },
  captures: {
    singular: "capture",
    required: [],
    defaults: {
      sourceType: "text",
      userIntent: "auto",
      title: "",
      summary: "",
      rawText: "",
      extractedText: "",
      suggestedResourceType: "",
      suggestedProjectId: "",
      suggestedDocumentType: "",
      suggestedCategory: "",
      suggestedAmount: 0,
      suggestedExpenseDate: "",
      confidence: 0,
      reasoning: "",
      status: "needs_review",
      processingStatus: "completed",
      fileName: "",
      mimeType: "",
      storagePath: "",
      appliedResourceType: "",
      appliedResourceId: "",
      auditTrail: []
    },
    normalize(input) {
      return {
        sourceType: asString(input.sourceType || "text"),
        userIntent: asString(input.userIntent || "auto"),
        title: asString(input.title),
        summary: asString(input.summary),
        rawText: asString(input.rawText),
        extractedText: asString(input.extractedText),
        suggestedResourceType: asString(input.suggestedResourceType),
        suggestedProjectId: asString(input.suggestedProjectId),
        suggestedDocumentType: asString(input.suggestedDocumentType),
        suggestedCategory: asString(input.suggestedCategory),
        suggestedAmount: asNumber(input.suggestedAmount),
        suggestedExpenseDate: asString(input.suggestedExpenseDate),
        confidence: asNumber(input.confidence),
        reasoning: asString(input.reasoning),
        status: asString(input.status || "needs_review"),
        processingStatus: asString(input.processingStatus || "completed"),
        fileName: asString(input.fileName),
        mimeType: asString(input.mimeType),
        storagePath: asString(input.storagePath),
        appliedResourceType: asString(input.appliedResourceType),
        appliedResourceId: asString(input.appliedResourceId),
        auditTrail: Array.isArray(input.auditTrail) ? input.auditTrail : []
      };
    }
  },
  ideas: {
    singular: "idea",
    required: ["title", "summary"],
    defaults: {
      status: "Captured",
      hook: "",
      platformFit: "",
      commercialAngle: "",
      sourceCaptureId: "",
      promotedProjectId: "",
      tags: []
    },
    normalize(input) {
      return {
        title: asString(input.title),
        summary: asString(input.summary),
        status: asString(input.status || "Captured"),
        hook: asString(input.hook),
        platformFit: asString(input.platformFit),
        commercialAngle: asString(input.commercialAngle),
        sourceCaptureId: asString(input.sourceCaptureId),
        promotedProjectId: asString(input.promotedProjectId),
        tags: normalizeArray(input.tags)
      };
    }
  },
  knowledge: {
    singular: "knowledge",
    required: ["title", "summary"],
    defaults: {
      category: "Reference",
      content: "",
      tags: [],
      linkedType: "",
      linkedId: "",
      sourceCaptureId: ""
    },
    normalize(input) {
      return {
        title: asString(input.title),
        summary: asString(input.summary),
        category: asString(input.category || "Reference"),
        content: asString(input.content),
        tags: normalizeArray(input.tags),
        linkedType: asString(input.linkedType),
        linkedId: asString(input.linkedId),
        sourceCaptureId: asString(input.sourceCaptureId)
      };
    }
  },
  invoices: {
    singular: "invoice",
    required: ["invoiceNumber", "direction", "status", "totalAmount"],
    defaults: {
      projectId: "",
      personId: "",
      issueDate: "",
      dueDate: "",
      note: ""
    },
    normalize(input) {
      return {
        projectId: asString(input.projectId),
        personId: asString(input.personId),
        invoiceNumber: asString(input.invoiceNumber),
        direction: asString(input.direction || "Outbound"),
        status: asString(input.status || "Draft"),
        issueDate: asString(input.issueDate),
        dueDate: asString(input.dueDate),
        totalAmount: asNumber(input.totalAmount),
        note: asString(input.note)
      };
    }
  },
  payments: {
    singular: "payment",
    required: ["invoiceId", "amount"],
    defaults: {
      paidAt: "",
      method: "",
      proofDocumentId: "",
      note: ""
    },
    normalize(input) {
      return {
        invoiceId: asString(input.invoiceId),
        amount: asNumber(input.amount),
        paidAt: asString(input.paidAt),
        method: asString(input.method),
        proofDocumentId: asString(input.proofDocumentId),
        note: asString(input.note)
      };
    }
  }
};

function buildTimeline(start, end) {
  const startText = asString(start) || "TBD";
  const endText = asString(end) || "TBD";
  return `${startText} to ${endText}`;
}

function asString(value) {
  return typeof value === "string" ? value.trim() : value == null ? "" : String(value).trim();
}

function asNumber(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

function asBoolean(value) {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return normalized === "true" || normalized === "yes";
  }

  return Boolean(value);
}

function normalizeArray(value) {
  if (Array.isArray(value)) {
    return value.map((item) => asString(item)).filter(Boolean);
  }

  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

module.exports = {
  resourceDefinitions
};
