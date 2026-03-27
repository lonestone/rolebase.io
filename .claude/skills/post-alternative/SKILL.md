---
name: post-alternative
description: This skill should be used when the user asks to create an "alternative to" blog post, a competitor comparison post, or invokes /post-alternative. Takes a competitor product name as argument.
version: 0.2.0
---

# Create an "Alternative to [Competitor]" blog post

Create a blog post positioned as "Rolebase as an alternative to [Competitor]" for the website. Targets bottom-of-funnel prospects searching for alternatives.

## Process

### 1. Research the competitor

Use WebSearch and WebFetch to learn about the competitor:
- What it is, category, core features, positioning
- Pricing model
- Pain points, limitations, common complaints (G2, Capterra, Reddit)
- Target audience and company size
- Strengths to acknowledge honestly

### 2. Research Rolebase features

Read these files to understand Rolebase's positioning and features:
- `website/src/content/pages/index/en.mdx` (homepage)
- `website/src/content/pages/features/en.mdx` (features)
- `website/src/content/pages/pricing/en.mdx` (pricing)
- Browse `website/src/content/docs/` and read English versions for feature depth

Identify differentiators that matter most for this specific competitor. The angle must be unique to this competitor.

### 3. Take screenshots

Take screenshots of the competitor to include in the blog post. Use the screenshot skill script:

```bash
node .claude/skills/screenshot/scripts/screenshot.js <url> <output.png>
```

**Competitor screenshots:**
- Homepage of the competitor → save in the blog post folder: `website/src/content/blog/alternative-{competitor-slug}/competitor-homepage.png`
- Key product pages (pricing, features) if relevant → same folder
- Reference with relative path: `![Description](./competitor-homepage.png)`

**Rolebase screenshots (shared, do NOT duplicate):**
Shared Rolebase screenshots are stored in `website/src/assets/screenshots/` and reused across all alternative posts. Available screenshots:
- `rolebase-homepage.png`
- `rolebase-features.png`
- `rolebase-pricing.png`

Reference them from MDX with: `![Description](../../../assets/screenshots/rolebase-homepage.png)`

If a new Rolebase screenshot is needed, add it to `website/src/assets/screenshots/` (not in the blog post folder).

### 4. Style reference

Read 2-3 existing comparison blog posts to match tone and style:
- `website/src/content/blog/holacracy-vs-sociocracy/en.mdx`
- `website/src/content/blog/open-source-org-chart-tools/en.mdx`

### 5. Write the post

Create both `en.mdx` and `fr.mdx` in `website/src/content/blog/alternative-{competitor-slug}/`.

#### Frontmatter

```yaml
---
title: 'Best Alternative to {Competitor} for {Use Case}'
summary: 'One-sentence summary highlighting the key differentiator'
date: {today YYYY-MM-DD}
image: './competitor-homepage.png'
similarPosts:
  - 'open-source-org-chart-tools'
---
```

The `image` field is the blog post thumbnail. Use the competitor homepage screenshot as the thumbnail image.

#### Post structure

Target **2,500-3,500 words**. Follow this structure:

1. **Opening paragraph** — The pain point driving people away, position Rolebase as the solution
2. **Competitor homepage screenshot** — Insert `![Competitor name homepage](./competitor-homepage.png)` before the first H2
3. **Acknowledge the competitor** (1 paragraph) — Respectfully recognize strengths
4. **Why teams look for alternatives** (H2) — 3-5 pain points from real user complaints
5. **How Rolebase approaches things differently** (H2) — 3-5 differentiators as H3s, led by benefits. Include all 3 shared Rolebase screenshots:
   - `rolebase-features.png` — in the first differentiator section
   - `rolebase-homepage.png` — in the org chart or visual section
   - `rolebase-pricing.png` — in the pricing comparison section (step 7)
6. **Feature comparison** (H2) — Markdown table, 8-12 features, honest, dated
7. **Pricing comparison** (H2) — Insert `rolebase-pricing.png` after the H2, then real prices, TCO, mention free tier and open source
8. **Who should choose which?** (H2) — Recommendation by use case, OK to recommend competitor
9. **Making the switch** (H2) — Migration ease, import features
10. **Conclusion** (no CTA button — CTAs are automatically inserted by the blog layout)

#### Writing principles

See `references/alternative-page-guide.md` for the complete methodology. Key rules:

- Never denigrate the competitor. Be respectful and factual.
- Be honest. If the competitor is better at something, say so.
- Lead with benefits, not features.
- Frame by use case, not by superiority.
- Date your claims (pricing and features change).
- Recommend the competitor when appropriate — builds trust.
- Mirror language from real user reviews.
- Never link to the competitor's website. Mention them by name only, no hyperlinks.

#### SEO

- Title: include "{Competitor} alternative" + benefit, under 60 chars
- H2s: target secondary keywords and questions
- Naturally include variations: "alternative", "competitor", "vs"

#### French version

Write as a native French article, not a translation. Same structure and info, natural phrasing, "vous" form.

### 6. Verify

- Valid frontmatter in both files
- `similarPosts` references exist as actual blog slugs
- Post reads well and follows all guidelines
