# Agentic Architect Dashboard

Cyberpunk high-stakes dashboard for Christopher M. Snook: AI, Blockchain, Infrastructure sessions, itinerary, and poker overlap. Deployed via GitHub Pages.

## Local Dev

```bash
npm install
npm run dev
# http://localhost:3000
```

For GitHub Pages export:

```bash
GITHUB_PAGES=true npm run build
# output in dist/
```

## Deploy (GitHub Pages)
- Workflow: `.github/workflows/deploy.yml` builds and publishes `dist` on pushes to `main`.
- Ensure Pages is enabled in repo settings with GitHub Actions as the source.

## Notes
- Static export (`output: "export"`) with unoptimized images and basePath/assetPrefix gated by `GITHUB_PAGES` env.
- No secrets in the client; any LLM/voice backend should live behind a server (Cloud Run recommended).
