# Circle Participant Entity

[Rolebase public API](../public-api.md)

> ⚠️ Not accessible through the public API.

The `circle_participant` entity represents all participants in a circle, including both direct members and inherited participants from child circles. It is implemented as a view and cached in `circle_participant_cache` for performance optimization.

## Fields

| Field Name | Type | Description                                 | Default        |
| ---------- | ---- | ------------------------------------------- | -------------- |
| `id`       | UUID | Unique identifier for the participant cache | Auto-generated |
| `circleId` | UUID | Reference to the circle                     | Required       |
| `memberId` | UUID | Reference to the member                     | Required       |

## Relationships

### Object Relationships

- `circle`: The circle this participant belongs to
- `member`: The member who is a participant

## Participant Types

Circle participants are derived from three sources:

1. Direct circle members (from `circle_member`)
2. Leaders of child circles (from `circle_leader` through parent-child relationships)
3. Leaders of linked circles (from `circle_leader` through circle links)

## GraphQL Examples

### Get Participants of a Specific Circle

```graphql
query GetCircleParticipants($circleId: uuid!) {
  circle_participant(where: { circleId: { _eq: $circleId } }) {
    circle {
      id
      role {
        name
      }
    }
    member {
      id
      name
      description
    }
  }
}
```

## Implementation Details

The `circle_participant` view is defined by a UNION of three queries:

1. Active circle members:

```sql
SELECT c.id AS "circleId", cm."memberId"
FROM circle c
JOIN circle_member cm ON c.id = cm."circleId"
WHERE cm.archived = false
```

2. Leaders of child circles:

```sql
SELECT c."parentId" AS "circleId", l."memberId"
FROM circle c
JOIN circle_leader l ON l."circleId" = c.id
WHERE c."parentId" IS NOT NULL AND c.archived = false
```

3. Leaders of linked circles:

```sql
SELECT cl."parentId" AS "circleId", l."memberId"
FROM circle_link cl
JOIN circle_leader l ON l."circleId" = cl."circleId"
```

The results are cached in the `circle_participant_cache` table, which is updated by triggers for performance optimization.

## Notes

- Circle participants include both direct members and inherited participants
- The participant cache is used for efficient permission checks
- Participants inherit access rights to circle resources
- The view automatically handles changes in circle structure
- Participant status affects access to meetings, tasks, and decisions
- The cache is automatically maintained through database triggers
