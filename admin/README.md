Private admin service (Cloud Run) outline:

- Auth: Google OAuth restricted to @veteranet.org (or Cloud IAP). Use a service account for publishing.
- UI: Simple toggle dashboard to choose what to expose publicly.
- Publish endpoint: writes sanitized JSON to a public GCS bucket path (e.g., gs://<public-bucket>/public.json) with `allUsers` read access; or returns JSON via a public Cloud Run endpoint with CORS.
- Also host private console features (LLM/chat) here; keep them behind auth.

Suggested structure (Node/Express):
- /auth/login (Google OAuth)
- /auth/callback
- /ui (admin dashboard; gated)
- /api/publish (POST; body = curated content; writes to GCS)

Env you’ll need on Cloud Run:
- GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET
- SESSION_SECRET
- ALLOWED_DOMAIN=veteranet.org
- PUBLIC_BUCKET or PUBLIC_FEED_URL

Public site env:
- NEXT_PUBLIC_PUBLIC_FEED_URL=https://storage.googleapis.com/<public-bucket>/public.json
- NEXT_PUBLIC_PRIVATE_CONSOLE_URL=https://<your-private-service>.run.app

Note: No secrets in the public GH Pages build. Use the private service to publish the sanitized feed.
