# Circle Entity

[Rolebase public API](../public-api.md)

The `circle` entity represents an organizational circle in Rolebase. Circles are hierarchical structures that can contain members, roles, and other circles. They are used to organize teams and responsibilities within an organization.

## Fields

| Field Name | Type    | Description                                       | Default        |
| ---------- | ------- | ------------------------------------------------- | -------------- |
| `id`       | UUID    | Unique identifier for the circle                  | Auto-generated |
| `orgId`    | UUID    | Reference to the organization                     | Required       |
| `roleId`   | UUID    | Reference to the role associated with this circle | Required       |
| `parentId` | UUID    | Reference to the parent circle                    | Optional       |
| `archived` | Boolean | Whether the circle is archived                    | `false`        |

## Relationships

### Object Relationships

- `org`: The organization this circle belongs to
- `parent`: The parent circle (if any)
- `role`: The role associated with this circle

### Array Relationships

- `children`: Child circles within this circle
- `members`: Circle memberships
- `leaders`: Circle leadership assignments
- `participants`: All participants (including inherited from parent circles)
- `meetings`: Meetings associated with this circle
- `meetings_recurring`: Recurring meetings for this circle
- `tasks`: Tasks assigned to this circle
- `decisions`: Decisions made within this circle
- `threads`: Discussion threads in this circle
- `hostCircleLinks`: Links where this circle hosts other circles
- `invitedCircleLinks`: Links where this circle is invited to other circles

## Circle Links

Circle links allow circles to be represented in other circles, enabling cross-functional collaboration. There are two types of circle links:

- `hostCircleLinks`: Circles that this circle hosts
- `invitedCircleLinks`: Circles where this circle is invited

## GraphQL Examples

### Query Circles

```graphql
query GetCircles($orgId: uuid!) {
  circle(where: { orgId: { _eq: $orgId } }) {
    id
    role {
      name
      purpose
    }
    members {
      member {
        name
      }
    }
    children {
      id
      role {
        name
      }
    }
    parent {
      id
      role {
        name
      }
    }
  }
}
```

### Get a Specific Circle

```graphql
query GetCircle($id: uuid!) {
  circle_by_pk(id: $id) {
    id
    role {
      name
    }
  }
}
```

### Create a Circle

```graphql
mutation CreateCircle {
  insert_circle_one(
    object: {
      orgId: "your-org-id"
      roleId: "role-id"
      parentId: "parent-circle-id"
    }
  ) {
    id
    role {
      name
    }
  }
}
```

### Update a Circle

```graphql
mutation UpdateCircle {
  update_circle_by_pk(
    pk_columns: { id: "circle-id" }
    _set: { archived: true }
  ) {
    id
    archived
  }
}
```

## Circle Members

Circle members are managed through the `circle_member` entity, which has the following key fields:

- `circleId`: Reference to the circle
- `memberId`: Reference to the member
- `avgMinPerWeek`: Average minutes per week allocated to this circle
- `archived`: Whether the membership is archived

## Circle Leaders

Circle leaders are managed through the `circle_leader` entity, which tracks leadership assignments:

- `circleId`: Reference to the circle
- `memberId`: Reference to the member
- `orgId`: Reference to the organization

## Notes

- Circles form a hierarchical structure through the `parentId` relationship
- A circle must have an associated role that defines its purpose and accountabilities
- Circle participants include both direct members and members inherited from parent circles
- Circle links enable complex organizational structures and cross-functional collaboration
- Meetings, tasks, and decisions are organized within circles
