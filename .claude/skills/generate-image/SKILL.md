---
name: generate-image
description: Generate an image using Google Nano Banana Pro (Imagen). For blog thumbnails, illustrations, diagrams, infographics. Adapted to the Rolebase brand (purple #9870F0, warm cream backgrounds, warm gray scale).
user_invocable: true
arguments:
  - name: prompt
    description: "Description of the image to generate"
    required: true
  - name: output
    description: "Output file path relative to website/ (e.g. src/content/blog/my-post/thumbnail.jpg)"
    required: true
  - name: size
    description: "Image size WxH (default: 1920x1080)"
    required: false
---

# Generate Image

Generate an image using Google Nano Banana Pro (Gemini image generation), styled for the Rolebase brand. This skill is the source of truth for all image generation on the project — other skills (`write-blog-post`, `post-alternative`) reference it instead of duplicating these conventions.

The script auto-injects the Rolebase brand into every prompt (warm cream background `#FDF6EA`, primary purple `#9870F0`, warm orange `#FB9803`, warm gray neutrals, friendly human-centric mood). You do not need to restate brand colors in your prompt.

Two modes:
- **Illustration** (default) — no text, conceptual editorial style. Thumbnails, hero visuals, metaphors.
- **Infographic** (`--infographic`) — renders text, numbers, labels. Breakdowns, comparisons, numbered steps, decision matrices.

## Usage

Always run from the `website/` folder:

```bash
cd website

# Illustration (default — no text)
npx tsx scripts/generate-image.ts "<prompt>" <output-path> [WxH]

# Infographic (text and numbers rendered as written in the prompt)
npx tsx scripts/generate-image.ts "<prompt>" <output-path> [WxH] --infographic
```

Examples:
```bash
# Blog thumbnail (1200x630, conceptual, no text)
npx tsx scripts/generate-image.ts "A modern isometric scene of two teams handing off..." src/content/blog/my-post/thumbnail.jpg 1200x630

# In-article infographic (labels and numbers visible)
npx tsx scripts/generate-image.ts "Four numbered cards showing handover steps..." src/content/blog/my-post/steps.jpg 1600x900 --infographic

# Square format
npx tsx scripts/generate-image.ts "An icon..." src/assets/icon.png 1080x1080
```

## Picking the mode

| Use **infographic** when… | Use **illustration** when… |
|---|---|
| Numbers, %, ranks need to be visible | The concept is metaphorical or abstract |
| A comparison table would be more impactful as a visual | The point is mood, not data |
| Decomposition (steps, components, phases) | A simple table already does the data job |
| Decision matrix with labels | The visual must be readable at 300px (e.g. thumbnail) |

Default to infographics for cost/feature comparisons, breakdowns, and process steps in articles — text in images becomes a featured snippet candidate and LinkedIn previews surface the numbers.

## Prompt writing tips

- Be specific about composition, perspective, and spatial layout
- Mention "isometric" or "bird's eye view" for clean staged scenes
- Describe contrast or duality if the article compares two approaches
- Lean into Rolebase themes: roles, org chart, governance, self-management, collaboration, peer feedback. Avoid corporate-pyramid imagery; for people, prefer diverse, casual, modern professionals over stock-suited executives
- **Illustration mode**: no text (the script forbids it explicitly)
- **Infographic mode**: write EXACTLY the labels and numbers to render — Nano Banana Pro reproduces text as-is, French diacritics included. Specify the typeface (sans-serif), text color, and position

## Blog thumbnail conventions (1200x630)

Thumbnails appear in the blog grid at ~300px wide and as Open Graph previews. They must stand out and stay readable at small sizes. The Rolebase visual language for thumbnails (on top of the brand auto-injection):

- **Light, warm cream background** — never dark. The brand reads warm and human, not corporate or moody.
- **Purple + orange as focal accents** — most objects/figures in warm gray, with purple (`#9870F0`) and orange (`#FB9803`) glowing on the key element to anchor the eye.
- **Soft, warm directional lighting** — gentle bloom, smooth gradients. No harsh contrast, no neon.
- **Conceptual, not literal** — metaphor for the subject (handover, alignment, governance, energy, roles) rather than a direct depiction.
- **Human-centric when possible** — soft 3D human figures in collaborative postures. Abstract shapes stay organic (rounded, soft, slightly chunky) rather than sharp/technical.
- **Single clear focal point** — one scene with a strong silhouette, readable at 300px.
- **3D isometric or staged scene** — soft, slightly stylized, friendly. Not hyper-realistic, not gamey, not flat illustration.
- **No text, no UI elements, no watermarks.**

After generation, show the thumbnail to the user. If it lands flat, washed-out, too dark, or too corporate, regenerate with more warmth and a clearer focal accent.

## Infographics in MDX articles (data-coupling comment)

When inserting a data-driven infographic into an MDX article, add a one-line MDX comment immediately above the image so a future editor knows when to regenerate:

```mdx
{/* INFOGRAPHIC: regenerate if the numbers in <section X> change. Last data sync: YYYY-MM-DD. */}
![alt text](./image-name.jpg)
```

The goal is to make the data-image coupling visible, not to document the prompt verbatim.

## Shell quoting (IMPORTANT)

Prompts containing apostrophes or French accents (`'`, `é`, `è`, `à`, `€`...) break inline shell quoting. Workaround:

```bash
# Write the prompt to a temp file first
cat > /tmp/prompt.txt <<'EOF'
Your prompt with d'apostrophes and accénts here
EOF

# Then call the script with the contents
PROMPT="$(cat /tmp/prompt.txt)" && npx tsx scripts/generate-image.ts "$PROMPT" src/content/blog/my-post/image.jpg 1600x900 --infographic

# Clean up
rm /tmp/prompt.txt
```

## Requirements

- `GOOGLE_AI_API_KEY` must be set in `website/.env` or in the monorepo root `.env` (the script checks both, in that order)
