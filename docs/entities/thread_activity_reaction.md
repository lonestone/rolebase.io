# Thread Activity Reaction Entity

[Rolebase public API](../public-api.md)

The `thread_activity_reaction` entity represents a reaction (emoji) to a thread activity in Rolebase. Reactions allow members to express quick responses or emotions to thread activities without creating new activities.

## Fields

| Field Name   | Type      | Description                        | Default           |
| ------------ | --------- | ---------------------------------- | ----------------- |
| `id`         | UUID      | Unique identifier for the reaction | Auto-generated    |
| `activityId` | UUID      | Reference to the thread activity   | Required          |
| `userId`     | UUID      | Reference to the user              | Required          |
| `shortcode`  | String    | Unicode emoji character or code    | Required          |
| `createdAt`  | Timestamp | When the reaction was created      | Current timestamp |

## Relationships

### Object Relationships

- `activity`: The thread activity this reaction belongs to

## GraphQL Examples

### Query Activity Reactions

```graphql
query GetActivityReactions($activityId: uuid!) {
  thread_activity_reaction(
    where: { activityId: { _eq: $activityId } }
    order_by: { createdAt: asc }
  ) {
    id
    shortcode
    userId
    createdAt
  }
}
```

### Create Activity Reaction

```graphql
mutation CreateActivityReaction {
  insert_thread_activity_reaction_one(
    object: { activityId: "activity-id", userId: "user-id", shortcode: "👍" }
  ) {
    id
    shortcode
    createdAt
  }
}
```

### Delete Activity Reaction

```graphql
mutation DeleteActivityReaction {
  delete_thread_activity_reaction_by_pk(id: "reaction-id") {
    id
    shortcode
  }
}
```

## Permissions

Reaction access is controlled based on thread and activity permissions:

- Thread participants can:
  - View reactions on activities in their threads
  - Add reactions to activities
  - Remove their own reactions
- Organization members can:
  - View reactions in non-private threads
  - Add reactions if they have thread access
- Admins and owners have full access to all reactions

## Notes

- Each member can add multiple different emoji reactions to an activity
- Duplicate emoji reactions from the same member are prevented
- Reactions are typically displayed as emoji counts per activity
- Common emoji reactions can be suggested in the UI
- Reactions provide a lightweight way to engage with thread content
- Reaction counts can indicate activity importance or consensus
- Emoji support depends on the client platform capabilities
- Reactions can be used for quick polls or sentiment tracking
