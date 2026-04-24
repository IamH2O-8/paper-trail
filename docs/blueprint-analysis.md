# Blueprint Analysis

## Product Thesis

The blueprint is not describing a general creator CRM or a lightweight bookkeeping app. It is describing a **documentation operating system** for a creator-led business.

The strongest differentiator is the built-in compliance story:

- every important record begins with intent
- evidence is gathered while work is happening
- closure is guided, scored, and exportable

That gives the product a stronger position than "Notion for creators" or "expense tracking for influencers". The value is the paper trail, not just storage.

## What the blueprint gets right

1. It identifies the real business problem: memory gaps, weak evidence, missing links between work and money, and painful tax/audit preparation.
2. It treats travel, productions, expenses, people, invoices, and reminders as one connected system instead of separate tools.
3. It makes exportability a first-class feature.
4. It introduces closure workflows and questionnaires, which is where defensible business records are actually created.
5. It explicitly defines a backend MVP cut, which makes implementation practical.

## Product interpretation

The application should be framed as:

> An audit-ready operating system for content businesses that turns daily work into structured records, reminders, and exportable dossiers.

That framing is important because it affects UX decisions:

- fast capture matters more than dense admin forms
- linkability matters more than deep customization on day one
- guided questions matter more than passive fields
- compliance visibility should appear in normal workflow, not in a hidden settings page

## Best MVP slice

The blueprint already points to the right backend MVP:

- auth + workspace
- projects
- trips
- productions
- expenses
- people
- invoices + payments
- documents
- reminders
- compliance questionnaires
- exports

For a true v1, I would narrow it one more step to this product slice:

1. Workspace and user shell
2. Projects as the parent business object
3. Trips and productions as the main execution records
4. Expenses and people as evidence layers
5. Reminders and compliance summaries as operational pressure
6. Opening and closing questionnaires as the main product differentiator
7. Dossier preview/export scaffolding

This delivers the main promise without overbuilding AI, OCR, or advanced automation too early.

## Recommended architecture

## Frontend

- Web app with a fast quick-add workflow
- Dashboard centered on open items, compliance blockers, and next actions
- Entity detail views with three distinct sections:
  - intent record
  - evidence collected
  - closure readiness

## Backend

- Multi-tenant relational database
- Every primary table contains `workspace_id`
- Audit/event table for edits to important evidence
- Questionnaire engine stored as structured templates plus answers
- Compliance scoring as deterministic service logic, not ad hoc UI math

## Core entities

- `Workspace`
- `User`
- `BusinessProfile`
- `Project`
- `Trip`
- `ContentProduction`
- `Expense`
- `Person`
- `Invoice`
- `Payment`
- `Document`
- `Reminder`
- `ComplianceQuestionnaire`
- `ComplianceQuestionnaireAnswer`
- `AuditEvent`

## Important product rules from the blueprint

These rules should exist as platform behavior, not just documentation:

- business purpose must be required on business expenses
- trip, production, and project creation should trigger opening interviews
- final close should be blocked until required evidence exists
- scoring should reflect missing records and capture lag
- reminders should be generated from missing evidence and overdue closure

## Risks to avoid

1. Building a beautiful CRUD app that ignores the questionnaire and closure model.
2. Treating documents as a disconnected upload bucket instead of linked evidence.
3. Making compliance something the user checks only at tax time.
4. Adding AI before the deterministic workflow is trustworthy.

## What I built in this first pass

The current prototype in `web/` is a dependency-free front-end slice that turns the blueprint into a working product direction:

- dashboard with compliance visibility
- projects, trips, productions, expenses, people, reminders
- quick add for common records
- completeness scoring and blockers
- dossier-style narrative preview
- local persistence

It is still a prototype, but it already reflects the correct shape of the product.

## Recommended next implementation step

The next best move is to build a real backend around these flows:

1. auth and workspace isolation
2. relational schema for the core entities
3. questionnaire templates and answers
4. compliance service
5. export generation pipeline

That would let the current prototype evolve into the actual application instead of being thrown away.
