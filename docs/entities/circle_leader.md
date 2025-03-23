# Circle Leader Entity

[Rolebase public API](../public-api.md)

> ⚠️ Not accessible through the public API.

The `circle_leader` entity represents a leadership assignment in a circle within Rolebase. Circle leaders have special permissions and responsibilities for managing their circles, including governance decisions and member management.

## Fields

| Field Name | Type | Description                                | Default  |
| ---------- | ---- | ------------------------------------------ | -------- |
| `circleId` | UUID | Reference to the circle                    | Required |
| `memberId` | UUID | Reference to the member assigned as leader | Required |
| `orgId`    | UUID | Reference to the organization              | Required |

## Relationships

### Object Relationships

- `circle`: The circle this leadership assignment belongs to
- `member`: The member assigned as the circle leader

## GraphQL Examples

### Get Leaders of a Specific Circle

```graphql
query GetCircleLeaders($circleId: uuid!) {
  circle_leader(where: { circleId: { _eq: $circleId } }) {
    circle {
      id
      role {
        name
      }
    }
    member {
      id
      name
    }
  }
}
```

## Permissions

Circle leader access is controlled based on the following rules:

- Circle leaders can be assigned by:
  - Organization owners
  - Organization admins
  - Parent circle leaders (for child circles)
- Circle leaders have special permissions in their circles:
  - Managing circle members
  - Creating and modifying circle roles
  - Managing circle governance
  - Creating and managing circle links
  - Leading meetings and making decisions

## Notes

- Circle leaders play a crucial role in circle governance and operations
- A circle can have multiple leaders to share responsibilities
- Circle leaders inherit leadership permissions in child circles
- Leadership assignments are used to determine governance permissions
- Circle leaders can manage circle links for cross-functional collaboration
