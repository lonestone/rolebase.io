---
name: write-blog-post
description: Research and write a complete bilingual (EN + FR) blog post for the Rolebase website, with illustrations and thumbnail. Use when the user asks to write a blog post (other than the "alternative to" format, which has its own skill).
user_invocable: true
arguments:
  - name: topic
    description: "Topic or title of the blog post"
    required: true
---

# Write Blog Post

Write a complete, authentic bilingual blog post for the Rolebase website. The general project conventions (folder-based i18n with `en.mdx` + `fr.mdx`, MDX constraints, terminology rules around "role" / "org chart", no em dashes, positive formulations, label-colon ban, "verify product claims against `packages/webapp`") all live in `CLAUDE.md` and apply here without restating.

For competitor comparison posts ("alternative to X"), use the `post-alternative` skill instead.

## Research phase

1. **Web research**: current data, frameworks, expert opinions, and concrete examples on the topic. For governance / self-management topics, lean on primary sources (sociocracy, holacracy, teal practitioners) rather than generic SEO content.
2. **Existing Rolebase content**: scan `website/src/content/docs/`, `guides/`, `pages/features/`, and sibling posts in `blog/` to find internal linking opportunities and avoid overlap.
3. **Ask the user**: real-world experience, client anecdotes, concrete numbers, and opinions on adjacent practices. This is what makes the content authentic and impossible to replicate by a generic LLM.

## Writing phase

Create `website/src/content/blog/{slug}/` with **`en.mdx` and `fr.mdx`**. The slug is short kebab-case English (e.g. `consent-decision`, `team-energy-loss`) and shared across both languages.

**Frontmatter** (source of truth: `website/src/content.config.ts`):

```yaml
title: 'Post title'                  # Becomes the H1. Aim for ≤ 60 chars for clean SERP rendering.
summary: 'One-sentence summary'      # Shown under the title and on cards. Aim for 120-160 chars.
date: YYYY-MM-DD
image: './thumbnail.jpg'
author: 'Optional author name'
similarPosts:
  - 'sibling-slug-1'
  - 'sibling-slug-2'
```

Keep `date`, `image`, and `similarPosts` identical between EN and FR. Only `title` and `summary` are translated.

**Editorial conventions** (blog-specific, on top of `CLAUDE.md`):
- 1500+ words for SEO-relevant articles
- Open with a short ToC-style bullet list summarizing the key takeaways (established Rolebase style — see `consent-decision/en.mdx` for reference)
- Concrete examples, frameworks, and comparisons over generic advice
- Markdown comparison tables when comparing approaches
- 2-4 internal links per post, with the right lang prefix (`/en/...` in EN, `/fr/...` in FR)
- Close with a link to a relevant feature, doc, or guide page
- Set `similarPosts` to 2-3 related existing blog slugs

The FR version is a **native French article**, not a translation: same structure and examples, natural French phrasing in "vous" form.

## Illustrations and infographics

After writing, identify 1-3 places where a visual would help understanding. Place each visual after the text it illustrates. Generate them with the `generate-image` skill — see that skill for the infographic vs illustration decision, prompt-writing tips, shell quoting, and the data-coupling MDX comment for infographics.

For text-free illustrations, the same file is referenced from both locales. For infographics with text labels, generate two versions (`name-en.jpg` and `name-fr.jpg`) and reference the right one from each MDX file.

## Thumbnail

Every post needs a thumbnail at **1200x630**. Generate it with the `generate-image` skill — see its "Blog thumbnail conventions" section. The thumbnail is shared between EN and FR, so the concept must be language-agnostic.

Show the thumbnail to the user for review before continuing.

## Final checks

1. Both `en.mdx` and `fr.mdx` exist with matching `date`, `image`, `similarPosts`.
2. All `similarPosts` slugs reference real, existing blog folders.
3. Internal links use the right lang prefix for each locale.
4. Build passes (check the Astro dev server output).
5. Show the article to the user for review. Do NOT commit without approval.
