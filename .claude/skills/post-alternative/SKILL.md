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

Take screenshots of both the competitor and Rolebase to include in the blog post. Use the screenshot skill script:

```bash
node .claude/skills/screenshot/scripts/screenshot.js <url> <output.png>
```

**Competitor screenshots:**
- Homepage of the competitor
- Key product pages (pricing, features) if relevant

**Rolebase screenshots:**
- Rolebase homepage: `https://rolebase.io` or relevant product pages
- Key feature screens that match the differentiators identified in step 2

Save all screenshots in the blog post folder: `website/src/content/blog/alternative-{competitor-slug}/`.
Use descriptive filenames (e.g., `competitor-homepage.png`, `rolebase-org-chart.png`).

Reference screenshots in MDX with markdown image syntax: `![Description](./filename.png)`

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
similarPosts:
  - 'open-source-org-chart-tools'
---
```

#### Post structure

Target **2,500-3,500 words**. Follow this structure:

1. **Opening paragraph** — The pain point driving people away, position Rolebase as the solution
2. **Acknowledge the competitor** (1 paragraph) — Respectfully recognize strengths
3. **Why teams look for alternatives** (H2) — 3-5 pain points from real user complaints
4. **How Rolebase approaches things differently** (H2) — 3-5 differentiators as H3s, led by benefits, with Rolebase screenshots illustrating each point
5. **Feature comparison** (H2) — Markdown table, 8-12 features, honest, dated
6. **Pricing comparison** (H2) — Real prices, TCO, mention free tier and open source
7. **Who should choose which?** (H2) — Recommendation by use case, OK to recommend competitor
8. **Making the switch** (H2) — Migration ease, import features
9. **Conclusion with CTA**

#### Writing principles

See `references/alternative-page-guide.md` for the complete methodology. Key rules:

- Never denigrate the competitor. Be respectful and factual.
- Be honest. If the competitor is better at something, say so.
- Lead with benefits, not features.
- Frame by use case, not by superiority.
- Date your claims (pricing and features change).
- Recommend the competitor when appropriate — builds trust.
- Mirror language from real user reviews.

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
