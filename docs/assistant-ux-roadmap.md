# Assistant UX Roadmap

## Goal

Bridge the gap between a defensible records system and the assistant-like creator business app we actually want to ship.

The product should feel like:

- log something in natural language
- let the app help organize it
- retrieve it later without friction
- only deal with structured recordkeeping when necessary

## What We Keep

- backend compliance scoring and blocker logic
- evidence/document linking model
- project, trip, production, expense, people, billing, and report relationships
- questionnaire and closure workflows
- export and reminder infrastructure

## What We Change

- stop leading with modules and formal records
- stop making the user decide where something belongs before they can save it
- make capture, retrieval, and correction the primary experience

## Phase 1: Home, Inbox, Search

Focus:

- turn Home into an assistant workspace
- make Inbox the review queue
- make Search work across the whole workspace

Scope:

- in-page natural-language logger on Home
- recent activity feed
- plain-language attention panels
- workspace-wide search with grouped results
- inbox review with confirm, relink, and open-original actions

Status:

- partially implemented

## Phase 2: Reduce Review Friction

Focus:

- only ask for confirmation when the app is uncertain

Scope:

- confidence-based apply actions
- better project suggestion UX
- simpler correction controls
- better fallback handling for ambiguous captures
- inline edit/reclassify/relink actions

## Phase 3: Project Dossier Workflow

Focus:

- make each project feel like one living business trail

Scope:

- chronological activity timeline inside projects
- expenses, notes, receipts, billing, and proof in one stream
- milestone and closure prompts in context
- retrieval by story, not just by table row

## Phase 4: Stronger Intake Intelligence

Focus:

- improve the assistant layer without making the app opaque

Scope:

- stronger OCR
- better PDF understanding
- better voice-note transcription
- better classification and confidence scoring
- richer project matching signals

## Phase 5: Lifecycle And Trust

Focus:

- make low-friction capture safe at real-world scale

Scope:

- edit
- archive
- delete
- undo
- merge
- relink
- audit-visible correction history

## Phase 6: External Intake

Focus:

- least-resistance capture outside the product UI

Scope:

- WhatsApp or messaging intake
- email forwarding
- mobile-first capture surfaces
- external upload channels feeding the same inbox

## Product Principle

The compliance spine should stay strong, but the user should mostly experience:

- guidance instead of paperwork
- retrieval instead of record hunting
- confirmation instead of form-heavy setup
