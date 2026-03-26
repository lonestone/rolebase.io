---
name: screenshot
description: This skill should be used when the user asks to "take a screenshot", "capture a page", "screenshot a website", or invokes /screenshot. Takes a URL as argument.
version: 0.2.0
---

# Take a website screenshot

Capture a clean, high-resolution (1920x1080) screenshot of a web page.

## Setup (once)

```bash
cd .claude/skills/screenshot/scripts && npm install
```

## Usage

Run the script via Bash:

```bash
node .claude/skills/screenshot/scripts/screenshot.js <url> [output.png] [--full]
```

- `url` (required): the page URL
- `output.png` (optional): output file path, defaults to `{hostname}.png`
- `--full` (optional): capture the full scrollable page instead of just the viewport

The script automatically removes cookie banners and chat widgets before taking the screenshot (see `scripts/cleanup.js`).

## How it works

1. Launches headless Chromium at 1920x1080
2. Navigates to the URL (waits for network idle)
3. Runs DOM cleanup (`scripts/cleanup.js`): removes cookie banners (Cookiebot, OneTrust, GDPR, etc.), chat widgets (Crisp, Intercom, Drift, HubSpot, Chatwoot, etc.), and small fixed-position corner elements
4. Waits 500ms for layout reflow
5. Takes the screenshot and prints the output path

## Extending cleanup

To add new selectors for cookie banners or chat widgets, edit `scripts/cleanup.js`.
