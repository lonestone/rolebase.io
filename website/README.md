# Rolebase Website

Astro + MDX website with an agent-first CMS powered by Claude Code.

## Getting started

```bash
npm install
npm run dev
```

This starts both the Astro dev server (port 4321) and the CMS backend (port 4001).

## Scripts

| Command             | Description                                     |
| ------------------- | ----------------------------------------------- |
| `npm run dev`       | Start Astro + CMS backend                       |
| `npm run dev:astro` | Start Astro only                                |
| `npm run dev:cms`   | Start CMS frontend dev server (Vite, port 4002) |
| `npm run build`     | Build the Astro site                            |
| `npm run build:cms` | Build the CMS frontend                          |
| `npm run cms`       | Start the CMS backend only                      |
| `npm run preview`   | Preview the built Astro site                    |

## CMS

The CMS is a lightweight admin interface for editing content with an AI agent.

### Architecture

- **Backend** (`cms/server.ts`): Hono server exposing REST API routes for content tree, file read/write, Git operations, Claude Code CLI integration, and media upload
- **Frontend** (`cms/frontend/`): React + Vite app with a sidebar file tree, MDX editor, Git panel, and an agent chat panel that streams Claude responses

### Development

For CMS frontend development with HMR:

```bash
npm run cms          # Start backend on port 4001
npm run dev:cms      # Start Vite dev server on port 4002 (proxies API to 4001)
```

For production, build the frontend first:

```bash
npm run build:cms    # Builds to cms/dist/
npm run cms          # Backend serves the built frontend
```

### Docker (production)

```bash
cd cms
docker compose up -d
```

Environment variables:

| Variable        | Description                             | Default                 |
| --------------- | --------------------------------------- | ----------------------- |
| `CMS_PORT`      | CMS backend port                        | `4001`                  |
| `CMS_PASSWORD`  | Password to access the CMS (production) | none                    |
| `ASTRO_DEV_URL` | Astro dev server URL                    | `http://localhost:4321` |
| `CONTENT_DIR`   | Content directory path                  | `src/content`           |
| `GIT_REPO_URL`  | Git repo URL (HTTPS)                    | detected from origin    |
| `GIT_PAT`       | GitHub Personal Access Token (for push) | none                    |
| `GIT_BRANCH`    | Git branch                              | `main`                  |

### Prerequisites

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) must be installed and authenticated
