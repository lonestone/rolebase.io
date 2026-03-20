#!/bin/sh
set -e

# If GIT_REPO_URL is set and /app is not a git repo, clone it
if [ -n "$GIT_REPO_URL" ] && [ ! -d "/app/.git" ]; then
  BRANCH="${GIT_BRANCH:-main}"

  if [ -n "$GIT_PAT" ]; then
    CLONE_URL=$(echo "$GIT_REPO_URL" | sed "s|https://|https://x-access-token:${GIT_PAT}@|")
  else
    CLONE_URL="$GIT_REPO_URL"
  fi

  echo "Cloning $GIT_REPO_URL (branch: $BRANCH)..."
  git clone --depth 1 --branch "$BRANCH" "$CLONE_URL" /tmp/repo
  cp -a /tmp/repo/.git /app/.git
  rm -rf /tmp/repo
  git checkout "$BRANCH" -- .
fi

# Configure git identity for commits
git config user.email "${GIT_USER_EMAIL:-cms@rolebase.io}"
git config user.name "${GIT_USER_NAME:-Rolebase CMS}"

# Start Astro dev server + CMS backend
exec sh -c "npx astro dev --host & npx tsx cms/server.ts"
