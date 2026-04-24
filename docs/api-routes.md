# API Routes

The app now exposes a small REST API that sits behind the web prototype.

## Meta routes

- `GET /api/health`
  - basic service check
- `GET /api/bootstrap`
  - returns workspace, dashboard summary, and all current collections
- `GET /api/dashboard`
  - returns the dashboard overview only
- `GET /api/captures`
  - returns raw assistant inbox captures
- `GET /api/captures/:id`
  - returns one inbox capture and its suggestion state
- `POST /api/captures/intake`
  - creates a new inbox capture from text, image, PDF, or audio payloads
- `PATCH /api/captures/:id`
  - updates capture fields before it is applied
- `POST /api/captures/:id/apply`
  - converts a reviewed capture into a project, expense, update note, or proof document
- `GET /api/captures/:id/file`
  - streams the original stored capture payload back for preview
- `GET /api/entities/:type/:id/compliance-summary`
  - returns backend-computed blockers, warnings, and score
- `GET /api/entities/:type/:id/questionnaires`
  - returns saved questionnaires for a specific entity
- `GET /api/entities/:type/:id/questionnaires/:stage`
  - returns the questionnaire template and any saved answers for `opening` or `closure`
- `POST /api/entities/:type/:id/questionnaires/:stage/submit`
  - saves answers and applies questionnaire-driven updates to the entity
- `POST /api/documents/upload`
  - uploads a file through the backend, stores it locally or in Supabase Storage, and creates the linked document record
- `GET /api/exports/:type/:id`
  - returns a dossier-style plain-text preview for the entity
- `GET /api/exports/:type/:id/html`
  - returns a print-friendly HTML export page
- `GET /api/exports/:type/:id/download`
  - downloads the dossier as a text file
- `GET /api/exports/:type/:id/pdf`
  - downloads the dossier as a PDF file
- `GET /api/exports/:type/:id/bundle`
  - downloads a ZIP bundle with the project dossier and linked original evidence files

`type` currently expects the plural resource name:

- `projects`
- `trips`
- `productions`
- `expenses`
- `people`
- `reminders`
- `documents`
- `invoices`
- `payments`
- `captures`

## Resource routes

Each of the core collections supports:

- `GET /api/<resource>`
- `GET /api/<resource>/:id`
- `POST /api/<resource>`
- `PATCH /api/<resource>/:id`

Documents also support:

- `GET /api/documents/:id/file`
  - streams the stored file back through the backend for preview/download

Supported resources:

- `projects`
- `trips`
- `productions`
- `expenses`
- `people`
- `reminders`
- `documents`
- `invoices`
- `payments`

Assistant inbox notes:

- `POST /api/captures/intake` accepts a lightweight JSON body and does not require multipart upload
- supported fields include:
  - `captureType`
  - `title`
  - `summary`
  - `projectId`
  - `captureDate`
  - `amount`
  - `category`
  - `allocation`
  - `fileName`
  - `mimeType`
  - `base64Data`
- when `OPENAI_API_KEY` is configured, the capture service attempts:
  - OCR-style text extraction for image captures
  - transcription for audio captures
  - AI classification for likely record type and likely project link
- without `OPENAI_API_KEY`, the same route falls back to heuristic classification so local testing still works

## Current backend behavior

- records are persisted to `data/dev-database.json`
- compliance summaries are calculated server-side
- export previews are generated server-side
- assistant captures are stored server-side before they become final records
- assistant captures can be applied into projects, expenses, update notes, or proof documents
- opening interviews and closure questionnaires are stored server-side
- document records and evidence metadata are stored server-side
- document uploads are stored in `data/uploads` in file mode
- document uploads are stored in Supabase Storage in hosted mode
- invoice files and payment proofs use the same document upload route and preview flow
- the frontend uses `GET /api/bootstrap` for initial load
- quick add uses `POST /api/<resource>`
- Smart Capture uses `POST /api/captures/intake`

## Next backend step

Replace the file database with a real database implementation behind the same service layer:

1. swap `src/data/fileDatabase.js` for a relational repository
2. apply `database/schema.sql`
3. add audit-event writes on create, apply, and patch
4. add signed-file retrieval flows for direct client access where needed
5. split capture orchestration, exports, and billing workflow automation into dedicated modules
