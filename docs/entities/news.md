# News Entity

[Rolebase public API](../public-api.md)

The `news` entity represents a unified view of recent activities in Rolebase, aggregating active threads, decisions, and completed meetings. It provides a centralized way to track important updates across an organization.

## Fields

| Field Name   | Type      | Description                                       | Default        |
| ------------ | --------- | ------------------------------------------------- | -------------- |
| `id`         | UUID      | Unique identifier for the news item               | Auto-generated |
| `orgId`      | UUID      | Reference to the organization                     | Required       |
| `circleId`   | UUID      | Reference to the circle (if applicable)           | Optional       |
| `threadId`   | UUID      | Reference to the thread (if source is thread)     | Optional       |
| `decisionId` | UUID      | Reference to the decision (if source is decision) | Optional       |
| `meetingId`  | UUID      | Reference to the meeting (if source is meeting)   | Optional       |
| `createdAt`  | Timestamp | When the news item was created                    | Required       |

## Implementation

The news entity is implemented as a SQL view that combines:

1. Active threads (status is 'Active' or 'Preparation' and not archived)
2. Non-archived decisions
3. Completed meetings (ended and not archived)

## Relationships

### Object Relationships

- `org`: The organization this news item belongs to
- `circle`: The circle associated with this news item (if any)
- `thread`: The source thread (if news is from a thread)
- `decision`: The source decision (if news is from a decision)
- `meeting`: The source meeting (if news is from a meeting)

## GraphQL Examples

### Query Recent News

```graphql
query GetRecentNews($orgId: uuid!) {
  news(
    where: { orgId: { _eq: $orgId } }
    order_by: { createdAt: desc }
    limit: 10
  ) {
    id
    createdAt
    thread {
      title
      status
    }
    decision {
      title
      description
    }
    meeting {
      title
      summary
    }
    circle {
      role {
        name
      }
    }
  }
}
```

### Query News with Filters

```graphql
query GetFilteredNews($where: news_bool_exp!) {
  news(
    where: { _and: [{ orgId: { _eq: $orgId } }, $where] }
    order_by: { createdAt: desc }
  ) {
    id
    createdAt
    threadId
    decisionId
    meetingId
    org {
      name
    }
  }
  news_aggregate(where: { _and: [{ orgId: { _eq: $orgId } }, $where] }) {
    aggregate {
      count
    }
  }
}
```

## Permissions

News access is controlled based on the following rules:

- Organization members can view news items from their organization
- News items inherit visibility rules from their source entities:
  - Thread privacy settings
  - Decision privacy settings
  - Meeting privacy settings
- Public access is limited to organizations with shared information

## Notes

- News items are automatically generated from source entities
- Each news item represents exactly one source (thread, decision, or meeting)
- The view is optimized for querying recent activities
- News aggregation helps track important updates across the organization
- The combination of source types provides a comprehensive activity feed
