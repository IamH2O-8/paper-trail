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
### 4.1 Main Layout
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

### 4.2 Global Navigation Tabs
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

### 4.3 Global Header
Every screen should include:
- current page title
- workspace name
- current date or active period
- search bar
- notifications / reminders badge
- quick add button
- user avatar / workspace switcher

### 4.4 Global Quick Add
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

### 4.5 Global UI Components
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
### 7.1 Purpose
Give a daily operating snapshot of the business and highlight what needs attention now.
### 7.2 Dashboard Layout
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

## 8. Projects Tab
### 8.1 Purpose
Projects are the parent business records that connect work, travel, people, expenses, and outputs.
### 8.2 Projects List Screen
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

## 9. Trips / Travel Tab
### 9.1 Purpose
Capture and document business travel with enough detail for reimbursement, audit, and production tracking.

## 10. Productions Tab
### 10.2 Productions List Screen
Columns / cards:
- working title
- content type
- platform
- shoot date
- location
- publish status
- compliance score
- closure status

## 11. Expenses Tab
### 11.1 Purpose
Fast expense capture with enough business context to defend each spend later.

## 14. People Tab
### 14.1 Purpose
Maintain a record of all collaborators, clients, contractors, and their proof of work.

## 17. Reminders Tab
### 17.1 Purpose
Surface missing follow-ups and required actions.

## 21. Opening Interview UI
This is one of the most important parts of the product.
It should feel guided, structured, and lightweight.

## 22. Closure Questionnaire UI
This should appear when the user attempts to close a trip, project, or production.
