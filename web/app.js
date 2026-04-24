const navItems = [
  { id: "dashboard", label: "Home", description: "Start here", icon: "home", dataBacked: false, priority: "primary" },
  { id: "captures", label: "Inbox", description: "Review only when needed", icon: "inbox", dataBacked: true, priority: "primary" },
  { id: "projects", label: "Projects", description: "Your main paper trail", icon: "workspaces", dataBacked: true, priority: "primary" },
  { id: "work", label: "Work", description: "Trips, shoots, sessions", icon: "work_history", dataBacked: false, priority: "primary" },
  { id: "billing", label: "Money", description: "Invoices, payments, proof", icon: "payments", dataBacked: false, priority: "primary" },
  { id: "documents", label: "Files", description: "Receipts and uploads", icon: "folder_open", dataBacked: true, priority: "primary" },
  { id: "expenses", label: "Expenses", description: "Spend and receipts", icon: "receipt_long", dataBacked: true, priority: "secondary" },
  { id: "notesHub", label: "Ideas & Notes", description: "Capture and plan", icon: "edit_note", dataBacked: false, priority: "secondary" },
  { id: "people", label: "People", description: "Clients and collaborators", icon: "groups", dataBacked: true, priority: "secondary" },
  { id: "reminders", label: "Follow-up", description: "What still needs action", icon: "notifications_active", dataBacked: true, priority: "secondary" },
  { id: "reports", label: "Reports", description: "Exports and summaries", icon: "summarize", dataBacked: false, priority: "secondary" }
];

const utilityViews = [
  { id: "settings", label: "Settings", description: "Workspace controls and rules", icon: "settings" },
  { id: "support", label: "Support", description: "Guides, help, and diagnostics", icon: "help" }
];

const moduleBlueprints = {
  ideas: {
    eyebrow: "Creative Pipeline",
    title: "Ideas need to become real business candidates before they become projects.",
    description:
      "This module should capture raw concepts, connect them to revenue or audience intent, and decide whether they graduate into project records.",
    navBadge: "Planned",
    metrics: [
      { label: "Capture zones", value: "03", foot: "Raw ideas, developed concepts, greenlit candidates." },
      { label: "Priority lens", value: "Impact", foot: "Sort ideas by business value, production lift, and reuse potential." },
      { label: "Reference flow", value: "Linked", foot: "Attach moodboards, notes, and knowledge articles." },
      { label: "Decision point", value: "Promote", foot: "Turn an idea into a project with one controlled action." }
    ],
    coverage: [
      "Idea inbox cards with title, hook, platform fit, and commercial angle.",
      "Priority filters for active, parked, greenlit, and archived concepts.",
      "A detail panel with summary, related references, and conversion controls.",
      "A promotion flow that creates a project while preserving source evidence."
    ],
    components: [
      "Idea card",
      "Priority chip",
      "Trend reference row",
      "Promotion modal",
      "Linked knowledge sidebar",
      "Creative status timeline"
    ],
    backend: [
      "Ideas table and API routes.",
      "Linked references between ideas, projects, and documents.",
      "Conversion endpoint to create a project from an idea.",
      "Scoring rules for opportunity fit and documentation readiness."
    ],
    ctas: [
      { view: "projects", label: "Open project register" },
      { view: "knowledge", label: "See library structure" }
    ]
  },
  knowledge: {
    eyebrow: "Operating Library",
    title: "Knowledge should hold reusable playbooks, checklists, and decision support.",
    description:
      "This is the editorial library layer: a place for reusable operating notes, templates, tax logic, travel rules, and reference material that supports execution.",
    navBadge: "Library",
    metrics: [
      { label: "Content zones", value: "04", foot: "Policies, templates, playbooks, and research notes." },
      { label: "Primary use", value: "Reference", foot: "Fast lookup during planning, production, and closure." },
      { label: "Entry points", value: "Linked", foot: "Surface relevant notes inside projects, trips, and billing." },
      { label: "Output", value: "Reusable", foot: "Turn repeat decisions into team-ready documentation." }
    ],
    coverage: [
      "Library categories with article cards and pinned resources.",
      "Rich note detail view with linked entities and attachments.",
      "Search, tags, and saved filters for fast retrieval.",
      "A publishing flow for turning internal notes into standard operating templates."
    ],
    components: [
      "Category shelf",
      "Knowledge article card",
      "Tag chip",
      "Pinned resource rail",
      "Linked records list",
      "Template badge"
    ],
    backend: [
      "Knowledge records and tag endpoints.",
      "Document relationships to projects, trips, people, and billing.",
      "Rich text or markdown content storage.",
      "Search indexing across notes, tags, and linked entities."
    ],
    ctas: [
      { view: "documents", label: "Open document library" },
      { view: "people", label: "Review team records" }
    ]
  },
  billing: {
    eyebrow: "Commercial Controls",
    title: "Billing should tie revenue, payables, and contractor defensibility together.",
    description:
      "This module should track invoices, payment status, supporting proof, and who was paid for what work so the commercial record is defensible end to end.",
    navBadge: "Finance",
    metrics: [
      { label: "Lanes", value: "03", foot: "Invoices out, vendor bills, and payment confirmation." },
      { label: "Risk focus", value: "Proof", foot: "Protect against missing agreements, missing invoices, or unclear payment trails." },
      { label: "Links", value: "Projects", foot: "Tie all billing activity back to projects, people, and expenses." },
      { label: "Outcome", value: "Clear", foot: "Know what was billed, paid, outstanding, or disputed." }
    ],
    coverage: [
      "Invoice list with status chips and amount summaries.",
      "Detail page for invoice terms, linked project, people, and proof.",
      "Payment tracking cards for sent, paid, overdue, and awaiting proof.",
      "Vendor/contractor proof views tied to people records."
    ],
    components: [
      "Invoice row",
      "Amount summary card",
      "Payment status pill",
      "Send invoice modal",
      "Proof attachment panel",
      "Outstanding balance widget"
    ],
    backend: [
      "Invoices and payments tables.",
      "Relations between projects, people, expenses, and invoice records.",
      "Support for receipts, bills, and proof-of-payment attachments.",
      "Reminder triggers for overdue invoices and missing proof."
    ],
    ctas: [
      { view: "expenses", label: "Inspect expense records" },
      { view: "people", label: "Review contractor records" }
    ]
  },
  documents: {
    eyebrow: "Evidence Library",
    title: "Documents should be the evidence spine of the whole application.",
    description:
      "Receipts, agreements, briefs, deliverables, proofs, and reference files should all land here and then connect back to the records they support.",
    navBadge: "Vault",
    metrics: [
      { label: "Evidence groups", value: "06", foot: "Receipts, contracts, briefs, deliverables, logs, and exports." },
      { label: "Primary action", value: "Link", foot: "Each uploaded file should connect to one or more records." },
      { label: "Audit value", value: "High", foot: "This module turns vague claims into traceable evidence." },
      { label: "Future step", value: "Upload", foot: "Add real file storage and previews through Supabase." }
    ],
    coverage: [
      "Document rows with file type, linked records, upload date, and status.",
      "Preview and metadata panel for the selected document.",
      "Filters for record type, file type, missing links, and recent uploads.",
      "Upload flow with drag-and-drop, metadata, and link selection."
    ],
    components: [
      "Document table row",
      "Preview panel",
      "Upload dropzone",
      "Linked record chip",
      "File metadata block",
      "Missing evidence alert"
    ],
    backend: [
      "Supabase storage buckets and signed URL handling.",
      "Document metadata tables and link tables.",
      "Preview support for common file types.",
      "Link management between documents and operational records."
    ],
    ctas: [
      { view: "projects", label: "Open project records" },
      { view: "reports", label: "See export outputs" }
    ]
  },
  reports: {
    eyebrow: "Exports And Reviews",
    title: "Reports should package the operating record into something reviewable and shareable.",
    description:
      "This module should turn internal state into dossier exports, compliance summaries, and reporting snapshots for review, accounting, or archival use.",
    navBadge: "Exports",
    metrics: [
      { label: "Export families", value: "05", foot: "Project dossiers, trip packs, expense summaries, people proof, and billing reviews." },
      { label: "Source of truth", value: "Backend", foot: "Use server-generated narratives instead of ad hoc browser formatting." },
      { label: "Primary audience", value: "Review", foot: "Built for internal review, accounting, and defensible archives." },
      { label: "Future state", value: "PDF", foot: "Add generated files once document/export plumbing is ready." }
    ],
    coverage: [
      "Export cards for each output type with readiness indicators.",
      "Preview panel showing server-generated narrative or summary text.",
      "Filters for entity type, date range, and readiness status.",
      "Generation status and download history once file generation is added."
    ],
    components: [
      "Export card",
      "Readiness badge",
      "Preview pane",
      "Date-range filters",
      "Generate report modal",
      "History row"
    ],
    backend: [
      "Report-generation endpoints for each export family.",
      "Job status tracking for longer-running exports.",
      "Generated file storage and download metadata.",
      "Consistent formatting contracts for UI preview and downloadable output."
    ],
    ctas: [
      { view: "dashboard", label: "Back to dashboard" },
      { view: "documents", label: "Open evidence library" }
    ]
  },
  settings: {
    eyebrow: "Workspace Control",
    title: "Settings should define how the operating system behaves for this studio.",
    description:
      "Currency, questionnaire rules, reminder defaults, workspace members, and evidence policies should all live here so behavior stays consistent across the app.",
    navBadge: "Control",
    metrics: [
      { label: "Control areas", value: "04", foot: "Workspace profile, compliance rules, notifications, and integrations." },
      { label: "Current mode", value: "Local", foot: "The app can run in file mode or Supabase mode." },
      { label: "High-value task", value: "Auth", foot: "Add workspace identity and access rules next." },
      { label: "Policy anchor", value: "Shared", foot: "This is where repeated logic becomes stable product behavior." }
    ],
    coverage: [
      "Workspace profile form with branding, currency, and defaults.",
      "Rule panels for questionnaires, evidence requirements, and reminders.",
      "Environment and integration status cards.",
      "Member and role management once auth is introduced."
    ],
    components: [
      "Settings category list",
      "Integration status card",
      "Workspace profile form",
      "Rule toggle row",
      "Danger zone action",
      "Member access table"
    ],
    backend: [
      "Workspace settings persistence.",
      "Role-based access and membership tables.",
      "Supabase auth integration.",
      "Environment diagnostics and feature flags."
    ],
    ctas: [
      { view: "support", label: "Open support notes" },
      { view: "dashboard", label: "Return to dashboard" }
    ]
  },
  support: {
    eyebrow: "Help And Diagnostics",
    title: "Support should help the team understand the system and debug it quickly.",
    description:
      "This view should hold product guidance, setup help, known limitations, and debugging entry points so the app is easier to operate as it grows.",
    navBadge: "Help",
    metrics: [
      { label: "Tracks", value: "03", foot: "Guides, support actions, and diagnostics." },
      { label: "Primary job", value: "Unblock", foot: "Keep operators moving when something feels unclear or incomplete." },
      { label: "Useful links", value: "Local", foot: "Point to setup docs, API routes, and deployment notes." },
      { label: "Future step", value: "Logs", foot: "Add surfaced health checks and debugging panels." }
    ],
    coverage: [
      "Help articles for workflows like intake, closure, documents, and billing.",
      "Known limitations and current roadmap notes.",
      "Diagnostic cards for API health, repository mode, and deployment status.",
      "Contact or escalation actions for future multi-user support."
    ],
    components: [
      "Help article card",
      "Known issue banner",
      "Environment diagnostic card",
      "API route list",
      "Support checklist",
      "Release note timeline"
    ],
    backend: [
      "Health endpoints and environment metadata.",
      "Version/build information surfaced to the UI.",
      "Optional support log capture.",
      "Knowledge article reuse from the library module."
    ],
    ctas: [
      { view: "settings", label: "Open settings" },
      { view: "dashboard", label: "Return to dashboard" }
    ]
  }
};

const dataBackedViews = navItems.filter((item) => item.dataBacked).map((item) => item.id);
const collectionViews = ["captures", "projects", "trips", "productions", "expenses", "people", "reminders", "documents", "ideas", "knowledge", "invoices", "payments"];

const recordTemplates = {
  projects: {
    label: "Project",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "projectType", label: "Project type", type: "text", placeholder: "Series, campaign, client shoot" },
      { name: "status", label: "Status", type: "select", options: ["Planning", "Active", "Soft Close", "Final Close"] },
      { name: "plannedStart", label: "Planned start", type: "date" },
      { name: "plannedEnd", label: "Planned end", type: "date" },
      { name: "commercialObjective", label: "Commercial objective", type: "textarea", required: true, full: true },
      { name: "revenueOutcome", label: "Revenue outcome", type: "textarea", full: true }
    ]
  },
  trips: {
    label: "Trip",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "tripType", label: "Trip type", type: "select", options: ["Work", "Mixed", "International", "Major"] },
      { name: "linkedProjectId", label: "Project ID", type: "text", placeholder: "project-1" },
      { name: "purpose", label: "Business purpose", type: "textarea", required: true, full: true },
      { name: "originSummary", label: "Origin", type: "text" },
      { name: "destinationSummary", label: "Destination", type: "text" },
      { name: "startDate", label: "Start date", type: "date" },
      { name: "endDate", label: "End date", type: "date" }
    ]
  },
  productions: {
    label: "Production",
    fields: [
      { name: "title", label: "Working title", type: "text", required: true },
      { name: "contentType", label: "Format", type: "text" },
      { name: "linkedProjectId", label: "Project ID", type: "text", placeholder: "project-1" },
      { name: "platformIntent", label: "Platform intent", type: "text", required: true },
      { name: "shootDate", label: "Shoot date", type: "date" },
      { name: "location", label: "Location", type: "text", required: true },
      { name: "businessPurpose", label: "Business purpose", type: "textarea", required: true, full: true }
    ]
  },
  expenses: {
    label: "Expense",
    fields: [
      { name: "title", label: "Expense title", type: "text", required: true },
      { name: "category", label: "Category", type: "select", options: ["Travel", "Meals", "Equipment", "Production", "Capital Asset", "Fuel"] },
      { name: "linkedProjectId", label: "Project ID", type: "text", placeholder: "project-1" },
      { name: "amount", label: "Amount", type: "number", required: true },
      { name: "expenseDate", label: "Expense date", type: "date" },
      { name: "businessPurpose", label: "Business purpose", type: "textarea", required: true, full: true },
      { name: "contentConnection", label: "Content connection", type: "text" }
    ]
  },
  people: {
    label: "Person",
    fields: [
      { name: "fullName", label: "Full name", type: "text", required: true },
      { name: "personType", label: "Person type", type: "select", options: ["Client", "Editor", "Photographer", "Assistant", "Model", "Contractor"] },
      { name: "roleSummary", label: "Role summary", type: "textarea", required: true, full: true },
      { name: "agreementOnFile", label: "Agreement on file", type: "select", options: ["Yes", "No"] },
      { name: "marketRateJustified", label: "Market rate justified", type: "select", options: ["Yes", "No"] }
    ]
  },
  reminders: {
    label: "Reminder",
    fields: [
      { name: "title", label: "Reminder title", type: "text", required: true },
      { name: "linkedType", label: "Linked entity type", type: "select", options: ["Project", "Trip", "Production", "Expense", "Person", "General"] },
      { name: "dueDate", label: "Due date", type: "date", required: true },
      { name: "severity", label: "Severity", type: "select", options: ["Low", "Medium", "High"] },
      { name: "note", label: "Note", type: "textarea", full: true }
    ]
  },
  documents: {
    label: "Document",
    fields: [
      { name: "fileName", label: "File name", type: "text", required: true },
      { name: "documentType", label: "Document type", type: "select", options: ["Evidence", "Receipt", "Brief", "Agreement", "Deliverable", "Invoice", "Payment Proof", "Update Note"] },
      { name: "linkedType", label: "Linked entity type", type: "select", options: ["Project", "Trip", "Production", "Expense", "Person", "Reminder", "Invoice", "Payment"] },
      { name: "linkedId", label: "Linked record ID", type: "text", required: true, placeholder: "project-1, expense-2..." },
      { name: "mimeType", label: "MIME type", type: "text", placeholder: "application/pdf or image/jpeg" },
      { name: "storagePath", label: "Storage path", type: "text", required: true, placeholder: "workspace/ws-1/..." },
      { name: "status", label: "Status", type: "select", options: ["Linked", "Needs review", "Pending signature", "Archived"] },
      { name: "note", label: "Evidence note", type: "textarea", full: true }
    ]
  },
  ideas: {
    label: "Idea",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "summary", label: "Summary", type: "textarea", required: true, full: true },
      { name: "status", label: "Status", type: "select", options: ["Captured", "Developing", "Promoted"] },
      { name: "hook", label: "Hook", type: "text" },
      { name: "platformFit", label: "Platform fit", type: "text" },
      { name: "commercialAngle", label: "Commercial angle", type: "textarea", full: true },
      { name: "tags", label: "Tags", type: "text", placeholder: "travel, legal, sponsor" }
    ]
  },
  knowledge: {
    label: "Library Note",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "summary", label: "Summary", type: "textarea", required: true, full: true },
      { name: "category", label: "Category", type: "select", options: ["Reference", "Checklist", "Process", "Research"] },
      { name: "content", label: "Full note", type: "textarea", full: true },
      { name: "linkedType", label: "Linked entity type", type: "select", options: ["", "Project", "Person", "Invoice", "Document"] },
      { name: "linkedId", label: "Linked record", type: "text", placeholder: "Optional linked record id" },
      { name: "tags", label: "Tags", type: "text", placeholder: "tax, canada, sponsor" }
    ]
  },
  invoices: {
    label: "Invoice",
    fields: [
      { name: "invoiceNumber", label: "Invoice number", type: "text", required: true },
      { name: "direction", label: "Direction", type: "select", options: ["Outbound", "Inbound"] },
      { name: "status", label: "Status", type: "select", options: ["Draft", "Sent", "Paid", "Collected", "Overdue"] },
      { name: "projectId", label: "Project ID", type: "text", placeholder: "project-1" },
      { name: "personId", label: "Person ID", type: "text", placeholder: "person-2" },
      { name: "issueDate", label: "Issue date", type: "date" },
      { name: "dueDate", label: "Due date", type: "date" },
      { name: "totalAmount", label: "Total amount", type: "number", required: true },
      { name: "note", label: "Note", type: "textarea", full: true }
    ]
  },
  payments: {
    label: "Payment",
    fields: [
      { name: "invoiceId", label: "Invoice ID", type: "text", required: true, placeholder: "invoice-1" },
      { name: "amount", label: "Amount", type: "number", required: true },
      { name: "paidAt", label: "Paid at", type: "date" },
      { name: "method", label: "Method", type: "text", placeholder: "Bank transfer, card, wire" },
      { name: "proofDocumentId", label: "Proof document ID", type: "text", placeholder: "document-5" },
      { name: "note", label: "Note", type: "textarea", full: true }
    ]
  }
};

const state = {
  session: null,
  workspace: null,
  dashboard: null,
  collections: {
    captures: [],
    projects: [],
    trips: [],
    productions: [],
    expenses: [],
    people: [],
    reminders: [],
    documents: [],
    ideas: [],
    knowledge: [],
    invoices: [],
    payments: []
  },
  searchResults: [],
  projectActivities: {}
};

const ui = {
  currentView: "dashboard",
  searchQuery: "",
  selectedIds: Object.fromEntries(collectionViews.map((view) => [view, ""])),
  flashMessage: "",
  editingView: "",
  editingId: "",
  lastAppliedCaptureId: "",
  projectTimelineFilter: "all",
  selectedWorkRef: "",
  selectedNotesRef: "",
  searchLoading: false,
  searchError: "",
  searchFilters: {
    resource: "",
    projectId: "",
    personId: "",
    hasBlocker: false,
    hasDocument: false
  },
  authMode: "login"
};

let searchRequestToken = 0;

const navEl = document.querySelector("#nav");
const heroEl = document.querySelector("#hero");
const contentEl = document.querySelector("#content");
const workspaceChipEl = document.querySelector("#workspaceChip");
const dateChipEl = document.querySelector("#dateChip");
const sectionTitleEl = document.querySelector("#sectionTitle");
const sectionEyebrowEl = document.querySelector("#sectionEyebrow");
const profileAvatarEl = document.querySelector("#profileAvatar");
const profileNameEl = document.querySelector("#profileName");
const profileRoleEl = document.querySelector("#profileRole");
const quickAddModal = document.querySelector("#quickAddModal");
const assistantCaptureModal = document.querySelector("#assistantCaptureModal");
const questionnaireModal = document.querySelector("#questionnaireModal");
const notificationsModal = document.querySelector("#notificationsModal");
const documentUploadModal = document.querySelector("#documentUploadModal");
const assistantCaptureForm = document.querySelector("#assistantCaptureForm");
const notificationsForm = document.querySelector("#notificationsForm");
const recordTypeEl = document.querySelector("#recordType");
const dynamicFieldsEl = document.querySelector("#dynamicFields");
const quickAddForm = document.querySelector("#quickAddForm");
const assistantCaptureTypeEl = document.querySelector("#assistantCaptureType");
const assistantProjectIdEl = document.querySelector("#assistantProjectId");
const assistantTitleEl = document.querySelector("#assistantTitle");
const assistantDateEl = document.querySelector("#assistantDate");
const assistantAmountEl = document.querySelector("#assistantAmount");
const assistantCategoryEl = document.querySelector("#assistantCategory");
const assistantAllocationEl = document.querySelector("#assistantAllocation");
const assistantSummaryEl = document.querySelector("#assistantSummary");
const assistantFileEl = document.querySelector("#assistantFile");
const assistantHintEl = document.querySelector("#assistantHint");
const assistantAmountFieldEl = document.querySelector("#assistantAmountField");
const assistantCategoryFieldEl = document.querySelector("#assistantCategoryField");
const assistantAllocationFieldEl = document.querySelector("#assistantAllocationField");
const assistantOpenAdvancedButton = document.querySelector("#assistantOpenAdvanced");
const documentUploadForm = document.querySelector("#documentUploadForm");
const documentFileEl = document.querySelector("#documentFile");
const documentTypeEl = document.querySelector("#documentType");
const documentLinkedTypeEl = document.querySelector("#documentLinkedType");
const documentLinkedIdEl = document.querySelector("#documentLinkedId");
const documentStatusEl = document.querySelector("#documentStatus");
const documentNoteEl = document.querySelector("#documentNote");
const openQuickAddButton = document.querySelector("#openQuickAdd");
const openQuickAddHeaderButton = document.querySelector("#openQuickAddHeader");
const openSettingsViewButton = document.querySelector("#openSettingsView");
const openSupportViewButton = document.querySelector("#openSupportView");
const openRemindersViewButton = document.querySelector("#openRemindersView");
const openDashboardViewButton = document.querySelector("#openDashboardView");
const logoutButton = document.querySelector("#logoutButton");
const globalSearchInput = document.querySelector("#globalSearch");
const topLinkButtons = document.querySelectorAll("[data-view-target]");
const notificationsSummaryEl = document.querySelector("#notificationsSummary");
const notificationsListEl = document.querySelector("#notificationsList");
const openRemindersWorkspaceButton = document.querySelector("#openRemindersWorkspace");
const createAllSuggestedRemindersButton = document.querySelector("#createAllSuggestedReminders");
const questionnaireForm = document.querySelector("#questionnaireForm");
const questionnaireEyebrowEl = document.querySelector("#questionnaireEyebrow");
const questionnaireTitleEl = document.querySelector("#questionnaireTitle");
const questionnaireDescriptionEl = document.querySelector("#questionnaireDescription");
const questionnaireMetaEl = document.querySelector("#questionnaireMeta");
const questionnaireFieldsEl = document.querySelector("#questionnaireFields");

const questionnaireState = {
  resourceName: "",
  entityId: "",
  stage: "",
  questions: []
};

const reportState = {
  selectedKey: ""
};

bootstrap().catch((error) => {
  renderFatalState(error.message);
});

async function bootstrap() {
  renderRecordTypeOptions();
  renderDynamicFields("projects");
  bindGlobalEvents();
  const session = await loadAuthSession();
  if (!session?.authenticated) {
    renderAuthScreen();
    return;
  }

  state.session = session;
  await loadBootstrapData();
  renderNav();
  renderView();
}

function bindGlobalEvents() {
  openQuickAddButton.addEventListener("click", () => openAssistantCapture());
  openQuickAddHeaderButton.addEventListener("click", () => openAssistantCapture());
  openSettingsViewButton.addEventListener("click", () => setView("settings"));
  openSupportViewButton.addEventListener("click", () => setView("support"));
  openRemindersViewButton.addEventListener("click", () => openNotificationsModal());
  openDashboardViewButton.addEventListener("click", () => setView("dashboard"));
  logoutButton?.addEventListener("click", handleLogout);
  recordTypeEl.addEventListener("change", (event) => renderDynamicFields(event.target.value));
  assistantCaptureTypeEl.addEventListener("change", updateAssistantCaptureForm);
  assistantProjectIdEl.addEventListener("change", updateAssistantCaptureHint);
  assistantSummaryEl.addEventListener("input", updateAssistantCaptureHint);
  assistantCaptureForm.addEventListener("submit", handleAssistantCaptureSubmit);
  assistantOpenAdvancedButton.addEventListener("click", openAdvancedFormFromAssistant);
  quickAddForm.addEventListener("submit", handleQuickAddSubmit);
  documentUploadForm.addEventListener("submit", handleDocumentUploadSubmit);
  documentLinkedTypeEl.addEventListener("change", () => renderDocumentLinkedRecordOptions());
  questionnaireForm.addEventListener("submit", handleQuestionnaireSubmit);
  openRemindersWorkspaceButton?.addEventListener("click", () => {
    notificationsModal.close();
    setView("reminders");
  });
  createAllSuggestedRemindersButton?.addEventListener("click", syncSuggestedReminders);
  globalSearchInput.addEventListener("input", async (event) => {
    await handleGlobalSearchInput(event.target.value);
  });

  topLinkButtons.forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.viewTarget));
  });
}

async function loadBootstrapData() {
  const payload = await apiFetch("/api/bootstrap");
  document.body.classList.remove("auth-mode");
  state.session = state.session || { authenticated: true, user: payload.viewer, workspace: payload.workspace };
  state.workspace = payload.workspace;
  state.dashboard = payload.dashboard;
  state.collections = payload.collections;
  state.searchResults = [];
  state.projectActivities = {};
  ui.searchError = "";

  for (const view of collectionViews) {
    const current = ui.selectedIds[view];
    ui.selectedIds[view] = state.collections[view].some((item) => item.id === current) ? current : state.collections[view][0]?.id || "";
  }

  renderAssistantProjectOptions();
  renderDocumentLinkedRecordOptions();
  workspaceChipEl.textContent = `${state.workspace.name} | ${state.workspace.defaultCurrency}`;
  dateChipEl.textContent = new Intl.DateTimeFormat("en-CA", { dateStyle: "full" }).format(new Date());
  renderProfileChip();
}

function setView(view) {
  ui.currentView = view;
  if (ui.searchQuery) {
    ui.searchQuery = "";
    ui.searchLoading = false;
    ui.searchError = "";
    state.searchResults = [];
    if (globalSearchInput) {
      globalSearchInput.value = "";
    }
  }
  if (view !== "dashboard") {
    ui.flashMessage = "";
  }
  renderNav();
  renderView();
}

async function handleGlobalSearchInput(rawValue) {
  ui.searchQuery = String(rawValue || "").trim().toLowerCase();
  ui.searchError = "";

  if (!ui.searchQuery) {
    ui.searchLoading = false;
    state.searchResults = [];
    renderView();
    return;
  }

  ui.searchLoading = true;
  renderView();
  await performWorkspaceSearch();
}

async function performWorkspaceSearch() {
  const token = ++searchRequestToken;
  const params = new URLSearchParams();
  params.set("q", ui.searchQuery);

  for (const [key, value] of Object.entries(ui.searchFilters)) {
    if (value === true) {
      params.set(key, "true");
    } else if (value) {
      params.set(key, String(value));
    }
  }

  try {
    const payload = await apiFetch(`/api/search?${params.toString()}`);
    if (token !== searchRequestToken) {
      return;
    }

    state.searchResults = payload.results || [];
    ui.searchLoading = false;
    ui.searchError = "";
    renderView();
  } catch (error) {
    if (token !== searchRequestToken) {
      return;
    }

    state.searchResults = [];
    ui.searchLoading = false;
    ui.searchError = error.message;
    renderView();
  }
}

async function applySearchPreset(preset) {
  ui.searchFilters = {
    resource: "",
    projectId: "",
    personId: "",
    hasBlocker: false,
    hasDocument: false
  };

  const currentProjectId = currentProjectContextId();
  const currentPersonId = ui.currentView === "people" ? ui.selectedIds.people : "";

  if (preset === "project" && currentProjectId) {
    ui.searchFilters.projectId = currentProjectId;
  }

  if (preset === "person" && currentPersonId) {
    ui.searchFilters.personId = currentPersonId;
  }

  if (preset === "missing-proof") {
    ui.searchFilters.hasBlocker = true;
  }

  if (preset === "receipts") {
    ui.searchFilters.resource = "documents";
    ui.searchFilters.projectId = currentProjectId;
  }

  if (!ui.searchQuery) {
    renderView();
    return;
  }

  ui.searchLoading = true;
  renderView();
  await performWorkspaceSearch();
}

function openQuickAddForCurrentView() {
  const defaultView = ui.currentView === "billing" ? "invoices" : recordTemplates[ui.currentView] ? ui.currentView : "projects";
  openQuickAddForType(defaultView);
}

function openQuickAddForType(type, preset = {}) {
  recordTypeEl.value = type;
  renderDynamicFields(type);

  for (const [name, value] of Object.entries(preset)) {
    const field = dynamicFieldsEl.querySelector(`[name="${name}"]`);
    if (field) {
      field.value = value;
    }
  }

  quickAddModal.showModal();
}

function openDocumentUploadModal(preset = {}) {
  renderDocumentLinkedRecordOptions(preset.linkedType, preset.linkedId);

  if (preset.documentType) {
    documentTypeEl.value = preset.documentType;
  }

  if (preset.linkedType) {
    documentLinkedTypeEl.value = preset.linkedType;
    renderDocumentLinkedRecordOptions(preset.linkedType, preset.linkedId);
  }

  if (preset.linkedId) {
    documentLinkedIdEl.value = preset.linkedId;
  }

  if (preset.status) {
    documentStatusEl.value = preset.status;
  }

  if (preset.note) {
    documentNoteEl.value = preset.note;
  }

  documentUploadModal.showModal();
}

function renderDocumentLinkedRecordOptions(linkedType = documentLinkedTypeEl.value, selectedId = documentLinkedIdEl.value) {
  const resourceName = relationResourceForLinkedType(linkedType || "Project");
  const collection = state.collections[resourceName] || [];
  documentLinkedIdEl.innerHTML = ['<option value="">Choose record</option>']
    .concat(collection.map((item) => `<option value="${item.id}">${escapeHtml(primaryLabel(resourceName, item))}</option>`))
    .join("");

  if (selectedId && collection.some((item) => item.id === selectedId)) {
    documentLinkedIdEl.value = selectedId;
  } else if (collection[0]) {
    documentLinkedIdEl.value = collection[0].id;
  }
}

function openAssistantCapture(preset = {}) {
  assistantCaptureForm.reset();
  assistantDateEl.value = new Date().toISOString().slice(0, 10);
  renderAssistantProjectOptions(preset.projectId || "");

  if (preset.captureType) {
    assistantCaptureTypeEl.value = preset.captureType;
  }

  if (preset.projectId) {
    assistantProjectIdEl.value = preset.projectId;
  }

  if (preset.title) {
    assistantTitleEl.value = preset.title;
  }

  if (preset.summary) {
    assistantSummaryEl.value = preset.summary;
  }

  if (preset.amount != null) {
    assistantAmountEl.value = String(preset.amount);
  }

  if (preset.category) {
    assistantCategoryEl.value = preset.category;
  }

  if (preset.date) {
    assistantDateEl.value = preset.date;
  }

  updateAssistantCaptureForm();
  assistantCaptureModal.showModal();
}

function renderAssistantProjectOptions(selectedId = "") {
  const suggested = suggestProjectIdForText(assistantSummaryEl?.value || "");
  const options = ['<option value="">Let the app suggest</option>']
    .concat(
      state.collections.projects.map((project) => {
        const selected = (selectedId || assistantProjectIdEl?.value || "") === project.id ? "selected" : "";
        const hint = project.closureStatus === "Final Close" ? "archived" : project.status.toLowerCase();
        return `<option value="${project.id}" ${selected}>${escapeHtml(project.title)} (${hint})</option>`;
      })
    )
    .join("");

  assistantProjectIdEl.innerHTML = options;

  if (!assistantProjectIdEl.value && selectedId) {
    assistantProjectIdEl.value = selectedId;
  }

  if (!assistantProjectIdEl.value && suggested) {
    assistantProjectIdEl.value = suggested;
  }
}

function updateAssistantCaptureForm() {
  const type = assistantCaptureTypeEl.value;
  const showExpenseFields = type === "expense";

  assistantAmountFieldEl.hidden = !showExpenseFields;
  assistantCategoryFieldEl.hidden = !showExpenseFields;
  assistantAllocationFieldEl.hidden = !showExpenseFields;

  const projectRequired = type === "update";
  assistantProjectIdEl.required = projectRequired;

  updateAssistantCaptureHint();
}

function updateAssistantCaptureHint() {
  const type = assistantCaptureTypeEl.value;
  const manualProject = assistantProjectIdEl.value;
  const suggestedProjectId = suggestProjectIdForText(assistantSummaryEl.value);
  const effectiveProjectId = manualProject || suggestedProjectId;
  const project = state.collections.projects.find((item) => item.id === effectiveProjectId);
  const modeCopy = {
    expense: "The app will save this to the inbox, look for money details, and prepare an expense with linked proof.",
    update: "The app will save this to the inbox and suggest where this note belongs in your project trail.",
    project: "The app will save this to the inbox and help shape it into a new project record.",
    idea: "The app will save this as a lightweight idea first, so you do not need to commit to a full project yet.",
    knowledge: "The app will save this as a reusable library note or checklist that you can link later if needed.",
    proof: "The app will save this to the inbox and suggest where the file belongs in your evidence trail."
  };

  assistantHintEl.innerHTML = `
    <strong>${modeCopy[type]}</strong>
    <p>${project ? `Suggested project: ${escapeHtml(project.title)}.` : "You can leave project blank. The app will use your current context and active work to make a suggestion."}</p>
  `;
}

function updateHomeCaptureHint() {
  const hintEl = document.querySelector("#homeCaptureHint");
  const summaryEl = document.querySelector("#homeCaptureSummary");
  const typeEl = document.querySelector("#homeCaptureType");
  const projectEl = document.querySelector("#homeCaptureProject");

  if (!hintEl || !summaryEl || !typeEl || !projectEl) {
    return;
  }

  const summary = summaryEl.value.trim();
  const type = typeEl.value;
  const projectId = projectEl.value || suggestProjectIdForText(summary);
  const project = state.collections.projects.find((item) => item.id === projectId);
  const destination = {
    expense: "an expense with proof",
    update: "a project update or note",
    project: "a new project",
    idea: "an idea you can promote later",
    knowledge: "a library note you can retrieve later",
    proof: "an evidence item"
  }[type] || "the inbox";

  hintEl.innerHTML = `
    <strong>What happens next</strong>
    <p>The app will save your note to the inbox first, then suggest <strong>${escapeHtml(destination)}</strong>${project ? ` for <strong>${escapeHtml(project.title)}</strong>` : ""}.</p>
    <p>${summary ? `You can keep this short. The system will preserve the original wording: "${escapeHtml(clipLabel(summary, summary))}"` : "You do not need to fill every field. A sentence or two is enough to get started."}</p>
  `;
}

function openAdvancedFormFromAssistant() {
  const projectId = assistantProjectIdEl.value || suggestProjectIdForText(assistantSummaryEl.value);
  const captureType = assistantCaptureTypeEl.value;

  assistantCaptureModal.close();

  if (captureType === "update" || captureType === "proof") {
    openDocumentUploadModal({
      documentType: captureType === "update" ? "Update Note" : "Evidence",
      linkedType: "Project",
      linkedId: projectId,
      note: assistantSummaryEl.value.trim()
    });
    return;
  }

  const quickAddTypeMap = {
    expense: "expenses",
    project: "projects",
    idea: "ideas",
    knowledge: "knowledge"
  };

  const targetType = quickAddTypeMap[captureType] || "projects";
  const preset = projectId && ["expenses", "knowledge"].includes(targetType)
    ? targetType === "expenses"
      ? { linkedProjectId: projectId }
      : { linkedType: "Project", linkedId: projectId }
    : {};

  openQuickAddForType(targetType, preset);
}

function renderFatalState(message) {
  document.body.classList.remove("auth-mode");
  heroEl.innerHTML = "";
  contentEl.innerHTML = `
    <section class="panel">
      <div class="empty-state">
        <p>Could not load the application.</p>
        <p>${escapeHtml(message)}</p>
      </div>
    </section>
  `;
}

async function loadAuthSession() {
  const response = await fetch("/api/auth/session");
  const payload = await response.json();
  return payload;
}

function renderAuthScreen(message = "") {
  document.body.classList.add("auth-mode");
  sectionTitleEl.textContent = "Sign in";
  sectionEyebrowEl.textContent = "Private workspace";
  navEl.innerHTML = "";
  heroEl.innerHTML = `
    <section class="panel auth-panel">
      <div class="panel-header">
        <div>
          <p class="eyebrow">Private access</p>
          <h3>Each user gets an independent workspace and separate records.</h3>
        </div>
      </div>
      <p class="placeholder-copy">Sign in to continue, or create a new workspace if this is your first time using the app.</p>
    </section>
  `;
  contentEl.innerHTML = `
    <section class="panel auth-panel">
      <div class="panel-header">
        <div>
          <p class="eyebrow">${ui.authMode === "register" ? "Create account" : "Sign in"}</p>
          <h3>${ui.authMode === "register" ? "Start your own workspace" : "Welcome back"}</h3>
        </div>
        <button class="pill-button" type="button" id="toggleAuthMode">${ui.authMode === "register" ? "Have an account?" : "New here?"}</button>
      </div>
      ${message ? `<div class="assistant-hint"><p>${escapeHtml(message)}</p></div>` : ""}
      <form id="authForm" class="home-capture-form">
        <div class="field-grid">
          ${ui.authMode === "register" ? `
            <label class="field">
              <span>Your name</span>
              <input name="fullName" type="text" placeholder="Alex River" required />
            </label>
            <label class="field">
              <span>Workspace name</span>
              <input name="workspaceName" type="text" placeholder="Northbound Studio" required />
            </label>
          ` : ""}
          <label class="field">
            <span>Email</span>
            <input name="email" type="email" placeholder="you@example.com" required />
          </label>
          <label class="field">
            <span>Password</span>
            <input name="password" type="password" placeholder="At least 8 characters" required />
          </label>
        </div>
        <div class="detail-actions">
          <button class="primary-button" type="submit">${ui.authMode === "register" ? "Create workspace" : "Sign in"}</button>
        </div>
      </form>
    </section>
  `;

  document.querySelector("#toggleAuthMode")?.addEventListener("click", () => {
    ui.authMode = ui.authMode === "register" ? "login" : "register";
    renderAuthScreen();
  });

  document.querySelector("#authForm")?.addEventListener("submit", handleAuthSubmit);
  renderAuxiliaryNavigationState();
}

async function handleAuthSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const payload = Object.fromEntries(formData.entries());
  const url = ui.authMode === "register" ? "/api/auth/register" : "/api/auth/login";

  try {
    const session = await apiFetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    document.body.classList.remove("auth-mode");
    state.session = session;
    await loadBootstrapData();
    renderNav();
    renderView();
  } catch (error) {
    renderAuthScreen(error.message);
  }
}

async function handleLogout() {
  try {
    await fetch("/api/auth/logout", {
      method: "POST"
    });
  } finally {
    state.session = null;
    state.workspace = null;
    renderAuthScreen("Signed out.");
  }
}

function renderProfileChip() {
  if (!state.session?.user) {
    return;
  }

  const initials = state.session.user.fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || state.session.user.email.slice(0, 2).toUpperCase();

  profileAvatarEl.textContent = initials;
  profileNameEl.textContent = state.session.user.fullName || state.session.user.email;
  profileRoleEl.textContent = state.workspace?.name || state.session.user.role;
}

function renderNav() {
  if (!state.session?.authenticated) {
    navEl.innerHTML = "";
    renderAuxiliaryNavigationState();
    return;
  }

  const primaryItems = navItems.filter((item) => item.priority !== "secondary");
  const secondaryItems = navItems.filter((item) => item.priority === "secondary");
  navEl.innerHTML = [renderNavGroup("Main", primaryItems), renderNavGroup("More", secondaryItems)].join("");

  document.querySelectorAll("[data-nav-view]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.navView));
  });

  renderAuxiliaryNavigationState();
}

function renderNavGroup(label, items) {
  if (!items.length) {
    return "";
  }

  const showCounts = label === "Main";

  return `
    <section class="nav-group">
      <p class="nav-section-label">${label}</p>
      ${items
        .map(
          (item) => `
            <button class="nav-button${ui.currentView === item.id ? " active" : ""}" type="button" data-nav-view="${item.id}">
              <span class="nav-main">
                <span class="material-symbols-outlined nav-icon">${item.icon}</span>
                <span class="nav-label">
                  <strong>${item.label}</strong>
                  <span>${item.description}</span>
                </span>
              </span>
              ${showCounts ? `<span class="nav-count">${navCount(item.id)}</span>` : ""}
            </button>
          `
        )
        .join("")}
    </section>
  `;
}

function renderAuxiliaryNavigationState() {
  for (const utility of utilityViews) {
    const button = utility.id === "settings" ? openSettingsViewButton : openSupportViewButton;
    button.classList.toggle("active", ui.currentView === utility.id);
  }

  topLinkButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.viewTarget === ui.currentView);
  });

  openRemindersViewButton.classList.toggle("active", ui.currentView === "reminders");
  openDashboardViewButton.classList.toggle("active", ui.currentView === "dashboard");
}

function navCount(view) {
  if (view === "dashboard") {
    return state.dashboard?.openItems || 0;
  }

  if (view === "work") {
    return (state.collections.trips?.length || 0) + (state.collections.productions?.length || 0);
  }

  if (view === "notesHub") {
    return (state.collections.ideas?.length || 0) + (state.collections.knowledge?.length || 0);
  }

  if (view === "billing") {
    return state.collections.invoices.length;
  }

  if (view === "reports") {
    return buildReportIndex().length;
  }

  if (state.collections[view]) {
    return state.collections[view].length;
  }

  return moduleBlueprints[view]?.navBadge || "Soon";
}

function renderView() {
  if (!state.session?.authenticated) {
    renderAuthScreen();
    return;
  }

  document.body.classList.remove("auth-mode");

  const current = [...navItems, ...utilityViews].find((item) => item.id === ui.currentView);
  sectionTitleEl.textContent = current?.label || "Dashboard";
  sectionEyebrowEl.textContent = sectionEyebrowForView(ui.currentView);

  if (ui.searchQuery) {
    sectionTitleEl.textContent = "Search";
    sectionEyebrowEl.textContent = "Retrieve anything across your workspace";
    renderGlobalSearchResults();
    return;
  }

  if (ui.currentView === "dashboard") {
    renderDashboard();
    return;
  }

  if (ui.currentView === "billing") {
    renderBillingSection();
    return;
  }

  if (ui.currentView === "work") {
    renderWorkSection();
    return;
  }

  if (ui.currentView === "notesHub") {
    renderNotesHubSection();
    return;
  }

  if (ui.currentView === "captures") {
    renderCaptureInboxSection();
    return;
  }

  if (ui.currentView === "reports") {
    renderReportsSection();
    return;
  }

  if (state.collections[ui.currentView]) {
    renderEntitySection(ui.currentView);
    return;
  }

  renderBlueprintSection(ui.currentView);
}

function sectionEyebrowForView(view) {
  if (view === "dashboard") return "Assistant Workspace";
  if (view === "work") return "Daily Work";
  if (view === "notesHub") return "Ideas And Notes";
  return moduleBlueprints[view]?.eyebrow || "Keep records simple";
}

function renderDashboard() {
  const overview = state.dashboard;
  const activeProjects = state.collections.projects.filter((project) => !String(project.closureStatus || "").toLowerCase().includes("final"));
  const selectedProject = activeProjects.find((project) => project.id === ui.selectedIds.projects) || activeProjects[0] || state.collections.projects[0];
  const recentActivity = buildRecentActivity().slice(0, 5);
  const inboxWaiting = state.collections.captures.filter((capture) => capture.status !== "applied").length;
  const unresolvedItems = overview.focusItems.length;
  const linkedExpenseCount = Array.isArray(selectedProject?.linkedExpenseIds) ? selectedProject.linkedExpenseIds.length : 0;
  const linkedProjectDocuments = selectedProject ? getLinkedDocumentsForEntity("projects", selectedProject.id) : [];
  const suggestedHomeProjectId = selectedProject?.id || suggestProjectIdForText("") || "";
  const homeProjectOptions = ['<option value="">Let the app suggest</option>']
    .concat(
      activeProjects.map((project) => `<option value="${project.id}" ${project.id === suggestedHomeProjectId ? "selected" : ""}>${escapeHtml(project.title)}</option>`)
    )
    .join("");
  const homeDestinations = [
    {
      view: "captures",
      title: "Inbox",
      summary: "Review things that still need confirmation or filing.",
      meta: `${inboxWaiting} waiting`
    },
    {
      view: "projects",
      title: "Projects",
      summary: "Open dossiers, move work forward, and keep the paper trail connected.",
      meta: `${state.collections.projects.length} total`
    },
    {
      view: "work",
      title: "Work",
      summary: "Trips, shoots, studio sessions, and day-to-day production logs.",
      meta: `${state.collections.trips.length + state.collections.productions.length} records`
    },
    {
      view: "billing",
      title: "Money",
      summary: "Expenses, invoices, payments, and the money side of the business.",
      meta: `${state.collections.expenses.length + state.collections.invoices.length + state.collections.payments.length} records`
    },
    {
      view: "documents",
      title: "Files",
      summary: "Receipts, contracts, proofs, and the evidence library.",
      meta: `${state.collections.documents.length} files`
    },
    {
      view: "notesHub",
      title: "Ideas & Notes",
      summary: "Capture future concepts, research, and reusable notes.",
      meta: `${state.collections.ideas.length + state.collections.knowledge.length} saved`
    }
  ];

  if (selectedProject) {
    ui.selectedIds.projects = selectedProject.id;
  }

  heroEl.innerHTML = `
    <article class="highlight-card hero-capture-card">
      <div class="home-composer-header">
        <div>
          <p class="eyebrow">Home</p>
          <h3>Log something quickly, then let the system organize it.</h3>
        </div>
        <div class="detail-actions">
          <button class="pill-button" type="button" data-dashboard-view="captures">Open inbox</button>
          ${
            selectedProject
              ? `<button class="pill-button" type="button" data-nav-record="projects|${selectedProject.id}">Open current project</button>`
              : `<button class="pill-button" type="button" data-dashboard-capture-type="project">Start first project</button>`
          }
        </div>
      </div>
      <p>Write this the way you would send it to a trusted assistant. A short sentence, a rough caption, or a quick file upload is enough to start the paper trail.</p>
      ${
        ui.flashMessage
          ? `<div class="hero-guidance"><span class="meta-chip">${escapeHtml(ui.flashMessage)}</span></div>`
          : ""
      }
      <form id="homeCaptureForm" class="home-capture-form">
        <div class="quick-choice-row" role="group" aria-label="Choose capture type">
          ${[
            ["expense", "Receipt"],
            ["update", "Update"],
            ["project", "Project"],
            ["idea", "Idea"],
            ["knowledge", "Note"],
            ["proof", "Proof"]
          ]
            .map(
              ([value, label], index) => `
                <button class="pill-button${index === 0 ? " active-filter" : ""}" type="button" data-home-capture-type="${value}">
                  ${label}
                </button>
              `
            )
            .join("")}
        </div>
        <div class="field-grid">
          <label class="field" data-span="full">
            <span>What happened?</span>
            <textarea id="homeCaptureSummary" placeholder="Taxi to studio for the morning shoot. Lunch after client meeting. New docu-series idea about legal systems. Uploading signed location permit." required></textarea>
          </label>
          <label class="field">
            <span>What is it?</span>
            <select id="homeCaptureType">
              <option value="expense">Receipt or expense</option>
              <option value="update">Project update</option>
              <option value="project">New project</option>
              <option value="idea">Idea</option>
              <option value="knowledge">Saved note</option>
              <option value="proof">Proof or file</option>
            </select>
          </label>
          <label class="field">
            <span>Project, if you know it</span>
            <select id="homeCaptureProject">${homeProjectOptions}</select>
          </label>
          <label class="field">
            <span>Short label, if helpful</span>
            <input id="homeCaptureTitle" type="text" placeholder="Studio taxi, Permit upload, New format idea..." />
          </label>
          <label class="field">
            <span>Optional file</span>
            <input id="homeCaptureFile" type="file" />
          </label>
        </div>
        <div class="assistant-hint" id="homeCaptureHint"></div>
        <div class="highlight-actions">
          <button class="primary-button" type="submit">Save to inbox</button>
          <button class="ghost-button" type="button" data-dashboard-capture>Open advanced form</button>
        </div>
      </form>
    </article>
    <article class="metric-card action-card" role="button" tabindex="0" data-nav-record="captures|${pendingCaptureId() || ""}">
      <p class="eyebrow">Inbox waiting</p>
      <strong>${inboxWaiting}</strong>
      <p class="metric-foot">Things you logged that still need review or filing.</p>
      <div class="detail-actions">
        <button class="pill-button" type="button" data-nav-record="captures|${pendingCaptureId() || ""}">Open inbox</button>
      </div>
    </article>
    <article class="metric-card action-card" role="button" tabindex="0" data-nav-record="projects|${selectedProject?.id || ""}">
      <p class="eyebrow">Current project</p>
      <strong>${escapeHtml(selectedProject?.title || "None yet")}</strong>
      <p class="metric-foot">Stay inside one project when possible. It keeps the trail easier to follow.</p>
      <div class="detail-actions">
        <button class="pill-button" type="button" data-nav-record="projects|${selectedProject?.id || ""}">Open project</button>
      </div>
    </article>
    <article class="metric-card action-card" role="button" tabindex="0" data-open-attention>
      <p class="eyebrow">Needs attention</p>
      <strong>${unresolvedItems}</strong>
      <p class="metric-foot">Records with blockers, warnings, or missing proof.</p>
      <div class="detail-actions">
        <button class="pill-button" type="button" data-open-attention>Review issues</button>
      </div>
    </article>
  `;

  heroEl.querySelectorAll("[data-capture-type]").forEach((button) => {
    button.addEventListener("click", () => openAssistantCapture({ captureType: button.dataset.captureType }));
  });
  heroEl.querySelector("[data-dashboard-capture]")?.addEventListener("click", () => openAssistantCapture());
  heroEl.querySelectorAll("[data-dashboard-capture-type]").forEach((button) => {
    button.addEventListener("click", () => openAssistantCapture({ captureType: button.dataset.dashboardCaptureType }));
  });
  heroEl.querySelector("#homeCaptureForm")?.addEventListener("submit", handleHomeCaptureSubmit);
  heroEl.querySelector("#homeCaptureSummary")?.addEventListener("input", updateHomeCaptureHint);
  heroEl.querySelector("#homeCaptureType")?.addEventListener("change", () => {
    heroEl.querySelectorAll("[data-home-capture-type]").forEach((button) => {
      button.classList.toggle("active-filter", button.dataset.homeCaptureType === heroEl.querySelector("#homeCaptureType")?.value);
    });
    updateHomeCaptureHint();
  });
  heroEl.querySelector("#homeCaptureProject")?.addEventListener("change", updateHomeCaptureHint);
  heroEl.querySelectorAll("[data-home-capture-type]").forEach((button) => {
    button.addEventListener("click", () => {
      const typeEl = heroEl.querySelector("#homeCaptureType");
      if (!typeEl) {
        return;
      }

      typeEl.value = button.dataset.homeCaptureType;
      heroEl.querySelectorAll("[data-home-capture-type]").forEach((item) => {
        item.classList.toggle("active-filter", item === button);
      });
      updateHomeCaptureHint();
    });
  });
  updateHomeCaptureHint();

  contentEl.innerHTML = `
    <section class="panel">
      <div class="panel-header">
        <div>
          <p class="eyebrow">Go To</p>
          <h3>Open the place that matches the job</h3>
        </div>
        <span class="meta-chip">Fast navigation</span>
      </div>
      <div class="detail-grid">
        ${homeDestinations
          .map(
            (item) => `
              <article class="detail-card action-card" role="button" tabindex="0" data-dashboard-view="${item.view}">
                <div class="record-topline">
                  <div>
                    <strong>${item.title}</strong>
                    <p>${item.summary}</p>
                  </div>
                  <span class="meta-chip">${item.meta}</span>
                </div>
                <div class="detail-actions">
                  <button class="pill-button" type="button" data-dashboard-view="${item.view}">Open ${item.title}</button>
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
    <section class="panel">
      <div class="panel-header">
        <div>
          <p class="eyebrow">Current Project</p>
          <h3>${selectedProject?.title || "No active project yet"}</h3>
        </div>
        ${selectedProject ? `<span class="status-chip ${statusClass(selectedProject.closureStatus || selectedProject.status)}">${selectedProject.closureStatus || selectedProject.status}</span>` : ""}
      </div>
      ${
        selectedProject
          ? `
            <div class="detail-grid">
              <article class="detail-card">
                <strong>Goal</strong>
                <p>${escapeHtml(selectedProject.commercialObjective || "Add a short objective inside the project dossier so future notes and expenses stay grounded.")}</p>
              </article>
              <article class="detail-card">
                <strong>Money trail</strong>
                <p>${linkedExpenseCount} expenses linked so far.</p>
              </article>
              <article class="detail-card">
                <strong>Evidence trail</strong>
                <p>${linkedProjectDocuments.length} files linked to this project.</p>
              </article>
            </div>
            <div class="detail-actions">
              <button class="pill-button" type="button" data-nav-record="projects|${selectedProject.id}">Open dossier</button>
              <button class="pill-button" type="button" data-dashboard-view="work">Open work log</button>
              <button class="pill-button" type="button" data-dashboard-view="billing">Open money</button>
            </div>
          `
          : `<div class="empty-state"><p>Start a project once you have a clear piece of work to track. After that, keep receipts, updates, files, and billing connected to it over time.</p></div>`
      }
    </section>
    <section class="panel">
      <div class="panel-header">
        <div>
          <p class="eyebrow">Needs Attention</p>
          <h3>Only the few things that still need you</h3>
        </div>
      </div>
      ${
        overview.focusItems.length
          ? `
            <div class="record-list">
              ${(overview.focusItems.slice(0, 3))
                .map(
                  (item) => `
                    <article class="detail-card action-card" role="button" tabindex="0" data-nav-record="${item.resourceName}|${item.id}">
                      <div class="record-topline">
                        <div>
                          <h4 class="record-title">${item.title}</h4>
                          <p>${item.context}</p>
                        </div>
                        <span class="status-chip ${item.tone}">${item.tag}</span>
                      </div>
                      <ul class="issue-list">
                        ${item.issues.map((issue) => `<li>${issue}</li>`).join("")}
                      </ul>
                      <div class="detail-actions">
                        <button class="pill-button" type="button" data-nav-record="${item.resourceName}|${item.id}">Open record</button>
                      </div>
                    </article>
                  `
                )
                .join("")}
            </div>
          `
          : `<div class="empty-state"><p>Nothing urgent right now. Use the dedicated sections when you want to add or organize more detail.</p></div>`
      }
    </section>
    <section class="panel">
      <div class="panel-header">
        <div>
          <p class="eyebrow">Recent Activity</p>
          <h3>What was logged recently</h3>
        </div>
      </div>
      ${
        recentActivity.length
          ? `<div class="record-list">${recentActivity.map((item) => renderRecentActivityCard(item)).join("")}</div>`
          : `<div class="empty-state"><p>No recent activity yet. Start by logging an expense, idea, note, or new project.</p></div>`
      }
    </section>
  `;

  contentEl.querySelectorAll("[data-activity-open]").forEach((button) => {
    button.addEventListener("click", () => {
      openSearchResult(button.dataset.activityResource, button.dataset.activityId);
      renderNav();
      renderView();
    });
  });
  document.querySelectorAll("[data-dashboard-view]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.dashboardView));
  });
  bindActionCards(heroEl);
  bindActionCards(contentEl);
  bindNavigationActionButtons(heroEl);
  bindNavigationActionButtons(contentEl);
  heroEl.querySelectorAll("[data-open-attention]").forEach((button) => {
    button.addEventListener("click", () => openNotificationsModal());
  });
}

function renderBillingSection() {
  const invoices = getFilteredCollection("invoices");
  const payments = getFilteredCollection("payments");
  const selectedInvoice = invoices.find((item) => item.id === ui.selectedIds.invoices) || invoices[0];
  const selectedPayment = payments.find((item) => item.id === ui.selectedIds.payments) || payments[0];
  const summary = buildBillingSummary();

  if (selectedInvoice) {
    ui.selectedIds.invoices = selectedInvoice.id;
  }

  if (selectedPayment) {
    ui.selectedIds.payments = selectedPayment.id;
  }

  heroEl.innerHTML = `
    <article class="highlight-card">
      <div>
        <p class="eyebrow">Billing posture</p>
        <h3>Invoices, payments, and proof documents now live inside the same evidence system as the rest of the app.</h3>
      </div>
      <p>Use Billing to track what has been sent, what has been paid, and whether every money movement is backed by an invoice file or proof document.</p>
      <div class="highlight-actions">
        <button class="pill-button" type="button" data-billing-action="invoice">New invoice</button>
        <button class="pill-button" type="button" data-billing-action="payment">Record payment</button>
        <button class="pill-button" type="button" data-billing-action="upload-invoice">Upload invoice file</button>
      </div>
    </article>
    <article class="metric-card action-card" role="button" tabindex="0" data-nav-record="${firstBillingProofGap()?.resourceName || "billing"}|${firstBillingProofGap()?.id || ""}">
      <p class="eyebrow">Proof gaps</p>
      <strong>${summary.proofGaps}</strong>
      <p class="metric-foot">Invoices or payments still missing supporting files.</p>
      <div class="detail-actions">
        <button class="pill-button" type="button" data-nav-record="${firstBillingProofGap()?.resourceName || "billing"}|${firstBillingProofGap()?.id || ""}">Open proof gap</button>
      </div>
    </article>
    <article class="metric-card action-card" role="button" tabindex="0" data-nav-record="invoices|${selectedInvoice?.id || ""}">
      <p class="eyebrow">Invoices</p>
      <strong>${summary.invoiceCount}</strong>
      <p class="metric-foot">Outbound and inbound commercial records.</p>
      <div class="detail-actions">
        <button class="pill-button" type="button" data-nav-record="invoices|${selectedInvoice?.id || ""}">Open invoice</button>
      </div>
    </article>
    <article class="metric-card action-card" role="button" tabindex="0" data-nav-record="invoices|${firstOutstandingInvoiceId() || selectedInvoice?.id || ""}">
      <p class="eyebrow">Outstanding</p>
      <strong>${currency(summary.outstandingTotal)}</strong>
      <p class="metric-foot">Open receivables and unsettled payables.</p>
      <div class="detail-actions">
        <button class="pill-button" type="button" data-nav-record="invoices|${firstOutstandingInvoiceId() || selectedInvoice?.id || ""}">Review outstanding</button>
      </div>
    </article>
  `;

  contentEl.innerHTML = `
    <section class="panel">
      <div class="panel-header">
        <div>
          <p class="eyebrow">Invoice Register</p>
          <h3>Billing queue</h3>
        </div>
        <div class="detail-actions">
          <button class="ghost-button" type="button" id="billingNewInvoice">New invoice</button>
          <button class="ghost-button" type="button" id="billingRecordPayment">Record payment</button>
        </div>
      </div>
      <div class="record-list">
        ${
          invoices.length
            ? invoices
                .map(
                  (invoice) => `
                    <button class="record-button${invoice.id === selectedInvoice?.id ? " active" : ""}" type="button" data-billing-invoice="${invoice.id}">
                      <div class="record-topline">
                        <div>
                          <h4 class="record-title">${invoice.invoiceNumber}</h4>
                          <p>${invoice.direction} | ${invoiceProjectLabel(invoice)} | due ${invoice.dueDate || "TBD"}</p>
                        </div>
                        <span class="status-chip ${statusClass(invoice.status)}">${invoice.status}</span>
                      </div>
                      <div class="list-meta">
                        <p>${currency(invoice.totalAmount)}</p>
                        <p>${invoiceLinkedDocuments(invoice).length} file(s)</p>
                      </div>
                    </button>
                  `
                )
                .join("")
            : `<div class="empty-state"><p>No invoices yet. Create the first invoice or record a payable.</p></div>`
        }
      </div>
    </section>
    <section class="panel">
      ${selectedInvoice ? renderBillingInvoiceDetail(selectedInvoice, selectedPayment) : `<div class="empty-state"><p>Select an invoice to inspect billing detail, payment state, and linked proof files.</p></div>`}
    </section>
  `;

  document.querySelectorAll("[data-billing-action]").forEach((button) => {
    button.addEventListener("click", () => handleBillingAction(button.dataset.billingAction, selectedInvoice, selectedPayment));
  });

  document.querySelector("#billingNewInvoice")?.addEventListener("click", () => {
    openQuickAddForType("invoices");
  });

  document.querySelector("#billingRecordPayment")?.addEventListener("click", () => {
    openQuickAddForType("payments", selectedInvoice ? { invoiceId: selectedInvoice.id, amount: selectedInvoice.totalAmount } : {});
  });

  document.querySelectorAll("[data-billing-invoice]").forEach((button) => {
    button.addEventListener("click", () => {
      ui.selectedIds.invoices = button.dataset.billingInvoice;
      renderBillingSection();
    });
  });

  document.querySelectorAll("[data-billing-payment]").forEach((button) => {
    button.addEventListener("click", () => {
      ui.selectedIds.payments = button.dataset.billingPayment;
      renderBillingSection();
    });
  });

  document.querySelectorAll("[data-document-open]").forEach((button) => {
    button.addEventListener("click", () => {
      window.open(`/api/documents/${button.dataset.documentOpen}/file`, "_blank", "noopener");
    });
  });

  document.querySelectorAll("[data-document-upload]").forEach((button) => {
    button.addEventListener("click", () => {
      openDocumentUploadModal({
        documentType: button.dataset.documentType || "Evidence",
        linkedType: button.dataset.documentUploadType,
        linkedId: button.dataset.documentUpload
      });
    });
  });
  bindActionCards(heroEl);
  bindActionCards(contentEl);
  bindNavigationActionButtons(heroEl);
  bindNavigationActionButtons(contentEl);
}

function renderWorkSection() {
  const workItems = [
    ...getFilteredCollection("trips").map((record) => ({ resourceName: "trips", record })),
    ...getFilteredCollection("productions").map((record) => ({ resourceName: "productions", record }))
  ].sort((left, right) => new Date(right.record.updatedAt || right.record.createdAt || 0) - new Date(left.record.updatedAt || left.record.createdAt || 0));

  const selectedRef = ui.selectedWorkRef || (workItems[0] ? `${workItems[0].resourceName}|${workItems[0].record.id}` : "");
  const selectedEntry = workItems.find((item) => `${item.resourceName}|${item.record.id}` === selectedRef) || workItems[0] || null;
  const travelCount = workItems.filter((item) => item.resourceName === "trips").length;
  const productionCount = workItems.filter((item) => item.resourceName === "productions").length;
  const unresolvedCount = workItems.filter((item) => item.record.compliance?.blockers?.length).length;
  const currentProjectId = selectedEntry?.record?.linkedProjectId || "";
  const currentProjectTitle = currentProjectId ? projectTitleById(currentProjectId) : "";

  if (selectedEntry) {
    ui.selectedWorkRef = `${selectedEntry.resourceName}|${selectedEntry.record.id}`;
    ui.selectedIds[selectedEntry.resourceName] = selectedEntry.record.id;
  }

  heroEl.innerHTML = `
    <article class="highlight-card">
      <div>
        <p class="eyebrow">Daily work</p>
        <h3>Keep travel, shoots, and work sessions light to record and easy to follow later.</h3>
      </div>
      <p>Use this for client meetings, shoot days, studio sessions, scouting, and travel. The goal is to capture what happened, keep it tied to the right project, and move on quickly.</p>
      <div class="detail-actions">
        <button class="primary-button" type="button" data-work-action="trip">Log travel</button>
        <button class="pill-button" type="button" data-work-action="production">Log shoot or session</button>
        <button class="pill-button" type="button" data-capture-type="update">Quick work note</button>
        ${currentProjectId ? `<button class="pill-button" type="button" data-nav-record="projects|${currentProjectId}">Open ${escapeHtml(currentProjectTitle || "project")}</button>` : ""}
      </div>
    </article>
    <article class="metric-card">
      <p class="eyebrow">Travel and movement</p>
      <strong>${travelCount}</strong>
      <p class="metric-foot">Trips, client travel, meetings, scouting, and location work.</p>
    </article>
    <article class="metric-card">
      <p class="eyebrow">Sessions and shoots</p>
      <strong>${productionCount}</strong>
      <p class="metric-foot">Shoots, studio sessions, edits, and deliverable work.</p>
    </article>
    <article class="metric-card">
      <p class="eyebrow">Needs closure</p>
      <strong>${unresolvedCount}</strong>
      <p class="metric-foot">Work items that still need proof, closure, or one missing detail.</p>
    </article>
  `;

  contentEl.innerHTML = `
    <section class="panel">
      <div class="panel-header">
        <div>
          <p class="eyebrow">Work list</p>
          <h3>Choose what you are continuing</h3>
        </div>
        <div class="detail-actions">
          <button class="ghost-button" type="button" data-work-action="trip">Add trip</button>
          <button class="ghost-button" type="button" data-work-action="production">Add production</button>
        </div>
      </div>
      <div class="record-list">
        ${
          workItems.length
            ? workItems.map((item) => renderCombinedRecordCard(item.resourceName, item.record, selectedEntry && item.resourceName === selectedEntry.resourceName && item.record.id === selectedEntry.record.id)).join("")
            : `<div class="empty-state"><p>No work items yet. Start with a trip, shoot, studio session, or client travel day.</p></div>`
        }
      </div>
    </section>
    <section class="panel">
      ${
        selectedEntry
          ? renderDetailPanel(selectedEntry.resourceName, selectedEntry.record)
          : `<div class="empty-state"><p>Select a trip or production item to see the work trail and next action.</p></div>`
      }
    </section>
  `;

  bindCombinedViewEvents("work", workItems);
  heroEl.querySelectorAll("[data-work-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const type = button.dataset.workAction === "trip" ? "trips" : "productions";
      openQuickAddForType(type);
    });
  });
  heroEl.querySelectorAll("[data-capture-type]").forEach((button) => {
    button.addEventListener("click", () => openAssistantCapture({ captureType: button.dataset.captureType }));
  });
}

function renderNotesHubSection() {
  const noteItems = [
    ...getFilteredCollection("ideas").map((record) => ({ resourceName: "ideas", record })),
    ...getFilteredCollection("knowledge").map((record) => ({ resourceName: "knowledge", record }))
  ].sort((left, right) => new Date(right.record.updatedAt || right.record.createdAt || 0) - new Date(left.record.updatedAt || left.record.createdAt || 0));

  const selectedRef = ui.selectedNotesRef || (noteItems[0] ? `${noteItems[0].resourceName}|${noteItems[0].record.id}` : "");
  const selectedEntry = noteItems.find((item) => `${item.resourceName}|${item.record.id}` === selectedRef) || noteItems[0] || null;
  const ideaCount = noteItems.filter((item) => item.resourceName === "ideas").length;
  const noteCount = noteItems.filter((item) => item.resourceName === "knowledge").length;
  const readyToPromote = noteItems.filter((item) => item.resourceName === "ideas" && !item.record.promotedProjectId).length;
  const selectedState = selectedEntry ? combinedWorkflowState(selectedEntry.resourceName, selectedEntry.record) : null;

  if (selectedEntry) {
    ui.selectedNotesRef = `${selectedEntry.resourceName}|${selectedEntry.record.id}`;
    ui.selectedIds[selectedEntry.resourceName] = selectedEntry.record.id;
  }

  heroEl.innerHTML = `
    <article class="highlight-card">
      <div>
        <p class="eyebrow">Capture and plan</p>
        <h3>Save thoughts lightly now, then shape them only when they become useful.</h3>
      </div>
      <p>Keep concepts, hooks, research, and reusable notes here so they are easy to retrieve later and easy to promote when they turn into real work.</p>
      <div class="detail-actions">
        <button class="primary-button" type="button" data-notes-action="idea">Save idea</button>
        <button class="pill-button" type="button" data-notes-action="knowledge">Save note</button>
        <button class="pill-button" type="button" data-capture-type="idea">Quick idea capture</button>
        ${selectedEntry ? `<button class="pill-button" type="button" data-nav-record="${selectedEntry.resourceName}|${selectedEntry.record.id}">Open selected</button>` : ""}
      </div>
    </article>
    <article class="metric-card">
      <p class="eyebrow">Ideas</p>
      <strong>${ideaCount}</strong>
      <p class="metric-foot">Concepts you may want to turn into work later.</p>
    </article>
    <article class="metric-card">
      <p class="eyebrow">Saved notes</p>
      <strong>${noteCount}</strong>
      <p class="metric-foot">Checklists, references, and reusable notes.</p>
    </article>
    <article class="metric-card">
      <p class="eyebrow">Can become projects</p>
      <strong>${readyToPromote}</strong>
      <p class="metric-foot">Ideas that can be shaped into real projects when you are ready.</p>
    </article>
  `;

  contentEl.innerHTML = `
    <section class="panel">
      <div class="panel-header">
        <div>
          <p class="eyebrow">Idea and note list</p>
          <h3>Everything you want to remember or build later</h3>
        </div>
        <div class="detail-actions">
          <button class="ghost-button" type="button" data-notes-action="idea">Add idea</button>
          <button class="ghost-button" type="button" data-notes-action="knowledge">Add note</button>
        </div>
      </div>
      <div class="record-list">
        ${
          noteItems.length
            ? noteItems.map((item) => renderCombinedRecordCard(item.resourceName, item.record, selectedEntry && item.resourceName === selectedEntry.resourceName && item.record.id === selectedEntry.record.id)).join("")
            : `<div class="empty-state"><p>No ideas or notes yet. Start with a rough thought, checklist, or concept.</p></div>`
        }
      </div>
    </section>
    <section class="panel">
      ${
        selectedEntry
          ? renderDetailPanel(selectedEntry.resourceName, selectedEntry.record)
          : `<div class="empty-state"><p>Select an idea or note to develop it further.</p></div>`
      }
    </section>
  `;

  bindCombinedViewEvents("notesHub", noteItems);
  document.querySelectorAll("[data-notes-action]").forEach((button) => {
    button.addEventListener("click", () => {
      openQuickAddForType(button.dataset.notesAction === "idea" ? "ideas" : "knowledge");
    });
  });
  heroEl.querySelectorAll("[data-capture-type]").forEach((button) => {
    button.addEventListener("click", () => openAssistantCapture({ captureType: button.dataset.captureType }));
  });
}

function renderCombinedRecordCard(resourceName, record, isActive) {
  const workflow = combinedWorkflowState(resourceName, record);
  return `
    <button class="record-button${isActive ? " active" : ""}" type="button" data-combined-record="${resourceName}|${record.id}">
      <div class="record-topline">
        <div>
          <h4 class="record-title">${escapeHtml(primaryLabel(resourceName, record))}</h4>
          <p>${escapeHtml(combinedResourceLabel(resourceName))}</p>
        </div>
        <span class="status-chip ${workflow.tone}">${escapeHtml(workflow.label)}</span>
      </div>
      <p class="list-note">${escapeHtml(simpleRecordHint(resourceName, record))}</p>
      <div class="list-meta">
        <p>${escapeHtml(workflow.hint)}</p>
      </div>
    </button>
  `;
}

function bindCombinedViewEvents(view, items) {
  document.querySelectorAll("[data-combined-record]").forEach((button) => {
    button.addEventListener("click", () => {
      const [resourceName, recordId] = button.dataset.combinedRecord.split("|");
      if (view === "work") {
        ui.selectedWorkRef = `${resourceName}|${recordId}`;
      } else {
        ui.selectedNotesRef = `${resourceName}|${recordId}`;
      }
      ui.selectedIds[resourceName] = recordId;
      if (view === "work") {
        renderWorkSection();
      } else {
        renderNotesHubSection();
      }
    });
  });

  document.querySelectorAll("[data-questionnaire-open]").forEach((button) => {
    button.addEventListener("click", async () => {
      const [resourceName, entityId, stage] = button.dataset.questionnaireOpen.split("|");
      await openQuestionnaire(resourceName, entityId, stage);
    });
  });

  document.querySelectorAll("[data-document-open]").forEach((button) => {
    button.addEventListener("click", () => {
      window.open(`/api/documents/${button.dataset.documentOpen}/file`, "_blank", "noopener");
    });
  });

  document.querySelectorAll("[data-document-upload]").forEach((button) => {
    button.addEventListener("click", () => {
      openDocumentUploadModal({
        documentType: button.dataset.documentType || "Evidence",
        linkedType: button.dataset.documentUploadType,
        linkedId: button.dataset.documentUpload
      });
    });
  });

  document.querySelectorAll("[data-project-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const project = state.collections.projects.find((item) => item.id === button.dataset.projectId);
      if (project) {
        handleProjectAction(button.dataset.projectAction, project);
      }
    });
  });

  document.querySelectorAll("[data-record-edit]").forEach((button) => {
    button.addEventListener("click", () => {
      const match = items.find((item) => item.record.id === button.dataset.recordEdit);
      if (!match) {
        return;
      }
      if (ui.editingView === match.resourceName && ui.editingId === button.dataset.recordEdit) {
        ui.editingView = "";
        ui.editingId = "";
      } else {
        ui.editingView = match.resourceName;
        ui.editingId = button.dataset.recordEdit;
      }

      if (view === "work") {
        renderWorkSection();
      } else {
        renderNotesHubSection();
      }
    });
  });

  document.querySelectorAll("[data-record-save]").forEach((button) => {
    button.addEventListener("click", async () => {
      const match = items.find((item) => item.record.id === button.dataset.recordSave);
      if (!match) {
        return;
      }
      await saveRecordEdits(match.resourceName, button.dataset.recordSave);
    });
  });

  document.querySelectorAll("[data-record-archive]").forEach((button) => {
    button.addEventListener("click", async () => {
      const match = items.find((item) => item.record.id === button.dataset.recordArchive);
      if (!match) {
        return;
      }
      await archiveRecordFromUi(match.resourceName, button.dataset.recordArchive);
    });
  });

  document.querySelectorAll("[data-record-delete]").forEach((button) => {
    button.addEventListener("click", async () => {
      const match = items.find((item) => item.record.id === button.dataset.recordDelete);
      if (!match) {
        return;
      }
      await deleteRecordFromUi(match.resourceName, button.dataset.recordDelete);
    });
  });

  document.querySelectorAll("[data-idea-promote]").forEach((button) => {
    button.addEventListener("click", async () => {
      await promoteIdeaFromUi(button.dataset.ideaPromote);
    });
  });

  document.querySelectorAll("[data-report-open]").forEach((button) => {
    button.addEventListener("click", () => {
      const [resourceName, recordId] = button.dataset.reportOpen.split("|");
      reportState.selectedKey = `${resourceName}:${recordId}`;
      setView("reports");
    });
  });

  document.querySelectorAll("[data-report-print]").forEach((button) => {
    button.addEventListener("click", () => {
      const [resourceName, recordId] = button.dataset.reportPrint.split("|");
      window.open(`/api/exports/${resourceName}/${recordId}/html`, "_blank", "noopener");
    });
  });

  document.querySelectorAll("[data-report-pdf]").forEach((button) => {
    button.addEventListener("click", () => {
      const [resourceName, recordId] = button.dataset.reportPdf.split("|");
      window.open(`/api/exports/${resourceName}/${recordId}/pdf`, "_blank", "noopener");
    });
  });
  document.querySelectorAll("[data-report-bundle]").forEach((button) => {
    button.addEventListener("click", () => {
      const [resourceName, recordId] = button.dataset.reportBundle.split("|");
      window.open(`/api/exports/${resourceName}/${recordId}/bundle`, "_blank", "noopener");
    });
  });

  document.querySelectorAll("[data-upload-another-document]").forEach((button) => {
    button.addEventListener("click", () => openDocumentUploadModal());
  });

  document.querySelectorAll("[data-project-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      ui.projectTimelineFilter = button.dataset.projectFilter;
      renderEntitySection("projects");
    });
  });

  document.querySelectorAll("[data-activity-open]").forEach((button) => {
    button.addEventListener("click", () => {
      openSearchResult(button.dataset.activityResource, button.dataset.activityId);
      renderNav();
      renderView();
    });
  });

  bindNavigationActionButtons(heroEl);
  bindNavigationActionButtons(contentEl);
  bindActionCards(heroEl);
  bindActionCards(contentEl);
}

function combinedResourceLabel(resourceName) {
  const labels = {
    trips: "Travel or meeting",
    productions: "Shoot or work session",
    ideas: "Idea",
    knowledge: "Note"
  };

  return labels[resourceName] || labelForResource(resourceName);
}

function combinedWorkflowState(resourceName, record) {
  if (resourceName === "ideas") {
    if (record.promotedProjectId) {
      return {
        label: "Promoted",
        tone: "status-final",
        hint: "Already turned into project work"
      };
    }

    return {
      label: "Idea stage",
      tone: "status-review",
      hint: "Keep light until it deserves a project"
    };
  }

  if (resourceName === "knowledge") {
    return {
      label: record.linkedType ? "Linked note" : "Saved note",
      tone: record.linkedType ? "status-final" : "status-soft",
      hint: record.linkedType ? "Connected to active work" : "Reusable reference or checklist"
    };
  }

  if (record.compliance?.blockers?.length) {
    return {
      label: "Needs closure",
      tone: "status-review",
      hint: "Missing proof, closure, or one key detail"
    };
  }

  if (resourceName === "trips") {
    return {
      label: record.closureStatus || "Active",
      tone: String(record.closureStatus || "").toLowerCase().includes("close") ? "status-final" : "status-soft",
      hint: "Travel trail and business purpose"
    };
  }

  return {
    label: record.closureStatus || "Active",
    tone: String(record.closureStatus || "").toLowerCase().includes("close") ? "status-final" : "status-soft",
    hint: "Session, shoot, or production work"
  };
}

function renderReportsSection() {
  const reports = buildFilteredReportIndex();
  const selected = reports.find((item) => item.key === reportState.selectedKey) || reports[0];

  if (selected) {
    reportState.selectedKey = selected.key;
  }

  heroEl.innerHTML = `
    <article class="highlight-card">
      <div>
        <p class="eyebrow">Exports</p>
        <h3>Reports is now a working review space, not just a placeholder.</h3>
      </div>
      <p>Open a print-friendly report view, download the text dossier, or inspect which records still need cleanup before you share them.</p>
      <div class="highlight-actions">
        ${selected ? `
          ${selected.resourceName === "projects" ? `<button class="pill-button" type="button" data-report-action="bundle" data-report-key="${selected.key}">Download bundle</button>` : ""}
          <button class="pill-button" type="button" data-report-action="pdf" data-report-key="${selected.key}">Download PDF</button>
          <button class="pill-button" type="button" data-report-action="print" data-report-key="${selected.key}">Print / Save as PDF</button>
          <button class="pill-button" type="button" data-report-action="download" data-report-key="${selected.key}">Download text</button>
        ` : ""}
      </div>
    </article>
    <article class="metric-card action-card" role="button" tabindex="0" data-report-key="${reports.find((item) => item.record.compliance.blockers.length || item.record.compliance.warnings.length)?.key || selected?.key || ""}">
      <p class="eyebrow">Needs cleanup</p>
      <strong>${reports.filter((item) => item.record.compliance.blockers.length || item.record.compliance.warnings.length).length}</strong>
      <p class="metric-foot">Exports with unresolved issues still visible in the compliance summary.</p>
      <div class="detail-actions">
        <button class="pill-button" type="button" data-report-key="${reports.find((item) => item.record.compliance.blockers.length || item.record.compliance.warnings.length)?.key || selected?.key || ""}">Open flagged report</button>
      </div>
    </article>
    <article class="metric-card action-card" role="button" tabindex="0" data-report-key="${selected?.key || ""}">
      <p class="eyebrow">Exportable records</p>
      <strong>${reports.length}</strong>
      <p class="metric-foot">Records currently available for text export and print-friendly review.</p>
      <div class="detail-actions">
        <button class="pill-button" type="button" data-report-key="${selected?.key || ""}">Open report queue</button>
      </div>
    </article>
    <article class="metric-card action-card" role="button" tabindex="0" data-report-key="${reports.find((item) => !item.record.compliance.blockers.length)?.key || selected?.key || ""}">
      <p class="eyebrow">Ready now</p>
      <strong>${reports.filter((item) => !item.record.compliance.blockers.length).length}</strong>
      <p class="metric-foot">Records without active blockers.</p>
      <div class="detail-actions">
        <button class="pill-button" type="button" data-report-key="${reports.find((item) => !item.record.compliance.blockers.length)?.key || selected?.key || ""}">Open ready report</button>
      </div>
    </article>
  `;

  contentEl.innerHTML = `
    <section class="panel">
      <div class="panel-header">
        <div>
          <p class="eyebrow">Export Queue</p>
          <h3>Available reports</h3>
        </div>
      </div>
      <div class="record-list">
        ${
          reports.length
            ? reports.map((item) => `
                <button class="record-button${item.key === selected?.key ? " active" : ""}" type="button" data-report-key="${item.key}">
                  <div class="record-topline">
                    <div>
                      <h4 class="record-title">${escapeHtml(item.title)}</h4>
                      <p>${escapeHtml(item.label)} | ${item.record.compliance.blockers.length} blockers | ${item.record.compliance.warnings.length} warnings</p>
                    </div>
                    <span class="score-chip ${scoreClass(item.record.compliance.score)}">${item.record.compliance.score}</span>
                  </div>
                  <div class="list-meta">
                    <p>${escapeHtml(item.record.compliance.blockers[0] || "Ready to review")}</p>
                    <p>${escapeHtml(item.fileName)}</p>
                  </div>
                </button>
              `).join("")
            : `<div class="empty-state"><p>No reports match the current search.</p></div>`
        }
      </div>
    </section>
    <section class="panel">
      ${
        selected
          ? renderReportDetail(selected)
          : `<div class="empty-state"><p>Select a report to preview and export it.</p></div>`
      }
    </section>
  `;

  document.querySelectorAll("[data-report-key]").forEach((button) => {
    button.addEventListener("click", () => {
      reportState.selectedKey = button.dataset.reportKey;
      renderReportsSection();
    });
  });

  document.querySelectorAll("[data-report-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = reports.find((entry) => entry.key === button.dataset.reportKey);
      if (item) {
        handleReportAction(button.dataset.reportAction, item);
      }
    });
  });
  bindActionCards(heroEl);
  bindActionCards(contentEl);
}

function renderCaptureInboxSection() {
  const captures = getFilteredCaptures();
  const selected = captures.find((item) => item.id === ui.selectedIds.captures) || captures[0];
  const pending = state.collections.captures.filter((item) => item.status !== "applied");
  const highConfidence = pending.filter((item) => Number(item.confidence || 0) >= 0.8).length;
  const quickFixCount = pending.filter((item) => Number(item.confidence || 0) < 0.8).length;

  if (selected) {
    ui.selectedIds.captures = selected.id;
  }

  heroEl.innerHTML = `
    <article class="highlight-card">
      <div>
        <p class="eyebrow">Inbox Review</p>
        <h3>Confirm what the app guessed, fix what looks off, and move on.</h3>
      </div>
      <p>The inbox is only for the captures that still need a decision. Most items should be cleared in a few seconds, not managed like paperwork.</p>
      <div class="highlight-actions">
        <button class="pill-button" type="button" data-inbox-action="new">Log something</button>
        ${selected ? `<button class="pill-button" type="button" data-inbox-action="apply" data-capture-id="${selected.id}">Confirm selected</button>` : ""}
        ${selected?.appliedResourceId ? `<button class="pill-button" type="button" data-inbox-action="open-applied" data-capture-id="${selected.id}">Open saved record</button>` : ""}
      </div>
    </article>
    <article class="metric-card">
      <p class="eyebrow">Ready now</p>
      <strong>${highConfidence}</strong>
      <p class="metric-foot">Captures the app already understands well enough for a fast confirm.</p>
    </article>
    <article class="metric-card">
      <p class="eyebrow">Needs a quick fix</p>
      <strong>${quickFixCount}</strong>
      <p class="metric-foot">Captures that probably need a type, project, or title correction before saving.</p>
    </article>
    <article class="metric-card">
      <p class="eyebrow">Inbox items</p>
      <strong>${state.collections.captures.length}</strong>
      <p class="metric-foot">Raw receipts, notes, voice messages, and proof files waiting to be reviewed or applied.</p>
    </article>
  `;

  contentEl.innerHTML = `
    <section class="panel">
      <div class="panel-header">
        <div>
          <p class="eyebrow">Capture Queue</p>
          <h3>Pick the next item to clear</h3>
        </div>
        <span class="meta-chip">${pending.length} waiting</span>
      </div>
      <div class="record-list">
        ${
          captures.length
            ? captures.map((capture) => renderCaptureListCard(capture, capture.id === selected?.id)).join("")
            : `<div class="empty-state"><p>No inbox items yet. Log something in plain language and it will appear here if it needs review.</p></div>`
        }
      </div>
    </section>
    <section class="panel">
      ${
        selected
          ? renderCaptureDetail(selected)
          : `<div class="empty-state"><p>Select an inbox item to inspect the note, the suggestion, and the next step.</p></div>`
      }
    </section>
  `;

  document.querySelectorAll("[data-capture-id]").forEach((button) => {
    button.addEventListener("click", () => {
      ui.selectedIds.captures = button.dataset.captureId;
      renderCaptureInboxSection();
    });
  });

  document.querySelectorAll("[data-inbox-action]").forEach((button) => {
    button.addEventListener("click", async () => {
      const capture = state.collections.captures.find((item) => item.id === button.dataset.captureId) || selected;
      if (!capture) {
        openAssistantCapture();
        return;
      }

      await handleCaptureAction(button.dataset.inboxAction, capture);
    });
  });

  document.querySelectorAll("[data-capture-edit]").forEach((button) => {
    button.addEventListener("click", () => {
      if (ui.editingView === "captures" && ui.editingId === button.dataset.captureEdit) {
        ui.editingView = "";
        ui.editingId = "";
      } else {
        ui.editingView = "captures";
        ui.editingId = button.dataset.captureEdit;
      }
      renderCaptureInboxSection();
    });
  });

  document.querySelectorAll("[data-capture-save]").forEach((button) => {
    button.addEventListener("click", async () => {
      await saveCaptureEdits(button.dataset.captureSave);
    });
  });
}

function renderCaptureListCard(capture, isActive) {
  const actionState = captureActionState(capture);
  return `
    <button class="record-button${isActive ? " active" : ""}" type="button" data-capture-id="${capture.id}">
      <div class="record-topline">
        <div>
          <h4 class="record-title">${escapeHtml(capture.title || "Inbox capture")}</h4>
          <p>${escapeHtml(captureSuggestionLabel(capture.suggestedResourceType))}</p>
        </div>
        <span class="status-chip ${capture.status === "applied" ? "status-final" : "status-review"}">${formatCaptureStatus(capture)}</span>
      </div>
      <p class="list-note">${escapeHtml(clipLabel(capture.summary || capture.fileName || "Raw capture", "Inbox capture"))}</p>
      <div class="list-meta">
        <p>${escapeHtml(actionState.hint)}</p>
        <span class="status-chip ${actionState.tone}">${escapeHtml(actionState.label)}</span>
      </div>
    </button>
  `;
}

function renderCaptureEditForm(capture) {
  return `
    <div class="field-grid inbox-apply-grid">
      <label class="field" data-span="full">
        <span>Title</span>
        <input type="text" value="${escapeHtml(capture.title || "")}" data-capture-edit-field="${capture.id}|title" />
      </label>
      <label class="field" data-span="full">
        <span>Summary</span>
        <textarea data-capture-edit-field="${capture.id}|summary">${escapeHtml(capture.summary || "")}</textarea>
      </label>
      <label class="field">
        <span>Suggested type</span>
        <select data-capture-edit-field="${capture.id}|suggestedResourceType">
          <option value="expenses" ${capture.suggestedResourceType === "expenses" ? "selected" : ""}>Expense</option>
          <option value="projects" ${capture.suggestedResourceType === "projects" ? "selected" : ""}>Project</option>
          <option value="updates" ${capture.suggestedResourceType === "updates" ? "selected" : ""}>Project update</option>
          <option value="proof" ${capture.suggestedResourceType === "proof" ? "selected" : ""}>Proof document</option>
          <option value="ideas" ${capture.suggestedResourceType === "ideas" ? "selected" : ""}>Idea</option>
          <option value="knowledge" ${capture.suggestedResourceType === "knowledge" ? "selected" : ""}>Library note</option>
        </select>
      </label>
      <label class="field">
        <span>Suggested project</span>
        <select data-capture-edit-field="${capture.id}|suggestedProjectId">
          <option value="">No project selected</option>
          ${state.collections.projects.map((project) => `<option value="${project.id}" ${project.id === capture.suggestedProjectId ? "selected" : ""}>${escapeHtml(project.title)}</option>`).join("")}
        </select>
      </label>
    </div>
    <div class="detail-actions">
      <button class="primary-button" type="button" data-capture-save="${capture.id}">Save changes</button>
      <button class="ghost-button" type="button" data-capture-edit="${capture.id}">Cancel</button>
    </div>
  `;
}

function renderCaptureDetail(capture) {
  const isEditing = ui.editingView === "captures" && ui.editingId === capture.id;
  const actionState = captureActionState(capture);
  const projectOptions = ['<option value="">No project selected</option>']
    .concat(state.collections.projects.map((project) => `<option value="${project.id}" ${project.id === capture.suggestedProjectId ? "selected" : ""}>${escapeHtml(project.title)}</option>`))
    .join("");
  const auditTrail = (capture.auditTrail || [])
    .slice()
    .reverse()
    .map((entry) => `
      <article class="timeline-item">
        <div class="timeline-topline">
          <strong>${escapeHtml(entry.event || entry.action || "Event")}</strong>
          <span class="meta-chip">${escapeHtml(formatDateTime(entry.at || entry.timestamp))}</span>
        </div>
        <p>${escapeHtml(entry.note || "No note recorded.")}</p>
      </article>
    `)
    .join("");

  return `
    <div class="panel-header">
      <div>
        <p class="eyebrow">Inbox Detail</p>
        <h3>${escapeHtml(capture.title || "Inbox capture")}</h3>
      </div>
      <div class="card-row">
        <span class="status-chip ${capture.status === "applied" ? "status-final" : "status-review"}">${formatCaptureStatus(capture)}</span>
        <span class="meta-chip">${formatCaptureConfidence(capture.confidence)}</span>
      </div>
    </div>

    <div class="sub-panel">
      <div class="record-topline">
        <strong>Fastest next step</strong>
        <span class="status-chip ${actionState.tone}">${escapeHtml(actionState.label)}</span>
      </div>
      <p class="placeholder-copy">${escapeHtml(actionState.body)}</p>
      <div class="detail-actions">
        <button class="primary-button" type="button" data-inbox-action="apply" data-capture-id="${capture.id}">${capture.status === "applied" ? "Apply again" : "Confirm and save"}</button>
        <button class="pill-button" type="button" data-capture-edit="${capture.id}">${isEditing ? "Cancel edit" : "Fix type or project"}</button>
        ${capture.storagePath ? `<button class="pill-button" type="button" data-inbox-action="open-file" data-capture-id="${capture.id}">Open original file</button>` : ""}
        ${capture.appliedResourceId ? `<button class="pill-button" type="button" data-inbox-action="open-applied" data-capture-id="${capture.id}">Open saved record</button>` : ""}
        ${capture.appliedResourceId ? `<button class="pill-button" type="button" data-inbox-action="undo-apply" data-capture-id="${capture.id}">Undo last apply</button>` : ""}
      </div>
    </div>

    <div class="sub-panel">
      <div class="record-topline">
        <strong>Original capture</strong>
        <span class="meta-chip">${escapeHtml(capture.fileName || capture.sourceType)}</span>
      </div>
      <p class="placeholder-copy">${escapeHtml(capture.summary || "No summary provided.")}</p>
    </div>

    <div class="sub-panel">
      <div class="record-topline">
        <strong>Suggested destination</strong>
        <span class="meta-chip">${escapeHtml(captureSuggestionLabel(capture.suggestedResourceType))}${capture.suggestedProjectId ? ` for ${escapeHtml(projectTitleById(capture.suggestedProjectId) || "")}` : ""}</span>
      </div>
      <p class="placeholder-copy">${escapeHtml(capture.reasoning || "The app made a best-effort suggestion from the note, file, and your recent context.")}</p>
    </div>

    <div class="sub-panel">
      <div class="record-topline">
        <strong>Correct before saving if needed</strong>
        <span class="meta-chip">No recreation needed</span>
      </div>
      <p class="placeholder-copy">If the app guessed wrong, edit the title, summary, suggested type, or project first. You should not need to recreate this from scratch.</p>
      ${
        isEditing
          ? renderCaptureEditForm(capture)
          : `
            <div class="field-grid inbox-apply-grid">
              <label class="field">
                <span>Save this as</span>
                <select data-capture-apply-type="${capture.id}">
                  <option value="expenses" ${capture.suggestedResourceType === "expenses" ? "selected" : ""}>Expense</option>
                  <option value="projects" ${capture.suggestedResourceType === "projects" ? "selected" : ""}>Project</option>
                  <option value="updates" ${capture.suggestedResourceType === "updates" ? "selected" : ""}>Project update</option>
                  <option value="proof" ${capture.suggestedResourceType === "proof" ? "selected" : ""}>Proof document</option>
                  <option value="ideas" ${capture.suggestedResourceType === "ideas" ? "selected" : ""}>Idea</option>
                  <option value="knowledge" ${capture.suggestedResourceType === "knowledge" ? "selected" : ""}>Library note</option>
                </select>
              </label>
              <label class="field">
                <span>Project, if needed</span>
                <select data-capture-project="${capture.id}">
                  ${projectOptions}
                </select>
              </label>
            </div>
          `
      }
    </div>

    <details class="detail-disclosure">
      <summary>More details</summary>
      <div class="detail-disclosure-body">
        <div class="detail-grid">
          <article class="detail-card">
            <strong>Suggested project</strong>
            <p>${escapeHtml(projectTitleById(capture.suggestedProjectId) || "None")}</p>
          </article>
          <article class="detail-card">
            <strong>Source</strong>
            <p>${escapeHtml(capture.sourceType)}</p>
          </article>
          <article class="detail-card">
            <strong>File</strong>
            <p>${escapeHtml(capture.fileName || "Text only")}</p>
          </article>
          <article class="detail-card">
            <strong>Processing</strong>
            <p>${escapeHtml(capture.processingStatus || "Ready")}</p>
          </article>
        </div>
        <div class="sub-panel">
          <strong>Extracted text</strong>
          <pre class="dossier">${escapeHtml(capture.extractedText || "No extracted text yet.")}</pre>
        </div>
        <div class="sub-panel">
          <div class="record-topline">
            <strong>Capture history</strong>
            <div class="detail-actions">
              <button class="pill-button" type="button" data-inbox-action="archive" data-capture-id="${capture.id}">Archive</button>
              <button class="pill-button" type="button" data-inbox-action="delete" data-capture-id="${capture.id}">Delete</button>
            </div>
          </div>
          ${
            auditTrail
              ? `<div class="timeline">${auditTrail}</div>`
              : `<p class="placeholder-copy">No audit history recorded yet.</p>`
          }
        </div>
      </div>
    </details>
  `;
}

async function handleCaptureAction(action, capture) {
  if (action === "new") {
    openAssistantCapture();
    return;
  }

  if (action === "open-file") {
    window.open(`/api/captures/${capture.id}/file`, "_blank", "noopener");
    return;
  }

  if (action === "open-applied") {
    openAppliedCaptureRecord(capture);
    return;
  }

  if (action === "archive") {
    await apiFetch(`/api/captures/${capture.id}/archive`, { method: "POST" });
    await loadBootstrapData();
    renderNav();
    renderView();
    return;
  }

  if (action === "delete") {
    await apiFetch(`/api/captures/${capture.id}`, { method: "DELETE" });
    await loadBootstrapData();
    renderNav();
    renderView();
    return;
  }

  if (action === "undo-apply") {
    await apiFetch(`/api/captures/${capture.id}/unapply`, { method: "POST" });
    ui.lastAppliedCaptureId = "";
    await loadBootstrapData();
    ui.selectedIds.captures = capture.id;
    renderNav();
    renderView();
    return;
  }

  const typeField = document.querySelector(`[data-capture-apply-type="${capture.id}"]`);
  const projectField = document.querySelector(`[data-capture-project="${capture.id}"]`);
  const payload = {
    resourceType: typeField?.value || capture.suggestedResourceType,
    projectId: projectField?.value || capture.suggestedProjectId
  };

  try {
    const response = await apiFetch(`/api/captures/${capture.id}/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    await loadBootstrapData();
    ui.selectedIds.captures = response.data.capture.id;
    ui.lastAppliedCaptureId = response.data.capture.id;
    ui.editingView = "";
    ui.editingId = "";
    renderNav();
    renderView();
  } catch (error) {
    window.alert(error.message);
  }
}

function openAppliedCaptureRecord(capture) {
  if (!capture.appliedResourceId) {
    return;
  }

  const targetView = capture.appliedResourceType === "updates" || capture.appliedResourceType === "proof"
    ? "documents"
    : capture.appliedResourceType;

  ui.currentView = targetView === "invoices" || targetView === "payments" ? "billing" : targetView;
  ui.selectedIds[targetView] = capture.appliedResourceId;
  renderNav();
  renderView();
}

function captureActionState(capture) {
  if (capture.status === "applied") {
    return {
      label: "Already saved",
      tone: "status-final",
      hint: "Saved and still traceable",
      body: "This capture has already been turned into a business record. Open the saved record if you want to continue there, or undo the last apply if it landed in the wrong place."
    };
  }

  if (Number(capture.confidence || 0) >= 0.8) {
    return {
      label: "Ready to confirm",
      tone: "status-final",
      hint: "Usually one-click clear",
      body: "The app has high confidence about the type and likely destination. Review quickly, then confirm and move on."
    };
  }

  if (capture.suggestedProjectId || capture.suggestedResourceType) {
    return {
      label: "Quick review",
      tone: "status-review",
      hint: "Check type or project",
      body: "The app has a reasonable guess, but this capture probably needs one small correction before it becomes the right record."
    };
  }

  return {
    label: "Needs sorting",
    tone: "status-open",
    hint: "Add a little context",
    body: "There is not enough context yet for a safe apply. Pick the type, add the project if you know it, and then save it forward."
  };
}

function renderGlobalSearchResults() {
  const results = state.searchResults || [];
  const captureHits = results.filter((item) => item.resourceName === "captures").length;
  const evidenceHits = results.filter((item) => ["documents", "expenses", "invoices", "payments"].includes(item.resourceName)).length;
  const projectHits = results.filter((item) => ["projects", "trips", "productions", "ideas", "knowledge"].includes(item.resourceName)).length;
  const grouped = {
    inbox: results.filter((item) => item.resourceName === "captures"),
    projects: results.filter((item) => ["projects", "trips", "productions", "ideas", "knowledge"].includes(item.resourceName)),
    money: results.filter((item) => ["expenses", "invoices", "payments", "documents"].includes(item.resourceName)),
    people: results.filter((item) => ["people", "reminders"].includes(item.resourceName))
  };
  const currentProjectId = currentProjectContextId();
  const currentPersonId = ui.currentView === "people" ? ui.selectedIds.people : "";

  heroEl.innerHTML = `
    <article class="highlight-card">
      <div>
        <p class="eyebrow">Search</p>
        <h3>Find it the way you would ask a person.</h3>
      </div>
      <p>Results for "${escapeHtml(ui.searchQuery)}" are grouped across the whole workspace, so you can retrieve receipts, updates, project notes, contracts, invoices, and evidence from one place.</p>
      <div class="highlight-actions">
        <button class="pill-button" type="button" data-search-preset="all">All results</button>
        <button class="pill-button" type="button" data-search-preset="missing-proof">Missing proof</button>
        ${currentProjectId ? `<button class="pill-button" type="button" data-search-preset="project">Current project</button>` : ""}
        ${currentProjectId ? `<button class="pill-button" type="button" data-search-preset="receipts">Current project receipts</button>` : ""}
        ${currentPersonId ? `<button class="pill-button" type="button" data-search-preset="person">Current person</button>` : ""}
      </div>
      <div class="hero-guidance">
        <span class="meta-chip">Try plain language: "Banff receipt"</span>
        <span class="meta-chip">"Alex agreement"</span>
        <span class="meta-chip">"Everything for India trip"</span>
      </div>
    </article>
    <article class="metric-card">
      <p class="eyebrow">Matches</p>
      <strong>${results.length}</strong>
      <p class="metric-foot">Records found across your workspace.</p>
    </article>
    <article class="metric-card">
      <p class="eyebrow">Inbox and memory</p>
      <strong>${captureHits + projectHits}</strong>
      <p class="metric-foot">Captures, projects, work logs, ideas, and notes tied to your query.</p>
    </article>
    <article class="metric-card">
      <p class="eyebrow">Money and proof</p>
      <strong>${evidenceHits}</strong>
      <p class="metric-foot">Expenses, evidence files, invoices, and payments.</p>
    </article>
  `;

  contentEl.innerHTML = `
    ${
      ui.searchLoading
        ? `<section class="panel"><div class="empty-state"><p>Searching the workspace...</p></div></section>`
        : ui.searchError
          ? `<section class="panel"><div class="empty-state"><p>${escapeHtml(ui.searchError)}</p></div></section>`
          : results.length
        ? `
          ${renderSearchGroup("Inbox and Notes", "Things you recently logged or still need to confirm.", grouped.inbox)}
          ${renderSearchGroup("Projects and Work", "Projects, trips, and content records connected to your query.", grouped.projects)}
          ${renderSearchGroup("Money and Evidence", "Expenses, invoices, payments, receipts, and attached proof.", grouped.money)}
          ${renderSearchGroup("People and Follow-up", "Collaborators, reminders, and related business context.", grouped.people)}
        `
        : `<section class="panel"><div class="empty-state"><p>No results found. Try a project name, vendor, person, place, amount, or file type.</p></div></section>`
    }
  `;

  contentEl.querySelectorAll("[data-search-open]").forEach((button) => {
    button.addEventListener("click", () => {
      openSearchResult(button.dataset.searchResource, button.dataset.searchId);
      globalSearchInput.value = "";
      ui.searchQuery = "";
      ui.searchFilters = {
        resource: "",
        projectId: "",
        personId: "",
        hasBlocker: false,
        hasDocument: false
      };
      state.searchResults = [];
      renderNav();
      renderView();
    });
  });

  heroEl.querySelectorAll("[data-search-preset]").forEach((button) => {
    button.addEventListener("click", async () => {
      const preset = button.dataset.searchPreset;
      if (preset === "all") {
        ui.searchFilters = {
          resource: "",
          projectId: "",
          personId: "",
          hasBlocker: false,
          hasDocument: false
        };
        await performWorkspaceSearch();
        return;
      }

      await applySearchPreset(preset);
    });
  });

  contentEl.querySelectorAll("[data-search-action]").forEach((button) => {
    button.addEventListener("click", async () => {
      await handleSearchAction(button.dataset.searchAction, button.dataset.searchResource, button.dataset.searchId);
    });
  });
}

function renderSearchGroup(title, description, items) {
  if (!items.length) {
    return "";
  }

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <p class="eyebrow">Search Group</p>
          <h3>${escapeHtml(title)}</h3>
        </div>
        <span class="meta-chip">${items.length} result(s)</span>
      </div>
      <p class="placeholder-copy">${escapeHtml(description)}</p>
      <div class="record-list">
        ${items.map((item) => renderSearchResultCard(item)).join("")}
      </div>
    </section>
  `;
}

function renderSearchResultCard(item) {
  const recordId = item.record?.id || item.sourceId;
  const quickActions = buildSearchActions(item);
  const state = searchResultState(item);
  return `
    <article class="record-button search-result-card">
      <div class="record-topline">
        <div>
          <h4 class="record-title">${escapeHtml(item.title)}</h4>
          <p>${escapeHtml(state.subtitle)}</p>
        </div>
        <span class="status-chip ${state.tone}">${escapeHtml(state.label)}</span>
      </div>
      <p class="list-note">${escapeHtml(item.snippet || item.subtitle || "Open record")}</p>
      <div class="list-meta">
        <p>${escapeHtml(state.hint)}</p>
      </div>
      <div class="detail-actions">
        <button class="pill-button" type="button" data-search-open data-search-resource="${item.resourceName}" data-search-id="${recordId}">Open</button>
        ${
          quickActions
            .map((action) => `<button class="pill-button" type="button" data-search-action="${action.id}" data-search-resource="${item.resourceName}" data-search-id="${recordId}">${action.label}</button>`)
            .join("")
        }
      </div>
    </article>
  `;
}

function searchResultState(item) {
  const record = item.record || {};
  const createdLabel = record.createdAt ? formatDate(record.createdAt) : "Open record";

  if (item.resourceName === "captures") {
    return {
      label: "Inbox",
      tone: "status-review",
      subtitle: "Capture waiting for review",
      hint: createdLabel
    };
  }

  if (item.resourceName === "documents") {
    return {
      label: "File",
      tone: "status-final",
      subtitle: linkedRecordLabel(record),
      hint: record.documentType || createdLabel
    };
  }

  if (["expenses", "invoices", "payments"].includes(item.resourceName)) {
    return {
      label: "Money",
      tone: "status-soft",
      subtitle: labelForResource(item.resourceName),
      hint: createdLabel
    };
  }

  return {
    label: "Record",
    tone: "status-soft",
    subtitle: labelForResource(item.resourceName),
    hint: createdLabel
  };
}

function searchResultSnippet(resourceName, record) {
  if (resourceName === "captures") {
    return clipLabel(record.summary || record.extractedText || record.reasoning, "Inbox capture");
  }

  if (resourceName === "documents") {
    return clipLabel(record.note || linkedRecordLabel(record), "Evidence file");
  }

  if (resourceName === "expenses") {
    return clipLabel(record.businessPurpose || record.contentConnection, "Expense record");
  }

  if (resourceName === "projects") {
    return clipLabel(record.commercialObjective || record.narrative, "Project record");
  }

  if (resourceName === "ideas") {
    return clipLabel(record.summary || record.commercialAngle, "Idea");
  }

  if (resourceName === "knowledge") {
    return clipLabel(record.summary || record.content, "Library note");
  }

  return clipLabel(record.exportPreview || record.note || primaryLabel(resourceName, record), "Record");
}

function searchStrength(resourceName, record, query) {
  const title = primaryLabel(resourceName, record).toLowerCase();
  const subtitle = secondaryLabel(resourceName, record).toLowerCase();
  const body = searchableText(resourceName, record);
  let score = 0;

  if (title.includes(query)) score += 4;
  if (subtitle.includes(query)) score += 2;
  if (body.includes(query)) score += 1;

  return score;
}

function compareByDate(left, right) {
  return new Date(left.createdAt || 0) - new Date(right.createdAt || 0);
}

function openSearchResult(resourceName, recordId) {
  const targetView = resourceName === "invoices" || resourceName === "payments" ? "billing" : resourceName;
  ui.currentView = targetView;
  ui.selectedIds[resourceName] = recordId;
}

function bindNavigationActionButtons(scope) {
  scope.querySelectorAll("[data-nav-record]").forEach((button) => {
    button.addEventListener("click", () => {
      const [resourceName, recordId] = button.dataset.navRecord.split("|");
      navigateToRecord(resourceName, recordId);
    });
  });
}

function bindActionCards(scope) {
  scope.querySelectorAll(".action-card").forEach((card) => {
    const activate = () => {
      if (card.dataset.navRecord) {
        const [resourceName, recordId] = card.dataset.navRecord.split("|");
        navigateToRecord(resourceName, recordId);
        return;
      }

      if (card.dataset.openAttention !== undefined) {
        openNotificationsModal();
        return;
      }

      if (card.dataset.reportKey) {
        reportState.selectedKey = card.dataset.reportKey;
        if (ui.currentView !== "reports") {
          setView("reports");
        } else {
          renderReportsSection();
        }
      }
    };

    card.addEventListener("click", (event) => {
      if (event.target.closest("button, a, input, select, textarea, summary")) {
        return;
      }
      activate();
    });

    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }
      event.preventDefault();
      activate();
    });
  });
}

function navigateToRecord(resourceName, recordId = "") {
  if (!resourceName) {
    return;
  }

  if (resourceName === "billing") {
    setView("billing");
    return;
  }

  const targetView = resourceName === "invoices" || resourceName === "payments" ? "billing" : resourceName;
  ui.currentView = targetView;

  if (recordId) {
    ui.selectedIds[resourceName] = recordId;
  }

  renderNav();
  renderView();
}

function pendingCaptureId() {
  return state.collections.captures.find((item) => item.status !== "applied")?.id || state.collections.captures[0]?.id || "";
}

function firstExpenseWithReceiptGap() {
  return state.collections.expenses.find((expense) => expense.compliance.blockers.some((line) => line.toLowerCase().includes("receipt"))) || null;
}

function firstOutstandingInvoiceId() {
  return state.collections.invoices.find((invoice) => !["Paid", "Collected"].includes(invoice.status))?.id || "";
}

function firstBillingProofGap() {
  const invoiceGap = state.collections.invoices.find((invoice) => !invoiceLinkedDocuments(invoice).length);
  if (invoiceGap) {
    return { resourceName: "invoices", id: invoiceGap.id };
  }

  const paymentGap = state.collections.payments.find((payment) => !payment.proofDocumentId);
  if (paymentGap) {
    return { resourceName: "payments", id: paymentGap.id };
  }

  return null;
}

function buildRecentActivity() {
  return [
    ...state.collections.captures.map((record) => ({ resourceName: "captures", record })),
    ...state.collections.expenses.map((record) => ({ resourceName: "expenses", record })),
    ...state.collections.documents.map((record) => ({ resourceName: "documents", record })),
    ...state.collections.ideas.map((record) => ({ resourceName: "ideas", record })),
    ...state.collections.knowledge.map((record) => ({ resourceName: "knowledge", record })),
    ...state.collections.projects.map((record) => ({ resourceName: "projects", record })),
    ...state.collections.invoices.map((record) => ({ resourceName: "invoices", record })),
    ...state.collections.payments.map((record) => ({ resourceName: "payments", record }))
  ].sort((left, right) => compareByDate(right.record, left.record));
}

function renderRecentActivityCard(item) {
  return `
    <button class="record-button" type="button" data-activity-open data-activity-resource="${item.resourceName}" data-activity-id="${item.record.id}">
      <div class="record-topline">
        <div>
          <h4 class="record-title">${escapeHtml(primaryLabel(item.resourceName, item.record))}</h4>
          <p>${escapeHtml(labelForResource(item.resourceName))}</p>
        </div>
        <span class="meta-chip">${escapeHtml(formatDate(item.record.createdAt || item.record.updatedAt))}</span>
      </div>
      <p class="list-note">${escapeHtml(searchResultSnippet(item.resourceName, item.record))}</p>
    </button>
  `;
}

function renderReportDetail(item) {
  return `
    <div class="panel-header">
      <div>
        <p class="eyebrow">Report Preview</p>
        <h3>${escapeHtml(item.title)}</h3>
      </div>
      <div class="detail-actions">
        ${item.resourceName === "projects" ? `<button class="pill-button" type="button" data-report-action="bundle" data-report-key="${item.key}">Download bundle</button>` : ""}
        <button class="pill-button" type="button" data-report-action="pdf" data-report-key="${item.key}">Download PDF</button>
        <button class="pill-button" type="button" data-report-action="print" data-report-key="${item.key}">Print / Save as PDF</button>
        <button class="pill-button" type="button" data-report-action="download" data-report-key="${item.key}">Download text</button>
        <button class="pill-button" type="button" data-report-action="open-record" data-report-key="${item.key}">Open source record</button>
      </div>
    </div>
    <div class="detail-grid">
      <article class="detail-card">
        <strong>Source type</strong>
        <p>${escapeHtml(item.label)}</p>
      </article>
      <article class="detail-card">
        <strong>Readiness</strong>
        <p>${item.record.compliance.blockers.length ? "Needs fixes before sharing" : "Review-ready"}</p>
      </article>
      <article class="detail-card">
        <strong>Warnings</strong>
        <p>${item.record.compliance.warnings.length}</p>
      </article>
      <article class="detail-card">
        <strong>Suggested file</strong>
        <p>${escapeHtml(item.fileName)}</p>
      </article>
    </div>
    <div class="sub-panel">
      <strong>Export preview</strong>
      <pre class="dossier">${escapeHtml(item.record.exportPreview)}</pre>
    </div>
    <div class="sub-panel">
      <strong>Compliance summary</strong>
      <ul class="issue-list">
        ${
          [...item.record.compliance.blockers.map((line) => `Blocker: ${line}`), ...item.record.compliance.warnings.map((line) => `Warning: ${line}`)]
            .map((line) => `<li>${escapeHtml(line)}</li>`)
            .join("") || "<li>No active blockers or warnings.</li>"
        }
      </ul>
    </div>
  `;
}

function buildReportIndex() {
  const resources = ["projects", "trips", "productions", "expenses", "people", "documents", "ideas", "knowledge", "invoices", "payments", "reminders"];
  return resources.flatMap((resourceName) =>
    (state.collections[resourceName] || []).map((record) => ({
      key: `${resourceName}:${record.id}`,
      resourceName,
      id: record.id,
      title: primaryLabel(resourceName, record),
      label: labelForResource(resourceName),
      fileName: `${slugify(primaryLabel(resourceName, record)) || record.id}.txt`,
      record
    }))
  );
}

function buildFilteredReportIndex() {
  const reports = buildReportIndex();
  if (!ui.searchQuery) {
    return reports;
  }

  return reports.filter((item) => searchableText(item.resourceName, item.record).includes(ui.searchQuery));
}

function handleReportAction(action, item) {
  if (action === "open-record") {
    ui.currentView = item.resourceName === "invoices" || item.resourceName === "payments" ? "billing" : item.resourceName;
    ui.selectedIds[item.resourceName] = item.id;
    renderNav();
    renderView();
    return;
  }

  if (action === "download") {
    window.open(`/api/exports/${item.resourceName}/${item.id}/download`, "_blank", "noopener");
    return;
  }

  if (action === "pdf") {
    window.open(`/api/exports/${item.resourceName}/${item.id}/pdf`, "_blank", "noopener");
    return;
  }

  if (action === "bundle") {
    window.open(`/api/exports/${item.resourceName}/${item.id}/bundle`, "_blank", "noopener");
    return;
  }

  window.open(`/api/exports/${item.resourceName}/${item.id}/html`, "_blank", "noopener");
}

function openNotificationsModal() {
  renderNotificationsModal();
  notificationsModal.showModal();
}

function renderNotificationsModal() {
  const items = buildNotificationItems();
  notificationsSummaryEl.innerHTML = `
    <span class="meta-chip">${items.length} suggested follow-ups</span>
    <span class="meta-chip">${items.filter((item) => item.severity === "High").length} high priority</span>
    <span class="meta-chip">${state.collections.reminders.length} saved reminders</span>
  `;

  notificationsListEl.innerHTML = items.length
    ? items.map((item) => `
        <article class="detail-card">
          <div class="record-topline">
            <div>
              <h4 class="record-title">${escapeHtml(item.title)}</h4>
              <p>${escapeHtml(item.context)}</p>
            </div>
            <span class="status-chip ${item.severity === "High" ? "status-open" : "status-review"}">${item.severity}</span>
          </div>
          <p>${escapeHtml(item.note)}</p>
          <div class="detail-actions">
            <button class="pill-button" type="button" data-notification-open="${item.resourceName}|${item.recordId}">Open record</button>
            <button class="pill-button" type="button" data-notification-reminder="${item.key}">${item.existing ? "Reminder exists" : "Create reminder"}</button>
          </div>
        </article>
      `).join("")
    : `<div class="empty-state"><p>No suggested follow-up items right now.</p></div>`;

  notificationsListEl.querySelectorAll("[data-notification-open]").forEach((button) => {
    button.addEventListener("click", () => {
      const [resourceName, recordId] = button.dataset.notificationOpen.split("|");
      notificationsModal.close();
      ui.currentView = resourceName === "invoices" || resourceName === "payments" ? "billing" : resourceName;
      ui.selectedIds[resourceName] = recordId;
      renderNav();
      renderView();
    });
  });

  notificationsListEl.querySelectorAll("[data-notification-reminder]").forEach((button) => {
    button.disabled = button.textContent === "Reminder exists";
    button.addEventListener("click", async () => {
      const item = buildNotificationItems().find((entry) => entry.key === button.dataset.notificationReminder);
      if (!item || item.existing) {
        return;
      }

      await createReminderFromSuggestion(item);
      renderNotificationsModal();
    });
  });
}

function buildNotificationItems() {
  const resourceNames = ["projects", "trips", "productions", "expenses", "people", "documents", "ideas", "knowledge", "invoices", "payments"];
  return resourceNames
    .flatMap((resourceName) =>
      (state.collections[resourceName] || []).flatMap((record) => {
        const blockers = (record.compliance?.blockers || []).slice(0, 2).map((issue) => toNotificationItem(resourceName, record, issue, "High"));
        const warnings = (record.compliance?.warnings || []).slice(0, 1).map((issue) => toNotificationItem(resourceName, record, issue, "Medium"));
        return [...blockers, ...warnings];
      })
    )
    .filter(Boolean)
    .slice(0, 12)
    .map((item) => ({
      ...item,
      existing: hasMatchingReminder(item)
    }));
}

function toNotificationItem(resourceName, record, issue, severity) {
  const title = `${labelForResource(resourceName)} follow-up`;
  return {
    key: `${resourceName}:${record.id}:${issue}`,
    title,
    note: issue,
    severity,
    resourceName,
    recordId: record.id,
    context: `${primaryLabel(resourceName, record)} | ${labelForResource(resourceName)}`,
    dueDate: nextReminderDate(severity)
  };
}

function hasMatchingReminder(item) {
  const linkedType = singularLabelForView(item.resourceName);
  return (state.collections.reminders || []).some(
    (reminder) => reminder.linkedType === linkedType && reminder.linkedId === item.recordId && reminder.note === item.note
  );
}

function nextReminderDate(severity) {
  const date = new Date();
  date.setDate(date.getDate() + (severity === "High" ? 1 : 3));
  return date.toISOString().slice(0, 10);
}

async function syncSuggestedReminders() {
  const suggestions = buildNotificationItems().filter((item) => !item.existing);
  for (const item of suggestions) {
    await createReminderFromSuggestion(item);
  }
  renderNotificationsModal();
}

async function createReminderFromSuggestion(item) {
  const response = await createResourceRecord("reminders", {
    title: item.title,
    linkedType: singularLabelForView(item.resourceName),
    linkedId: item.recordId,
    dueDate: item.dueDate,
    severity: item.severity,
    note: item.note
  });

  await loadBootstrapData();
  ui.selectedIds.reminders = response.data.id;
  return response;
}

function renderDashboardProjectWorkspace(project) {
  const activeProjects = state.collections.projects.filter((item) => !String(item.closureStatus || "").toLowerCase().includes("final"));
  const linkedProjectDocuments = getLinkedDocumentsForEntity("projects", project.id);
  const activeProjectButtons = activeProjects
    .slice(0, 5)
    .map(
      (item) => `
        <button class="pill-button${item.id === project.id ? " active-filter" : ""}" type="button" data-dashboard-project="${item.id}">
          ${escapeHtml(item.title)}
        </button>
      `
    )
    .join("");

  return `
    <div class="sub-panel">
      <strong>Work from inside this project</strong>
      <p class="placeholder-copy">This keeps expenses, proof, updates, and billing easier to retrieve later.</p>
      <div class="detail-actions">
        <button class="pill-button" type="button" data-project-action="expense" data-project-id="${project.id}">Add expense</button>
        <button class="pill-button" type="button" data-project-action="update" data-project-id="${project.id}">Log update</button>
        <button class="pill-button" type="button" data-project-action="document" data-project-id="${project.id}">Send proof</button>
      </div>
    </div>
    <div class="detail-grid">
      <article class="detail-card">
        <strong>Money logged</strong>
        <p>${project.linkedExpenseIds.length} expense${project.linkedExpenseIds.length === 1 ? "" : "s"}</p>
        <div class="detail-actions">
          <button class="pill-button" type="button" data-nav-record="expenses|${project.linkedExpenseIds[0] || ""}">Open expenses</button>
        </div>
      </article>
      <article class="detail-card">
        <strong>Proof on file</strong>
        <p>${linkedProjectDocuments.length} linked file${linkedProjectDocuments.length === 1 ? "" : "s"}</p>
        <div class="detail-actions">
          <button class="pill-button" type="button" data-nav-record="documents|${linkedProjectDocuments[0]?.id || ""}">Open evidence</button>
        </div>
      </article>
      <article class="detail-card">
        <strong>Linked work</strong>
        <p>${project.linkedProductionIds.length + project.linkedTripIds.length} item${project.linkedProductionIds.length + project.linkedTripIds.length === 1 ? "" : "s"}</p>
        <div class="detail-actions">
          <button class="pill-button" type="button" data-nav-record="projects|${project.id}">Open dossier</button>
        </div>
      </article>
    </div>
    <div class="sub-panel">
      <strong>Project note</strong>
      <pre class="dossier">${project.exportPreview}</pre>
    </div>
    <div class="sub-panel">
      <div class="record-topline">
        <strong>Switch project</strong>
        <span class="meta-chip">${activeProjects.length} active</span>
      </div>
      <div class="detail-actions">
        ${activeProjectButtons}
      </div>
    </div>
  `;
}

function renderEntitySection(view) {
  const allCollection = state.collections[view];
  const collection = getFilteredCollection(view);
  const selectedId = ui.selectedIds[view] || collection[0]?.id || "";
  const selected = collection.find((item) => item.id === selectedId) || collection[0];

  if (selected) {
    ui.selectedIds[view] = selected.id;
  }

  if (view === "projects" && selected) {
    void ensureProjectActivity(selected.id);
  }

  const summary = sectionSummary(view, allCollection);
  const searchMeta = ui.searchQuery
    ? `<span class="meta-chip">Showing ${collection.length} of ${allCollection.length} for "${escapeHtml(ui.searchQuery)}"</span>`
    : "";

  heroEl.innerHTML = `
    <article class="highlight-card">
      <div>
        <p class="eyebrow">This area</p>
        <h3>${summary.title}</h3>
      </div>
      <p>${summary.description}</p>
      <div class="detail-actions">
        <button class="primary-button" type="button" id="panelQuickAddHero">Add ${recordTemplates[view].label}</button>
        ${selected ? `<button class="pill-button" type="button" data-nav-record="${view}|${selected.id}">Open current</button>` : ""}
      </div>
    </article>
    <article class="metric-card action-card" role="button" tabindex="0" data-nav-record="${view}|${allCollection.find((item) => item.compliance.blockers.length)?.id || selected?.id || ""}">
      <p class="eyebrow">Needs follow-up</p>
      <strong>${summary.blockerCount}</strong>
      <p class="metric-foot">Records here that still need a missing detail, proof, or quick correction.</p>
      <div class="detail-actions">
        <button class="pill-button" type="button" data-nav-record="${view}|${allCollection.find((item) => item.compliance.blockers.length)?.id || selected?.id || ""}">Open issue</button>
      </div>
    </article>
    <article class="metric-card action-card" role="button" tabindex="0" data-nav-record="${view}|${selected?.id || ""}">
      <p class="eyebrow">In this area</p>
      <strong>${summary.count}</strong>
      <p class="metric-foot">${summary.caption}</p>
      <div class="detail-actions">
        <button class="pill-button" type="button" data-nav-record="${view}|${selected?.id || ""}">Open selected</button>
      </div>
    </article>
  `;

  contentEl.innerHTML = `
    <section class="panel">
      <div class="panel-header">
        <div>
          <p class="eyebrow">Records</p>
          <h3>${summary.listTitle}</h3>
        </div>
        <div class="card-row">
          ${searchMeta}
          <button class="ghost-button" type="button" id="panelQuickAdd">Add ${recordTemplates[view].label}</button>
          ${view === "documents" ? '<button class="primary-button" type="button" id="panelUploadDocument">Upload document</button>' : ""}
        </div>
      </div>
      <div class="record-list">
        ${
          collection.length
            ? collection
                .map(
                  (item) => `
                    <button class="record-button${item.id === selected?.id ? " active" : ""}" data-record-id="${item.id}" type="button">
                      ${view === "documents" ? renderDocumentThumbnail(item, { compact: true }) : ""}
                      <div class="record-topline">
                        <div>
                          <h4 class="record-title">${primaryLabel(view, item)}</h4>
                          <p>${simpleRecordState(view, item)}</p>
                        </div>
                        <span class="status-chip ${simpleRecordTone(view, item)}">${simpleRecordState(view, item)}</span>
                      </div>
                      <p class="list-note">${escapeHtml(simpleRecordHint(view, item))}</p>
                    </button>
                  `
                )
                .join("")
            : renderSearchEmptyState(view, allCollection.length)
        }
      </div>
    </section>
    <section class="panel">
      ${selected ? renderDetailPanel(view, selected) : renderDetailEmptyState(view)}
    </section>
  `;

  document.querySelectorAll("[data-record-id]").forEach((button) => {
    button.addEventListener("click", () => {
      ui.selectedIds[view] = button.dataset.recordId;
      renderEntitySection(view);
    });
  });

  document.querySelector("#panelQuickAdd")?.addEventListener("click", () => {
    recordTypeEl.value = view;
    renderDynamicFields(view);
    quickAddModal.showModal();
  });
  document.querySelector("#panelQuickAddHero")?.addEventListener("click", () => {
    recordTypeEl.value = view;
    renderDynamicFields(view);
    quickAddModal.showModal();
  });

  document.querySelector("#panelUploadDocument")?.addEventListener("click", () => {
    openDocumentUploadModal();
  });

  document.querySelectorAll("[data-questionnaire-open]").forEach((button) => {
    button.addEventListener("click", async () => {
      const [resourceName, entityId, stage] = button.dataset.questionnaireOpen.split("|");
      await openQuestionnaire(resourceName, entityId, stage);
    });
  });

  document.querySelectorAll("[data-document-open]").forEach((button) => {
    button.addEventListener("click", () => {
      window.open(`/api/documents/${button.dataset.documentOpen}/file`, "_blank", "noopener");
    });
  });

  document.querySelectorAll("[data-document-upload]").forEach((button) => {
    button.addEventListener("click", () => {
      openDocumentUploadModal({
        documentType: button.dataset.documentType || "Evidence",
        linkedType: button.dataset.documentUploadType,
        linkedId: button.dataset.documentUpload
      });
    });
  });

  document.querySelectorAll("[data-project-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const project = state.collections.projects.find((item) => item.id === button.dataset.projectId);
      if (project) {
        handleProjectAction(button.dataset.projectAction, project);
      }
    });
  });

  document.querySelector("[data-upload-another-document]")?.addEventListener("click", () => {
    openDocumentUploadModal();
  });

  document.querySelectorAll("[data-record-edit]").forEach((button) => {
    button.addEventListener("click", () => {
      toggleRecordEditing(view, button.dataset.recordEdit);
    });
  });

  document.querySelectorAll("[data-record-save]").forEach((button) => {
    button.addEventListener("click", async () => {
      await saveRecordEdits(view, button.dataset.recordSave);
    });
  });

  document.querySelectorAll("[data-record-archive]").forEach((button) => {
    button.addEventListener("click", async () => {
      await archiveRecordFromUi(view, button.dataset.recordArchive);
    });
  });

  document.querySelectorAll("[data-record-delete]").forEach((button) => {
    button.addEventListener("click", async () => {
      await deleteRecordFromUi(view, button.dataset.recordDelete);
    });
  });

  document.querySelectorAll("[data-idea-promote]").forEach((button) => {
    button.addEventListener("click", async () => {
      await promoteIdeaFromUi(button.dataset.ideaPromote);
    });
  });

  document.querySelectorAll("[data-project-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      ui.projectTimelineFilter = button.dataset.projectFilter;
      renderEntitySection("projects");
    });
  });

  document.querySelectorAll("[data-activity-open]").forEach((button) => {
    button.addEventListener("click", () => {
      openSearchResult(button.dataset.activityResource, button.dataset.activityId);
      renderNav();
      renderView();
    });
  });

  document.querySelectorAll("[data-report-open]").forEach((button) => {
    button.addEventListener("click", () => {
      const [resourceName, recordId] = button.dataset.reportOpen.split("|");
      reportState.selectedKey = `${resourceName}:${recordId}`;
      setView("reports");
    });
  });

  document.querySelectorAll("[data-report-print]").forEach((button) => {
    button.addEventListener("click", () => {
      const [resourceName, recordId] = button.dataset.reportPrint.split("|");
      window.open(`/api/exports/${resourceName}/${recordId}/html`, "_blank", "noopener");
    });
  });
  document.querySelectorAll("[data-report-pdf]").forEach((button) => {
    button.addEventListener("click", () => {
      const [resourceName, recordId] = button.dataset.reportPdf.split("|");
      window.open(`/api/exports/${resourceName}/${recordId}/pdf`, "_blank", "noopener");
    });
  });
  document.querySelectorAll("[data-report-bundle]").forEach((button) => {
    button.addEventListener("click", () => {
      const [resourceName, recordId] = button.dataset.reportBundle.split("|");
      window.open(`/api/exports/${resourceName}/${recordId}/bundle`, "_blank", "noopener");
    });
  });
  bindActionCards(heroEl);
  bindActionCards(contentEl);
  bindNavigationActionButtons(heroEl);
  bindNavigationActionButtons(contentEl);
}

function renderBlueprintSection(view) {
  const blueprint = moduleBlueprints[view];

  if (!blueprint) {
    heroEl.innerHTML = "";
    contentEl.innerHTML = `<section class="panel"><div class="empty-state"><p>This module has not been configured yet.</p></div></section>`;
    return;
  }

  heroEl.innerHTML = blueprint.metrics
    .map(
      (metric, index) => `
        <article class="${index === 2 ? "highlight-card" : "metric-card"}">
          <p class="eyebrow">${metric.label}</p>
          <strong>${metric.value}</strong>
          <p class="metric-foot">${metric.foot}</p>
        </article>
      `
    )
    .join("");

  contentEl.innerHTML = `
    <section class="panel">
      <div class="panel-header">
        <div>
          <p class="eyebrow">${blueprint.eyebrow}</p>
          <h3>${labelForResource(view)}</h3>
        </div>
        <span class="meta-chip">${blueprint.navBadge}</span>
      </div>
      <div class="placeholder-grid">
        <article class="placeholder-panel">
          <h3>${blueprint.title}</h3>
          <p class="placeholder-copy">${blueprint.description}</p>
          <ul class="placeholder-list">
            ${blueprint.coverage.map((line) => `<li>${line}</li>`).join("")}
          </ul>
          <div class="detail-actions">
            ${blueprint.ctas.map((cta) => `<button class="pill-button" type="button" data-jump="${cta.view}">${cta.label}</button>`).join("")}
          </div>
        </article>
        <article class="placeholder-panel">
          <h3>Component stack</h3>
          <ul class="placeholder-list">
            ${blueprint.components.map((line) => `<li>${line}</li>`).join("")}
          </ul>
        </article>
      </div>
    </section>
    <section class="panel">
      <div class="panel-header">
        <div>
          <p class="eyebrow">Backend hooks</p>
          <h3>What this screen still needs</h3>
        </div>
      </div>
      <div class="detail-grid">
        ${blueprint.backend
          .map(
            (line) => `
              <article class="detail-card">
                <strong>Next backend step</strong>
                <p>${line}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;

  contentEl.querySelectorAll("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.jump));
  });
}

function renderDetailPanel(view, item) {
  const isEditing = ui.editingView === view && ui.editingId === item.id;
  const detail = detailConfig(view, item);
  const canQuestionnaire = ["projects", "trips", "productions"].includes(view);
  const linkedDocuments = view === "documents" ? [] : getLinkedDocumentsForEntity(view, item.id);
  const projectActivity = view === "projects" ? state.projectActivities[item.id] || null : null;

  if (view === "projects") {
    return renderProjectDossierPanel(item, detail, projectActivity, isEditing);
  }

  if (view === "documents") {
    return renderDocumentWorkspacePanel(item, detail, isEditing);
  }

  return `
    <div class="panel-header">
      <div>
        <p class="eyebrow">${detail.eyebrow}</p>
        <h3>${detail.title}</h3>
      </div>
      <div class="card-row">
        <button class="pill-button" type="button" data-record-edit="${item.id}">${isEditing ? "Cancel edit" : "Edit"}</button>
        <span class="status-chip ${statusClass(detail.status)}">${detail.status}</span>
      </div>
    </div>

    ${
      isEditing
        ? `
          <div class="sub-panel">
            <strong>Edit ${escapeHtml(recordTemplates[view]?.label || labelForResource(view))}</strong>
            ${renderRecordEditForm(view, item)}
            <div class="detail-actions">
              <button class="primary-button" type="button" data-record-save="${item.id}">Save changes</button>
              <button class="ghost-button" type="button" data-record-edit="${item.id}">Cancel</button>
            </div>
          </div>
        `
        : ""
    }

    <div class="sub-panel">
      <div class="record-topline">
        <strong>What to do next</strong>
        <span class="meta-chip">${detail.status}</span>
      </div>
      <p class="placeholder-copy">${escapeHtml(nextStepSummary(view, item, linkedDocuments))}</p>
      <div class="detail-actions">
        ${view === "documents" ? `<button class="pill-button" type="button" data-document-open="${item.id}">Open file</button>` : `<button class="pill-button" type="button" data-document-upload="${item.id}" data-document-upload-type="${singularLabelForView(view)}" data-document-type="Evidence">Upload document</button>`}
        ${canQuestionnaire ? `<button class="pill-button" type="button" data-questionnaire-open="${view}|${item.id}|opening">Opening interview</button>` : ""}
        ${canQuestionnaire ? `<button class="pill-button" type="button" data-questionnaire-open="${view}|${item.id}|closure">Closure questionnaire</button>` : ""}
        ${view === "ideas" ? `<button class="pill-button" type="button" data-idea-promote="${item.id}" ${item.promotedProjectId ? "disabled" : ""}>${item.promotedProjectId ? "Already promoted" : "Promote to project"}</button>` : ""}
      </div>
    </div>

    ${
      view === "documents"
        ? `
          <div class="sub-panel">
            <strong>Preview</strong>
            ${renderDocumentPreviewPanel(item)}
          </div>
          <div class="detail-actions">
            <button class="pill-button" type="button" data-upload-another-document>Upload another document</button>
          </div>
        `
        : `
          <div class="sub-panel">
            <div class="record-topline">
              <strong>Attached proof</strong>
              <span class="meta-chip">${linkedDocuments.length} file${linkedDocuments.length === 1 ? "" : "s"}</span>
            </div>
            ${
              linkedDocuments.length
                ? `
                  <div class="record-list">
                    ${linkedDocuments.map((document) => renderEvidenceGalleryCard(document)).join("")}
                  </div>
                `
              : `<p class="placeholder-copy">No linked documents yet. Upload a brief, receipt, agreement, or proof item from this record.</p>`
            }
          </div>
        `
    }

    <details class="detail-disclosure">
      <summary>More details</summary>
      <div class="detail-disclosure-body">
        <div class="detail-grid">
          ${detail.stats
            .map(
              (stat) => `
                <article class="detail-card">
                  <strong>${stat.label}</strong>
                  <p>${stat.value}</p>
                </article>
              `
            )
            .join("")}
          ${
            canQuestionnaire
              ? `
                <article class="detail-card">
                  <strong>Opening interview</strong>
                  <p>${formatQuestionnaireStatus(item.questionnaires?.opening)}</p>
                </article>
                <article class="detail-card">
                  <strong>Closure questionnaire</strong>
                  <p>${formatQuestionnaireStatus(item.questionnaires?.closure)}</p>
                </article>
              `
              : ""
          }
        </div>
        <div class="timeline">
          ${detail.timeline
            .map(
              (step) => `
                <article class="timeline-item">
                  <div class="timeline-topline">
                    <strong>${step.title}</strong>
                    <span class="status-chip ${step.tone}">${step.tag}</span>
                  </div>
                  <p>${step.body}</p>
                </article>
              `
            )
            .join("")}
        </div>
        <div class="sub-panel">
          <strong>System notes</strong>
          <ul class="issue-list">
            ${
              [...item.compliance.blockers.map((line) => `Blocker: ${line}`), ...item.compliance.warnings.map((line) => `Warning: ${line}`)]
                .map((line) => `<li>${line}</li>`)
                .join("") || "<li>No active blockers or warnings.</li>"
            }
          </ul>
          <div class="score-bar"><div class="score-fill" style="width: ${item.compliance.score}%"></div></div>
        </div>
        <div class="sub-panel">
          <strong>Dossier draft</strong>
          <pre class="dossier">${item.exportPreview}</pre>
          <div class="detail-actions">
            <button class="pill-button" type="button" data-record-archive="${item.id}">Archive</button>
            <button class="pill-button" type="button" data-record-delete="${item.id}">Delete</button>
          </div>
        </div>
      </div>
    </details>
  `;
}

function renderProjectDossierPanel(project, detail, activity, isEditing) {
  const timelineItems = filterProjectActivityItems(activity?.items || [], ui.projectTimelineFilter);
  const nextPrompt = projectNextPrompt(project, activity?.items || []);
  const linkedDocs = getLinkedDocumentsForEntity("projects", project.id);
  const projectInvoices = state.collections.invoices.filter((invoice) => invoice.projectId === project.id);
  const projectPayments = state.collections.payments.filter((payment) => projectInvoices.some((invoice) => invoice.id === payment.invoiceId));

  return `
    <div class="panel-header">
      <div>
        <p class="eyebrow">${detail.eyebrow}</p>
        <h3>${detail.title}</h3>
      </div>
      <div class="card-row">
        <button class="pill-button" type="button" data-record-edit="${project.id}">${isEditing ? "Cancel edit" : "Edit"}</button>
        <span class="status-chip ${statusClass(detail.status)}">${detail.status}</span>
      </div>
    </div>

    ${
      isEditing
        ? `
          <div class="sub-panel">
            <strong>Edit Project</strong>
            ${renderRecordEditForm("projects", project)}
            <div class="detail-actions">
              <button class="primary-button" type="button" data-record-save="${project.id}">Save changes</button>
              <button class="ghost-button" type="button" data-record-edit="${project.id}">Cancel</button>
            </div>
          </div>
        `
        : ""
    }

    <div class="sub-panel">
      <div class="record-topline">
        <strong>Where to focus next</strong>
        <span class="meta-chip">${escapeHtml(nextPrompt.tag)}</span>
      </div>
      <p class="placeholder-copy">${escapeHtml(nextPrompt.body)}</p>
      <div class="detail-actions">
        ${nextPrompt.actions
          .map((action) => `<button class="pill-button" type="button" data-project-action="${action.id}" data-project-id="${project.id}">${action.label}</button>`)
          .join("")}
      </div>
    </div>

    <div class="sub-panel">
      <strong>At a glance</strong>
      <div class="detail-grid">
        <article class="detail-card">
          <strong>Updates and work</strong>
          <p>${project.linkedTripIds.length + project.linkedProductionIds.length} linked work item(s)</p>
        </article>
        <article class="detail-card">
          <strong>Money logged</strong>
          <p>${project.linkedExpenseIds.length} expense(s) and ${projectInvoices.length} invoice(s)</p>
        </article>
        <article class="detail-card">
          <strong>Files on hand</strong>
          <p>${linkedDocs.length} linked proof file(s)</p>
        </article>
        <article class="detail-card">
          <strong>Payments recorded</strong>
          <p>${projectPayments.length} payment record(s)</p>
        </article>
      </div>
    </div>

    <div class="sub-panel">
      <div class="record-topline">
        <strong>Work from inside this project</strong>
        <span class="meta-chip">Default workflow</span>
      </div>
      <p class="placeholder-copy">Treat this page like the living business file for the project. Keep updates, expenses, work logs, invoices, and proof connected here.</p>
      <div class="detail-actions">
        <button class="primary-button" type="button" data-project-action="update" data-project-id="${project.id}">Log update</button>
        <button class="pill-button" type="button" data-project-action="document" data-project-id="${project.id}">Upload proof</button>
        <button class="pill-button" type="button" data-project-action="expense" data-project-id="${project.id}">Add expense</button>
        <button class="pill-button" type="button" data-project-action="trip" data-project-id="${project.id}">Add trip</button>
        <button class="pill-button" type="button" data-project-action="production" data-project-id="${project.id}">Add production</button>
        ${projectInvoices[0] ? `<button class="pill-button" type="button" data-nav-record="invoices|${projectInvoices[0].id}">Open money trail</button>` : `<button class="pill-button" type="button" data-nav-record="billing|">Open money trail</button>`}
      </div>
      <div class="detail-actions">
        <button class="pill-button" type="button" data-questionnaire-open="projects|${project.id}|opening">Opening interview</button>
        <button class="pill-button" type="button" data-questionnaire-open="projects|${project.id}|closure">Closure questionnaire</button>
        <button class="pill-button" type="button" data-report-open="projects|${project.id}">Open report view</button>
        <button class="pill-button" type="button" data-report-bundle="projects|${project.id}">Download bundle</button>
        <button class="pill-button" type="button" data-report-pdf="projects|${project.id}">Download PDF</button>
        <button class="pill-button" type="button" data-report-print="projects|${project.id}">Print / Save as PDF</button>
      </div>
    </div>

    <div class="sub-panel">
      <div class="record-topline">
        <strong>Follow the trail</strong>
        <span class="meta-chip">${timelineItems.length} item(s)</span>
      </div>
      <div class="detail-actions">
        <button class="pill-button${ui.projectTimelineFilter === "all" ? " active-filter" : ""}" type="button" data-project-filter="all">All</button>
        <button class="pill-button${ui.projectTimelineFilter === "money" ? " active-filter" : ""}" type="button" data-project-filter="money">Money</button>
        <button class="pill-button${ui.projectTimelineFilter === "evidence" ? " active-filter" : ""}" type="button" data-project-filter="evidence">Evidence</button>
        <button class="pill-button${ui.projectTimelineFilter === "updates" ? " active-filter" : ""}" type="button" data-project-filter="updates">Updates</button>
        <button class="pill-button${ui.projectTimelineFilter === "travel" ? " active-filter" : ""}" type="button" data-project-filter="travel">Travel</button>
        <button class="pill-button${ui.projectTimelineFilter === "billing" ? " active-filter" : ""}" type="button" data-project-filter="billing">Billing</button>
      </div>
      ${
        activity
          ? timelineItems.length
            ? `<div class="timeline">${timelineItems.map(renderProjectActivityItem).join("")}</div>`
            : `<p class="placeholder-copy">No timeline items match this filter yet.</p>`
          : `<p class="placeholder-copy">Loading project activity...</p>`
      }
    </div>

    <details class="detail-disclosure">
      <summary>More project details</summary>
      <div class="detail-disclosure-body">
        <div class="detail-grid">
          ${detail.stats
            .map(
              (stat) => `
                <article class="detail-card">
                  <strong>${stat.label}</strong>
                  <p>${stat.value}</p>
                </article>
              `
            )
            .join("")}
          <article class="detail-card">
            <strong>Opening interview</strong>
            <p>${formatQuestionnaireStatus(project.questionnaires?.opening)}</p>
          </article>
          <article class="detail-card">
            <strong>Closure questionnaire</strong>
            <p>${formatQuestionnaireStatus(project.questionnaires?.closure)}</p>
          </article>
        </div>
        <div class="sub-panel">
          <strong>System notes</strong>
          <ul class="issue-list">
            ${
              [...project.compliance.blockers.map((line) => `Blocker: ${line}`), ...project.compliance.warnings.map((line) => `Warning: ${line}`)]
                .map((line) => `<li>${line}</li>`)
                .join("") || "<li>No active blockers or warnings.</li>"
            }
          </ul>
          <div class="score-bar"><div class="score-fill" style="width: ${project.compliance.score}%"></div></div>
        </div>
        <div class="sub-panel">
          <strong>Dossier draft</strong>
          <pre class="dossier">${project.exportPreview}</pre>
          <div class="detail-actions">
            <button class="pill-button" type="button" data-record-archive="${project.id}">Archive</button>
            <button class="pill-button" type="button" data-record-delete="${project.id}">Delete</button>
          </div>
        </div>
      </div>
    </details>
  `;
}

function renderProjectActivityItem(item) {
  const documentCount = (item.linkedDocumentIds || []).length;
  const hints = (item.complianceHints || []).slice(0, 2);
  return `
    <article class="timeline-item">
      <div class="timeline-topline">
        <strong>${escapeHtml(item.title)}</strong>
        <span class="status-chip ${statusClass(item.status || "Active")}">${escapeHtml(item.status || "Active")}</span>
      </div>
      <p>${escapeHtml(item.summary || "No summary recorded.")}</p>
      <div class="list-meta">
        <p>${escapeHtml(labelForResource(item.sourceResource))} | ${escapeHtml(formatDate(item.timestamp || ""))}</p>
        <p>${documentCount ? `${documentCount} linked file(s)` : "No linked files"}</p>
      </div>
      ${
        hints.length
          ? `<ul class="issue-list">${hints.map((hint) => `<li>${escapeHtml(hint)}</li>`).join("")}</ul>`
          : ""
      }
      <div class="detail-actions">
        <button class="pill-button" type="button" data-activity-open data-activity-resource="${item.sourceResource}" data-activity-id="${item.sourceId}">Open source</button>
      </div>
    </article>
  `;
}

function filterProjectActivityItems(items, filter) {
  if (filter === "all") {
    return items;
  }

  const filters = {
    money: new Set(["expense", "invoice", "payment"]),
    evidence: new Set(["document"]),
    updates: new Set(["capture"]),
    travel: new Set(["trip", "production"]),
    billing: new Set(["invoice", "payment", "reminder"])
  };

  return items.filter((item) => filters[filter]?.has(item.kind));
}

function projectNextPrompt(project, items) {
  const blockers = project.compliance?.blockers || [];
  const warnings = project.compliance?.warnings || [];
  const latestItem = items[0];

  if (blockers.some((line) => line.toLowerCase().includes("trip"))) {
    return {
      tag: "Closure gap",
      body: "This project is mainly blocked by travel not being fully closed. Review the trip item and finish the closure side before you treat the project as complete.",
      actions: [
        { id: "trip", label: "Add or review trip work" },
        { id: "document", label: "Upload missing proof" }
      ]
    };
  }

  if (blockers.some((line) => line.toLowerCase().includes("production"))) {
    return {
      tag: "Production follow-up",
      body: "The project still depends on production records being properly closed. Use the project timeline to open the latest production and finish the missing detail.",
      actions: [
        { id: "production", label: "Add production context" },
        { id: "update", label: "Log project update" }
      ]
    };
  }

  if (warnings.some((line) => line.toLowerCase().includes("expense"))) {
    return {
      tag: "Expense cleanup",
      body: "The project mostly needs money records cleaned up. Add the missing purpose or proof while it is still fresh.",
      actions: [
        { id: "expense", label: "Add expense" },
        { id: "document", label: "Upload proof" }
      ]
    };
  }

  return {
    tag: latestItem ? "Latest activity" : "Ready",
    body: latestItem
      ? `The newest item in this dossier is "${latestItem.title}". If you are continuing that work, open it from the timeline below or log the next update here.`
      : "This project is in a good state. Keep logging updates, proof, and spend from inside the dossier so the paper trail stays complete.",
    actions: [
      { id: "update", label: "Log update" },
      { id: "document", label: "Upload proof" }
    ]
  };
}

function renderRecordEditForm(view, item) {
  const template = recordTemplates[view];
  if (!template) {
    return "";
  }

  return `
    <div class="field-grid">
      ${template.fields.map((field) => renderRecordEditField(view, field, item)).join("")}
    </div>
  `;
}

function renderRecordEditField(view, field, item) {
  const relationMarkup = renderInlineRelationField(view, field, item);
  if (relationMarkup) {
    return relationMarkup;
  }

  const rawValue = item[field.name];
  const value = Array.isArray(rawValue) ? rawValue.join(", ") : rawValue || "";
  const span = field.full ? "full" : "half";

  if (field.type === "textarea") {
    return `
      <label class="field" data-span="${span}">
        <span>${field.label}</span>
        <textarea data-record-edit-field="${view}|${item.id}|${field.name}">${escapeHtml(value)}</textarea>
      </label>
    `;
  }

  if (field.type === "select") {
    return `
      <label class="field" data-span="${span}">
        <span>${field.label}</span>
        <select data-record-edit-field="${view}|${item.id}|${field.name}">
          ${field.options.map((option) => `<option value="${option}" ${String(value) === option ? "selected" : ""}>${option || "None"}</option>`).join("")}
        </select>
      </label>
    `;
  }

  return `
    <label class="field" data-span="${span}">
      <span>${field.label}</span>
      <input type="${field.type}" value="${escapeHtml(value)}" data-record-edit-field="${view}|${item.id}|${field.name}" />
    </label>
  `;
}

function renderInlineRelationField(view, field, item) {
  const relation = relationDescriptor(view, field, item);
  if (!relation) {
    return "";
  }

  const collection = state.collections[relation.resourceName] || [];
  const currentValue = item[field.name] || "";
  return `
    <label class="field" data-span="${field.full ? "full" : "half"}">
      <span>${field.label}</span>
      <select data-record-edit-field="${view}|${item.id}|${field.name}">
        ${relation.includeBlankLabel ? `<option value="">${relation.includeBlankLabel}</option>` : ""}
        ${collection.map((entry) => `<option value="${entry.id}" ${entry.id === currentValue ? "selected" : ""}>${escapeHtml(primaryLabel(relation.resourceName, entry))}</option>`).join("")}
      </select>
    </label>
  `;
}

function renderBillingInvoiceDetail(invoice, selectedPayment) {
  const linkedDocs = invoiceLinkedDocuments(invoice);
  const relatedPayments = state.collections.payments.filter((payment) => payment.invoiceId === invoice.id);
  const activePayment = relatedPayments.find((payment) => payment.id === selectedPayment?.id) || relatedPayments[0];
  const projectLabel = invoiceProjectLabel(invoice);
  const counterparty = invoicePersonLabel(invoice);
  const nextPrompt = billingNextPrompt(invoice, linkedDocs, relatedPayments, activePayment);

  if (activePayment) {
    ui.selectedIds.payments = activePayment.id;
  }

  return `
    <div class="panel-header">
      <div>
        <p class="eyebrow">Invoice Detail</p>
        <h3>${invoice.invoiceNumber}</h3>
      </div>
      <div class="card-row">
        <span class="status-chip ${statusClass(invoice.status)}">${invoice.status}</span>
      </div>
    </div>

    <div class="sub-panel">
      <div class="record-topline">
        <strong>What to do next</strong>
        <span class="meta-chip">${nextPrompt.tag}</span>
      </div>
      <p class="placeholder-copy">${nextPrompt.body}</p>
      <div class="detail-actions">
        ${nextPrompt.actions
          .map((action) => `<button class="pill-button" type="button" data-billing-action="${action.id}">${action.label}</button>`)
          .join("")}
      </div>
    </div>

    <div class="sub-panel">
      <strong>Billing snapshot</strong>
      <div class="detail-grid">
        <article class="detail-card">
          <strong>Total amount</strong>
          <p>${currency(invoice.totalAmount)}</p>
        </article>
        <article class="detail-card">
          <strong>Project</strong>
          <p>${projectLabel}</p>
        </article>
        <article class="detail-card">
          <strong>Counterparty</strong>
          <p>${counterparty}</p>
        </article>
        <article class="detail-card">
          <strong>Payments</strong>
          <p>${relatedPayments.length} recorded</p>
        </article>
      </div>
    </div>

    <div class="sub-panel">
      <div class="record-topline">
        <strong>Invoice file</strong>
        <button class="pill-button" type="button" data-document-upload="${invoice.id}" data-document-upload-type="Invoice" data-document-type="Invoice">Upload invoice</button>
      </div>
      ${
        linkedDocs.length
          ? `<div class="record-list">${linkedDocs.map((document) => renderEvidenceGalleryCard(document)).join("")}</div>`
          : `<p class="placeholder-copy">No invoice file is linked yet.</p>`
      }
    </div>

    <div class="sub-panel">
      <div class="record-topline">
        <strong>Money trail</strong>
        <button class="pill-button" type="button" data-billing-action="payment">Record payment</button>
      </div>
      ${
        relatedPayments.length
          ? `
            <div class="record-list">
              ${relatedPayments.map((payment) => renderBillingPaymentRow(payment, payment.id === activePayment?.id)).join("")}
            </div>
          `
          : `<p class="placeholder-copy">No payment has been recorded for this invoice yet.</p>`
      }
      ${activePayment ? renderBillingPaymentDetail(activePayment) : ""}
    </div>

    <details class="detail-disclosure">
      <summary>More billing details</summary>
      <div class="detail-disclosure-body">
        <div class="detail-grid">
          <article class="detail-card">
            <strong>Direction</strong>
            <p>${invoice.direction}</p>
          </article>
          <article class="detail-card">
            <strong>Total amount</strong>
            <p>${currency(invoice.totalAmount)}</p>
          </article>
          <article class="detail-card">
            <strong>Project</strong>
            <p>${projectLabel}</p>
          </article>
          <article class="detail-card">
            <strong>Counterparty</strong>
            <p>${counterparty}</p>
          </article>
        </div>
        <div class="timeline">
          <article class="timeline-item">
            <div class="timeline-topline">
              <strong>Issue timeline</strong>
              <span class="status-chip status-review">${invoice.issueDate || "Pending"}</span>
            </div>
            <p>Issued ${invoice.issueDate || "not yet"} and due ${invoice.dueDate || "not yet set"}.</p>
          </article>
          <article class="timeline-item">
            <div class="timeline-topline">
              <strong>File coverage</strong>
              <span class="status-chip ${linkedDocs.length ? "status-final" : "status-open"}">${linkedDocs.length ? `${linkedDocs.length} file(s)` : "Missing"}</span>
            </div>
            <p>${linkedDocs.length ? "Invoice documents are linked and previewable." : "Upload the invoice file so the billing record stays defensible."}</p>
          </article>
          <article class="timeline-item">
            <div class="timeline-topline">
              <strong>Payments</strong>
              <span class="status-chip ${relatedPayments.length ? "status-final" : "status-review"}">${relatedPayments.length ? `${relatedPayments.length} recorded` : "Not paid yet"}</span>
            </div>
            <p>${relatedPayments.length ? "Payment activity is attached below, including proof documents." : "Record payment once funds are received or sent."}</p>
          </article>
        </div>
        <div class="sub-panel">
          <strong>System notes</strong>
          <ul class="issue-list">
            ${
              [...invoice.compliance.blockers.map((line) => `Blocker: ${line}`), ...invoice.compliance.warnings.map((line) => `Warning: ${line}`)]
                .map((line) => `<li>${line}</li>`)
                .join("") || "<li>No active blockers or warnings.</li>"
            }
          </ul>
          <div class="score-bar"><div class="score-fill" style="width: ${invoice.compliance.score}%"></div></div>
        </div>
        <div class="sub-panel">
          <strong>Billing preview</strong>
          <pre class="dossier">${invoice.exportPreview}</pre>
        </div>
      </div>
    </details>
  `;
}

function renderBillingPaymentRow(payment, isActive) {
  const proof = paymentProofDocument(payment);
  return `
    <button class="record-button${isActive ? " active" : ""}" type="button" data-billing-payment="${payment.id}">
      <div class="record-topline">
        <div>
          <h4 class="record-title">${payment.method || "Payment"}</h4>
          <p>${payment.paidAt || "Date missing"} | ${currency(payment.amount)}</p>
        </div>
        <span class="status-chip ${proof ? "status-final" : "status-review"}">${proof ? "Proof linked" : "Proof missing"}</span>
      </div>
    </button>
  `;
}

function renderBillingPaymentDetail(payment) {
  const proof = paymentProofDocument(payment);
  return `
    <div class="detail-grid">
      <article class="detail-card">
        <strong>Payment amount</strong>
        <p>${currency(payment.amount)}</p>
      </article>
      <article class="detail-card">
        <strong>Method</strong>
        <p>${payment.method || "Missing"}</p>
      </article>
      <article class="detail-card">
        <strong>Paid at</strong>
        <p>${payment.paidAt || "Missing"}</p>
      </article>
      <article class="detail-card">
        <strong>Proof document</strong>
        <p>${proof?.fileName || "Missing"}</p>
      </article>
    </div>
    <div class="detail-actions">
      <button class="pill-button" type="button" data-document-upload="${payment.id}" data-document-upload-type="Payment" data-document-type="Payment Proof">Upload proof</button>
      ${proof ? `<button class="pill-button" type="button" data-document-open="${proof.id}">Open proof</button>` : ""}
    </div>
    ${
      proof
        ? `<div class="record-list">${renderEvidenceGalleryCard(proof)}</div>`
        : `<p class="placeholder-copy">Link a payment proof file to close the evidence loop.</p>`
    }
  `;
}

function billingNextPrompt(invoice, linkedDocs, relatedPayments, activePayment) {
  if (!linkedDocs.length) {
    return {
      tag: "Missing invoice file",
      body: "The most immediate gap is the invoice itself. Add the invoice file before anything else so the money trail starts with proper evidence.",
      actions: [
        { id: "upload-invoice", label: "Upload invoice file" }
      ]
    };
  }

  if (!relatedPayments.length && !["Paid", "Collected"].includes(invoice.status)) {
    return {
      tag: "Awaiting payment",
      body: "This invoice has supporting files, but there is no payment record yet. Record payment when money moves so the trail stays complete.",
      actions: [
        { id: "payment", label: "Record payment" }
      ]
    };
  }

  if (relatedPayments.length && activePayment && !paymentProofDocument(activePayment)) {
    return {
      tag: "Proof missing",
      body: "A payment was recorded, but the proof file is still missing. Upload the transfer confirmation or receipt next.",
      actions: [
        { id: "payment", label: "Review payment" }
      ]
    };
  }

  return {
    tag: "Healthy",
    body: "This billing trail looks usable right now. The next best step is usually to review dates, files, and payment status only when something changes.",
    actions: [
      { id: "invoice", label: "New invoice" }
    ]
  };
}

function nextStepSummary(view, item, linkedDocuments = []) {
  const blockers = item.compliance?.blockers || [];
  const warnings = item.compliance?.warnings || [];

  if (blockers.length) {
    return blockers[0];
  }

  if (view !== "documents" && !linkedDocuments.length) {
    return "Add proof or a supporting file while the details are still easy to remember.";
  }

  if (view === "ideas" && !item.promotedProjectId) {
    return "Keep this lightweight until it deserves a real project, then promote it in one step.";
  }

  if (view === "knowledge" && !item.linkedType) {
    return "This note is fine as a standalone reference, but linking it later will make it easier to retrieve in context.";
  }

  if (warnings.length) {
    return warnings[0];
  }

  return "This record looks healthy. Only come back when something changes or you need to retrieve it later.";
}

function detailConfig(view, item) {
  if (view === "projects") {
    return {
      eyebrow: "Project Record",
      title: item.title,
      status: item.closureStatus || item.status,
      stats: [
        { label: "Commercial objective", value: item.commercialObjective },
        { label: "Revenue outcome", value: item.revenueOutcome || "Not yet captured" },
        { label: "Timeline", value: item.timeline || `${item.plannedStart || "TBD"} to ${item.plannedEnd || "TBD"}` },
        { label: "Linked evidence", value: `${item.linkedTripIds.length} trip(s), ${item.linkedProductionIds.length} production(s), ${item.linkedExpenseIds.length} expense(s)` }
      ],
      timeline: [
        { title: "Intent record", body: item.commercialObjective, tag: "Opening", tone: "status-ok" },
        { title: "Evidence linkage", body: `${item.linkedTripIds.length} trips, ${item.linkedProductionIds.length} productions, and ${item.linkedExpenseIds.length} expenses are currently attached.`, tag: "In motion", tone: "status-review" },
        { title: "Closure narrative", body: item.narrative || "No closure narrative written yet.", tag: item.closureStatus || item.status, tone: statusClass(item.closureStatus || item.status) }
      ]
    };
  }

  if (view === "trips") {
    return {
      eyebrow: "Trip Record",
      title: item.title,
      status: item.closureStatus,
      stats: [
        { label: "Business purpose", value: item.purpose },
        { label: "Route", value: `${item.originSummary} -> ${item.destinationSummary}` },
        { label: "Schedule", value: `${item.startDate} to ${item.endDate}` },
        { label: "Budget", value: `${currency(item.estimatedBudget)} estimated / ${currency(item.actualSpend)} actual` }
      ],
      timeline: [
        { title: "Opening intent", body: item.briefSaved ? "Pre-trip brief saved with the record." : "Pre-trip brief still missing.", tag: item.briefSaved ? "Captured" : "Missing", tone: item.briefSaved ? "status-ok" : "status-open" },
        { title: "During trip evidence", body: item.duringTripComplete ? "Daily logs and evidence capture are in progress or complete." : "During-trip logging has not been completed.", tag: item.duringTripComplete ? "Tracked" : "Gap", tone: item.duringTripComplete ? "status-ok" : "status-open" },
        { title: "Post-trip closure", body: item.outcomeNotes, tag: item.postTripComplete ? "Ready" : "Pending", tone: item.postTripComplete ? "status-final" : "status-review" }
      ]
    };
  }

  if (view === "productions") {
    return {
      eyebrow: "Production Record",
      title: item.title,
      status: item.closureStatus,
      stats: [
        { label: "Business purpose", value: item.businessPurpose },
        { label: "Format", value: item.contentType },
        { label: "Platform intent", value: item.platformIntent },
        { label: "Publication", value: item.publishedUrl || `Target publish date ${item.publishTargetDate || "TBD"}` }
      ],
      timeline: [
        { title: "Opening intent", body: item.businessPurpose, tag: "Captured", tone: "status-ok" },
        { title: "Role evidence", body: item.roleDocumentationComplete ? "People, roles, and work proof are documented." : "Role confirmation is still incomplete.", tag: item.roleDocumentationComplete ? "Ready" : "Pending", tone: item.roleDocumentationComplete ? "status-final" : "status-open" },
        { title: "Publication state", body: item.publishedUrl ? `Published at ${item.publishedUrl}.` : "Not published yet. Keep follow-up pressure active.", tag: item.publishedUrl ? "Live" : "Follow up", tone: item.publishedUrl ? "status-final" : "status-review" }
      ]
    };
  }

  if (view === "expenses") {
    return {
      eyebrow: "Expense Record",
      title: item.title,
      status: item.compliance.blockers.length ? "Needs evidence" : "Compliant",
      stats: [
        { label: "Category", value: item.category },
        { label: "Amount", value: currency(item.amount) },
        { label: "Business purpose", value: item.businessPurpose || "Missing" },
        {
          label: "Linkage",
          value: [projectTitleById(item.linkedProjectId), item.linkedTripId ? "Trip linked" : "", item.linkedProductionId ? "Production linked" : "", item.contentConnection || ""]
            .filter(Boolean)
            .join(" | ") || "No linkage yet"
        }
      ],
      timeline: [
        { title: "Capture", body: `Recorded on ${formatDate(item.expenseDate)} and created ${entryLagLabel(item)}.`, tag: "Timestamped", tone: "status-ok" },
        { title: "Purpose validation", body: item.businessPurpose ? item.businessPurpose : "Business purpose is required by the blueprint and is currently missing.", tag: item.businessPurpose ? "Present" : "Missing", tone: item.businessPurpose ? "status-ok" : "status-open" },
        { title: "Document proof", body: item.receiptAttached ? "Receipt is attached." : "Receipt is missing and should trigger a reminder.", tag: item.receiptAttached ? "Attached" : "Missing", tone: item.receiptAttached ? "status-final" : "status-open" }
      ]
    };
  }

  if (view === "people") {
    return {
      eyebrow: "People Record",
      title: item.fullName,
      status: item.compliance.blockers.length ? "Needs evidence" : "Ready",
      stats: [
        { label: "Type", value: item.personType },
        { label: "Role summary", value: item.roleSummary },
        { label: "Agreement", value: item.agreementOnFile ? "On file" : "Missing" },
        { label: "Rate justification", value: item.marketRateJustified ? "Documented" : "Missing" }
      ],
      timeline: [
        { title: "Role definition", body: item.roleSummary, tag: "Captured", tone: "status-ok" },
        { title: "Contractor controls", body: item.agreementOnFile ? "Agreement present." : "Agreement missing.", tag: item.agreementOnFile ? "Ready" : "Gap", tone: item.agreementOnFile ? "status-final" : "status-open" },
        { title: "Work proof", body: item.workLogsLinked ? "Work logs are linked to the person record." : "Work logs still need to be attached.", tag: item.workLogsLinked ? "Linked" : "Pending", tone: item.workLogsLinked ? "status-final" : "status-review" }
      ]
    };
  }

  if (view === "documents") {
    return {
      eyebrow: "Document Record",
      title: item.fileName,
      status: item.status || "Linked",
      stats: [
        { label: "Document type", value: item.documentType || "Evidence" },
        { label: "Linked record", value: linkedRecordLabel(item) },
        { label: "MIME type", value: item.mimeType || "Missing" },
        { label: "Storage path", value: item.storagePath || "Missing" }
      ],
      timeline: [
        { title: "Evidence link", body: `${item.fileName} is linked to ${linkedRecordLabel(item)}.`, tag: item.status || "Linked", tone: statusClass(item.status || "Linked") },
        { title: "Storage status", body: item.storagePath ? `Stored at ${item.storagePath}.` : "Storage path is missing.", tag: item.storagePath ? "Tracked" : "Missing", tone: item.storagePath ? "status-ok" : "status-open" },
        { title: "Evidence note", body: item.note || "No evidence note has been added yet.", tag: item.note ? "Documented" : "Missing", tone: item.note ? "status-final" : "status-review" }
      ]
    };
  }

  if (view === "ideas") {
    return {
      eyebrow: "Idea Record",
      title: item.title,
      status: item.status || "Captured",
      stats: [
        { label: "Hook", value: item.hook || "Not written yet" },
        { label: "Platform fit", value: item.platformFit || "Not set" },
        { label: "Commercial angle", value: item.commercialAngle || "Still needs shaping" },
        { label: "Promoted project", value: projectTitleById(item.promotedProjectId) || "Not promoted yet" }
      ],
      timeline: [
        { title: "Idea captured", body: item.summary || "No summary recorded yet.", tag: item.status || "Captured", tone: statusClass(item.status || "Captured") },
        { title: "Business angle", body: item.commercialAngle || "Still needs a clearer business case.", tag: item.commercialAngle ? "Defined" : "Needs work", tone: item.commercialAngle ? "status-ok" : "status-review" },
        { title: "Operational next step", body: item.promotedProjectId ? `Promoted into ${projectTitleById(item.promotedProjectId)}.` : "Promote this idea when it deserves project-level tracking.", tag: item.promotedProjectId ? "Promoted" : "Idea stage", tone: item.promotedProjectId ? "status-final" : "status-review" }
      ]
    };
  }

  if (view === "knowledge") {
    return {
      eyebrow: "Library Note",
      title: item.title,
      status: item.category || "Reference",
      stats: [
        { label: "Category", value: item.category || "Reference" },
        { label: "Summary", value: item.summary || "No summary yet" },
        { label: "Linked record", value: item.linkedType ? linkedRecordLabel(item) : "Not linked" },
        { label: "Tags", value: (item.tags || []).join(", ") || "No tags" }
      ],
      timeline: [
        { title: "Note captured", body: item.summary || "No summary recorded yet.", tag: item.category || "Reference", tone: "status-ok" },
        { title: "Reusable knowledge", body: item.content || "Write the reusable detail or checklist here.", tag: item.content ? "Documented" : "Needs detail", tone: item.content ? "status-final" : "status-review" },
        { title: "Operational link", body: item.linkedType ? `Linked to ${linkedRecordLabel(item)}.` : "Link this note to a project, person, invoice, or document when useful.", tag: item.linkedType ? "Linked" : "Standalone", tone: item.linkedType ? "status-ok" : "status-review" }
      ]
    };
  }

  return {
    eyebrow: "Reminder",
    title: item.title,
    status: item.severity,
    stats: [
      { label: "Due date", value: item.dueDate },
      { label: "Severity", value: item.severity },
      { label: "Linked entity", value: item.linkedType },
      { label: "Note", value: item.note || "No note" }
    ],
    timeline: [
      { title: "Reminder created", body: "This reminder acts as operational pressure so missing documentation does not wait until tax season.", tag: "System", tone: "status-ok" },
      { title: "Current state", body: isOverdue(item.dueDate) ? "This reminder is overdue." : "This reminder is upcoming or due soon.", tag: isOverdue(item.dueDate) ? "Overdue" : "Active", tone: isOverdue(item.dueDate) ? "status-open" : "status-review" }
    ]
  };
}

function sectionSummary(view, collection) {
  const scores = collection.map((item) => item.compliance.score);
  const averageScore = scores.length ? Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length) : 0;
  const blockerCount = collection.reduce((sum, item) => sum + item.compliance.blockers.length, 0);

  const summaries = {
    projects: {
      title: "Projects keep related work, spend, and files together.",
      description: "Use a project as the main place to log updates, receipts, files, and progress over time.",
      listTitle: "Project register",
      caption: "The main records for active and completed work."
    },
    trips: {
      title: "Trips need pre, during, and post documentation states.",
      description: "Travel is treated as a dossier workflow rather than a simple calendar entry, which matches the blueprint's audit-first design.",
      listTitle: "Trip register",
      caption: "Travel records with closure readiness and evidence gaps."
    },
    productions: {
      title: "Productions should prove what was planned, produced, and published.",
      description: "This module captures the bridge between field activity and actual content output.",
      listTitle: "Production log",
      caption: "Shoot and content records linked to people and costs."
    },
    expenses: {
      title: "Expenses keep the amount, reason, and receipt together.",
      description: "Log spend once, attach the receipt, and keep it connected to the right project when relevant.",
      listTitle: "Expense register",
      caption: "Saved expenses and receipts."
    },
    people: {
      title: "People records should prove role, agreement, and work actually performed.",
      description: "This is where contractor defensibility lives, especially once invoices, work logs, and rate justification are added.",
      listTitle: "People and roles",
      caption: "Collaborators, clients, and contractors."
    },
    documents: {
      title: "Files hold receipts, contracts, briefs, and supporting uploads.",
      description: "Every file should be easy to find later and easy to connect back to the project, expense, person, or invoice it supports.",
      listTitle: "Files",
      caption: "Receipts and supporting files."
    },
    reminders: {
      title: "Reminders are an engine, not a passive task list.",
      description: "The blueprint wants condition-based reminders triggered by missing evidence, overdue closure, and compliance gaps.",
      listTitle: "Reminder queue",
      caption: "Follow-up pressure to keep records audit-ready."
    },
    ideas: {
      title: "Ideas stay lightweight until they deserve a full project.",
      description: "Save concepts quickly, then promote only the ones that become real work.",
      listTitle: "Idea queue",
      caption: "Saved ideas and concepts."
    },
    knowledge: {
      title: "Notes make repeat work easier to retrieve and reuse.",
      description: "Use this area for checklists, references, and saved notes you want to come back to later.",
      listTitle: "Notes",
      caption: "Reusable notes and checklists."
    }
  };

  return {
    count: collection.length,
    averageScore,
    blockerCount,
    ...summaries[view]
  };
}

function renderRecordTypeOptions() {
  recordTypeEl.innerHTML = Object.entries(recordTemplates)
    .filter(([key]) => key !== "documents")
    .map(([key, template]) => `<option value="${key}">${template.label}</option>`)
    .join("");
}

function renderDynamicFields(type) {
  const template = recordTemplates[type];
  dynamicFieldsEl.innerHTML = template.fields
    .map((field) => {
      const relationMarkup = renderRelationField(type, field);
      if (relationMarkup) {
        return relationMarkup;
      }

      if (field.type === "textarea") {
        return `
          <label class="field" data-span="${field.full ? "full" : "half"}">
            <span>${field.label}</span>
            <textarea name="${field.name}" placeholder="${field.placeholder || ""}" ${field.required ? "required" : ""}></textarea>
          </label>
        `;
      }

      if (field.type === "select") {
        return `
          <label class="field" data-span="${field.full ? "full" : "half"}">
            <span>${field.label}</span>
            <select name="${field.name}" ${field.required ? "required" : ""}>
              ${field.options.map((option) => `<option value="${option}">${option}</option>`).join("")}
            </select>
          </label>
        `;
      }

      return `
        <label class="field" data-span="${field.full ? "full" : "half"}">
          <span>${field.label}</span>
          <input name="${field.name}" type="${field.type}" placeholder="${field.placeholder || ""}" ${field.required ? "required" : ""} />
        </label>
      `;
    })
    .join("");

  if (type === "documents" || type === "knowledge") {
    const linkedTypeField = dynamicFieldsEl.querySelector('[name="linkedType"]');
    linkedTypeField?.addEventListener("change", () => {
      renderDynamicFields(type);
    });
  }
}

function renderRelationField(type, field) {
  const relation = relationDescriptor(type, field);
  if (!relation) {
    return "";
  }

  const options = buildRelationOptions(relation.resourceName, relation.includeBlankLabel);

  return `
    <label class="field" data-span="${field.full ? "full" : "half"}">
      <span>${field.label}</span>
      <select name="${field.name}" ${field.required ? "required" : ""}>
        ${options}
      </select>
    </label>
  `;
}

function relationDescriptor(type, field, item = null) {
  if (field.name === "linkedProjectId") return { resourceName: "projects", includeBlankLabel: "No project yet" };
  if (field.name === "projectId") return { resourceName: "projects", includeBlankLabel: "No project" };
  if (field.name === "personId") return { resourceName: "people", includeBlankLabel: "No person" };
  if (field.name === "invoiceId") return { resourceName: "invoices", includeBlankLabel: "Choose invoice" };
  if (field.name === "proofDocumentId") return { resourceName: "documents", includeBlankLabel: "No proof linked" };

  if (type === "documents" && field.name === "linkedId") {
    const linkedTypeValue = dynamicFieldsEl.querySelector('[name="linkedType"]')?.value || item?.linkedType || "Project";
    return {
      resourceName: relationResourceForLinkedType(linkedTypeValue),
      includeBlankLabel: "Choose record"
    };
  }

  if (type === "knowledge" && field.name === "linkedId") {
    const linkedTypeValue = dynamicFieldsEl.querySelector('[name="linkedType"]')?.value || item?.linkedType || "Project";
    return {
      resourceName: relationResourceForLinkedType(linkedTypeValue),
      includeBlankLabel: "No linked record"
    };
  }

  return null;
}

function buildRelationOptions(resourceName, blankLabel) {
  const collection = state.collections[resourceName] || [];
  const view = resourceName;
  const options = [];

  if (blankLabel) {
    options.push(`<option value="">${blankLabel}</option>`);
  }

  for (const item of collection) {
    options.push(`<option value="${item.id}">${escapeHtml(primaryLabel(view, item))}</option>`);
  }

  return options.join("");
}

function relationResourceForLinkedType(linkedType) {
  const map = {
    Project: "projects",
    Trip: "trips",
    Production: "productions",
    Expense: "expenses",
    Person: "people",
    Reminder: "reminders",
    Document: "documents",
    Invoice: "invoices",
    Payment: "payments"
  };

  return map[linkedType] || "projects";
}

async function handleQuickAddSubmit(event) {
  const submitterValue = event.submitter?.value;
  if (submitterValue === "cancel") {
    return;
  }

  event.preventDefault();

  const formData = new FormData(quickAddForm);
  const type = formData.get("recordType");
  const payload = Object.fromEntries(formData.entries());

  delete payload.recordType;

  try {
    const response = await createResourceRecord(type, payload);
    await loadBootstrapData();
    ui.selectedIds[type] = response.data.id;
    ui.currentView = ["invoices", "payments"].includes(type) ? "billing" : type;
    quickAddForm.reset();
    recordTypeEl.value = type;
    renderDynamicFields(type);
    quickAddModal.close();
    renderNav();
    renderView();
  } catch (error) {
    window.alert(error.message);
  }
}

async function handleDocumentUploadSubmit(event) {
  const submitterValue = event.submitter?.value;
  if (submitterValue === "cancel") {
    return;
  }

  event.preventDefault();

  const file = documentFileEl.files?.[0];
  if (!file) {
    window.alert("Select a file to upload.");
    return;
  }

  const base64Data = await fileToDataUrl(file);
  const payload = {
    fileName: file.name,
    documentType: documentTypeEl.value,
    linkedType: documentLinkedTypeEl.value,
    linkedId: documentLinkedIdEl.value.trim(),
    mimeType: file.type || "application/octet-stream",
    status: documentStatusEl.value,
    note: documentNoteEl.value.trim(),
    base64Data
  };

  try {
    const response = await uploadDocumentRecord(payload);
    await loadBootstrapData();
    ui.selectedIds.documents = response.data.id;
    ui.currentView = ["Invoice", "Payment"].includes(payload.linkedType) ? "billing" : "documents";
    documentUploadForm.reset();
    documentUploadModal.close();
    renderNav();
    renderView();
  } catch (error) {
    window.alert(error.message);
  }
}

async function handleAssistantCaptureSubmit(event) {
  const submitterValue = event.submitter?.value;
  if (submitterValue === "cancel") {
    return;
  }

  event.preventDefault();

  const type = assistantCaptureTypeEl.value;
  const summary = assistantSummaryEl.value.trim();
  const captureDate = assistantDateEl.value || new Date().toISOString().slice(0, 10);
  const title = assistantTitleEl.value.trim();
  const file = assistantFileEl.files?.[0];
  const projectId = assistantProjectIdEl.value || suggestProjectIdForText(summary);

  try {
    const payload = {
      captureType: type,
      title,
      summary,
      projectId,
      captureDate,
      amount: assistantAmountEl.value,
      category: assistantCategoryEl.value,
      allocation: assistantAllocationEl.value
    };

    if (file) {
      payload.fileName = file.name;
      payload.mimeType = file.type || "application/octet-stream";
      payload.base64Data = await fileToDataUrl(file);
    }

    await submitCapturePayload(payload, { view: "captures" });
    assistantCaptureForm.reset();
    assistantCaptureModal.close();
    updateAssistantCaptureForm();
  } catch (error) {
    window.alert(error.message);
  }
}

async function handleHomeCaptureSubmit(event) {
  event.preventDefault();

  const summaryEl = document.querySelector("#homeCaptureSummary");
  const typeEl = document.querySelector("#homeCaptureType");
  const projectEl = document.querySelector("#homeCaptureProject");
  const titleEl = document.querySelector("#homeCaptureTitle");
  const fileEl = document.querySelector("#homeCaptureFile");

  const summary = summaryEl?.value.trim() || "";
  const captureType = typeEl?.value || "expense";
  const projectId = projectEl?.value || suggestProjectIdForText(summary);
  const file = fileEl?.files?.[0];

  try {
    const payload = {
      captureType,
      title: titleEl?.value.trim() || "",
      summary,
      projectId,
      captureDate: new Date().toISOString().slice(0, 10)
    };

    if (file) {
      payload.fileName = file.name;
      payload.mimeType = file.type || "application/octet-stream";
      payload.base64Data = await fileToDataUrl(file);
    }

    await submitCapturePayload(payload, {
      view: "dashboard",
      flashMessage: "Saved to inbox. Open Inbox if you want to review it now."
    });

    event.target.reset();
  } catch (error) {
    window.alert(error.message);
  }
}

async function submitCapturePayload(payload, { view = "captures", flashMessage = "" } = {}) {
  const response = await apiFetch("/api/captures/intake", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  await loadBootstrapData();
  ui.selectedIds.captures = response.data.id;
  ui.currentView = view;
  ui.flashMessage = flashMessage;
  renderNav();
  renderView();
  return response;
}

async function updateResourceRecord(resourceName, recordId, payload) {
  return apiFetch(`/api/${resourceName}/${recordId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
}

async function archiveResourceRecord(resourceName, recordId) {
  return apiFetch(`/api/${resourceName}/${recordId}/archive`, {
    method: "POST"
  });
}

async function removeResourceRecord(resourceName, recordId) {
  return apiFetch(`/api/${resourceName}/${recordId}`, {
    method: "DELETE"
  });
}

async function ensureProjectActivity(projectId) {
  if (!projectId || state.projectActivities[projectId]) {
    return;
  }

  try {
    const payload = await apiFetch(`/api/projects/${projectId}/activity`);
    state.projectActivities[projectId] = payload.data || payload;
    if (ui.currentView === "projects" && ui.selectedIds.projects === projectId) {
      renderEntitySection("projects");
    }
  } catch (_error) {
    state.projectActivities[projectId] = { projectId, items: [] };
  }
}

async function saveCaptureEdits(captureId) {
  const payload = Object.fromEntries(
    Array.from(document.querySelectorAll(`[data-capture-edit-field^="${captureId}|"]`)).map((field) => {
      const [, name] = field.dataset.captureEditField.split("|");
      return [name, field.value];
    })
  );

  await updateResourceRecord("captures", captureId, payload);
  await loadBootstrapData();
  ui.selectedIds.captures = captureId;
  ui.editingView = "";
  ui.editingId = "";
  renderNav();
  renderView();
}

function toggleRecordEditing(view, recordId) {
  if (ui.editingView === view && ui.editingId === recordId) {
    ui.editingView = "";
    ui.editingId = "";
  } else {
    ui.editingView = view;
    ui.editingId = recordId;
  }

  if (view === "captures") {
    renderCaptureInboxSection();
    return;
  }

  renderEntitySection(view);
}

async function saveRecordEdits(view, recordId) {
  const payload = Object.fromEntries(
    Array.from(document.querySelectorAll(`[data-record-edit-field^="${view}|${recordId}|"]`)).map((field) => {
      const [, , name] = field.dataset.recordEditField.split("|");
      return [name, field.value];
    })
  );

  const response = await updateResourceRecord(view, recordId, payload);
  await loadBootstrapData();
  ui.selectedIds[view] = response.data.id;
  ui.editingView = "";
  ui.editingId = "";
  renderNav();
  renderView();
}

async function archiveRecordFromUi(view, recordId) {
  await archiveResourceRecord(view, recordId);
  await loadBootstrapData();
  ui.editingView = "";
  ui.editingId = "";
  renderNav();
  renderView();
}

async function deleteRecordFromUi(view, recordId) {
  await removeResourceRecord(view, recordId);
  await loadBootstrapData();
  ui.editingView = "";
  ui.editingId = "";
  renderNav();
  renderView();
}

async function promoteIdeaFromUi(ideaId) {
  const payload = await apiFetch(`/api/ideas/${ideaId}/promote`, {
    method: "POST"
  });

  await loadBootstrapData();
  ui.currentView = "projects";
  ui.selectedIds.projects = payload.data.project.id;
  renderNav();
  renderView();
}

function buildSearchActions(item) {
  const actions = [];
  if (item.resourceName !== "captures") {
    actions.push({ id: "reminder", label: "Create reminder" });
  }

  if (["projects", "trips", "productions", "expenses", "people", "invoices", "payments"].includes(item.resourceName)) {
    actions.push({ id: "upload-proof", label: "Upload proof" });
  }

  if (item.resourceName === "captures") {
    actions.push({ id: "review", label: "Review" });
  }

  if (item.resourceName === "documents" && item.record?.linkedId && item.record?.linkedType) {
    actions.push({ id: "linked-record", label: "Open linked record" });
  }

  return actions;
}

async function handleSearchAction(action, resourceName, recordId) {
  if (action === "review") {
    openSearchResult(resourceName, recordId);
    globalSearchInput.value = "";
    ui.searchQuery = "";
    state.searchResults = [];
    renderNav();
    renderView();
    return;
  }

  if (action === "upload-proof") {
    openDocumentUploadModal({
      documentType: resourceName === "invoices" ? "Invoice" : resourceName === "payments" ? "Payment Proof" : "Evidence",
      linkedType: singularLabelForView(resourceName),
      linkedId: recordId
    });
    return;
  }

  if (action === "linked-record") {
    const record = (state.collections[resourceName] || []).find((entry) => entry.id === recordId);
    if (!record?.linkedId || !record?.linkedType) {
      return;
    }

    navigateToRecord(relationResourceForLinkedType(record.linkedType), record.linkedId);
    globalSearchInput.value = "";
    ui.searchQuery = "";
    state.searchResults = [];
    renderNav();
    renderView();
    return;
  }

  const record = (state.collections[resourceName] || []).find((entry) => entry.id === recordId);
  if (!record) {
    return;
  }

  await createReminderFromSuggestion({
    title: `${labelForResource(resourceName)} follow-up`,
    note: `Follow up on ${primaryLabel(resourceName, record)}.`,
    severity: "Medium",
    resourceName,
    recordId,
    dueDate: nextReminderDate("Medium")
  });

  renderNav();
  renderView();
}

async function openQuestionnaire(resourceName, entityId, stage) {
  try {
    const payload = await apiFetch(`/api/entities/${resourceName}/${entityId}/questionnaires/${stage}`);
    questionnaireState.resourceName = resourceName;
    questionnaireState.entityId = entityId;
    questionnaireState.stage = stage;
    questionnaireState.questions = payload.questions;

    questionnaireEyebrowEl.textContent = `${labelForResource(resourceName)} | ${stage === "opening" ? "Opening interview" : "Closure questionnaire"}`;
    questionnaireTitleEl.textContent = payload.title;
    questionnaireDescriptionEl.textContent = payload.description;
    questionnaireMetaEl.innerHTML = `
      <span class="meta-chip">${payload.entityLabel}</span>
      <span class="meta-chip">${stage === "opening" ? "Intent record" : "Delivery record"}</span>
      <span class="meta-chip">${payload.questionnaire ? `Last saved ${formatDateTime(payload.questionnaire.answeredAt)}` : "Not started yet"}</span>
    `;
    questionnaireFieldsEl.innerHTML = payload.questions
      .map((question) => renderQuestionField(question, payload.questionnaire?.answers?.[question.key] || ""))
      .join("");

    questionnaireModal.showModal();
  } catch (error) {
    window.alert(error.message);
  }
}

function renderQuestionField(question, value) {
  const label = `${question.label}${question.required ? " *" : ""}`;

  if (question.type === "textarea") {
    return `
      <label class="field questionnaire-field">
        <span>${label}</span>
        <p>${question.placeholder || ""}</p>
        <textarea name="${question.key}" ${question.required ? "required" : ""}>${escapeHtml(value)}</textarea>
      </label>
    `;
  }

  if (question.type === "select") {
    return `
      <label class="field questionnaire-field">
        <span>${label}</span>
        <select name="${question.key}" ${question.required ? "required" : ""}>
          ${question.options
            .map((option) => `<option value="${option}" ${String(value) === option ? "selected" : ""}>${option}</option>`)
            .join("")}
        </select>
      </label>
    `;
  }

  return `
    <label class="field questionnaire-field">
      <span>${label}</span>
      <p>${question.placeholder || ""}</p>
      <input name="${question.key}" type="${question.type === "number" ? "number" : "text"}" value="${escapeHtml(value)}" ${question.required ? "required" : ""} />
    </label>
  `;
}

async function handleQuestionnaireSubmit(event) {
  const submitterValue = event.submitter?.value;
  if (submitterValue === "cancel") {
    return;
  }

  event.preventDefault();

  const formData = new FormData(questionnaireForm);
  const answers = Object.fromEntries(formData.entries());

  try {
    const payload = await apiFetch(
      `/api/entities/${questionnaireState.resourceName}/${questionnaireState.entityId}/questionnaires/${questionnaireState.stage}/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ answers })
      }
    );

    updateCollectionRecord(questionnaireState.resourceName, payload.entity);
    state.dashboard = await apiFetch("/api/dashboard");
    questionnaireModal.close();
    renderNav();
    renderView();
  } catch (error) {
    window.alert(error.message);
  }
}

async function createResourceRecord(resourceName, payload) {
  return apiFetch(`/api/${resourceName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
}

async function uploadDocumentRecord(payload) {
  return apiFetch("/api/documents/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
}

async function uploadLinkedFile(file, { documentType, linkedType, linkedId, note }) {
  const base64Data = await fileToDataUrl(file);
  return uploadDocumentRecord({
    fileName: file.name,
    documentType,
    linkedType,
    linkedId,
    mimeType: file.type || "application/octet-stream",
    status: "Linked",
    note,
    base64Data
  });
}

async function uploadTextCapture({ fileName, linkedType, linkedId, documentType, note, text }) {
  return uploadDocumentRecord({
    fileName,
    documentType,
    linkedType,
    linkedId,
    mimeType: "text/plain",
    status: "Linked",
    note,
    base64Data: textToDataUrl(text)
  });
}

async function finalizeAssistantCapture({ view, resourceName, recordId }) {
  await loadBootstrapData();
  ui.currentView = view;
  if (resourceName && recordId) {
    ui.selectedIds[resourceName] = recordId;
  }
  assistantCaptureForm.reset();
  assistantCaptureModal.close();
  updateAssistantCaptureForm();
  renderNav();
  renderView();
}

function suggestProjectIdForText(value) {
  const contextId = currentProjectContextId();
  if (contextId) {
    return contextId;
  }

  const normalized = String(value || "").toLowerCase();
  const activeProjects = state.collections.projects.filter((project) => !String(project.closureStatus || "").toLowerCase().includes("final"));
  const matches = activeProjects
    .map((project) => ({
      id: project.id,
      score: scoreProjectMatch(project, normalized)
    }))
    .sort((left, right) => right.score - left.score);

  if (matches[0]?.score > 0) {
    return matches[0].id;
  }

  return activeProjects[0]?.id || state.collections.projects[0]?.id || "";
}

function currentProjectContextId() {
  if (ui.currentView === "projects") {
    return ui.selectedIds.projects;
  }

  if (ui.currentView === "billing") {
    const invoice = state.collections.invoices.find((item) => item.id === ui.selectedIds.invoices);
    return invoice?.projectId || "";
  }

  if (ui.currentView === "expenses") {
    return state.collections.expenses.find((item) => item.id === ui.selectedIds.expenses)?.linkedProjectId || "";
  }

  if (ui.currentView === "trips") {
    return state.collections.trips.find((item) => item.id === ui.selectedIds.trips)?.linkedProjectId || "";
  }

  if (ui.currentView === "productions") {
    return state.collections.productions.find((item) => item.id === ui.selectedIds.productions)?.linkedProjectId || "";
  }

  return "";
}

function scoreProjectMatch(project, normalizedText) {
  if (!normalizedText) {
    return 0;
  }

  const haystack = `${project.title} ${project.commercialObjective} ${project.projectType}`.toLowerCase();
  return normalizedText
    .split(/\s+/)
    .filter((token) => token.length > 3 && haystack.includes(token))
    .length;
}

function deriveProjectTitle(summary) {
  return clipLabel(summary, "New project");
}

function deriveExpenseTitle(summary) {
  return clipLabel(summary, "Expense");
}

function clipLabel(value, fallback) {
  const clean = String(value || "").trim().replaceAll(/\s+/g, " ");
  if (!clean) {
    return fallback;
  }

  return clean.length > 56 ? `${clean.slice(0, 53)}...` : clean;
}

function buildExpensePurpose(summary, allocation) {
  if (!summary) {
    return allocation === "Business" ? "Business expense capture." : `${allocation} expense capture.`;
  }

  return allocation === "Business" ? summary : `${summary} (${allocation.toLowerCase()} allocation)`;
}

function guessDocumentType(summary, file) {
  const combined = `${summary || ""} ${file?.name || ""}`.toLowerCase();
  if (combined.includes("receipt")) return "Receipt";
  if (combined.includes("invoice")) return "Invoice";
  if (combined.includes("proof")) return "Payment Proof";
  if (combined.includes("agreement") || combined.includes("contract")) return "Agreement";
  return "Evidence";
}

function textToDataUrl(text) {
  return `data:text/plain;base64,${btoa(unescape(encodeURIComponent(String(text || ""))))}`;
}

function slugify(value) {
  return String(value || "capture")
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "") || "capture";
}

function updateCollectionRecord(resourceName, updatedRecord) {
  const collection = state.collections[resourceName];
  const index = collection.findIndex((item) => item.id === updatedRecord.id);

  if (index === -1) {
    collection.unshift(updatedRecord);
    return;
  }

  collection[index] = updatedRecord;
}

function getFilteredCaptures() {
  const captures = state.collections.captures || [];
  if (!ui.searchQuery) {
    return captures;
  }

  return captures.filter((capture) =>
    [capture.title, capture.summary, capture.extractedText, capture.reasoning, capture.fileName, capture.suggestedResourceType]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(ui.searchQuery)
  );
}

function getFilteredCollection(view) {
  const collection = state.collections[view] || [];
  if (!ui.searchQuery) {
    return collection;
  }

  return collection.filter((item) => searchableText(view, item).includes(ui.searchQuery));
}

function searchableText(view, item) {
  const parts = [primaryLabel(view, item), secondaryLabel(view, item), item.exportPreview];

  if (view === "projects") {
    parts.push(item.commercialObjective, item.revenueOutcome, item.status);
  } else if (view === "trips") {
    parts.push(item.purpose, item.originSummary, item.destinationSummary);
  } else if (view === "productions") {
    parts.push(item.businessPurpose, item.platformIntent, item.contentType);
  } else if (view === "expenses") {
    parts.push(item.businessPurpose, item.contentConnection, item.category);
  } else if (view === "people") {
    parts.push(item.roleSummary, item.personType);
  } else if (view === "documents") {
    parts.push(item.documentType, item.linkedType, item.linkedId, item.mimeType, item.storagePath, item.note, linkedRecordLabel(item));
  } else if (view === "invoices") {
    parts.push(item.invoiceNumber, item.direction, item.status, item.issueDate, item.dueDate, item.note, invoiceProjectLabel(item), invoicePersonLabel(item));
  } else if (view === "payments") {
    parts.push(item.invoiceId, item.method, item.paidAt, item.note, paymentProofDocument(item)?.fileName);
  } else if (view === "captures") {
    parts.push(item.summary, item.extractedText, item.reasoning, item.fileName, item.suggestedResourceType);
  } else if (view === "reminders") {
    parts.push(item.linkedType, item.note, item.severity);
  } else if (view === "ideas") {
    parts.push(item.summary, item.hook, item.platformFit, item.commercialAngle, ...(item.tags || []));
  } else if (view === "knowledge") {
    parts.push(item.summary, item.content, item.category, item.linkedType, item.linkedId, ...(item.tags || []));
  }

  return parts
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

async function apiFetch(url, options = {}) {
  const response = await fetch(url, options);
  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json") ? await response.json() : await response.text();

  if (!response.ok) {
    if (response.status === 401 && !String(url).startsWith("/api/auth/")) {
      state.session = null;
      renderAuthScreen("Your session expired. Sign in again to continue.");
    }

    const message = typeof payload === "string" ? payload : payload.message || "Request failed";
    throw new Error(message);
  }

  return payload;
}

function renderSearchEmptyState(view, totalCount) {
  if (!ui.searchQuery) {
    return `<div class="empty-state"><p>No records yet. Use Smart Capture to start simply, or the advanced add form if you need full control.</p></div>`;
  }

  return `
    <div class="empty-state">
      <p>No ${labelForResource(view).toLowerCase()} matched "${escapeHtml(ui.searchQuery)}".</p>
      <p>${totalCount} total records exist in this module. Try a broader search or clear the query.</p>
    </div>
  `;
}

function renderDetailEmptyState(view) {
  return `
    <div class="empty-state">
      <p>No ${labelForResource(view).toLowerCase()} selected.</p>
      <p>Select a record from the list to inspect its intent, evidence, and closure readiness.</p>
    </div>
  `;
}

function primaryLabel(view, item) {
  if (view === "captures") return item.title || "Inbox capture";
  if (view === "people") return item.fullName;
  if (view === "documents") return item.fileName;
  if (view === "invoices") return item.invoiceNumber;
  if (view === "payments") return item.method || item.invoiceId || item.id;
  return item.title;
}

function labelForResource(resourceName) {
  return (
    [...navItems, ...utilityViews].find((item) => item.id === resourceName)?.label ||
    recordTemplates[resourceName]?.label ||
    resourceName
  );
}

function secondaryLabel(view, item) {
  if (view === "captures") return `${captureSuggestionLabel(item.suggestedResourceType)} | ${formatCaptureStatus(item)}`;
  if (view === "projects") return `${item.projectType || "Project"} | ${item.status}`;
  if (view === "trips") return `${item.tripType} | ${item.startDate} -> ${item.endDate}`;
  if (view === "productions") return `${item.contentType} | ${item.platformIntent}`;
  if (view === "expenses") return `${item.category} | ${currency(item.amount)}`;
  if (view === "people") return `${item.personType} | ${item.linkedProjectIds.length} linked project(s)`;
  if (view === "documents") return `${item.documentType || "Evidence"} | ${linkedRecordLabel(item)}`;
  if (view === "ideas") return `${item.status || "Captured"} | ${item.platformFit || "Idea"}`;
  if (view === "knowledge") return `${item.category || "Reference"} | ${item.linkedType || "Library note"}`;
  if (view === "invoices") return `${item.direction} | ${currency(item.totalAmount)} | ${item.status}`;
  if (view === "payments") return `${item.invoiceId} | ${currency(item.amount)} | ${item.paidAt || "Date missing"}`;
  return `${item.linkedType} | due ${item.dueDate}`;
}

function simpleRecordState(view, item) {
  if (item.compliance?.blockers?.length) {
    return "Needs follow-up";
  }

  if (view === "projects") {
    return String(item.closureStatus || item.status || "Active").includes("Final") ? "Closed" : "Active";
  }

  if (view === "expenses") {
    return item.receiptAttached ? "Saved" : "Receipt missing";
  }

  if (view === "documents") {
    return item.documentType || "File";
  }

  if (view === "ideas") {
    return item.promotedProjectId ? "Promoted" : item.status || "Saved";
  }

  if (view === "knowledge") {
    return item.category || "Saved note";
  }

  if (view === "invoices") {
    return item.status || "Invoice";
  }

  if (view === "payments") {
    return item.proofDocumentId ? "Proof linked" : "Proof missing";
  }

  if (view === "people") {
    return item.agreementOnFile ? "Ready" : "Agreement missing";
  }

  if (view === "trips" || view === "productions") {
    return item.closureStatus || "Active";
  }

  return "Saved";
}

function simpleRecordTone(view, item) {
  const stateLabel = simpleRecordState(view, item).toLowerCase();
  if (stateLabel.includes("missing") || stateLabel.includes("follow-up")) {
    return "status-review";
  }

  if (stateLabel.includes("closed") || stateLabel.includes("ready") || stateLabel.includes("saved") || stateLabel.includes("promoted") || stateLabel.includes("linked")) {
    return "status-final";
  }

  return "status-soft";
}

function simpleRecordHint(view, item) {
  if (view === "projects") {
    return clipLabel(item.commercialObjective || item.revenueOutcome || item.narrative, "No project note yet");
  }

  if (view === "expenses") {
    return clipLabel(`${currency(item.amount)}${item.businessPurpose ? ` • ${item.businessPurpose}` : ""}`, "Expense saved");
  }

  if (view === "documents") {
    return clipLabel(linkedRecordLabel(item), "Unlinked file");
  }

  if (view === "ideas") {
    return clipLabel(item.summary || item.commercialAngle || item.hook, "Saved idea");
  }

  if (view === "knowledge") {
    return clipLabel(item.summary || item.content, "Saved note");
  }

  if (view === "people") {
    return clipLabel(item.roleSummary, item.personType || "Person");
  }

  if (view === "trips") {
    return clipLabel(item.purpose || `${item.originSummary} to ${item.destinationSummary}`, "Trip saved");
  }

  if (view === "productions") {
    return clipLabel(item.businessPurpose || item.platformIntent, "Content work saved");
  }

  if (view === "invoices") {
    return clipLabel(`${currency(item.totalAmount)}${item.note ? ` • ${item.note}` : ""}`, "Invoice saved");
  }

  if (view === "payments") {
    return clipLabel(`${currency(item.amount)}${item.method ? ` • ${item.method}` : ""}`, "Payment saved");
  }

  if (view === "reminders") {
    return clipLabel(item.note || `Due ${item.dueDate}`, "Reminder saved");
  }

  return clipLabel(searchResultSnippet(view, item), "Saved record");
}

function linkedRecordLabel(item) {
  const collectionMap = {
    Project: state.collections.projects,
    Trip: state.collections.trips,
    Production: state.collections.productions,
    Expense: state.collections.expenses,
    Person: state.collections.people,
    Reminder: state.collections.reminders,
    Document: state.collections.documents,
    Invoice: state.collections.invoices,
    Payment: state.collections.payments
  };
  const viewMap = {
    Project: "projects",
    Trip: "trips",
    Production: "productions",
    Expense: "expenses",
    Person: "people",
    Reminder: "reminders",
    Document: "documents",
    Invoice: "invoices",
    Payment: "payments"
  };
  const collection = collectionMap[item.linkedType] || [];
  const linked = collection.find((entry) => entry.id === item.linkedId);

  if (!linked) {
    return `${item.linkedType || "Record"} | ${item.linkedId || "Unlinked"}`;
  }

  return `${item.linkedType} | ${primaryLabel(viewMap[item.linkedType], linked)}`;
}

function buildBillingSummary() {
  const invoices = state.collections.invoices || [];
  const payments = state.collections.payments || [];
  const outstandingTotal = invoices
    .filter((invoice) => !["Paid", "Collected"].includes(invoice.status))
    .reduce((sum, invoice) => sum + Number(invoice.totalAmount || 0), 0);
  const collectedTotal = payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  const proofGaps =
    invoices.filter((invoice) => !invoiceLinkedDocuments(invoice).length).length +
    payments.filter((payment) => !payment.proofDocumentId).length;

  return {
    invoiceCount: invoices.length,
    paymentCount: payments.length,
    outstandingTotal,
    collectedTotal,
    proofGaps
  };
}

function handleBillingAction(action, selectedInvoice, selectedPayment) {
  if (action === "invoice") {
    openQuickAddForType("invoices", selectedInvoice?.projectId ? { projectId: selectedInvoice.projectId } : {});
    return;
  }

  if (action === "payment") {
    openQuickAddForType("payments", selectedInvoice ? { invoiceId: selectedInvoice.id, amount: selectedInvoice.totalAmount } : {});
    return;
  }

  if (action === "upload-invoice") {
    openDocumentUploadModal({
      documentType: "Invoice",
      linkedType: "Invoice",
      linkedId: selectedInvoice?.id || ""
    });
    return;
  }

  if (action === "upload-proof") {
    openDocumentUploadModal({
      documentType: "Payment Proof",
      linkedType: "Payment",
      linkedId: selectedPayment?.id || ""
    });
  }
}

function handleProjectAction(action, project) {
  if (action === "expense") {
    openAssistantCapture({
      captureType: "expense",
      projectId: project.id,
      summary: `Expense for ${project.title}`,
      date: new Date().toISOString().slice(0, 10)
    });
    return;
  }

  if (action === "update") {
    openAssistantCapture({
      captureType: "update",
      projectId: project.id,
      summary: `Update for ${project.title}: `
    });
    return;
  }

  if (action === "trip") {
    openQuickAddForType("trips", {
      linkedProjectId: project.id,
      purpose: `Business trip for ${project.title}`
    });
    return;
  }

  if (action === "production") {
    openQuickAddForType("productions", {
      linkedProjectId: project.id,
      businessPurpose: `Production work for ${project.title}`
    });
    return;
  }

  openDocumentUploadModal({
    documentType: "Evidence",
    linkedType: "Project",
    linkedId: project.id,
    note: `Evidence for ${project.title}`
  });
}

function invoiceProjectLabel(invoice) {
  const project = state.collections.projects.find((item) => item.id === invoice.projectId);
  return project?.title || "No linked project";
}

function projectTitleById(projectId) {
  return state.collections.projects.find((item) => item.id === projectId)?.title || "";
}

function invoicePersonLabel(invoice) {
  const person = state.collections.people.find((item) => item.id === invoice.personId);
  return person?.fullName || "No linked person";
}

function invoiceLinkedDocuments(invoice) {
  return (state.collections.documents || []).filter((document) => document.linkedType === "Invoice" && document.linkedId === invoice.id);
}

function paymentProofDocument(payment) {
  return (state.collections.documents || []).find((document) => document.id === payment.proofDocumentId) || null;
}

function renderEvidenceGalleryCard(document) {
  const linkedResource = relationResourceForLinkedType(document.linkedType);
  return `
    <article class="evidence-card">
      ${renderDocumentThumbnail(document)}
      <div class="evidence-card-body">
        <div>
          <strong>${document.fileName}</strong>
          <p>${document.documentType || "Evidence"} | ${linkedRecordLabel(document)}</p>
        </div>
        <div class="detail-actions">
          <button class="pill-button" type="button" data-document-open="${document.id}">Open file</button>
          ${document.linkedId ? `<button class="pill-button" type="button" data-nav-record="${linkedResource}|${document.linkedId}">Open linked record</button>` : ""}
        </div>
      </div>
    </article>
  `;
}

function renderDocumentWorkspacePanel(document, detail, isEditing) {
  const linkedResource = relationResourceForLinkedType(document.linkedType);
  const linkedCollection = state.collections[linkedResource] || [];
  const linkedRecord = linkedCollection.find((entry) => entry.id === document.linkedId);

  return `
    <div class="panel-header">
      <div>
        <p class="eyebrow">${detail.eyebrow}</p>
        <h3>${detail.title}</h3>
      </div>
      <div class="card-row">
        <button class="pill-button" type="button" data-record-edit="${document.id}">${isEditing ? "Cancel edit" : "Edit"}</button>
        <span class="status-chip ${statusClass(detail.status)}">${detail.status}</span>
      </div>
    </div>

    ${
      isEditing
        ? `
          <div class="sub-panel">
            <strong>Edit file record</strong>
            ${renderRecordEditForm("documents", document)}
            <div class="detail-actions">
              <button class="primary-button" type="button" data-record-save="${document.id}">Save changes</button>
              <button class="ghost-button" type="button" data-record-edit="${document.id}">Cancel</button>
            </div>
          </div>
        `
        : ""
    }

    <div class="sub-panel">
      <div class="record-topline">
        <strong>What to do next</strong>
        <span class="meta-chip">${detail.status}</span>
      </div>
      <p class="placeholder-copy">${escapeHtml(nextStepSummary("documents", document))}</p>
      <div class="detail-actions">
        <button class="primary-button" type="button" data-document-open="${document.id}">Open file</button>
        ${linkedRecord ? `<button class="pill-button" type="button" data-nav-record="${linkedResource}|${document.linkedId}">Open linked record</button>` : ""}
        <button class="pill-button" type="button" data-upload-another-document>Upload another file</button>
      </div>
    </div>

    <div class="sub-panel">
      <strong>Preview</strong>
      ${renderDocumentPreviewPanel(document)}
    </div>

    <div class="sub-panel">
      <div class="record-topline">
        <strong>Where this file belongs</strong>
        <span class="meta-chip">${escapeHtml(document.documentType || "Evidence")}</span>
      </div>
      <div class="detail-grid">
        <article class="detail-card">
          <strong>Linked record</strong>
          <p>${linkedRecord ? escapeHtml(primaryLabel(linkedResource, linkedRecord)) : escapeHtml(linkedRecordLabel(document))}</p>
        </article>
        <article class="detail-card">
          <strong>Record type</strong>
          <p>${escapeHtml(document.linkedType || "Unlinked")}</p>
        </article>
        <article class="detail-card">
          <strong>File type</strong>
          <p>${escapeHtml(document.mimeType || "Missing")}</p>
        </article>
        <article class="detail-card">
          <strong>Storage</strong>
          <p>${escapeHtml(document.storagePath || "Missing")}</p>
        </article>
      </div>
    </div>

    <details class="detail-disclosure">
      <summary>More file details</summary>
      <div class="detail-disclosure-body">
        <div class="detail-grid">
          ${detail.stats
            .map(
              (stat) => `
                <article class="detail-card">
                  <strong>${stat.label}</strong>
                  <p>${stat.value}</p>
                </article>
              `
            )
            .join("")}
        </div>
        <div class="timeline">
          ${detail.timeline
            .map(
              (step) => `
                <article class="timeline-item">
                  <div class="timeline-topline">
                    <strong>${step.title}</strong>
                    <span class="status-chip ${step.tone}">${step.tag}</span>
                  </div>
                  <p>${step.body}</p>
                </article>
              `
            )
            .join("")}
        </div>
        <div class="sub-panel">
          <strong>Evidence note</strong>
          <p class="placeholder-copy">${escapeHtml(document.note || "No evidence note has been added yet.")}</p>
        </div>
        <div class="sub-panel">
          <strong>Dossier draft</strong>
          <pre class="dossier">${document.exportPreview}</pre>
          <div class="detail-actions">
            <button class="pill-button" type="button" data-record-archive="${document.id}">Archive</button>
            <button class="pill-button" type="button" data-record-delete="${document.id}">Delete</button>
          </div>
        </div>
      </div>
    </details>
  `;
}

function renderDocumentPreviewPanel(document) {
  const kind = documentPreviewKind(document);

  if (kind === "image") {
    return `
      <div class="document-preview-panel">
        <img class="document-preview-image" src="/api/documents/${document.id}/file" alt="${escapeHtml(document.fileName)} preview" />
      </div>
    `;
  }

  if (kind === "pdf") {
    return `
      <div class="document-preview-panel">
        <iframe class="document-preview-frame" src="/api/documents/${document.id}/file" title="${escapeHtml(document.fileName)} preview"></iframe>
      </div>
    `;
  }

  return `
    <div class="document-preview-panel document-preview-fallback">
      <span class="material-symbols-outlined">draft</span>
      <p>Preview is not available for this file type yet.</p>
    </div>
  `;
}

function renderDocumentThumbnail(document, options = {}) {
  const kind = documentPreviewKind(document);
  const compactClass = options.compact ? " document-thumbnail-compact" : "";

  if (kind === "image") {
    return `
      <div class="document-thumbnail${compactClass}">
        <img src="/api/documents/${document.id}/file" alt="${escapeHtml(document.fileName)} thumbnail" loading="lazy" />
      </div>
    `;
  }

  const icon = kind === "pdf" ? "picture_as_pdf" : "draft";
  const label = kind === "pdf" ? "PDF preview" : "Document";

  return `
    <div class="document-thumbnail document-thumbnail-fallback${compactClass}">
      <span class="material-symbols-outlined">${icon}</span>
      <span>${label}</span>
    </div>
  `;
}

function documentPreviewKind(document) {
  const mimeType = String(document.mimeType || "").toLowerCase();
  if (mimeType.startsWith("image/")) {
    return "image";
  }

  if (mimeType.includes("pdf")) {
    return "pdf";
  }

  return "other";
}

function getLinkedDocumentsForEntity(view, entityId) {
  const linkedType = singularLabelForView(view);
  return (state.collections.documents || []).filter((document) => document.linkedType === linkedType && document.linkedId === entityId);
}

function singularLabelForView(view) {
  const map = {
    captures: "Capture",
    projects: "Project",
    trips: "Trip",
    productions: "Production",
    expenses: "Expense",
    people: "Person",
    reminders: "Reminder",
    documents: "Document",
    ideas: "Idea",
    knowledge: "Knowledge",
    invoices: "Invoice",
    payments: "Payment"
  };
  return map[view] || "Record";
}

function currency(value) {
  const numeric = Number(value || 0);
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: state.workspace?.defaultCurrency || "CAD",
    maximumFractionDigits: 0
  }).format(numeric);
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

function formatCaptureStatus(capture) {
  if (capture.status === "applied") {
    return "Applied";
  }

  if (capture.processingStatus === "processing") {
    return "Processing";
  }

  return "Needs review";
}

function formatCaptureConfidence(value) {
  const numeric = Number(value || 0);
  return `${Math.round(numeric * 100)}% confidence`;
}

function captureSuggestionLabel(value) {
  const map = {
    expenses: "Expense",
    projects: "Project",
    updates: "Project update",
    proof: "Proof document",
    ideas: "Idea",
    knowledge: "Library note"
  };

  return map[value] || "Needs suggestion";
}

function formatDate(value) {
  if (!value) return "Unknown";
  return new Intl.DateTimeFormat("en-CA", { dateStyle: "medium" }).format(new Date(value));
}

function formatDateTime(value) {
  if (!value) return "Unknown";
  return new Intl.DateTimeFormat("en-CA", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function isOverdue(dateString) {
  if (!dateString) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dateString) < today;
}

function entryLagLabel(item) {
  if (!item.expenseDate || !item.createdAt) return "the same day";
  const expenseDate = new Date(item.expenseDate);
  const createdAt = new Date(item.createdAt);
  const days = Math.round((createdAt - expenseDate) / (1000 * 60 * 60 * 24));
  if (days <= 0) return "the same day";
  if (days === 1) return "1 day later";
  return `${days} days later`;
}

function formatQuestionnaireStatus(questionnaire) {
  if (!questionnaire || !questionnaire.exists) {
    return "Not started";
  }

  return `${questionnaire.status} on ${formatDateTime(questionnaire.answeredAt)}`;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function statusClass(status) {
  const normalized = String(status || "").toLowerCase();
  if (normalized.includes("final") || normalized.includes("ready") || normalized.includes("low") || normalized.includes("compliant")) return "status-final";
  if (normalized.includes("soft") || normalized.includes("medium") || normalized.includes("active") || normalized.includes("pending") || normalized.includes("follow")) return "status-review";
  return "status-open";
}

function scoreClass(score) {
  if (score >= 85) return "score-good";
  if (score >= 65) return "score-mid";
  return "score-low";
}
