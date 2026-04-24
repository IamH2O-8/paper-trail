const path = require("path");
const { getRepository } = require("../data/repository");
const { decorateRecord, buildDashboardSummary, buildComplianceSummary, buildExportPreview } = require("./complianceService");
const { loadDocumentFile } = require("./documentFileService");
const { requireRequestAuth } = require("./requestAuth");
const { toVisibleState } = require("./workspaceState");

async function getBootstrapPayload() {
  const auth = requireRequestAuth();
  const state = toVisibleState(await getRepository().getState(), auth.workspaceId);

  return {
    workspace: state.workspace,
    viewer: auth.user,
    dashboard: buildDashboardSummary(state),
    collections: {
      projects: state.projects.map((record) => decorateRecord(state, "projects", record)),
      trips: state.trips.map((record) => decorateRecord(state, "trips", record)),
      productions: state.productions.map((record) => decorateRecord(state, "productions", record)),
      expenses: state.expenses.map((record) => decorateRecord(state, "expenses", record)),
      people: state.people.map((record) => decorateRecord(state, "people", record)),
      reminders: state.reminders.map((record) => decorateRecord(state, "reminders", record)),
      documents: state.documents.map((record) => decorateRecord(state, "documents", record)),
      captures: state.captures,
      ideas: state.ideas.map((record) => decorateRecord(state, "ideas", record)),
      knowledge: state.knowledge.map((record) => decorateRecord(state, "knowledge", record)),
      invoices: state.invoices.map((record) => decorateRecord(state, "invoices", record)),
      payments: state.payments.map((record) => decorateRecord(state, "payments", record))
    }
  };
}

async function getDashboardPayload() {
  const auth = requireRequestAuth();
  const state = toVisibleState(await getRepository().getState(), auth.workspaceId);
  return buildDashboardSummary(state);
}

async function getEntityCompliance(resourceName, id) {
  const auth = requireRequestAuth();
  const state = toVisibleState(await getRepository().getState(), auth.workspaceId);
  const collection = state[resourceName];

  if (!Array.isArray(collection)) {
    return null;
  }

  const record = collection.find((item) => item.id === id);
  if (!record) {
    return null;
  }

  return {
    id,
    resourceName,
    compliance: buildComplianceSummary(state, resourceName, record)
  };
}

async function getExportPreview(resourceName, id) {
  const auth = requireRequestAuth();
  const state = toVisibleState(await getRepository().getState(), auth.workspaceId);
  const target = resolveExportTarget(state, resourceName, id);
  if (!target) {
    return null;
  }

  return renderExportModelText(buildExportModel(state, target.resourceName, target.record));
}

async function getExportDocument(resourceName, id, format = "txt") {
  const auth = requireRequestAuth();
  const state = toVisibleState(await getRepository().getState(), auth.workspaceId);
  const target = resolveExportTarget(state, resourceName, id);
  if (!target) {
    return null;
  }

  const model = buildExportModel(state, target.resourceName, target.record);
  const preview = renderExportModelText(model);
  const fileBaseName = `${slugify(target.resourceName)}-${slugify(model.title || id) || id}`;

  if (format === "html") {
    return {
      body: buildExportHtml(model),
      contentType: "text/html; charset=utf-8",
      fileName: `${fileBaseName}.html`
    };
  }

  if (format === "pdf") {
    return {
      body: buildExportPdf(model.title, preview),
      contentType: "application/pdf",
      fileName: `${fileBaseName}.pdf`
    };
  }

  return {
    body: preview,
    contentType: "text/plain; charset=utf-8",
    fileName: `${fileBaseName}.txt`
  };
}

async function getExportBundle(resourceName, id) {
  const auth = requireRequestAuth();
  const state = toVisibleState(await getRepository().getState(), auth.workspaceId);
  const target = resolveExportTarget(state, resourceName, id);
  if (!target) {
    return null;
  }

  if (target.resourceName !== "projects") {
    throw new Error("Bundles are currently supported for projects only.");
  }

  const model = buildExportModel(state, target.resourceName, target.record);
  const textBody = renderExportModelText(model);
  const pdfBody = buildExportPdf(model.title, textBody);
  const entries = [
    { name: "manifest.json", body: Buffer.from(JSON.stringify(buildExportManifest(model), null, 2), "utf8") },
    { name: "project-dossier.txt", body: Buffer.from(textBody, "utf8") },
    { name: "project-dossier.pdf", body: pdfBody }
  ];

  for (const document of model.evidenceDocuments) {
    try {
      const file = await loadDocumentFile(document);
      entries.push({
        name: path.posix.join("evidence", sanitizeBundleName(`${document.linkedType}-${document.linkedId}-${document.fileName}`)),
        body: file.body
      });
    } catch (_error) {
      entries.push({
        name: path.posix.join("evidence", sanitizeBundleName(`${document.linkedType}-${document.linkedId}-${document.id}-missing.txt`)),
        body: Buffer.from(`Could not load original file for ${document.fileName}.`, "utf8")
      });
    }
  }

  return {
    body: createZipArchive(entries),
    contentType: "application/zip",
    fileName: `${slugify(target.resourceName)}-${slugify(model.title || id) || id}-bundle.zip`
  };
}

async function getProjectActivity(projectId) {
  const auth = requireRequestAuth();
  const state = toVisibleState(await getRepository().getState(), auth.workspaceId);
  return buildProjectActivityPayload(state, projectId);
}

async function searchWorkspace(filters = {}) {
  const auth = requireRequestAuth();
  const state = toVisibleState(await getRepository().getState(), auth.workspaceId);
  const query = String(filters.q || "").trim().toLowerCase();
  const resourceFilter = String(filters.resource || "").trim();
  const projectId = String(filters.projectId || "").trim();
  const personId = String(filters.personId || "").trim();
  const from = String(filters.from || "").trim();
  const to = String(filters.to || "").trim();
  const hasBlocker = String(filters.hasBlocker || "").toLowerCase() === "true";
  const hasDocument = String(filters.hasDocument || "").toLowerCase() === "true";
  const resources = resourceFilter ? [resourceFilter] : ["captures", "projects", "trips", "productions", "expenses", "people", "documents", "ideas", "knowledge", "invoices", "payments", "reminders"];

  const results = resources
    .flatMap((resourceName) =>
      (state[resourceName] || [])
        .map((record) => buildSearchResult(state, resourceName, record, query))
        .filter(Boolean)
    )
    .filter((item) => filterSearchResult(item, { projectId, personId, from, to, hasBlocker, hasDocument }))
    .sort((left, right) => right.score - left.score || new Date(right.record.createdAt || 0) - new Date(left.record.createdAt || 0));

  return {
    query,
    results
  };
}

function buildExportHtml(model) {
  const summaryCards = model.summaryRows
    .map(
      (row) => `
        <article class="summary-card">
          <span>${escapeHtml(row.label)}</span>
          <strong>${escapeHtml(row.value || "Not captured")}</strong>
        </article>
      `
    )
    .join("");
  const sections = model.sections
    .map(
      (section) => `
        <section class="section">
          <div class="section-head">
            <h2>${escapeHtml(section.title)}</h2>
            ${section.kicker ? `<span class="meta">${escapeHtml(section.kicker)}</span>` : ""}
          </div>
          ${renderExportSectionBody(section)}
        </section>
      `
    )
    .join("");
  const evidenceGallery = model.evidenceDocuments.length
    ? `
      <section class="section">
        <div class="section-head">
          <h2>Evidence Appendix</h2>
          <span class="meta">${model.evidenceDocuments.length} file(s)</span>
        </div>
        <div class="evidence-grid">
          ${model.evidenceDocuments.map((document) => renderExportEvidenceCard(document)).join("")}
        </div>
      </section>
    `
    : "";

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(model.title || "Export")}</title>
    <style>
      :root { color-scheme: light; }
      body {
        margin: 0;
        padding: 48px 24px;
        background: #f5efe8;
        color: #1d1b19;
        font-family: "Avenir Next", "Segoe UI", sans-serif;
      }
      main {
        max-width: 900px;
        margin: 0 auto;
        background: #fffdfa;
        border-radius: 24px;
        padding: 32px;
        box-shadow: 0 24px 60px rgba(29, 27, 25, 0.08);
      }
      h1 {
        margin: 0 0 8px;
        font-size: 2rem;
      }
      p {
        color: #5d5e61;
      }
      .lede {
        margin: 8px 0 0;
      }
      .summary-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px;
        margin-top: 24px;
      }
      .summary-card,
      .section {
        border-radius: 18px;
        background: #fff;
        border: 1px solid rgba(117, 119, 125, 0.12);
      }
      .summary-card {
        padding: 18px;
      }
      .summary-card span,
      .meta {
        display: block;
        color: #6b6d73;
        font-size: 0.82rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
      }
      .summary-card strong {
        display: block;
        margin-top: 6px;
        font-size: 1rem;
        line-height: 1.45;
      }
      .section-list,
      .mini-list {
        margin: 0;
        padding-left: 20px;
        color: #3f4044;
        line-height: 1.7;
      }
      .section-text {
        margin: 0;
        color: #3f4044;
        white-space: pre-wrap;
        line-height: 1.75;
      }
      .section {
        margin-top: 24px;
        padding: 22px;
      }
      .section-head {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 14px;
      }
      .section-head h2 {
        margin: 0;
        font-size: 1.05rem;
      }
      .subsection + .subsection {
        margin-top: 18px;
      }
      .subsection h3 {
        margin: 0 0 8px;
        font-size: 0.94rem;
      }
      .evidence-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 18px;
      }
      .evidence-card {
        overflow: hidden;
        border-radius: 16px;
        background: #fffdfa;
        border: 1px solid rgba(117, 119, 125, 0.14);
      }
      .evidence-media {
        background: #f3eee8;
        min-height: 220px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .evidence-media img,
      .evidence-media iframe {
        width: 100%;
        height: 260px;
        border: 0;
        object-fit: cover;
      }
      .evidence-fallback {
        padding: 24px;
        text-align: center;
        color: #5d5e61;
      }
      .evidence-copy {
        padding: 16px;
      }
      .evidence-copy strong {
        display: block;
        margin-bottom: 6px;
      }
      .evidence-copy p {
        margin: 0 0 10px;
      }
      .evidence-copy a {
        color: #091627;
        font-weight: 700;
        text-decoration: none;
      }
      .actions {
        margin-top: 24px;
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }
      button {
        border: 0;
        border-radius: 999px;
        padding: 12px 18px;
        cursor: pointer;
        font-weight: 700;
        background: #091627;
        color: #fff;
      }
      @media print {
        body {
          background: #fff;
          padding: 0;
        }
        main {
          box-shadow: none;
          border-radius: 0;
          padding: 0;
        }
        .actions {
          display: none;
        }
      }
      @media (max-width: 900px) {
        .summary-grid,
        .evidence-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <h1>${escapeHtml(model.title || "Export")}</h1>
      <p class="lede">${escapeHtml(model.subtitle || "Review this dossier in the browser, print it to PDF, or keep the original evidence files alongside it.")}</p>
      ${summaryCards ? `<section class="summary-grid">${summaryCards}</section>` : ""}
      ${sections}
      ${evidenceGallery}
      <div class="actions">
        <button type="button" onclick="window.print()">Print / Save as PDF</button>
        ${model.resourceName === "projects" ? `<button type="button" onclick="window.location.href='/api/exports/${model.resourceName}/${model.recordId}/bundle'">Download project bundle</button>` : ""}
      </div>
    </main>
  </body>
</html>`;
}

function buildExportModel(state, resourceName, record) {
  const compliance = buildComplianceSummary(state, resourceName, record);
  const defaultPreview = buildExportPreview(state, resourceName, record, compliance);
  const model = {
    resourceName,
    recordId: record.id,
    title: exportTitleForRecord(resourceName, record),
    subtitle: "Saved business record with linked evidence and retrieval context.",
    summaryRows: [],
    sections: [],
    evidenceDocuments: [],
    relatedRecords: [],
    timelineItems: []
  };

  if (resourceName === "projects") {
    const activity = buildProjectActivityPayload(state, record.id) || { items: [] };
    const linkedExpenseIds = new Set((record.linkedExpenseIds || []).filter(Boolean));
    const linkedInvoiceIds = new Set(state.invoices.filter((item) => item.projectId === record.id).map((item) => item.id));
    const linkedPaymentIds = new Set(state.payments.filter((item) => linkedInvoiceIds.has(item.invoiceId)).map((item) => item.id));
    const linkedTrips = state.trips.filter((trip) => trip.linkedProjectId === record.id || (record.linkedTripIds || []).includes(trip.id));
    const linkedProductions = state.productions.filter((production) => production.linkedProjectId === record.id || (record.linkedProductionIds || []).includes(production.id));
    const linkedExpenses = state.expenses.filter((expense) => expense.linkedProjectId === record.id || linkedExpenseIds.has(expense.id));
    const linkedInvoices = state.invoices.filter((invoice) => invoice.projectId === record.id);
    const linkedPayments = state.payments.filter((payment) => linkedInvoiceIds.has(payment.invoiceId));
    const linkedPeople = state.people.filter((person) => (person.linkedProjectIds || []).includes(record.id) || (record.linkedPersonIds || []).includes(person.id));
    const evidence = state.documents.filter((document) => documentBelongsToProject(state, document, record.id, linkedExpenseIds, linkedInvoiceIds, linkedPaymentIds));

    model.subtitle = "Complete project dossier with timeline, linked business records, and evidence appendix.";
    model.summaryRows = [
      { label: "Status", value: record.closureStatus || record.status || "Open" },
      { label: "Project type", value: record.projectType || "General project" },
      { label: "Timeline", value: formatDateRange(record.plannedStart, record.plannedEnd) || record.timeline || "Not captured" },
      { label: "Linked evidence", value: `${evidence.length} file(s)` }
    ];
    model.sections = [
      sectionText("Business objective", record.commercialObjective || "No commercial objective captured yet."),
      sectionText("Revenue outcome", record.revenueOutcome || "No revenue outcome captured yet."),
      sectionList("Linked work and finance", [
        `Trips: ${linkedTrips.map((trip) => trip.title).join(", ") || "None"}`,
        `Productions: ${linkedProductions.map((production) => production.title).join(", ") || "None"}`,
        `Expenses: ${linkedExpenses.map((expense) => expense.title).join(", ") || "None"}`,
        `Invoices: ${linkedInvoices.map((invoice) => invoice.invoiceNumber).join(", ") || "None"}`,
        `Payments: ${linkedPayments.map((payment) => payment.method || payment.id).join(", ") || "None"}`,
        `People: ${linkedPeople.map((person) => person.fullName).join(", ") || "None"}`
      ]),
      sectionText("Narrative draft", record.narrative || "No narrative draft yet."),
      sectionList("Compliance notes", [...compliance.blockers, ...compliance.warnings], { empty: ["No active compliance issues."] }),
      sectionList("Project timeline", activity.items.map((item) => formatTimelineLine(item)), {
        empty: ["No project activity has been recorded yet."],
        kicker: `${activity.items.length} item(s)`
      })
    ];
    model.evidenceDocuments = evidence.map((document) => decorateExportDocument(document));
    return model;
  }

  if (resourceName === "expenses") {
    const evidence = state.documents.filter((document) => document.linkedType === "Expense" && document.linkedId === record.id);
    const linkedProject = state.projects.find((project) => project.id === record.linkedProjectId);
    const linkedTrip = state.trips.find((trip) => trip.id === record.linkedTripId);
    const linkedProduction = state.productions.find((production) => production.id === record.linkedProductionId);

    model.subtitle = "Expense record with receipt evidence and business-purpose context.";
    model.summaryRows = [
      { label: "Amount", value: String(record.amount || 0) },
      { label: "Date", value: record.expenseDate || "Missing" },
      { label: "Category", value: record.category || "Uncategorized" },
      { label: "Receipt files", value: `${evidence.length}` }
    ];
    model.sections = [
      sectionText("Business purpose", record.businessPurpose || "Missing"),
      sectionList("Linkages", [
        `Project: ${linkedProject?.title || "None"}`,
        `Trip: ${linkedTrip?.title || "None"}`,
        `Production: ${linkedProduction?.title || "None"}`,
        `Content connection: ${record.contentConnection || "Not captured"}`
      ]),
      sectionList("Compliance notes", [...compliance.blockers, ...compliance.warnings], { empty: ["No active compliance issues."] }),
      sectionText("Fallback preview", defaultPreview)
    ];
    model.evidenceDocuments = evidence.map((document) => decorateExportDocument(document));
    return model;
  }

  if (resourceName === "invoices") {
    const linkedProject = state.projects.find((project) => project.id === record.projectId);
    const linkedPerson = state.people.find((person) => person.id === record.personId);
    const invoiceDocuments = state.documents.filter((document) => document.linkedType === "Invoice" && document.linkedId === record.id);
    const payments = state.payments.filter((payment) => payment.invoiceId === record.id);
    const paymentProofs = payments
      .map((payment) => state.documents.find((document) => document.id === payment.proofDocumentId))
      .filter(Boolean);

    model.subtitle = "Invoice dossier with invoice file, related payments, and proof appendix.";
    model.summaryRows = [
      { label: "Status", value: record.status || "Open" },
      { label: "Direction", value: record.direction || "Not set" },
      { label: "Total amount", value: String(record.totalAmount || 0) },
      { label: "Proof files", value: `${invoiceDocuments.length + paymentProofs.length}` }
    ];
    model.sections = [
      sectionList("Invoice details", [
        `Invoice number: ${record.invoiceNumber || "Missing"}`,
        `Issue date: ${record.issueDate || "Missing"}`,
        `Due date: ${record.dueDate || "Missing"}`,
        `Project: ${linkedProject?.title || "None"}`,
        `Counterparty: ${linkedPerson?.fullName || "None"}`
      ]),
      sectionList("Payments on this invoice", payments.map((payment) => `${payment.paidAt || "Missing date"} | ${payment.method || "Method missing"} | ${payment.amount || 0}`), {
        empty: ["No payments recorded yet."]
      }),
      sectionList("Compliance notes", [...compliance.blockers, ...compliance.warnings], { empty: ["No active compliance issues."] }),
      sectionText("Notes", record.note || "No note provided.")
    ];
    model.evidenceDocuments = [...invoiceDocuments, ...paymentProofs].map((document) => decorateExportDocument(document));
    return model;
  }

  if (resourceName === "payments") {
    const invoice = state.invoices.find((item) => item.id === record.invoiceId);
    const proof = state.documents.find((document) => document.id === record.proofDocumentId);
    const invoiceDocuments = invoice ? state.documents.filter((document) => document.linkedType === "Invoice" && document.linkedId === invoice.id) : [];

    model.subtitle = "Payment record with proof attachment and linked invoice context.";
    model.summaryRows = [
      { label: "Amount", value: String(record.amount || 0) },
      { label: "Paid at", value: record.paidAt || "Missing" },
      { label: "Method", value: record.method || "Missing" },
      { label: "Proof files", value: `${(proof ? 1 : 0) + invoiceDocuments.length}` }
    ];
    model.sections = [
      sectionList("Payment details", [
        `Invoice: ${invoice?.invoiceNumber || record.invoiceId || "Missing"}`,
        `Amount: ${record.amount || 0}`,
        `Method: ${record.method || "Missing"}`,
        `Paid at: ${record.paidAt || "Missing"}`
      ]),
      sectionList("Compliance notes", [...compliance.blockers, ...compliance.warnings], { empty: ["No active compliance issues."] }),
      sectionText("Notes", record.note || "No note provided.")
    ];
    model.evidenceDocuments = [...invoiceDocuments, ...(proof ? [proof] : [])].map((document) => decorateExportDocument(document));
    return model;
  }

  if (resourceName === "ideas") {
    model.subtitle = "Idea note preserved as a retrievable project seed.";
    model.summaryRows = [
      { label: "Status", value: record.status || "Open" },
      { label: "Platform fit", value: record.platformFit || "Not captured" },
      { label: "Commercial angle", value: record.commercialAngle || "Missing" },
      { label: "Promoted project", value: record.promotedProjectId || "Not yet promoted" }
    ];
    model.sections = [
      sectionText("Idea summary", record.summary || "No summary provided."),
      sectionList("Compliance notes", [...compliance.blockers, ...compliance.warnings], { empty: ["No active compliance issues."] })
    ];
    return model;
  }

  if (resourceName === "knowledge") {
    model.subtitle = "Reusable note or checklist preserved for later retrieval.";
    model.summaryRows = [
      { label: "Category", value: record.category || "Reference" },
      { label: "Linked type", value: record.linkedType || "None" },
      { label: "Linked id", value: record.linkedId || "None" }
    ];
    model.sections = [
      sectionText("Summary", record.summary || "No summary provided."),
      sectionText("Full note", record.content || "No long-form content yet."),
      sectionList("Compliance notes", [...compliance.blockers, ...compliance.warnings], { empty: ["No active compliance issues."] })
    ];
    return model;
  }

  if (resourceName === "documents") {
    model.subtitle = "Evidence record with original file and linkage details.";
    model.summaryRows = [
      { label: "Document type", value: record.documentType || "Evidence" },
      { label: "Linked type", value: record.linkedType || "None" },
      { label: "Status", value: record.status || "Linked" },
      { label: "File type", value: record.mimeType || "Unknown" }
    ];
    model.sections = [
      sectionText("Evidence note", record.note || "No note provided."),
      sectionList("Compliance notes", [...compliance.blockers, ...compliance.warnings], { empty: ["No active compliance issues."] }),
      sectionText("Fallback preview", defaultPreview)
    ];
    model.evidenceDocuments = [decorateExportDocument(record)];
    return model;
  }

  model.summaryRows = [
    { label: "Type", value: resourceName },
    { label: "Record ID", value: record.id }
  ];
  model.sections = [
    sectionText("Record preview", defaultPreview),
    sectionList("Compliance notes", [...compliance.blockers, ...compliance.warnings], { empty: ["No active compliance issues."] })
  ];
  return model;
}

function renderExportModelText(model) {
  const summaryLines = model.summaryRows.map((row) => `${row.label}: ${row.value || "Not captured"}`);
  const sectionLines = model.sections.flatMap((section) => {
    const lines = [`${section.title.toUpperCase()}`];
    if (section.kicker) {
      lines.push(section.kicker);
    }
    for (const block of section.blocks || []) {
      if (block.type === "text") {
        lines.push("", block.value || "Not captured");
      } else if (block.type === "list") {
        lines.push("", ...(block.items.length ? block.items.map((item) => `- ${item}`) : (block.emptyItems || ["- None"])));
      }
    }
    lines.push("");
    return lines;
  });
  const evidenceLines = model.evidenceDocuments.length
    ? [
        "EVIDENCE APPENDIX",
        "",
        ...model.evidenceDocuments.flatMap((document) => [
          `- ${document.fileName} | ${document.documentType || "Evidence"} | ${document.linkedType}:${document.linkedId}`,
          document.note ? `  Note: ${document.note}` : "  Note: No note provided.",
          `  File route: ${document.fileUrl}`,
          ""
        ])
      ]
    : [];

  return [
    model.title.toUpperCase(),
    "",
    model.subtitle,
    "",
    ...summaryLines,
    "",
    ...sectionLines,
    ...evidenceLines
  ]
    .join("\n")
    .trim();
}

function renderExportSectionBody(section) {
  return (section.blocks || [])
    .map((block) => {
      if (block.type === "text") {
        return `<div class="subsection"><p class="section-text">${escapeHtml(block.value || "Not captured")}</p></div>`;
      }

      const items = block.items.length ? block.items : block.emptyItems || ["None"];
      return `<div class="subsection"><ul class="section-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>`;
    })
    .join("");
}

function renderExportEvidenceCard(document) {
  const media = renderExportEvidenceMedia(document);
  return `
    <article class="evidence-card">
      <div class="evidence-media">${media}</div>
      <div class="evidence-copy">
        <strong>${escapeHtml(document.fileName)}</strong>
        <p>${escapeHtml(document.documentType || "Evidence")} | ${escapeHtml(document.linkedType)} | ${escapeHtml(document.note || "No note provided.")}</p>
        <a href="${document.fileUrl}" target="_blank" rel="noopener">Open original file</a>
      </div>
    </article>
  `;
}

function renderExportEvidenceMedia(document) {
  const kind = documentPreviewKind(document.mimeType);
  if (kind === "image") {
    return `<img src="${document.fileUrl}" alt="${escapeHtml(document.fileName)} preview" />`;
  }

  if (kind === "pdf") {
    return `<iframe src="${document.fileUrl}" title="${escapeHtml(document.fileName)} preview"></iframe>`;
  }

  return `<div class="evidence-fallback"><strong>${escapeHtml(document.documentType || "Document")}</strong><p>Preview is not available for this file type in-browser.</p></div>`;
}

function buildExportManifest(model) {
  return {
    title: model.title,
    resourceName: model.resourceName,
    recordId: model.recordId,
    exportedAt: new Date().toISOString(),
    evidenceFiles: model.evidenceDocuments.map((document) => ({
      id: document.id,
      fileName: document.fileName,
      documentType: document.documentType,
      linkedType: document.linkedType,
      linkedId: document.linkedId,
      mimeType: document.mimeType,
      note: document.note
    }))
  };
}

function resolveExportTarget(state, resourceName, id) {
  const collection = state[resourceName];
  if (!Array.isArray(collection)) {
    throw new Error(`Unknown resource '${resourceName}'`);
  }

  const record = collection.find((item) => item.id === id);
  return record ? { resourceName, record } : null;
}

function exportTitleForRecord(resourceName, record) {
  return record.title || record.fullName || record.fileName || record.invoiceNumber || `${resourceName}:${record.id}`;
}

function decorateExportDocument(document) {
  return {
    ...document,
    fileUrl: `/api/documents/${document.id}/file`
  };
}

function documentPreviewKind(mimeType) {
  const normalized = String(mimeType || "").toLowerCase();
  if (normalized.startsWith("image/")) {
    return "image";
  }

  if (normalized.includes("pdf")) {
    return "pdf";
  }

  return "other";
}

function sectionText(title, value, extra = {}) {
  return {
    title,
    kicker: extra.kicker || "",
    blocks: [{ type: "text", value }]
  };
}

function sectionList(title, items, extra = {}) {
  return {
    title,
    kicker: extra.kicker || "",
    blocks: [{ type: "list", items: (items || []).filter(Boolean), emptyItems: extra.empty || ["None"] }]
  };
}

function formatTimelineLine(item) {
  const timestamp = item.timestamp ? formatShortDate(item.timestamp) : "Date missing";
  const summary = item.summary || "No summary recorded.";
  const hints = item.complianceHints?.length ? ` | Notes: ${item.complianceHints.join("; ")}` : "";
  return `${timestamp} | ${item.kind} | ${item.title} | ${summary}${hints}`;
}

function formatDateRange(start, end) {
  if (!start && !end) {
    return "";
  }

  if (start && end) {
    return `${start} to ${end}`;
  }

  return start || end || "";
}

function sanitizeBundleName(value) {
  return String(value || "file")
    .trim()
    .replaceAll(/[^a-zA-Z0-9._-]/g, "-")
    .replaceAll(/-+/g, "-");
}

function createZipArchive(entries) {
  const fileParts = [];
  const centralParts = [];
  let offset = 0;
  const { time, date } = dosDateTime(new Date());

  for (const entry of entries) {
    const nameBuffer = Buffer.from(String(entry.name || "file"), "utf8");
    const body = Buffer.isBuffer(entry.body) ? entry.body : Buffer.from(String(entry.body || ""), "utf8");
    const crc = crc32(body);

    const localHeader = Buffer.alloc(30);
    localHeader.writeUInt32LE(0x04034b50, 0);
    localHeader.writeUInt16LE(20, 4);
    localHeader.writeUInt16LE(0, 6);
    localHeader.writeUInt16LE(0, 8);
    localHeader.writeUInt16LE(time, 10);
    localHeader.writeUInt16LE(date, 12);
    localHeader.writeUInt32LE(crc, 14);
    localHeader.writeUInt32LE(body.length, 18);
    localHeader.writeUInt32LE(body.length, 22);
    localHeader.writeUInt16LE(nameBuffer.length, 26);
    localHeader.writeUInt16LE(0, 28);

    fileParts.push(localHeader, nameBuffer, body);

    const centralHeader = Buffer.alloc(46);
    centralHeader.writeUInt32LE(0x02014b50, 0);
    centralHeader.writeUInt16LE(20, 4);
    centralHeader.writeUInt16LE(20, 6);
    centralHeader.writeUInt16LE(0, 8);
    centralHeader.writeUInt16LE(0, 10);
    centralHeader.writeUInt16LE(time, 12);
    centralHeader.writeUInt16LE(date, 14);
    centralHeader.writeUInt32LE(crc, 16);
    centralHeader.writeUInt32LE(body.length, 20);
    centralHeader.writeUInt32LE(body.length, 24);
    centralHeader.writeUInt16LE(nameBuffer.length, 28);
    centralHeader.writeUInt16LE(0, 30);
    centralHeader.writeUInt16LE(0, 32);
    centralHeader.writeUInt16LE(0, 34);
    centralHeader.writeUInt16LE(0, 36);
    centralHeader.writeUInt32LE(0, 38);
    centralHeader.writeUInt32LE(offset, 42);

    centralParts.push(centralHeader, nameBuffer);
    offset += localHeader.length + nameBuffer.length + body.length;
  }

  const centralDirectoryOffset = offset;
  const centralDirectory = Buffer.concat(centralParts);
  const endRecord = Buffer.alloc(22);
  endRecord.writeUInt32LE(0x06054b50, 0);
  endRecord.writeUInt16LE(0, 4);
  endRecord.writeUInt16LE(0, 6);
  endRecord.writeUInt16LE(entries.length, 8);
  endRecord.writeUInt16LE(entries.length, 10);
  endRecord.writeUInt32LE(centralDirectory.length, 12);
  endRecord.writeUInt32LE(centralDirectoryOffset, 16);
  endRecord.writeUInt16LE(0, 20);

  return Buffer.concat([...fileParts, centralDirectory, endRecord]);
}

function dosDateTime(date) {
  const year = Math.max(1980, date.getFullYear());
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = Math.floor(date.getSeconds() / 2);

  return {
    time: (hours << 11) | (minutes << 5) | seconds,
    date: ((year - 1980) << 9) | (month << 5) | day
  };
}

function crc32(buffer) {
  let crc = 0 ^ -1;
  for (let index = 0; index < buffer.length; index += 1) {
    crc = (crc >>> 8) ^ CRC32_TABLE[(crc ^ buffer[index]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

function formatShortDate(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toISOString().slice(0, 10);
}

const CRC32_TABLE = Array.from({ length: 256 }, (_value, index) => {
  let current = index;
  for (let bit = 0; bit < 8; bit += 1) {
    current = (current & 1) ? (0xedb88320 ^ (current >>> 1)) : (current >>> 1);
  }
  return current >>> 0;
});

function buildExportPdf(title, preview) {
  const titleText = String(title || "Export").trim() || "Export";
  const bodyLines = wrapPdfLines(preview, 92);
  const pageBodyLineLimit = 48;
  const pages = [];

  pages.push({
    title: titleText,
    lines: bodyLines.slice(0, pageBodyLineLimit)
  });

  for (let index = pageBodyLineLimit; index < bodyLines.length; index += pageBodyLineLimit) {
    pages.push({
      title: `${titleText} (continued)`,
      lines: bodyLines.slice(index, index + pageBodyLineLimit)
    });
  }

  const objects = [];
  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[2] = "";
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>";

  const pageRefs = [];
  let objectIndex = 4;

  for (const page of pages) {
    const contentObjectId = objectIndex++;
    const pageObjectId = objectIndex++;
    const contentStream = buildPdfContentStream(page.title, page.lines);
    const contentBuffer = Buffer.from(contentStream, "utf8");
    objects[contentObjectId] = `<< /Length ${contentBuffer.length} >>\nstream\n${contentStream}\nendstream`;
    objects[pageObjectId] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R >> >> /Contents ${contentObjectId} 0 R >>`;
    pageRefs.push(`${pageObjectId} 0 R`);
  }

  objects[2] = `<< /Type /Pages /Kids [${pageRefs.join(" ")}] /Count ${pageRefs.length} >>`;

  return assemblePdf(objects);
}

function buildPdfContentStream(title, lines) {
  const commands = [
    "BT",
    "/F1 16 Tf",
    "50 750 Td",
    `(${escapePdfText(title)}) Tj`,
    "0 -22 Td",
    "/F1 10 Tf"
  ];

  for (const line of lines) {
    commands.push(`(${escapePdfText(line)}) Tj`);
    commands.push("0 -14 Td");
  }

  commands.push("ET");
  return commands.join("\n");
}

function wrapPdfLines(text, maxWidth = 92) {
  const sourceLines = String(text || "")
    .replaceAll("\r\n", "\n")
    .split("\n");
  const wrapped = [];

  for (const rawLine of sourceLines) {
    const line = rawLine.trimEnd();
    if (!line) {
      wrapped.push("");
      continue;
    }

    let current = "";
    const words = line.split(/\s+/);
    for (const word of words) {
      if (!current) {
        if (word.length <= maxWidth) {
          current = word;
          continue;
        }

        const chunks = chunkPdfWord(word, maxWidth);
        wrapped.push(...chunks.slice(0, -1));
        current = chunks[chunks.length - 1] || "";
        continue;
      }

      const candidate = `${current} ${word}`;
      if (candidate.length <= maxWidth) {
        current = candidate;
        continue;
      }

      wrapped.push(current);
      if (word.length <= maxWidth) {
        current = word;
      } else {
        const chunks = chunkPdfWord(word, maxWidth);
        wrapped.push(...chunks.slice(0, -1));
        current = chunks[chunks.length - 1] || "";
      }
    }

    wrapped.push(current);
  }

  return wrapped.length ? wrapped : ["No export content available."];
}

function chunkPdfWord(word, maxWidth) {
  const chunks = [];
  for (let index = 0; index < word.length; index += maxWidth) {
    chunks.push(word.slice(index, index + maxWidth));
  }
  return chunks.length ? chunks : [word];
}

function assemblePdf(objects) {
  const segments = ["%PDF-1.4\n"];
  const offsets = [0];

  for (let index = 1; index < objects.length; index += 1) {
    offsets[index] = Buffer.byteLength(segments.join(""), "utf8");
    segments.push(`${index} 0 obj\n${objects[index]}\nendobj\n`);
  }

  const xrefOffset = Buffer.byteLength(segments.join(""), "utf8");
  segments.push(`xref\n0 ${objects.length}\n`);
  segments.push("0000000000 65535 f \n");

  for (let index = 1; index < objects.length; index += 1) {
    segments.push(`${String(offsets[index]).padStart(10, "0")} 00000 n \n`);
  }

  segments.push(
    `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`
  );

  return Buffer.from(segments.join(""), "utf8");
}

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "");
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapePdfText(value) {
  return String(value || "")
    .replaceAll("\\", "\\\\")
    .replaceAll("(", "\\(")
    .replaceAll(")", "\\)");
}

module.exports = {
  getBootstrapPayload,
  getDashboardPayload,
  getEntityCompliance,
  getProjectActivity,
  searchWorkspace,
  getExportBundle,
  getExportDocument,
  getExportPreview
};

function activityItem(kind, sourceResource, sourceId, title, summary, timestamp, linkedDocumentIds = [], status = "", complianceHints = []) {
  return {
    id: `${sourceResource}:${sourceId}`,
    kind,
    sourceResource,
    sourceId,
    title: title || sourceId,
    summary: summary || "",
    timestamp: timestamp || "",
    linkedDocumentIds,
    status,
    complianceHints
  };
}

function buildProjectActivityPayload(state, projectId) {
  const project = state.projects.find((item) => item.id === projectId);
  if (!project) {
    return null;
  }

  const linkedExpenseIds = new Set((project.linkedExpenseIds || []).filter(Boolean));
  const linkedTripIds = new Set((project.linkedTripIds || []).filter(Boolean));
  const linkedProductionIds = new Set((project.linkedProductionIds || []).filter(Boolean));
  const linkedInvoiceIds = new Set(state.invoices.filter((item) => item.projectId === projectId).map((item) => item.id));
  const linkedPaymentIds = new Set(state.payments.filter((item) => linkedInvoiceIds.has(item.invoiceId)).map((item) => item.id));

  const items = [
    ...state.captures
      .filter((item) => item.suggestedProjectId === projectId || projectCaptureMatch(item, projectId, linkedExpenseIds))
      .map((item) => activityItem("capture", "captures", item.id, item.title || "Capture", item.summary || item.reasoning, item.createdAt, [], item.status, captureComplianceHints(item))),
    ...state.expenses
      .filter((item) => item.linkedProjectId === projectId)
      .map((item) => activityItem("expense", "expenses", item.id, item.title, item.businessPurpose || item.contentConnection, item.expenseDate || item.createdAt, linkedDocumentIds(state, "Expense", item.id), item.category, blockerHints(state, "expenses", item))),
    ...state.documents
      .filter((item) => documentBelongsToProject(state, item, projectId, linkedExpenseIds, linkedInvoiceIds, linkedPaymentIds))
      .map((item) => activityItem("document", "documents", item.id, item.fileName, item.note || item.documentType, item.createdAt, [item.id], item.status, blockerHints(state, "documents", item))),
    ...state.trips
      .filter((item) => item.linkedProjectId === projectId)
      .map((item) => activityItem("trip", "trips", item.id, item.title, item.purpose, item.startDate || item.createdAt, linkedDocumentIds(state, "Trip", item.id), item.closureStatus, blockerHints(state, "trips", item))),
    ...state.productions
      .filter((item) => item.linkedProjectId === projectId)
      .map((item) => activityItem("production", "productions", item.id, item.title, item.businessPurpose, item.shootDate || item.createdAt, linkedDocumentIds(state, "Production", item.id), item.closureStatus, blockerHints(state, "productions", item))),
    ...state.invoices
      .filter((item) => item.projectId === projectId)
      .map((item) => activityItem("invoice", "invoices", item.id, item.invoiceNumber, item.note || item.status, item.issueDate || item.createdAt, linkedDocumentIds(state, "Invoice", item.id), item.status, blockerHints(state, "invoices", item))),
    ...state.payments
      .filter((item) => linkedInvoiceIds.has(item.invoiceId))
      .map((item) => activityItem("payment", "payments", item.id, item.method || "Payment", item.note || item.invoiceId, item.paidAt || item.createdAt, item.proofDocumentId ? [item.proofDocumentId] : [], "Recorded", blockerHints(state, "payments", item))),
    ...state.reminders
      .filter((item) => reminderBelongsToProject(state, item, projectId, linkedTripIds, linkedProductionIds, linkedExpenseIds))
      .map((item) => activityItem("reminder", "reminders", item.id, item.title, item.note, item.dueDate || item.createdAt, [], item.severity, [item.note].filter(Boolean)))
  ]
    .sort((left, right) => new Date(right.timestamp || 0) - new Date(left.timestamp || 0));

  return {
    projectId,
    items
  };
}

function blockerHints(state, resourceName, record) {
  const compliance = buildComplianceSummary(state, resourceName, record);
  return [...compliance.blockers, ...compliance.warnings].slice(0, 3);
}

function linkedDocumentIds(state, linkedType, linkedId) {
  return state.documents.filter((document) => document.linkedType === linkedType && document.linkedId === linkedId).map((document) => document.id);
}

function documentBelongsToProject(state, document, projectId, linkedExpenseIds, linkedInvoiceIds, linkedPaymentIds) {
  if (document.linkedType === "Project" && document.linkedId === projectId) return true;
  if (document.linkedType === "Expense" && linkedExpenseIds.has(document.linkedId)) return true;
  if (document.linkedType === "Invoice" && linkedInvoiceIds.has(document.linkedId)) return true;
  if (document.linkedType === "Payment" && linkedPaymentIds.has(document.linkedId)) return true;
  return false;
}

function reminderBelongsToProject(state, reminder, projectId, linkedTripIds, linkedProductionIds, linkedExpenseIds) {
  if (reminder.linkedType === "Project" && reminder.linkedId === projectId) return true;
  if (reminder.linkedType === "Trip" && linkedTripIds.has(reminder.linkedId)) return true;
  if (reminder.linkedType === "Production" && linkedProductionIds.has(reminder.linkedId)) return true;
  if (reminder.linkedType === "Expense" && linkedExpenseIds.has(reminder.linkedId)) return true;
  return false;
}

function projectCaptureMatch(capture, projectId, linkedExpenseIds) {
  return capture.appliedResourceType === "expenses" && linkedExpenseIds.has(capture.appliedResourceId) || capture.appliedResourceType === "projects" && capture.appliedResourceId === projectId;
}

function captureComplianceHints(capture) {
  if (capture.status === "applied") {
    return [];
  }

  return [capture.reasoning || "Capture still needs review."].filter(Boolean);
}

function buildSearchResult(state, resourceName, record, query) {
  const text = searchIndexText(state, resourceName, record);
  if (query && !text.toLowerCase().includes(query)) {
    return null;
  }

  const compliance = resourceName === "captures" ? { blockers: [], warnings: [] } : buildComplianceSummary(state, resourceName, record);
  const title = record.title || record.fullName || record.fileName || record.invoiceNumber || record.id;
  const subtitle = searchSubtitle(state, resourceName, record);
  const snippet = searchSnippet(state, resourceName, record);
  const score = searchScore(title, subtitle, text, query);
  const linkedProjectId = inferLinkedProjectId(state, resourceName, record);
  const linkedPersonId = inferLinkedPersonId(state, resourceName, record);
  const documentCount = inferDocumentCount(state, resourceName, record);

  return {
    resourceName,
    title,
    subtitle,
    snippet,
    score,
    linkedProjectId,
    linkedPersonId,
    hasBlocker: Boolean(compliance.blockers.length),
    hasDocument: documentCount > 0,
    documentCount,
    record
  };
}

function filterSearchResult(item, filters) {
  if (filters.projectId && item.linkedProjectId !== filters.projectId) return false;
  if (filters.personId && item.linkedPersonId !== filters.personId) return false;
  if (filters.from && new Date(item.record.createdAt || item.record.updatedAt || 0) < new Date(filters.from)) return false;
  if (filters.to && new Date(item.record.createdAt || item.record.updatedAt || 0) > new Date(filters.to)) return false;
  if (filters.hasBlocker && !item.hasBlocker) return false;
  if (filters.hasDocument && !item.hasDocument) return false;
  return true;
}

function searchScore(title, subtitle, text, query) {
  if (!query) return 1;
  const normalizedTitle = String(title || "").toLowerCase();
  const normalizedSubtitle = String(subtitle || "").toLowerCase();
  const normalizedText = String(text || "").toLowerCase();
  let score = 0;
  if (normalizedTitle.includes(query)) score += 5;
  if (normalizedSubtitle.includes(query)) score += 3;
  if (normalizedText.includes(query)) score += 1;
  return score;
}

function searchIndexText(state, resourceName, record) {
  return [
    record.title,
    record.summary,
    record.hook,
    record.commercialAngle,
    record.content,
    record.fullName,
    record.fileName,
    record.invoiceNumber,
    record.note,
    record.reasoning,
    record.exportPreview,
    searchSubtitle(state, resourceName, record),
    searchSnippet(state, resourceName, record)
  ]
    .filter(Boolean)
    .join(" ");
}

function searchSubtitle(state, resourceName, record) {
  if (resourceName === "captures") return `${record.suggestedResourceType || "capture"} | ${record.status}`;
  if (resourceName === "projects") return `${record.projectType || "Project"} | ${record.status}`;
  if (resourceName === "trips") return `${record.tripType} | ${record.destinationSummary || record.title}`;
  if (resourceName === "productions") return `${record.contentType || "Content"} | ${record.platformIntent || ""}`;
  if (resourceName === "expenses") return `${record.category} | ${record.amount || 0}`;
  if (resourceName === "people") return `${record.personType} | ${record.fullName}`;
  if (resourceName === "documents") return `${record.documentType} | ${record.linkedType}`;
  if (resourceName === "ideas") return `${record.status} | ${record.platformFit || "Idea"}`;
  if (resourceName === "knowledge") return `${record.category} | ${record.linkedType || "Library"}`;
  if (resourceName === "invoices") return `${record.direction} | ${record.status}`;
  if (resourceName === "payments") return `${record.method || "Payment"} | ${record.amount || 0}`;
  return `${record.linkedType || "Reminder"} | ${record.severity || ""}`;
}

function searchSnippet(state, resourceName, record) {
  if (resourceName === "projects") return record.commercialObjective || record.narrative || "";
  if (resourceName === "expenses") return record.businessPurpose || record.contentConnection || "";
  if (resourceName === "documents") return record.note || "";
  if (resourceName === "ideas") return record.summary || record.commercialAngle || "";
  if (resourceName === "knowledge") return record.summary || record.content || "";
  if (resourceName === "captures") return record.summary || record.extractedText || "";
  if (resourceName === "invoices") return record.note || "";
  if (resourceName === "payments") return record.note || "";
  return record.note || record.summary || record.roleSummary || record.purpose || record.businessPurpose || "";
}

function inferLinkedProjectId(state, resourceName, record) {
  if (resourceName === "projects") return record.id;
  if (resourceName === "trips" || resourceName === "productions" || resourceName === "expenses") return record.linkedProjectId || "";
  if (resourceName === "invoices") return record.projectId || "";
  if (resourceName === "payments") {
    return state.invoices.find((item) => item.id === record.invoiceId)?.projectId || "";
  }
  if (resourceName === "documents") {
    if (record.linkedType === "Project") return record.linkedId;
    if (record.linkedType === "Expense") return state.expenses.find((item) => item.id === record.linkedId)?.linkedProjectId || "";
    if (record.linkedType === "Invoice") return state.invoices.find((item) => item.id === record.linkedId)?.projectId || "";
    if (record.linkedType === "Payment") {
      const payment = state.payments.find((item) => item.id === record.linkedId);
      return state.invoices.find((item) => item.id === payment?.invoiceId)?.projectId || "";
    }
  }
  if (resourceName === "captures") return record.suggestedProjectId || "";
  if (resourceName === "knowledge" && record.linkedType === "Project") return record.linkedId;
  if (resourceName === "people") return (record.linkedProjectIds || [])[0] || "";
  return "";
}

function inferLinkedPersonId(state, resourceName, record) {
  if (resourceName === "people") return record.id;
  if (resourceName === "invoices") return record.personId || "";
  if (resourceName === "payments") {
    return state.invoices.find((item) => item.id === record.invoiceId)?.personId || "";
  }
  return "";
}

function inferDocumentCount(state, resourceName, record) {
  if (resourceName === "documents") return 1;
  if (resourceName === "expenses") return linkedDocumentIds(state, "Expense", record.id).length;
  if (resourceName === "projects") return linkedDocumentIds(state, "Project", record.id).length;
  if (resourceName === "trips") return linkedDocumentIds(state, "Trip", record.id).length;
  if (resourceName === "productions") return linkedDocumentIds(state, "Production", record.id).length;
  if (resourceName === "invoices") return linkedDocumentIds(state, "Invoice", record.id).length;
  if (resourceName === "payments") return record.proofDocumentId ? 1 : 0;
  return 0;
}
