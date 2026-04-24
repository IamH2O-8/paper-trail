function fromWorkspaceRow(row) {
  return {
    id: row.id,
    name: row.name,
    focus: row.focus || "Content business workspace",
    defaultCurrency: row.default_currency || "CAD"
  };
}

function withLifecycle(record, row) {
  return {
    ...record,
    archivedAt: row.archived_at || "",
    deletedAt: row.deleted_at || ""
  };
}

function withAuditTrail(record, row) {
  return {
    ...record,
    auditTrail: Array.isArray(row.audit_trail) ? row.audit_trail : []
  };
}

function lifecycleRow(record) {
  return {
    archived_at: record.archivedAt || null,
    deleted_at: record.deletedAt || null
  };
}

function fromQuestionnaireRow(row, answers = []) {
  const answerMap = {};

  for (const answer of answers) {
    answerMap[answer.question_key] = answer.answer_text || "";
  }

  return {
    id: row.id,
    workspaceId: row.workspace_id,
    linkedType: row.linked_type,
    linkedId: row.linked_id,
    stage: row.questionnaire_type,
    title: row.title || "",
    description: row.description || "",
    status: row.status,
    answers: answerMap,
    answeredAt: row.updated_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function fromRow(resourceName, row) {
  if (resourceName === "projects") {
    return withLifecycle({
      id: row.id,
      workspaceId: row.workspace_id,
      title: row.title,
      projectType: row.project_type || "",
      status: row.status,
      plannedStart: row.planned_start || "",
      plannedEnd: row.planned_end || "",
      budgetEstimate: row.budget_estimate || 0,
      commercialObjective: row.commercial_objective || "",
      revenueOutcome: row.revenue_outcome || "",
      timeline: row.timeline || "",
      linkedTripIds: row.linked_trip_ids || [],
      linkedProductionIds: row.linked_production_ids || [],
      linkedExpenseIds: row.linked_expense_ids || [],
      linkedPersonIds: row.linked_person_ids || [],
      closureStatus: row.closure_status || "Open",
      narrative: row.narrative || "",
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }, row);
  }

  if (resourceName === "trips") {
    return withLifecycle({
      id: row.id,
      workspaceId: row.workspace_id,
      title: row.title,
      tripType: row.trip_type,
      purpose: row.purpose,
      originSummary: row.origin_summary || "",
      destinationSummary: row.destination_summary || "",
      startDate: row.start_date || "",
      endDate: row.end_date || "",
      linkedProjectId: row.project_id || "",
      preTripComplete: Boolean(row.pre_trip_complete),
      duringTripComplete: Boolean(row.during_trip_complete),
      postTripComplete: Boolean(row.post_trip_complete),
      spouseOrContractor: Boolean(row.spouse_or_contractor),
      briefSaved: Boolean(row.brief_saved),
      estimatedBudget: row.estimated_budget || 0,
      actualSpend: row.actual_spend || 0,
      closureStatus: row.closure_status || "Open",
      outcomeNotes: row.outcome_notes || "",
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }, row);
  }

  if (resourceName === "productions") {
    return withLifecycle({
      id: row.id,
      workspaceId: row.workspace_id,
      title: row.title,
      contentType: row.content_type || "",
      platformIntent: row.platform_intent || "",
      shootDate: row.shoot_date || "",
      location: row.location || "",
      linkedProjectId: row.project_id || "",
      businessPurpose: row.business_purpose || "",
      publishedUrl: row.published_url || "",
      publishTargetDate: row.publish_target_date || "",
      roleDocumentationComplete: Boolean(row.role_documentation_complete),
      linkedExpenseIds: row.linked_expense_ids || [],
      linkedPersonIds: row.linked_person_ids || [],
      closureStatus: row.closure_status || "Open",
      outcomeNotes: row.outcome_notes || "",
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }, row);
  }

  if (resourceName === "expenses") {
    return withLifecycle({
      id: row.id,
      workspaceId: row.workspace_id,
      title: row.title,
      category: row.category || "",
      amount: row.amount || 0,
      expenseDate: row.expense_date || "",
      businessPurpose: row.business_purpose || "",
      contentConnection: row.content_connection || "",
      receiptAttached: Boolean(row.receipt_attached),
      assetLinked: Boolean(row.asset_linked),
      linkedProjectId: row.project_id || "",
      linkedTripId: row.trip_id || "",
      linkedProductionId: row.production_id || "",
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }, row);
  }

  if (resourceName === "people") {
    return withLifecycle({
      id: row.id,
      workspaceId: row.workspace_id,
      fullName: row.full_name,
      personType: row.person_type,
      roleSummary: row.role_summary || "",
      agreementOnFile: Boolean(row.agreement_on_file),
      marketRateJustified: Boolean(row.market_rate_justified),
      workLogsLinked: Boolean(row.work_logs_linked),
      linkedProjectIds: row.linked_project_ids || [],
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }, row);
  }

  if (resourceName === "documents") {
    return withLifecycle({
      id: row.id,
      workspaceId: row.workspace_id,
      fileName: row.file_name,
      documentType: row.document_type || "Evidence",
      linkedType: row.linked_type || "Project",
      linkedId: row.linked_id || "",
      mimeType: row.mime_type || "",
      storagePath: row.storage_path || "",
      status: row.status || "Linked",
      note: row.note || "",
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }, row);
  }

  if (resourceName === "captures") {
    return withAuditTrail(withLifecycle({
      id: row.id,
      workspaceId: row.workspace_id,
      sourceType: row.source_type || "text",
      userIntent: row.user_intent || "auto",
      title: row.title || "",
      summary: row.summary || "",
      rawText: row.raw_text || "",
      extractedText: row.extracted_text || "",
      suggestedResourceType: row.suggested_resource_type || "",
      suggestedProjectId: row.suggested_project_id || "",
      suggestedDocumentType: row.suggested_document_type || "",
      suggestedCategory: row.suggested_category || "",
      suggestedAmount: row.suggested_amount || 0,
      suggestedExpenseDate: row.suggested_expense_date || "",
      confidence: row.confidence || 0,
      reasoning: row.reasoning || "",
      status: row.status || "needs_review",
      processingStatus: row.processing_status || "completed",
      fileName: row.file_name || "",
      mimeType: row.mime_type || "",
      storagePath: row.storage_path || "",
      appliedResourceType: row.applied_resource_type || "",
      appliedResourceId: row.applied_resource_id || "",
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }, row), row);
  }

  if (resourceName === "ideas") {
    return withLifecycle({
      id: row.id,
      workspaceId: row.workspace_id,
      title: row.title || "",
      summary: row.summary || "",
      status: row.status || "Captured",
      hook: row.hook || "",
      platformFit: row.platform_fit || "",
      commercialAngle: row.commercial_angle || "",
      sourceCaptureId: row.source_capture_id || "",
      promotedProjectId: row.promoted_project_id || "",
      tags: row.tags || [],
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }, row);
  }

  if (resourceName === "knowledge") {
    return withLifecycle({
      id: row.id,
      workspaceId: row.workspace_id,
      title: row.title || "",
      summary: row.summary || "",
      category: row.category || "Reference",
      content: row.content || "",
      tags: row.tags || [],
      linkedType: row.linked_type || "",
      linkedId: row.linked_id || "",
      sourceCaptureId: row.source_capture_id || "",
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }, row);
  }

  if (resourceName === "invoices") {
    return withLifecycle({
      id: row.id,
      workspaceId: row.workspace_id,
      projectId: row.project_id || "",
      personId: row.person_id || "",
      invoiceNumber: row.invoice_number || "",
      direction: row.direction || "Outbound",
      status: row.status || "Draft",
      issueDate: row.issue_date || "",
      dueDate: row.due_date || "",
      totalAmount: row.total_amount || 0,
      note: row.note || "",
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }, row);
  }

  if (resourceName === "payments") {
    return withLifecycle({
      id: row.id,
      workspaceId: row.workspace_id,
      invoiceId: row.invoice_id || "",
      amount: row.amount || 0,
      paidAt: row.paid_at || "",
      method: row.method || "",
      proofDocumentId: row.proof_document_id || "",
      note: row.note || "",
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }, row);
  }

  return withLifecycle({
    id: row.id,
    workspaceId: row.workspace_id,
    title: row.title,
    linkedType: row.linked_type || "General",
    linkedId: row.linked_id || "",
    dueDate: row.due_date || "",
    severity: row.severity || "Medium",
    note: row.note || "",
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }, row);
}

function toRow(resourceName, record) {
  if (resourceName === "projects") {
    return {
      ...lifecycleRow(record),
      id: record.id,
      workspace_id: record.workspaceId,
      title: record.title,
      project_type: record.projectType,
      status: record.status,
      planned_start: record.plannedStart || null,
      planned_end: record.plannedEnd || null,
      budget_estimate: record.budgetEstimate || 0,
      commercial_objective: record.commercialObjective,
      revenue_outcome: record.revenueOutcome,
      timeline: record.timeline,
      linked_trip_ids: record.linkedTripIds || [],
      linked_production_ids: record.linkedProductionIds || [],
      linked_expense_ids: record.linkedExpenseIds || [],
      linked_person_ids: record.linkedPersonIds || [],
      closure_status: record.closureStatus,
      narrative: record.narrative,
      created_at: record.createdAt,
      updated_at: record.updatedAt
    };
  }

  if (resourceName === "trips") {
    return {
      ...lifecycleRow(record),
      id: record.id,
      workspace_id: record.workspaceId,
      project_id: record.linkedProjectId || null,
      title: record.title,
      trip_type: record.tripType,
      purpose: record.purpose,
      origin_summary: record.originSummary,
      destination_summary: record.destinationSummary,
      start_date: record.startDate || null,
      end_date: record.endDate || null,
      pre_trip_complete: record.preTripComplete,
      during_trip_complete: record.duringTripComplete,
      post_trip_complete: record.postTripComplete,
      brief_saved: record.briefSaved,
      spouse_or_contractor: record.spouseOrContractor,
      estimated_budget: record.estimatedBudget || 0,
      actual_spend: record.actualSpend || 0,
      closure_status: record.closureStatus,
      outcome_notes: record.outcomeNotes,
      created_at: record.createdAt,
      updated_at: record.updatedAt
    };
  }

  if (resourceName === "productions") {
    return {
      ...lifecycleRow(record),
      id: record.id,
      workspace_id: record.workspaceId,
      project_id: record.linkedProjectId || null,
      title: record.title,
      content_type: record.contentType,
      platform_intent: record.platformIntent,
      shoot_date: record.shootDate || null,
      location: record.location,
      business_purpose: record.businessPurpose,
      published_url: record.publishedUrl || null,
      publish_target_date: record.publishTargetDate || null,
      role_documentation_complete: record.roleDocumentationComplete,
      linked_expense_ids: record.linkedExpenseIds || [],
      linked_person_ids: record.linkedPersonIds || [],
      closure_status: record.closureStatus,
      outcome_notes: record.outcomeNotes,
      created_at: record.createdAt,
      updated_at: record.updatedAt
    };
  }

  if (resourceName === "expenses") {
    return {
      ...lifecycleRow(record),
      id: record.id,
      workspace_id: record.workspaceId,
      project_id: record.linkedProjectId || null,
      trip_id: record.linkedTripId || null,
      production_id: record.linkedProductionId || null,
      title: record.title,
      category: record.category,
      amount: record.amount,
      expense_date: record.expenseDate || null,
      business_purpose: record.businessPurpose,
      content_connection: record.contentConnection,
      receipt_attached: record.receiptAttached,
      asset_linked: record.assetLinked,
      created_at: record.createdAt,
      updated_at: record.updatedAt
    };
  }

  if (resourceName === "people") {
    return {
      ...lifecycleRow(record),
      id: record.id,
      workspace_id: record.workspaceId,
      full_name: record.fullName,
      person_type: record.personType,
      role_summary: record.roleSummary,
      agreement_on_file: record.agreementOnFile,
      market_rate_justified: record.marketRateJustified,
      work_logs_linked: record.workLogsLinked,
      linked_project_ids: record.linkedProjectIds || [],
      created_at: record.createdAt,
      updated_at: record.updatedAt
    };
  }

  if (resourceName === "documents") {
    return {
      ...lifecycleRow(record),
      id: record.id,
      workspace_id: record.workspaceId,
      linked_type: record.linkedType,
      linked_id: record.linkedId,
      file_name: record.fileName,
      document_type: record.documentType,
      mime_type: record.mimeType || null,
      storage_path: record.storagePath,
      status: record.status,
      note: record.note,
      created_at: record.createdAt,
      updated_at: record.updatedAt
    };
  }

  if (resourceName === "captures") {
    return {
      ...lifecycleRow(record),
      id: record.id,
      workspace_id: record.workspaceId,
      source_type: record.sourceType,
      user_intent: record.userIntent,
      title: record.title,
      summary: record.summary,
      raw_text: record.rawText,
      extracted_text: record.extractedText,
      suggested_resource_type: record.suggestedResourceType || null,
      suggested_project_id: record.suggestedProjectId || null,
      suggested_document_type: record.suggestedDocumentType || null,
      suggested_category: record.suggestedCategory || null,
      suggested_amount: record.suggestedAmount || 0,
      suggested_expense_date: record.suggestedExpenseDate || null,
      confidence: record.confidence || 0,
      reasoning: record.reasoning || null,
      status: record.status,
      processing_status: record.processingStatus,
      file_name: record.fileName || null,
      mime_type: record.mimeType || null,
      storage_path: record.storagePath || null,
      applied_resource_type: record.appliedResourceType || null,
      applied_resource_id: record.appliedResourceId || null,
      audit_trail: record.auditTrail || [],
      archived_at: record.archivedAt || null,
      deleted_at: record.deletedAt || null,
      created_at: record.createdAt,
      updated_at: record.updatedAt
    };
  }

  if (resourceName === "ideas") {
    return {
      ...lifecycleRow(record),
      id: record.id,
      workspace_id: record.workspaceId,
      title: record.title,
      summary: record.summary,
      status: record.status,
      hook: record.hook,
      platform_fit: record.platformFit,
      commercial_angle: record.commercialAngle,
      source_capture_id: record.sourceCaptureId || null,
      promoted_project_id: record.promotedProjectId || null,
      tags: record.tags || [],
      created_at: record.createdAt,
      updated_at: record.updatedAt
    };
  }

  if (resourceName === "knowledge") {
    return {
      ...lifecycleRow(record),
      id: record.id,
      workspace_id: record.workspaceId,
      title: record.title,
      summary: record.summary,
      category: record.category,
      content: record.content,
      tags: record.tags || [],
      linked_type: record.linkedType || null,
      linked_id: record.linkedId || null,
      source_capture_id: record.sourceCaptureId || null,
      created_at: record.createdAt,
      updated_at: record.updatedAt
    };
  }

  if (resourceName === "invoices") {
    return {
      ...lifecycleRow(record),
      id: record.id,
      workspace_id: record.workspaceId,
      project_id: record.projectId || null,
      person_id: record.personId || null,
      invoice_number: record.invoiceNumber,
      direction: record.direction,
      status: record.status,
      issue_date: record.issueDate || null,
      due_date: record.dueDate || null,
      total_amount: record.totalAmount || 0,
      note: record.note,
      created_at: record.createdAt,
      updated_at: record.updatedAt
    };
  }

  if (resourceName === "payments") {
    return {
      ...lifecycleRow(record),
      id: record.id,
      workspace_id: record.workspaceId,
      invoice_id: record.invoiceId || null,
      amount: record.amount || 0,
      paid_at: record.paidAt || null,
      method: record.method || null,
      proof_document_id: record.proofDocumentId || null,
      note: record.note,
      created_at: record.createdAt,
      updated_at: record.updatedAt
    };
  }

  return {
    ...lifecycleRow(record),
    id: record.id,
    workspace_id: record.workspaceId,
    title: record.title,
    linked_type: record.linkedType,
    linked_id: record.linkedId || null,
    due_date: record.dueDate,
    severity: record.severity,
    note: record.note,
    created_at: record.createdAt,
    updated_at: record.updatedAt
  };
}

module.exports = {
  fromRow,
  fromQuestionnaireRow,
  fromWorkspaceRow,
  toRow
};
