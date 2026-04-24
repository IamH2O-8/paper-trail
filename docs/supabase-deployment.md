# Supabase And Deployment Runbook

This codebase can now run against either:

- the local file repository
- a Supabase-backed hosted repository

## Repository switch

Local mode:

```bash
APP_REPOSITORY=file node server.js
```

Supabase mode:

```bash
APP_REPOSITORY=supabase \
SUPABASE_URL="https://<project-ref>.supabase.co" \
SUPABASE_SERVICE_ROLE_KEY="<service-role-key>" \
SUPABASE_STORAGE_BUCKET="content-documents" \
APP_SESSION_SECRET="<strong-random-secret>" \
node server.js
```

The service role key is used server-side only. Do not expose it in browser code.

## Supabase setup

1. Create a new Supabase project.
2. Open the SQL editor.
3. Run [database/schema.sql](/Users/neergahlawat/Desktop/AI Projects/Content Creation /database/schema.sql:1).
4. Run [database/seed.sql](/Users/neergahlawat/Desktop/AI Projects/Content Creation /database/seed.sql:1) if you want test data.
5. Copy:
   - project URL
   - service role key

## Current Supabase repository behavior

The repository in [src/data/repository/createSupabaseRepository.js](/Users/neergahlawat/Desktop/AI Projects/Content Creation /src/data/repository/createSupabaseRepository.js:1):

- reads and writes through Supabase REST
- keeps the service and route layer unchanged
- maps snake_case database rows into the app's camelCase records
- works alongside the upload service in [documentFileService.js](/Users/neergahlawat/Desktop/AI Projects/Content Creation /src/services/documentFileService.js:1) for document storage
- supports billing records such as invoices and payments through the same repository layer

That means we can switch repositories without rewriting the frontend or API surface.

## Recommended hosted deployment

Render or Railway are the simplest fits for this Node server.

Required environment variables:

- `APP_REPOSITORY=supabase`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_STORAGE_BUCKET`
- `APP_SESSION_SECRET`
- `PORT`
- `APP_BASE_URL`

## Document storage behavior

- file mode writes uploads to `data/uploads`
- Supabase mode uploads files to the bucket set in `SUPABASE_STORAGE_BUCKET`
- if the bucket does not exist yet, the server will attempt to create it on first upload
- document files are served back through `GET /api/documents/:id/file`
- invoice files and payment proofs are stored as document records and use the same preview route

## Render setup

1. Create a new Web Service from the repo.
2. Runtime: Docker or Node.
3. Start command:

```bash
node server.js
```

4. Add the environment variables above.
5. Deploy.

## Railway setup

1. Create a new project from the repo.
2. Set the same environment variables.
3. Use the default Node start command or `node server.js`.
4. Deploy and open the generated URL.

## Debugging flow this enables

Once deployed with Supabase:

- the same API routes work locally and online
- test data persists across sessions
- frontend bugs can be reproduced against shared hosted data
- route responses can be inspected directly from the live URL

## Important next hardening steps

Before production use, add:

1. Replace app-level auth with Supabase Auth if you want managed identity and recovery flows
2. Add workspace membership tables for multi-member teams inside one workspace
3. Add row-level security policies if browser-direct Supabase access is introduced
4. add audit event writes on create and update
5. signed client-side uploads if we want to remove file proxying from the Node server
6. migration/versioning instead of one-shot SQL files
