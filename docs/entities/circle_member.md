# Circle Member Entity

[Rolebase public API](../public-api.md)

The `circle_member` entity represents a membership relationship between a member and a circle in Rolebase. It tracks the association of members with specific circles, including their time allocation and membership status.

## Fields

| Field Name  | Type      | Description                                 | Default        |
| ----------- | --------- | ------------------------------------------- | -------------- |
| `id`        | UUID      | Unique identifier for the circle membership | Auto-generated |
| `circleId`  | UUID      | Reference to the circle                     | Required       |
| `memberId`  | UUID      | Reference to the member                     | Required       |
| `createdAt` | Timestamp | When the membership was created             | Current time   |
| `archived`  | Boolean   | Whether the membership is archived          | `false`        |

## Relationships

### Object Relationships

- `circle`: The circle this membership belongs to
- `member`: The member associated with this circle membership

## GraphQL Examples

### Get Members of a Specific Circle

```graphql
query GetCircleMembers($circleId: uuid!) {
  circle_member(
    where: { circleId: { _eq: $circleId }, archived: { _eq: false } }
  ) {
    id
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
    createdAt
  }
}
```

### Add Member to Circle

```graphql
mutation AddCircleMember {
  insert_circle_member_one(
    object: { circleId: "circle-id", memberId: "member-id" }
  ) {
    id
    circle {
      id
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

### Update Circle Member

```graphql
mutation UpdateCircleMember {
  update_circle_member_by_pk(
    pk_columns: { id: "circle-member-id" }
    _set: { archived: true }
  ) {
    id
    archived
  }
}
```

## Permissions

Circle member access is controlled based on the following rules:

- Members can be added to circles by:
  - Organization owners
  - Organization admins
  - Circle leaders
- A member cannot be added to a circle if they already have an active membership in that circle
- Members can view circle memberships in circles they belong to
- Organization admins and owners can view all circle memberships

## Notes

- The `archived` flag allows for maintaining membership history while marking inactive memberships
- Circle membership affects access to circle resources like meetings, tasks, and decisions
- Members can belong to multiple circles with different time allocations
- Circle membership is used to determine participation in circle activities and governance
