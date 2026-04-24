# Content Business Documentation App UI Reference Spec

## 1. What This App Is

This app is a **documentation operating system for a content business**.

It is not just a note-taking app, CRM, or expense tracker.

Its main job is to help a creator or content team:

- capture business intent at the start of work
- collect proof and records while work is happening
- close projects, trips, and productions with guided documentation
- keep expenses, invoices, collaborators, and files linked together
- generate exportable, audit-ready records later

The UI should feel like a mix of:

- a creative operations dashboard
- a business record system
- a compliance checklist system
- a documentation and export workspace

## 2. Core UX Principle

Every major workflow in the UI should follow this pattern:

1. **Intent**
   - why this work exists
   - business purpose
   - planned outcome
2. **Evidence**
   - expenses
   - people involved
   - receipts
   - notes
   - uploaded documents
   - production logs
3. **Closure**
   - summary of what happened
   - compliance checklist
   - unresolved blockers
   - export / dossier generation

This means the UI should always help the user answer:

- What are we doing?
- Why are we doing it?
- What proof do we have?
- What is still missing?
- Is this record ready to close?

## 3. Target User Types

The UI should support these users:

- solo creator
- creator + assistant
- creator + editor + contractor team
- accountant / reviewer later

The initial UI should focus on the creator/operator, but it should be designed so role-based views can be added later.

## 4. Overall App Shell

## 4.1 Main Layout

Desktop layout:

- left sidebar navigation
- top header bar
- main content area
- optional right-side detail / inspector panel on selected screens

Mobile layout:

- bottom tab bar for primary modules
- top header with page title + quick actions
- stacked cards
- expandable drawers instead of multi-column layouts

## 4.2 Global Navigation Tabs

The full product UI should include these tabs:

1. Dashboard
2. Projects
3. Trips / Travel
4. Productions
5. Expenses
6. Ideas
7. Knowledge
8. People
9. Billing
10. Documents
11. Reminders
12. Reports / Exports
13. Settings

For MVP, the most important tabs are:

- Dashboard
- Projects
- Trips
- Productions
- Expenses
- People
- Reminders

## 4.3 Global Header

Every screen should include:

- current page title
- workspace name
- current date or active period
- search bar
- notifications / reminders badge
- quick add button
- user avatar / workspace switcher

## 4.4 Global Quick Add

A floating or header-level **Quick Add** button should open a modal or command palette.

Quick add options:

- New Project
- New Trip
- New Production
- New Expense
- New Person
- New Reminder
- New Invoice
- Upload Document
- Add Idea
- Add Knowledge Note

Each quick add flow should be short and minimal first, with an option like:

- `Save and continue`
- `Save as draft`
- `Open full form`

## 4.5 Global UI Components

Reusable components needed throughout the app:

- primary button
- secondary button
- ghost button
- danger button
- icon button
- tag / badge
- status chip
- score chip
- progress bar
- card
- table
- list row
- segmented control
- filter chips
- tabs inside a page
- modal
- slide-over drawer
- empty state
- loading skeleton
- error state
- timeline item
- upload zone
- comment / note box
- checklist item
- summary stat tile
- linked entity pill

## 5. Visual Direction

The UI should feel:

- premium but practical
- creative-business focused
- clear and trustworthy
- not corporate-boring
- not consumer-social

Visual style:

- warm neutral background
- strong accent color for actions and warnings
- clean typography with high readability
- large cards and spacious panels
- obvious status colors:
  - green = ready / complete
  - amber = needs review / warning
  - red = blocked / missing
  - blue = in progress / active

The app should visually separate:

- operational information
- compliance information
- creative information

## 6. Cross-Screen Data Patterns

Every major entity screen should support:

- list view
- detail view
- create form
- edit form
- linked records section
- documents section
- notes section
- compliance section
- activity / audit section
- export preview section

Every major entity detail page should include 3 sections:

1. Intent
2. Evidence
3. Closure

## 7. Dashboard Tab

## 7.1 Purpose

Give a daily operating snapshot of the business and highlight what needs attention now.

## 7.2 Dashboard Layout

Top summary row:

- Open Records
- Compliance Average
- High Priority Issues
- Upcoming Due Items
- Outstanding Invoice Amount
- This Month Spend

Second row:

- main focus panel
- recent activity panel
- reminders panel

Third row:

- open trips
- active projects
- recent expenses
- recent productions

## 7.3 Dashboard Components

### Summary Cards

Each card should show:

- title
- number
- mini trend or context line
- optional click-through action

Examples:

- `12 open records`
- `82 compliance score`
- `5 missing receipts`
- `3 overdue reminders`

### Priority Issues Panel

A ranked list of the most urgent problems.

Each row should show:

- entity name
- entity type
- issue summary
- severity chip
- quick action button

Buttons:

- `Review`
- `Resolve`
- `Open record`

### Today / This Week Panel

Shows:

- due reminders
- upcoming shoots
- upcoming trips
- invoice due dates
- planned publish dates

Buttons:

- `Mark done`
- `Reschedule`
- `Open`

### Compliance Snapshot Panel

Visual widgets:

- average score
- records below threshold
- missing documents count
- pending closures count

Buttons:

- `View all blockers`
- `Run export review`

### Dossier Preview Panel

Shows a preview of one selected project/trip/production export draft.

Buttons:

- `Open record`
- `Generate export`
- `Copy summary`

## 8. Projects Tab

## 8.1 Purpose

Projects are the parent business records that connect work, travel, people, expenses, and outputs.

## 8.2 Projects List Screen

Layout:

- page header
- filter bar
- table or card list
- optional side preview

Filters:

- status
- closure status
- date range
- client / internal
- high-risk only
- low compliance only

Columns / card fields:

- project title
- project type
- status
- planned date range
- budget estimate
- linked trips count
- linked productions count
- linked expenses count
- compliance score
- closure status

Buttons:

- `New project`
- `Open`
- `Edit`
- `Start opening interview`
- `Soft close`
- `Final close`

## 8.3 Project Detail Screen

Top area:

- project name
- status chip
- closure chip
- compliance score
- quick actions

Quick actions:

- `Edit project`
- `Add trip`
- `Add production`
- `Add expense`
- `Add person`
- `Upload document`
- `Start closure`
- `Generate dossier`

Detail page sections:

### Section A: Overview

Fields:

- title
- project type
- client / brand / internal
- description
- commercial objective
- revenue outcome
- timeline
- budget estimate

### Section B: Intent Record

This is the opening interview area.

Show:

- opening objective
- monetization goal
- business reason
- expected outputs
- expected timeline
- created timestamp

Buttons:

- `Edit intent`
- `Re-run opening interview`

### Section C: Linked Records

Sub-panels:

- linked trips
- linked productions
- linked expenses
- linked people
- linked invoices
- linked documents

Each sub-panel should show counts and recent items.

Buttons:

- `Add existing`
- `Create new`
- `View all`

### Section D: Compliance

Show:

- score out of 100
- blockers list
- warnings list
- missing documents
- unresolved items count
- closure eligibility

Buttons:

- `Resolve blockers`
- `Open checklist`

### Section E: Closure

Show:

- narrative summary
- project closure questionnaire answers
- unresolved gaps
- REOP contribution
- CPA readiness state

Buttons:

- `Soft close`
- `Attempt final close`
- `Export dossier`

## 8.4 Project Create / Edit Form

Form fields:

- title
- project type
- client / internal
- description
- planned start
- planned end
- budget estimate
- commercial objective
- revenue or business outcome
- notes

Footer buttons:

- `Cancel`
- `Save draft`
- `Save and start opening interview`

## 9. Trips / Travel Tab

## 9.1 Purpose

Capture and document business travel with enough detail for reimbursement, audit, and production tracking.

## 9.2 Trips List Screen

Filters:

- trip type
- date range
- linked project
- closure status
- overdue closure
- missing brief

Columns / cards:

- trip title
- trip type
- route
- dates
- linked project
- pre-trip status
- post-trip status
- compliance score
- closure status

Buttons:

- `New trip`
- `Open`
- `Add expense`
- `Add daily log`
- `Start post-trip questionnaire`

## 9.3 Trip Detail Screen

Top summary:

- trip name
- trip type
- dates
- route
- linked project
- score
- closure status

Quick actions:

- `Edit trip`
- `Add daily log`
- `Add expense`
- `Upload receipt`
- `Open mileage log`
- `Start opening interview`
- `Start post-trip closure`
- `Generate trip dossier`

Detail tabs inside trip page:

### Tab 1: Overview

- purpose
- route
- dates
- budget estimate
- actual spend
- notes

### Tab 2: Pre-Trip

- content brief
- planned locations
- shot list
- budget estimate
- people involved
- role documentation
- checklist completion

Buttons:

- `Add brief`
- `Edit checklist`
- `Upload plan document`

### Tab 3: During Trip

- daily logs
- location notes
- activities
- uploaded receipts
- transport log
- mileage entries

Buttons:

- `Add daily log`
- `Add mileage entry`
- `Upload receipt`
- `Add note`

### Tab 4: Post-Trip

- actual content produced
- planned vs actual comparison
- spend reconciliation
- business-purpose summary
- closure questionnaire answers
- blockers

Buttons:

- `Answer closure questions`
- `Write narrative`
- `Resolve missing items`
- `Generate dossier`

### Tab 5: Documents

- receipts
- itineraries
- permits
- hotel bills
- travel invoices
- screenshots / proof

Buttons:

- `Upload document`
- `Tag file`
- `Link to expense`

## 9.4 Mileage Log Sub-Component

This should be a reusable sub-table / drawer.

Columns:

- date
- origin
- destination
- purpose
- odometer start
- odometer end
- total km
- linked project/trip
- created timestamp

Buttons:

- `Add entry`
- `Edit`
- `Export mileage sheet`

## 10. Productions Tab

## 10.1 Purpose

Track each content production / shoot as its own documented record.

## 10.2 Productions List Screen

Filters:

- format
- platform
- published / unpublished
- linked project
- low score
- missing role documentation

Columns / cards:

- working title
- content type
- platform
- shoot date
- location
- publish status
- compliance score
- closure status

Buttons:

- `New production`
- `Open`
- `Add expense`
- `Add person`
- `Mark published`
- `Start closure`

## 10.3 Production Detail Screen

Top summary:

- title
- content type
- platform intent
- shoot date
- location
- publish status
- score
- closure status

Quick actions:

- `Edit production`
- `Add expense`
- `Add person`
- `Upload permit`
- `Mark published`
- `Open closure questionnaire`
- `Generate production dossier`

Detail tabs:

### Tab 1: Overview

- title
- format
- platform
- business purpose
- location
- linked project

### Tab 2: People & Roles

- person name
- role
- hours
- deliverables
- paid / unpaid
- invoice linked

Buttons:

- `Add person`
- `Assign role`
- `Log hours`
- `Attach invoice`

### Tab 3: Expenses

- linked expense list
- expense totals
- missing expense warnings

Buttons:

- `Add expense`
- `Link existing expense`

### Tab 4: Publication

- published yes/no
- publish URL
- publish date
- next step
- target publish date
- reminder toggle

Buttons:

- `Mark published`
- `Set reminder`

### Tab 5: Closure

- closure questions
- role confirmation
- linked expense confirmation
- publication state
- missing items
- score

Buttons:

- `Answer closure questions`
- `Attempt final close`
- `Export dossier`

## 11. Expenses Tab

## 11.1 Purpose

Fast expense capture with enough business context to defend each spend later.

## 11.2 Expenses List Screen

Filters:

- category
- date range
- linked project
- linked trip
- receipt missing
- high amount
- low compliance
- capital asset only

Columns:

- title
- category
- amount
- expense date
- project / trip / production link
- business purpose status
- receipt status
- compliance score

Buttons:

- `New expense`
- `Upload receipt`
- `Open`
- `Edit`

## 11.3 Expense Detail Screen

Top summary:

- title
- category
- amount
- date
- receipt status
- score

Quick actions:

- `Edit expense`
- `Upload receipt`
- `Link to trip`
- `Link to production`
- `Mark asset`

Sections:

### Section A: Expense Basics

- title
- category
- amount
- expense date
- payment method
- vendor

### Section B: Business Purpose

- detailed purpose statement
- content connection
- project link
- production link
- trip link

### Section C: Documents

- receipt preview
- invoice preview
- related files

Buttons:

- `Upload file`
- `Replace file`
- `Remove link`

### Section D: Compliance

- missing purpose warning
- missing receipt warning
- meal / asset flags
- entry lag indicator
- accountant note field

Buttons:

- `Resolve`
- `Add note`

## 11.4 Expense Create Form

Fields:

- title
- category
- amount
- expense date
- business purpose
- content connection
- linked project
- linked trip
- linked production
- receipt upload

Buttons:

- `Cancel`
- `Save`
- `Save and upload another`

## 12. Ideas Tab

## 12.1 Purpose

Capture raw content ideas quickly and allow conversion into real productions or projects later.

## 12.2 Ideas List Screen

Filters:

- idea type
- platform
- status
- tags

Card fields:

- title
- type
- platform
- tags
- date created
- status

Buttons:

- `New idea`
- `Convert to project`
- `Convert to production`
- `Archive`

## 12.3 Idea Detail Screen

Fields:

- title
- raw thought
- hook
- platform
- format
- tags
- references
- linked project if converted

Buttons:

- `Edit`
- `Convert`
- `Duplicate`
- `Archive`

## 13. Knowledge Tab

## 13.1 Purpose

A searchable internal wiki for production knowledge and business references.

## 13.2 Knowledge Screen

Layout:

- left category list
- center notes list
- right note detail

Categories:

- Production tips
- Camera
- Lighting
- Editing
- Platform strategy
- Business workflows
- Tax / compliance notes
- Brand / sponsor references

Buttons:

- `New note`
- `Edit note`
- `Pin`
- `Link to project`
- `Duplicate`

## 14. People Tab

## 14.1 Purpose

Maintain a record of all collaborators, clients, contractors, and their proof of work.

## 14.2 People List Screen

Filters:

- person type
- agreement missing
- work log missing
- rate justification missing
- linked project

Columns / cards:

- name
- role type
- linked projects
- agreement status
- work log status
- market rate status
- compliance score

Buttons:

- `New person`
- `Open`
- `Add agreement`
- `Add work log`
- `Attach invoice`

## 14.3 Person Detail Screen

Top summary:

- full name
- person type
- score
- linked records count

Quick actions:

- `Edit person`
- `Upload agreement`
- `Add work log`
- `Attach invoice`
- `Generate contractor dossier`

Detail tabs:

### Tab 1: Profile

- name
- contact info
- role summary
- notes

### Tab 2: Agreements

- agreement files
- signed date
- active/inactive

Buttons:

- `Upload agreement`
- `Replace agreement`

### Tab 3: Work Logs

- date
- project
- role
- hours
- deliverables

Buttons:

- `Add work log`
- `Edit`

### Tab 4: Payments / Invoices

- submitted invoices
- payment status
- amount
- proof files

Buttons:

- `Create invoice`
- `Record payment`

### Tab 5: Compliance

- agreement on file
- work proof status
- rate justification status
- missing items list

Buttons:

- `Resolve issues`
- `Export dossier`

## 15. Billing Tab

## 15.1 Purpose

Track money coming in and going out.

## 15.2 Billing Sub-Tabs

- Outgoing Invoices
- Incoming Bills
- Payments
- Payout Status

## 15.3 Invoice List

Columns:

- invoice number
- linked project
- linked person/client
- issue date
- due date
- amount
- status

Buttons:

- `New invoice`
- `Generate PDF`
- `Record payment`
- `Send reminder`

## 16. Documents Tab

## 16.1 Purpose

A central file layer for all receipts, invoices, contracts, permits, screenshots, and reference files.

## 16.2 Documents Screen

Filters:

- file type
- linked entity type
- upload date
- unlinked files

Views:

- grid view
- list view

Each file card / row shows:

- file name
- type
- upload date
- linked record
- tags

Buttons:

- `Upload`
- `Preview`
- `Link to record`
- `Download`
- `Delete`

## 17. Reminders Tab

## 17.1 Purpose

Surface missing follow-ups and required actions.

## 17.2 Reminders List Screen

Filters:

- severity
- due today
- overdue
- linked type
- completed / open

Columns:

- reminder title
- linked entity
- due date
- severity
- source rule
- status

Buttons:

- `New reminder`
- `Mark complete`
- `Reschedule`
- `Open linked record`

## 17.3 Reminder Detail Drawer

Shows:

- title
- linked entity
- note
- due date
- severity
- rule source
- history

Buttons:

- `Complete`
- `Snooze`
- `Edit`

## 18. Reports / Exports Tab

## 18.1 Purpose

Generate formal summaries, bundles, and dossiers from the records.

## 18.2 Export Types

- Project dossier
- Trip dossier
- Production dossier
- Contractor dossier
- Expense report
- Tax year package
- Mileage report
- Invoice summary

## 18.3 Reports Screen Layout

Top filters:

- report type
- project
- person
- date range
- tax year

Main area:

- report templates
- preview panel
- export history

Buttons:

- `Generate preview`
- `Export PDF`
- `Export CSV`
- `Save template`

## 19. Settings Tab

## 19.1 Settings Sections

- Workspace profile
- Business profile
- Invoice settings
- Compliance settings
- Reminder rules
- Team / user roles
- Export settings
- Branding
- Data / integrations

## 19.2 Compliance Settings

Fields:

- missing receipt threshold
- score thresholds
- reminder rules
- mileage logging defaults
- meal treatment defaults
- capital asset treatment defaults

Buttons:

- `Save settings`
- `Reset defaults`

## 20. Required Modal / Drawer Flows

The app should include these important modal or drawer interactions:

- Quick Add Modal
- Upload Document Modal
- Opening Interview Modal
- Closure Questionnaire Modal
- Add Expense Modal
- Add Person Modal
- Add Reminder Modal
- Generate Export Modal
- Link Existing Record Drawer
- Compliance Blockers Drawer
- Search / Command Palette

## 21. Opening Interview UI

This is one of the most important parts of the product.

It should feel guided, structured, and lightweight.

Use:

- progress indicator
- one question or small group per step
- autosave
- previous / next buttons
- completion summary

### Project Opening Interview Questions

- What is the commercial objective?
- What outcome or revenue goal does this support?
- What is the timeline?

### Trip Opening Interview Questions

- What is the business purpose of this trip?
- What content is planned?
- What locations are planned?
- What is the estimated budget?
- Are contractors or spouse involved in a business role?
- Has a content brief been saved?

### Production Opening Interview Questions

- What are you producing?
- What is the business purpose?
- Where are you filming?
- Who is involved?
- What is the estimated cost?

Buttons:

- `Back`
- `Save draft`
- `Next`
- `Finish`

## 22. Closure Questionnaire UI

This should appear when the user attempts to close a trip, project, or production.

Layout:

- left progress / section list
- center questions
- right live compliance summary

Show:

- answered questions count
- required questions remaining
- blockers remaining
- final close eligibility

Buttons:

- `Save progress`
- `Continue`
- `Soft close`
- `Attempt final close`
- `Generate dossier`

## 23. Search Experience

Global search should be available everywhere.

Search should find:

- projects
- trips
- productions
- expenses
- people
- invoices
- documents
- ideas
- notes
- reminders

Search results should show:

- title
- type
- short context line
- status / score
- quick open action

## 24. Notification / Alert System

The UI should support:

- top-right notifications menu
- in-page warning banners
- compliance blocker callouts
- due date alerts
- success toasts

Alert examples:

- `Receipt missing for expense above threshold`
- `Trip ended but closure is incomplete`
- `Production still unpublished`
- `Contractor payment missing agreement`

## 25. Empty States

Each tab needs a strong empty state.

Empty state should include:

- short explanation
- value of the tab
- primary action button
- optional secondary action

Examples:

- Projects:
  - `No projects yet`
  - `Create your first project to start linking trips, productions, and expenses.`
  - button: `New project`

- Expenses:
  - `No expenses recorded`
  - `Add your first expense to start building the business paper trail.`
  - button: `New expense`

## 26. Loading States

Needed loading patterns:

- skeleton cards
- skeleton table rows
- spinner inside buttons
- full-screen loading for initial workspace load

## 27. Error States

Common error state components:

- failed to load records
- failed to save
- failed to upload file
- failed to generate export
- failed to connect to backend

Buttons:

- `Retry`
- `Go back`
- `Contact support`

## 28. Responsive Behavior

Desktop:

- sidebar visible
- dual-column and three-column layouts allowed
- list + detail split views

Tablet:

- compact sidebar
- stacked detail panels

Mobile:

- bottom navigation
- cards instead of tables
- detail pages open full-screen
- forms broken into steps

## 29. Design Priority For UI Builders

If this spec is given to a UI builder, it should prioritize:

1. full navigation shell
2. dashboard
3. detailed list/detail flows for:
   - projects
   - trips
   - productions
   - expenses
   - people
   - reminders
4. quick add modal
5. opening interview flow
6. closure questionnaire flow
7. export/report screen
8. documents and billing screens
9. settings screens

## 30. Short Prompt Version For UI Tools

Use this if you want to paste a compressed version into a UI generator:

> Build a premium web app UI for a "Content Business Documentation Operating System" used by creators and small content teams. The app helps users manage projects, trips, productions, expenses, collaborators, reminders, invoices, documents, ideas, knowledge notes, reports, and settings. The product is built around 3 stages for every major record: intent, evidence, and closure. Include a sidebar with tabs for Dashboard, Projects, Trips, Productions, Expenses, Ideas, Knowledge, People, Billing, Documents, Reminders, Reports, and Settings. Add a top header with workspace name, search, notifications, quick add, and user menu. Create complete list and detail screens for projects, trips, productions, expenses, people, and reminders. Every detail screen should include overview, linked records, compliance score, blockers, warnings, notes, documents, and export preview. Include opening interview modals, closure questionnaire flows, upload document flows, dashboards with summary cards and issue panels, and a reports area for generating dossiers and audit-ready exports. Use a warm premium creative-business visual style with clear status chips, score badges, cards, tables, modals, drawers, empty states, loading states, and responsive desktop/mobile behavior.

