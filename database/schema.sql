CREATE TABLE workspaces (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  focus TEXT,
  default_currency TEXT NOT NULL DEFAULT 'CAD',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'owner',
  password_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS password_hash TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email_unique ON users(LOWER(email));

CREATE TABLE business_profiles (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  legal_name TEXT NOT NULL,
  trade_name TEXT,
  tax_id TEXT,
  invoice_prefix TEXT,
  default_currency TEXT NOT NULL DEFAULT 'CAD',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  title TEXT NOT NULL,
  project_type TEXT,
  status TEXT NOT NULL DEFAULT 'Planning',
  planned_start DATE,
  planned_end DATE,
  budget_estimate NUMERIC(12, 2) DEFAULT 0,
  commercial_objective TEXT NOT NULL,
  revenue_outcome TEXT,
  timeline TEXT,
  closure_status TEXT NOT NULL DEFAULT 'Open',
  narrative TEXT,
  completeness_score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS linked_trip_ids TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS linked_production_ids TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS linked_expense_ids TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS linked_person_ids TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

CREATE TABLE trips (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  project_id TEXT REFERENCES projects(id),
  title TEXT NOT NULL,
  trip_type TEXT NOT NULL,
  purpose TEXT NOT NULL,
  origin_summary TEXT,
  destination_summary TEXT,
  start_date DATE,
  end_date DATE,
  pre_trip_complete BOOLEAN NOT NULL DEFAULT FALSE,
  during_trip_complete BOOLEAN NOT NULL DEFAULT FALSE,
  post_trip_complete BOOLEAN NOT NULL DEFAULT FALSE,
  brief_saved BOOLEAN NOT NULL DEFAULT FALSE,
  spouse_or_contractor BOOLEAN NOT NULL DEFAULT FALSE,
  estimated_budget NUMERIC(12, 2) DEFAULT 0,
  actual_spend NUMERIC(12, 2) DEFAULT 0,
  closure_status TEXT NOT NULL DEFAULT 'Open',
  outcome_notes TEXT,
  completeness_score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE productions (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  project_id TEXT REFERENCES projects(id),
  title TEXT NOT NULL,
  content_type TEXT,
  platform_intent TEXT NOT NULL,
  shoot_date DATE,
  location TEXT NOT NULL,
  business_purpose TEXT NOT NULL,
  published_url TEXT,
  publish_target_date DATE,
  role_documentation_complete BOOLEAN NOT NULL DEFAULT FALSE,
  closure_status TEXT NOT NULL DEFAULT 'Open',
  outcome_notes TEXT,
  completeness_score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE productions
  ADD COLUMN IF NOT EXISTS linked_expense_ids TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS linked_person_ids TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

CREATE TABLE expenses (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  project_id TEXT REFERENCES projects(id),
  trip_id TEXT REFERENCES trips(id),
  production_id TEXT REFERENCES productions(id),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  amount NUMERIC(12, 2) NOT NULL,
  expense_date DATE,
  business_purpose TEXT NOT NULL,
  content_connection TEXT,
  receipt_attached BOOLEAN NOT NULL DEFAULT FALSE,
  asset_linked BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE people (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  full_name TEXT NOT NULL,
  person_type TEXT NOT NULL,
  role_summary TEXT NOT NULL,
  agreement_on_file BOOLEAN NOT NULL DEFAULT FALSE,
  market_rate_justified BOOLEAN NOT NULL DEFAULT FALSE,
  work_logs_linked BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE people
  ADD COLUMN IF NOT EXISTS linked_project_ids TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

CREATE TABLE reminders (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  linked_type TEXT NOT NULL,
  linked_id TEXT,
  title TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'Medium',
  due_date DATE NOT NULL,
  note TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE trips
  ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

ALTER TABLE expenses
  ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

ALTER TABLE reminders
  ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

CREATE TABLE invoices (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  project_id TEXT REFERENCES projects(id),
  person_id TEXT REFERENCES people(id),
  invoice_number TEXT NOT NULL,
  direction TEXT NOT NULL,
  status TEXT NOT NULL,
  issue_date DATE,
  due_date DATE,
  total_amount NUMERIC(12, 2) NOT NULL DEFAULT 0,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE invoices
  ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

CREATE TABLE payments (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  invoice_id TEXT REFERENCES invoices(id),
  amount NUMERIC(12, 2) NOT NULL,
  paid_at DATE,
  method TEXT,
  proof_document_id TEXT,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE payments
  ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

CREATE TABLE documents (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  linked_type TEXT NOT NULL,
  linked_id TEXT NOT NULL,
  file_name TEXT NOT NULL,
  document_type TEXT NOT NULL DEFAULT 'Evidence',
  mime_type TEXT,
  storage_path TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Linked',
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE documents
  ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

CREATE TABLE captures (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  source_type TEXT NOT NULL DEFAULT 'text',
  user_intent TEXT NOT NULL DEFAULT 'auto',
  title TEXT,
  summary TEXT,
  raw_text TEXT,
  extracted_text TEXT,
  suggested_resource_type TEXT,
  suggested_project_id TEXT REFERENCES projects(id),
  suggested_document_type TEXT,
  suggested_category TEXT,
  suggested_amount NUMERIC(12, 2) DEFAULT 0,
  suggested_expense_date DATE,
  confidence NUMERIC(4, 3) DEFAULT 0,
  reasoning TEXT,
  status TEXT NOT NULL DEFAULT 'needs_review',
  processing_status TEXT NOT NULL DEFAULT 'completed',
  file_name TEXT,
  mime_type TEXT,
  storage_path TEXT,
  applied_resource_type TEXT,
  applied_resource_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE captures
  ADD COLUMN IF NOT EXISTS audit_trail JSONB NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

CREATE TABLE ideas (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Captured',
  hook TEXT,
  platform_fit TEXT,
  commercial_angle TEXT,
  source_capture_id TEXT REFERENCES captures(id),
  promoted_project_id TEXT REFERENCES projects(id),
  tags TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  archived_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);

CREATE TABLE knowledge (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Reference',
  content TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  linked_type TEXT,
  linked_id TEXT,
  source_capture_id TEXT REFERENCES captures(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  archived_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);

CREATE TABLE compliance_questionnaires (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  linked_type TEXT NOT NULL,
  linked_id TEXT NOT NULL,
  questionnaire_type TEXT NOT NULL,
  title TEXT,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'Open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE compliance_questionnaire_answers (
  id TEXT PRIMARY KEY,
  questionnaire_id TEXT NOT NULL REFERENCES compliance_questionnaires(id),
  question_key TEXT NOT NULL,
  answer_text TEXT,
  answer_json JSONB,
  answered_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE audit_events (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_projects_workspace_id ON projects(workspace_id);
CREATE INDEX idx_trips_workspace_id ON trips(workspace_id);
CREATE INDEX idx_productions_workspace_id ON productions(workspace_id);
CREATE INDEX idx_expenses_workspace_id ON expenses(workspace_id);
CREATE INDEX idx_people_workspace_id ON people(workspace_id);
CREATE INDEX idx_reminders_workspace_id ON reminders(workspace_id);
CREATE INDEX idx_invoices_workspace_id ON invoices(workspace_id);
CREATE INDEX idx_payments_workspace_id ON payments(workspace_id);
CREATE INDEX idx_documents_linked_entity ON documents(linked_type, linked_id);
CREATE INDEX idx_captures_workspace_id ON captures(workspace_id);
CREATE INDEX idx_ideas_workspace_id ON ideas(workspace_id);
CREATE INDEX idx_knowledge_workspace_id ON knowledge(workspace_id);
CREATE INDEX idx_questionnaires_linked_entity ON compliance_questionnaires(linked_type, linked_id);
CREATE INDEX idx_audit_events_entity ON audit_events(entity_type, entity_id);
