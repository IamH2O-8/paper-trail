# Build Roadmap

## Goal

Turn the current prototype into an assistant-like documentation product that feels simple for creators while still producing defensible business records.

## Phase 1: Remove “Looks Done But Isn’t” Gaps

- Replace placeholder `Reports` with a working export screen.
- Add downloadable export outputs.
- Add print-friendly export pages so users can save reports as PDF from the browser.
- Replace raw ID entry in common linking flows with human-readable pickers.
- Add an attention center for compliance-driven follow-up instead of leaving the notification icon empty.

## Phase 2: Make The Product Feel Like An Assistant

- Add OCR for receipts and invoices.
- Add speech-to-text for voice-note capture.
- Add classification for:
  - expense vs project update vs proof
  - business vs mixed vs personal
  - likely linked project
- Add confidence-based matching with user confirmation.
- Add an inbox timeline for raw captures before they are finalized.

## Phase 3: Automate Operations

- Generate reminders from compliance gaps automatically.
- Add snooze, recurrence, and reminder resolution flows.
- Add billing automations:
  - overdue nudges
  - payment follow-up
  - missing proof reminders
- Add closure automation for questionnaires and final-close checks.

## Phase 4: Complete Missing Product Areas

- Build real `Ideas` module.
- Build real `Knowledge` module.
- Build real `Settings` and integration controls.
- Add richer `Reports` history, status tracking, and generated file storage.
- Add edit/delete/archive flows for records.

## Phase 5: Make It Multi-User And Deployable

- Add authentication.
- Add workspace-aware request identity.
- Add role and member management.
- Add audit-event logging.
- Add row-level security for Supabase.
- Add hosted debugging and shared test environments.

## What Was Implemented In This Pass

- working reports/export workspace
- print-friendly export pages
- downloadable text exports
- notifications/attention center
- reminder suggestions generated from live compliance gaps
- one-click creation of reminders from suggested items
- human-readable linked-record pickers in common form paths
- removal of document quick-add from the general advanced record list to avoid exposing storage internals
- assistant inbox resource and API routes
- Smart Capture now lands in an inbox first instead of forcing immediate record creation
- inbox review workspace with suggested action, suggested project, extracted text, and confidence
- apply flow that turns a capture into a project, expense, update note, or proof document
- optional OpenAI-powered OCR, transcription, and classification hooks
- heuristic fallback classification for local/no-key development

## Recommended Next Build

1. Persistent automated reminder sync on backend
2. Full edit, archive, and delete lifecycle
3. Real Ideas, Knowledge, Settings, and Support modules
4. Authentication, workspace isolation, and audit logging
5. Stronger PDF parsing and review-confidence refinement in the inbox
