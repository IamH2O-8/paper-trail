# Content Business Documentation App

This repo now contains a first-pass prototype for the blueprint in `Content Business Documentation App Blueprint.docx`.

The prototype is intentionally focused on the strongest core idea in the blueprint:

- capture intent at record creation
- collect evidence while work is happening
- guide closure with compliance checks and narrative output

## What is included

- `docs/blueprint-analysis.md`
  - distilled product analysis
  - recommended MVP scope
  - suggested backend architecture
- `docs/api-routes.md`
  - implemented route surface
  - persistence approach
  - next backend milestones
- `docs/supabase-deployment.md`
  - Supabase repository setup
  - hosted deployment runbook
- `docs/github-render-deploy.md`
  - GitHub push and Render deployment checklist
- `server.js`
  - app entrypoint
- `src/`
  - modular Node backend
  - API routes, services, domain definitions, and server helpers
- `database/schema.sql`
  - relational schema for a real database-backed version
- `database/seed.sql`
  - starter data for a Supabase project
- `data/dev-database.json`
  - local development data store
- `Dockerfile`
  - simple container deploy path for Render/Railway
- `render.yaml`
  - Render blueprint for a Supabase-backed hosted deployment
- `package.json`
  - start script for the local prototype
- `web/`
  - interactive single-page client
  - uses the backend API instead of `localStorage`

## Run locally

```bash
node server.js
```

Then open `http://localhost:4173`.

Local demo sign-in:

- email: `demo@papertrail.app`
- password: `demo12345`

Optional:

```bash
APP_DATA_FILE=/tmp/content-business-dev.json node server.js
```

That lets you run the app against a separate local JSON data file.

Supabase mode:

```bash
APP_REPOSITORY=supabase \
SUPABASE_URL="https://<project-ref>.supabase.co" \
SUPABASE_SERVICE_ROLE_KEY="<service-role-key>" \
SUPABASE_STORAGE_BUCKET="content-documents" \
APP_SESSION_SECRET="<strong-random-secret>" \
node server.js
```

AI-assisted intake mode:

```bash
OPENAI_API_KEY="<openai-api-key>" \
OPENAI_VISION_MODEL="gpt-4o-mini" \
OPENAI_CLASSIFICATION_MODEL="gpt-4o-mini" \
OPENAI_TRANSCRIPTION_MODEL="gpt-4o-mini-transcribe" \
node server.js
```

If `OPENAI_API_KEY` is not set, the assistant inbox still works in heuristic mode so local testing is never blocked.

Hosted deployment:

- Render is the cleanest fit for the current long-running Node server shape.
- Use [docs/supabase-deployment.md](/Users/neergahlawat/Desktop/AI Projects/Content Creation /docs/supabase-deployment.md:1) together with [render.yaml](/Users/neergahlawat/Desktop/AI Projects/Content Creation /render.yaml:1) for the fastest hosted setup.

## What this first build demonstrates

- dashboard with compliance and operations visibility
- entity views for projects, trips, productions, expenses, people, reminders, documents, and billing
- reports workspace for reviewing and exporting dossier drafts
- quick-add flow for common records
- guided opening interviews and closure questionnaires for projects, trips, and productions
- document library records linked to projects, trips, expenses, people, and reminders
- billing workspace with invoice register, payment tracking, and proof gaps
- real document upload flow through the backend
- local file storage in file mode and Supabase Storage upload in hosted mode
- backend file access route for document preview/download
- previewable evidence gallery cards in the Documents module and linked record detail views
- invoice files and payment proofs hooked into the same upload and preview pipeline
- print-friendly export pages and downloadable text dossier exports
- attention center with reminder suggestions generated from live compliance gaps
- assistant-style Smart Capture flow that sends raw notes, receipts, and voice captures into an inbox first
- inbox review workspace with suggested action, suggested project, confidence score, extracted text, and apply controls
- optional OCR/classification/transcription path through OpenAI when credentials are configured
- heuristic fallback classification when AI credentials are not configured
- app-level email/password sign-in with isolated workspaces
- independent workspace-scoped reads and writes for separate users
- computed compliance scoring and blockers from backend services
- dossier-style narrative preview for each key entity
- switchable file-backed or Supabase-backed persistence through the same API routes
- relational schema file for the next database-backed phase

## Recommended next build steps

1. Add audit-event writes for auth, create, update, archive, and delete actions.
2. Add workspace membership and invited collaborator support beyond one owner per workspace.
3. Add row-level security if you want browser-direct Supabase access later.
4. Replace the JSON store with migrations plus a production Supabase setup using `database/schema.sql`.
5. Expand AI intake from text/image/audio into stronger PDF parsing and confirmation workflows.
