# Rolebase Website

Astro + MDX website. Content editing is handled by [astrocms](https://github.com/lonestone/astrocms).

## Getting started

```bash
npm install
npm run dev
```

Starts the Astro dev server on port 4321.

## Scripts

| Command             | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| `npm run dev`       | Start Astro dev server                                       |
| `npm run build`     | Build the Astro site                                         |
| `npm run preview`   | Preview the built Astro site                                 |
| `npm run astrocms`  | Start AstroCMS on http://localhost:4001/astrocms             |

## CMS

Content is edited through [astrocms](https://github.com/lonestone/astrocms), a database-free CMS that edits the MDX files in `src/content/` directly and can commit/push via Git.

Configuration lives in [`astrocms.json`](./astrocms.json). See the [astrocms README](https://github.com/lonestone/astrocms) for environment variables, Docker deployment, and GitHub PAT setup.
