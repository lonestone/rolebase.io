## General rules

- Never read `.env`. You can read `.env.example`.
- Don't co-author git commits with Claude.

## Tech stack

- React
- Chakra UI
- Nhost
- Hasura
- tRPC
- Apollo Client
- React Router
- React Hook Form
- React Icons
- i18next

## Styling

- **Webapp (packages/webapp folder)**: Use Chakra UI for styling. No raw CSS.
- **Website (website folder)**: Use Tailwind CSS utility classes. No custom CSS, except for `global.css` and when Tailwind is not enough. Tailwind is scoped to this package only.

## Webapp

Always scaffold files like this in a packages/webapp/src/features/{feature} folder:

- api: graphql (.gql) files containing queries and mutations
- components: react components
- contexts: react contexts and providers
- hooks: react hooks, 1 hook per file
- modals: react componenant with chakra modal
- pages: react components being used as routes

### Guidelines

- Always use Chakra UI for styling HTML elements; avoid using CSS or tags.
- Use descriptive variable and function/const names. Also, event functions should be named with a "handle" prefix, like "handleClick" for onClick and "handleKeyDown" for onKeyDown.
- Implement accessibility features on elements. For example, a tag should have a tabindex="0", aria-label, on:click, and on:keydown, and similar attributes.
- Define props of React components as a `Props` interface above the function.
- Export directly React components like this: `export default function MyComponent({...}: Props)`.
- Import GraphQL fragments, queries, subscriptions and mutations hooks from "@gql" (alias of ../../../graphql.generated).
- Import tRPC from "src/trpc"
- Always update translations in json files when adding or removing a translation.

## Website

The website is built with Astro + MDX + Tailwind CSS with i18n support (English and French).

### Structure

- `src/content/` — Content collections (blog, client-cases, docs, guides, developers, api, pages)
- `src/components/` — Astro display components. All `.astro` components in this folder (recursively) are auto-discovered and available in all MDX content (no import needed).
- `src/layouts/` — Page layout wrappers (base layouts and content-type-specific wrappers used by page templates)
- `src/i18n.ts` — Translations, sidebar labels, locale utilities (`getSlugFromId`, `getLangFromId`, `getOtherLocaleHref`)
- `src/pages/[lang]/` — Route templates using `[lang]` param for both locales. No separate `en/` and `fr/` directories.
- `src/content.config.ts` — Content collection schemas
- `src/styles/global.css` — Tailwind import, theme tokens, and markdown styles targeting `.md` class
- `src/rehype-md-class.ts` — Rehype plugin that adds `md` class to all markdown-generated elements
- `src/redirects.ts` — Static redirects (imported in `astro.config.mjs`)
- `netlify.toml` — Build config and wildcard/language redirects

### Content collections and i18n

All content uses Astro content collections with folder-based i18n. Each piece of content lives in a folder with `en.mdx` and `fr.mdx` side by side. Assets (images) are co-located in the same folder.

```
src/content/{collection}/{slug}/
  en.mdx
  fr.mdx
  image.jpg        ← co-located assets
```

Collections defined in `src/content.config.ts`:
- **blog** — Blog posts with `image()`, `date`, `similarPosts` fields
- **client-cases** — Case studies with `logo`, `sector`, `teamSize` fields
- **docs** — Product documentation. Frontmatter: `title`, `description`
- **guides** — Step-by-step guides. Frontmatter: `title`, `description`
- **developers** — Technical/developer docs. Frontmatter: `title`, `description`
- **api** — API reference pages. Frontmatter: `title`, `entity`, `description`
- **pages** — Standalone pages (homepage, contact, terms, pricing, partners, legal, privacy). Frontmatter: `title`

The `lang` is NOT stored in frontmatter. It is derived from the filename (`en.mdx` / `fr.mdx`) via the entry ID (e.g., `members/en`). Use `getSlugFromId(entry.id)` and `getLangFromId(entry.id)` from `src/i18n.ts`.

Routing pages (`src/pages/[lang]/{section}/[slug].astro`) use a `[lang]` param and loop over both locales in `getStaticPaths()`, filtering entries by ID suffix (`entry.id.endsWith('/${lang}')`) and extracting the slug with `entry.id.replace('/${lang}', '')`.

### Content sections

- **Documentation** (`docs/`): User-facing documentation for non-developers. Uses `<GuidePage>` wrapper in the page template.
- **Guides** (`guides/`): Step-by-step guides. Uses `<GuidePage section="guides">` wrapper. Documentation and Guides share the same sidebar.
- **Developers** (`developers/`): Technical documentation. Uses `<DocPage section="developers">` wrapper.
- **API Reference** (`api/`): GraphQL entity schema documentation. Uses `<ApiReference>` wrapper.
- **Blog** (`blog/`): Blog posts. Uses `<BlogPost>` component.
- **Client Cases** (`client-cases/`): Case studies. Uses `<ClientCasePage>` component.

### i18n

- Content is in `src/content/` with `en.mdx`/`fr.mdx` per folder. Both translations of the same content share the same slug.
- Route pages are in `src/pages/[lang]/` with `[slug].astro` templates shared across both locales.
- All URL paths are the same for both languages (e.g., `/en/client-cases/`, `/fr/client-cases/`). No locale-specific path segments.
- Internal links must include the locale prefix: `/en/docs/members` or `/fr/docs/members`.
- The lang switcher in TopNav uses `getOtherLocaleHref()` which swaps the locale prefix. Since all paths and slugs are shared across languages, this works automatically.
- Sidebar translations are in `src/i18n.ts`.
- The root `/` redirects to `/en/`.

### Adding or modifying content

- **New page**: Create a folder `src/content/{collection}/{slug}/` with `en.mdx` and `fr.mdx`. Add frontmatter (title, description). Update sidebar links in `src/i18n.ts` if applicable.
- **New image**: Place the image file directly in the content folder next to the MDX files. Reference it with a relative path (`./image.jpg`) in frontmatter or body. Use `image()` schema helper in `content.config.ts` for frontmatter image fields.
- **Renamed or removed page**: Delete the folder, add a redirect in `src/redirects.ts`. Update sidebar links.
- **Modified entity fields**: Update `src/content/api/{entity}/en.mdx` and `fr.mdx`.

### Maintenance rules — Keep docs in sync with product changes

When modifying the product, update the documentation accordingly **in both EN and FR**:

1. **New feature or entity**: Add docs in `content/docs/{slug}/`, optionally API ref in `content/api/{entity}/`, optionally guide in `content/guides/{slug}/`. Update sidebar links in `src/i18n.ts`.
2. **Modified entity fields**: Update `content/api/{entity}/en.mdx` and `fr.mdx`.
3. **Renamed or removed feature**: Remove or update the corresponding content folder in both locales. Update sidebar links. Add redirect.
4. **New GraphQL query/mutation**: Add examples to the relevant API reference page in both locales.
5. **Changed statuses or enums**: Update both the guide page and the API page, in both locales.
6. **New integration or app**: Update `content/docs/apps-integrations/` in both locales.
7. **Changed subscription plans**: Update `content/docs/subscriptions/` and `content/api/org_subscription/` in both locales.

### Development

- Assume Astro is already running.
- When you remove an import, check if the file is still needed in the project. Delete it if not. Check imports of the deleted file.
- When you remove or rename a page, add a redirect.
- Static redirects are in `src/redirects.ts` (imported in `astro.config.mjs`). Wildcard/splat redirects are in `netlify.toml`.
- Markdown styles target the `.md` class (defined in `global.css`), which is automatically added to all markdown-generated elements by the `rehype-md-class` plugin. Component markup is unaffected.

### Guidelines

- Always use the `<Button>` component (`src/components/Button.astro`) for buttons and call-to-action links. Available variants: `yellow`, `orange`, `primary`, `outline-primary`, `outline`. Sizes: `sm`, `md`.
- All `.astro` components in `src/components/` (recursively) are automatically available in all MDX content. Do not add import statements for these components in MDX files. To add a new MDX component, place it in `src/components/` and it will be auto-discovered.
- Documentation and guides are written for non-technical users. Keep developer/technical content (API, GraphQL, self-hosting, code) in the Developers section.
- Sidebar links for documentation and guides are defined in `src/i18n.ts` (`docsLinks` and `guidesLinks`).
- Always verify in the webapp code (`packages/webapp`) how a feature actually works before describing it in documentation. Check components, modals, pages, and translations to describe the exact user flow.
- All user-facing text in Astro components must use translations from `src/i18n.ts`. No hardcoded strings or inline ternaries for EN/FR.
- Avoid putting non-generic texts in reusable components (`src/components/`). All content specific to pages belongs in MDX files or in Astro components in `src/pages/`.
- All content is in MDX files in content collections, not in Astro components or pages.
- In MDX pages, write content directly using component calls (no JSON arrays or JS logic). Data lives in the markup, not in frontmatter variables or script blocks.
- MDX pages must contain only markdown and component calls. No `import` statements, no `export const`, no raw HTML tags (`<div>`, `<section>`, `<h2>`, `<p>`, `<img>`, etc.). Use components and markdown syntax instead.
- Use markdown image syntax (`![alt](path)`) for images in content. Astro handles the import automatically. Reference images from `src/assets/` with relative paths (e.g., `../../../assets/images/photo.jpg`).
- When creating page sections, extract layout and styling into reusable Astro components with props for configurable text and children/slots for nested content. Prefer props over Fragment slots when the content is a simple string. Use Fragment slots only for rich content (markdown, nested components).
- Use `<Callout type="info|warning|tip">` for callouts.
- Use `<EntityFields fields={[...]} />` for entity field tables in API pages.
- Keep GraphQL examples up to date with the actual schema.
- EN pages are written in English; FR pages are written in French.
- GraphQL code, field names, entity names, and type names stay in English in both locales.
- **Rolebase data model**: The data model has two distinct entities: `role` (a role definition with purpose, domain, accountabilities) and `circle` (an instance of a role in the org chart, with members and leaders). In user-facing interfaces and docs, only the term "role" (EN) / "rôle" (FR) is used, never "circle". The concept of "circle" only appears in the `circles-and-roles` doc page which explains the unified model for users. Use "org chart" (EN) / "organigramme" (FR) instead of "graph" / "graphe" for the organizational visualization.
- Never use em dashes. Use other formulations instead.
- Prefer positive formulations over negative ones. Instead of "X, pas Y" or "ne pas Z", reformulate positively (e.g. "rester indépendant" instead of "ne pas dépendre", "dès le premier sprint" instead of "pas à la fin").
- Avoid label-colon patterns like "Objectif :", "Résultat :", "Avantage :". Integrate the information directly in the phrase.
