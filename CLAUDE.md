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

- **Webapp (packages/webapp)**: Use Chakra UI for styling. No raw CSS.
- **Website (packages/website)**: Use Tailwind CSS utility classes. No custom CSS, except for `global.css` and when Tailwind is not enough. Tailwind is scoped to this package only.

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

## Website (packages/website)

The website is built with Astro + MDX + Tailwind CSS with i18n support (English and French).

### Structure

- `src/components/` — Astro display components (no content): `TopNav`, `Sidebar`, `GuidePage`, `ApiReference`, `DocPage`, `Callout`, `EntityFields`, `CodeBlock`
- `src/layouts/` — `BaseLayout.astro` (HTML shell with TopNav), `DocsLayout.astro` (sidebar + content for docs pages), `WebsiteLayout.astro` (full-width for homepage, blog, terms)
- `src/i18n.ts` — Translations for sidebar labels and locale utilities
- `src/pages/en/` — English pages (docs/, guides/, developers/, api/, blog/, terms)
- `src/pages/fr/` — French pages (docs/, guides/, developers/, api/, blog/, terms)
- `src/styles/global.css` — Tailwind import, theme tokens, and `.prose` styles for markdown content
- `src/redirects.ts` — Static redirects (imported in `astro.config.mjs`)
- `netlify.toml` — Build config and wildcard/language redirects

### Content sections

The website has four content sections, each with its own sidebar navigation:

- **Documentation** (`docs/`): User-facing documentation for non-developers. Explains how to use Rolebase as a product (creating organizations, inviting members, running meetings, etc.). Uses `<GuidePage>` component (section defaults to `'docs'`).
- **Guides** (`guides/`): Step-by-step guides walking users through specific tasks (e.g. running a first meeting). Uses `<GuidePage section="guides">` component. Documentation and Guides share the same sidebar.
- **Developers** (`developers/`): Technical documentation for developers. Covers self-hosting, development setup, API usage, and custom integrations. Uses `<DocPage section="developers">` component.
- **API Reference** (`api/`): GraphQL entity schema documentation. Uses `<ApiReference>` component.

### i18n

- Pages are organized under `src/pages/en/` and `src/pages/fr/` with identical file structure.
- Internal links must include the locale prefix: `/en/docs/members/` or `/fr/docs/members/`.
- The Sidebar component auto-detects the locale from the URL and renders translated labels.
- Sidebar translations are in `src/i18n.ts`.
- The root `/` redirects to `/en/`.

### Maintenance rules — Keep docs in sync with product changes

When modifying the product, update the documentation accordingly **in both EN and FR**:

1. **New feature or entity**: Add a documentation page in `pages/{en,fr}/docs/` and/or an API reference page in `pages/{en,fr}/api/`. Optionally add a guide in `pages/{en,fr}/guides/`. Update the sidebar links in `src/i18n.ts`.
2. **Modified entity fields**: Update the corresponding `pages/{en,fr}/api/<entity>.mdx` file — especially the `EntityFields` component props and GraphQL examples.
3. **Renamed or removed feature**: Remove or update the corresponding guide/API page in both locales. Update sidebar links.
4. **New GraphQL query/mutation**: Add examples to the relevant API reference page in both locales.
5. **Changed statuses or enums**: Update both the guide page and the API page, in both locales.
6. **New integration or app**: Update `docs/apps-integrations.mdx` in both locales.
7. **Changed subscription plans**: Update `docs/subscriptions.mdx` and `api/org_subscription.mdx` in both locales.

### Development

- Assume Astro is already running.
- When you remove an import, check if the file is still needed in the project. Delete it if not. Check imports of the deleted file.
- When you remove or rename a page, add a redirect.
- Static redirects are in `src/redirects.ts` (imported in `astro.config.mjs`). Wildcard/splat redirects are in `netlify.toml`.
- Apply the `prose` class to any element containing a `<slot />` that receives Markdown/MDX content. Prose styles are defined in `global.css`.

### Guidelines

- Documentation pages use `<GuidePage>` component; guide pages use `<GuidePage section="guides">`; developer pages use `<DocPage section="developers">`; API pages use `<ApiReference>` component.
- Documentation and guides are written for non-technical users. Keep developer/technical content (API, GraphQL, self-hosting, code) in the Developers section.
- Sidebar links for documentation and guides are defined in `src/i18n.ts` (`docsLinks` and `guidesLinks`).
- Always verify in the webapp code (`packages/webapp`) how a feature actually works before describing it in documentation. Check components, modals, pages, and translations to describe the exact user flow.
- All content is in MDX files, not in Astro components.
- Use `<Callout type="info|warning|tip">` for callouts.
- Use `<EntityFields fields={[...]} />` for entity field tables in API pages.
- Keep GraphQL examples up to date with the actual schema.
- EN pages are written in English; FR pages are written in French.
- GraphQL code, field names, entity names, and type names stay in English in both locales.
- **Rolebase data model**: The data model has two distinct entities: `role` (a role definition with purpose, domain, accountabilities) and `circle` (an instance of a role in the org chart, with members and leaders). In user-facing interfaces and docs, only the term "role" (EN) / "rôle" (FR) is used, never "circle". The concept of "circle" only appears in the `circles-and-roles` doc page which explains the unified model for users. Use "org chart" (EN) / "organigramme" (FR) instead of "graph" / "graphe" for the organizational visualization.
- Never use em dashes. Use other formulations instead.
- Prefer positive formulations over negative ones. Instead of "X, pas Y" or "ne pas Z", reformulate positively (e.g. "rester indépendant" instead of "ne pas dépendre", "dès le premier sprint" instead of "pas à la fin").
- Avoid label-colon patterns like "Objectif :", "Résultat :", "Avantage :". Integrate the information directly in the phrase.
