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
