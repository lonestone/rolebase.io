# Rolebase public API

The public API allows you to access and edit anything in your Rolebase organizations.

## API Keys

You can generate API keys for your organization on [https://rolebase.io/apps](https://rolebase.io/apps). These keys are required to authenticate your requests to the API.

## GraphQL API

Query endpoint: `https://api.rolebase.io/graphql`

When testing on a local environnement, use `http://localhost:8888/graphql`

This is a Hasura API, see [Hasura documentation](https://hasura.io/docs/2.0/index/) to know more.

### Example with curl:

```bash
curl -X POST https://api.rolebase.io/graphql \
  -H "x-api-key: Hr5Cgxw0zjgXhZq06Cvor5iGVxx7iPKcFGHXzzLR" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ org { id, name } }"}'
```

### Example with Apollo Client:

```typescript
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  gql,
} from '@apollo/client'

// Create the client with auth headers
const client = new ApolloClient({
  link: createHttpLink({
    uri: 'https://api.rolebase.io/graphql',
    headers: {
      'x-api-key': 'YOUR_API_KEY_HERE',
    },
  }),
  cache: new InMemoryCache(),
})

// Example query
const { data } = await client.query({
  query: gql`
    query GetOrganization {
      org {
        id
        name
      }
    }
  `,
})
```

## Entities

List of entities you can interact with through the API:

### Organization & Members

- [`org`](entities/org.md) - Organizations
- [`member`](entities/member.md) - Organization members
- [`org_file`](entities/org_file.md) - Organization files
- [`org_subscription`](entities/org_subscription.md) - Organization subscriptions

### Circles & Roles

- [`circle`](entities/circle.md) - Organizational circles
- [`circle_leader`](entities/circle_leader.md) - Circle leadership assignments
- [`circle_link`](entities/circle_link.md) - Links between circles
- [`circle_member`](entities/circle_member.md) - Circle memberships
- [`role`](entities/role.md) - Roles within circles

### Meetings

- [`meeting`](entities/meeting.md) - Meetings
- [`meeting_attendee`](entities/meeting_attendee.md) - Meeting attendees
- [`meeting_recurring`](entities/meeting_recurring.md) - Recurring meeting settings
- [`meeting_step`](entities/meeting_step.md) - Meeting steps
- [`meeting_template`](entities/meeting_template.md) - Meeting templates

### Tasks

- [`task`](entities/task.md) - Tasks
- [`task_view`](entities/task_view.md) - Task views

### Threads (topics)

- [`thread`](entities/thread.md) - Discussion threads
- [`thread_activity`](entities/thread_activity.md) - Thread activities
- [`thread_activity_reaction`](entities/thread_activity_reaction.md) - Reactions to thread activities
- [`thread_extra_member`](entities/thread_extra_member.md) - Additional thread members
- [`thread_poll_answer`](entities/thread_poll_answer.md) - Poll answers in threads
- [`news`](entities/news.md) - News items
- [`log`](entities/log.md) - Activity logs

### Decisions

- [`decision`](entities/decision.md) - Decisions

### Authentication & Security

- [`users`](entities/users.md) - Users
- [`api_key`](entities/api_key.md) - API keys
- [`user_app`](entities/user_app.md) - User application settings

### Storage

- [`files`](entities/file.md) - Stored files

Each entity supports standard GraphQL operations (query, mutation) depending on your API key permissions. Refer to the GraphQL schema for detailed information about available fields and operations for each entity.
