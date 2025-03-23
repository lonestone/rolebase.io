# Decision Entity

[Rolebase public API](../public-api.md)

The `decision` entity represents a formal decision made within a circle in Rolebase. Decisions help track important choices, policies, and agreements made by the organization. They can be referenced in threads and other entities for context and documentation.

## Fields

| Field Name    | Type      | Description                                   | Default           |
| ------------- | --------- | --------------------------------------------- | ----------------- |
| `id`          | UUID      | Unique identifier for the decision            | Auto-generated    |
| `orgId`       | UUID      | Reference to the organization                 | Required          |
| `circleId`    | UUID      | Reference to the circle                       | Required          |
| `memberId`    | UUID      | Reference to the member who made the decision | Required          |
| `title`       | String    | Title of the decision                         | Required          |
| `description` | String    | Detailed description of the decision          | Required          |
| `createdAt`   | Timestamp | When the decision was created                 | Current timestamp |
| `archived`    | Boolean   | Whether the decision is archived              | `false`           |
| `private`     | Boolean   | Whether the decision is private               | `false`           |

## Relationships

### Object Relationships

- `org`: The organization this decision belongs to
- `circle`: The circle where the decision was made
- `member`: The member who made the decision

### Referenced By

- `thread_activity`: Decisions can be referenced in thread activities
- Search index: Decisions are indexed for organization-wide search

## GraphQL Examples

### Query Decisions

```graphql
query GetDecisions($orgId: uuid!) {
  decision(where: { archived: { _eq: false }, orgId: { _eq: $orgId } }) {
    id
    title
    description
    createdAt
    circle {
      role {
        name
      }
    }
    member {
      name
    }
  }
}
```

### Get a Specific Decision

```graphql
query GetDecision($decisionId: uuid!) {
  decision_by_pk(id: $decisionId) {
    id
    title
    description
    createdAt
    circle {
      role {
        name
      }
    }
    member {
      name
    }
    private
    archived
  }
}
```

### Create a Decision

```graphql
mutation CreateDecision {
  insert_decision_one(
    object: {
      orgId: "your-org-id"
      circleId: "circle-id"
      memberId: "member-id"
      title: "New Working Hours Policy"
      description: "The organization will adopt flexible working hours..."
      private: false
    }
  ) {
    id
    title
    createdAt
  }
}
```

### Update a Decision

```graphql
mutation UpdateDecision {
  update_decision_by_pk(
    pk_columns: { id: "decision-id" }
    _set: {
      description: "Updated policy details..."
      title: "Updated Working Hours Policy"
    }
  ) {
    id
    title
    description
  }
}
```

### Archive a Decision

```graphql
mutation ArchiveDecision {
  update_decision_by_pk(
    pk_columns: { id: "decision-id" }
    _set: { archived: true }
  ) {
    id
  }
}
```

## Permissions

Decision access is controlled by several factors:

- Circle membership
- Decision privacy settings
- Organization member role

The following rules apply:

- Circle participants can access and create decisions in their circles
- Private decisions are only visible to circle participants
- Organization members can access non-private decisions
- Only the original decision maker and circle leaders can modify decisions
- Archived decisions remain accessible but are hidden from default views

## Notes

- Decisions provide a formal record of important organizational choices
- They can be referenced in threads for context and discussion
- The description field supports rich text formatting
- Decisions are searchable across the organization
- Private decisions help manage sensitive information
- Archiving helps maintain a clean view while preserving history
