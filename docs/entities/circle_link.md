# Circle Link Entity

[Rolebase public API](../public-api.md)

The `circle_link` entity represents a link between two circles in Rolebase, enabling cross-functional collaboration and representation of one circle within another. This allows for complex organizational structures where circles can be connected beyond the basic parent-child hierarchy.

## Fields

| Field Name  | Type      | Description                           | Default           |
| ----------- | --------- | ------------------------------------- | ----------------- |
| `id`        | UUID      | Unique identifier for the circle link | Auto-generated    |
| `parentId`  | UUID      | Reference to the hosting circle       | Required          |
| `circleId`  | UUID      | Reference to the invited circle       | Required          |
| `createdAt` | Timestamp | When the circle link was created      | Current timestamp |

## Relationships

### Object Relationships

- `hostCircle`: The circle that hosts the linked circle (referenced by `parentId`)
- `invitedCircle`: The circle that is invited to participate (referenced by `circleId`)

## GraphQL Examples

### Get Links for a Specific Circle

```graphql
query GetCircleLinks($parentId: uuid!) {
  circle_link(where: { parentId: { _eq: $parentId } }) {
    id
    hostCircle {
      id
      role {
        name
      }
    }
    invitedCircle {
      id
      role {
        name
      }
    }
    createdAt
  }
}
```

### Create Circle Link

```graphql
mutation CreateCircleLink {
  insert_circle_link_one(
    object: { parentId: "host-circle-id", circleId: "invited-circle-id" }
  ) {
    id
    hostCircle {
      role {
        name
      }
    }
    invitedCircle {
      role {
        name
      }
    }
  }
}
```

### Remove Circle Link

```graphql
mutation RemoveCircleLink {
  delete_circle_link(
    where: {
      parentId: { _eq: "host-circle-id" }
      circleId: { _eq: "invited-circle-id" }
    }
  ) {
    affected_rows
  }
}
```

## Permissions

Circle link access is controlled based on the following rules:

- Circle links can be created by:
  - Organization owners
  - Organization admins (if governance is not protected)
  - Organization members (if governance is not protected)
  - Circle leaders of the host circle
- Public access is limited to viewing links in organizations with shared member information
- Organization members can view all circle links in their organization

## Notes

- Circle links enable cross-functional collaboration between different parts of the organization
- Links are bidirectional, with distinct roles for host and invited circles
- The combination of `parentId` and `circleId` must be unique
- Circle links affect participant inheritance and permission structures
- Links can be used to create matrix organizations and flexible team structures
- Circle leaders of linked circles gain certain permissions in the host circle
