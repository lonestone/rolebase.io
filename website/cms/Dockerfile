FROM node:22-slim

RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

# Install Claude Code CLI
RUN npm install -g @anthropic-ai/claude-code

WORKDIR /app

# Copy project files
COPY package.json package-lock.json ./
COPY patches ./patches
RUN npm ci

COPY . .

# Build CMS frontend
RUN npx vite build --config cms/frontend/vite.config.ts

EXPOSE 4001 4321

# Start Astro dev server + CMS backend
CMD ["sh", "-c", "npx astro dev --host & npx tsx cms/server.ts"]
