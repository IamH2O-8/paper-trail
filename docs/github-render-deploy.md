# GitHub + Render Deployment Guide

This guide assumes:

- Supabase will be used for the database and document storage
- Render will host the Node server
- GitHub will hold the source repo

## 1. Prepare Supabase

1. Create a new Supabase project.
2. Open the SQL editor.
3. Run [database/schema.sql](/Users/neergahlawat/Desktop/AI Projects/Content Creation /database/schema.sql:1).
4. Optionally run [database/seed.sql](/Users/neergahlawat/Desktop/AI Projects/Content Creation /database/seed.sql:1) if you want demo data online.
5. In Supabase, copy:
   - Project URL
   - Service role key

Recommended bucket:

- `content-documents`

The app will attempt to create the bucket automatically on first upload if it does not exist.

## 2. Create a local production env file

Create a local `.env` file from [.env.example](/Users/neergahlawat/Desktop/AI Projects/Content Creation /.env.example:1) and use values like:

```bash
APP_REPOSITORY=supabase
APP_BASE_URL=https://your-render-service.onrender.com
APP_SESSION_SECRET=use-a-long-random-secret

SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_STORAGE_BUCKET=content-documents
```

Optional AI intake:

```bash
OPENAI_API_KEY=your-openai-key
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_VISION_MODEL=gpt-4o-mini
OPENAI_CLASSIFICATION_MODEL=gpt-4o-mini
OPENAI_TRANSCRIPTION_MODEL=gpt-4o-mini-transcribe
```

Do not commit `.env`.

## 3. Initialize git locally

If this folder is not already a git repo:

```bash
git init
git branch -M main
git add .
git commit -m "Initial Paper Trail app"
```

## 4. Create a GitHub repository

Create a new empty GitHub repo in the browser.

Suggested repo names:

- `paper-trail`
- `creator-business-memory`
- `content-business-documentation-app`

Then connect the local repo:

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

If the repo already exists remotely and is empty, this is enough.

## 5. Deploy on Render

This repo includes [render.yaml](/Users/neergahlawat/Desktop/AI Projects/Content Creation /render.yaml:1), so the fastest route is:

1. Go to Render.
2. Choose `New +`.
3. Choose `Blueprint`.
4. Connect your GitHub account.
5. Select this repo.
6. Render will read `render.yaml`.

If you prefer manual creation:

1. Create a new `Web Service`.
2. Connect the GitHub repo.
3. Use:
   - Runtime: `Node`
   - Build Command: `true`
   - Start Command: `node server.js`
4. Set Health Check Path:
   - `/api/health`

## 6. Add Render environment variables

Set these in Render:

- `APP_REPOSITORY=supabase`
- `APP_BASE_URL=https://<your-render-service>.onrender.com`
- `APP_SESSION_SECRET=<long-random-secret>`
- `SUPABASE_URL=<your-supabase-url>`
- `SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>`
- `SUPABASE_STORAGE_BUCKET=content-documents`

Optional:

- `OPENAI_API_KEY`
- `OPENAI_BASE_URL=https://api.openai.com/v1`
- `OPENAI_VISION_MODEL=gpt-4o-mini`
- `OPENAI_CLASSIFICATION_MODEL=gpt-4o-mini`
- `OPENAI_TRANSCRIPTION_MODEL=gpt-4o-mini-transcribe`

## 7. First production checks

After deploy:

1. Open `https://<your-render-service>.onrender.com/api/health`
2. Confirm it returns `{ "ok": true }`
3. Open the app
4. Register your first real account
5. Register the second user from a separate browser profile or private window
6. Confirm:
   - each user only sees their own workspace data
   - uploads work
   - document preview works
   - inbox capture works
   - PDF export works

## 8. Recommended live testing flow

Test these first:

1. User A creates a workspace and logs:
   - one project
   - one expense
   - one file
   - one idea
2. User B creates a different workspace and logs similar items.
3. Confirm there is no cross-workspace visibility.
4. Test search, exports, and uploads in both accounts.

## 9. Best next hardening steps after launch

- add audit event logging
- add password reset or managed auth
- add workspace invites if you want multiple people inside one workspace
- add full hosted QA around uploads and exports
- add monitoring/log capture for production debugging
