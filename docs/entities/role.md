# Role Entity

[Rolebase public API](../public-api.md)

The `role` entity represents a role within an organization in Rolebase. Roles define the purpose, domain, accountabilities, and other aspects of a position or function within the organization. Each circle is associated with a role that defines its purpose and responsibilities.

## Fields

| Field Name         | Type     | Description                                      | Default        |
| ------------------ | -------- | ------------------------------------------------ | -------------- |
| `id`               | UUID     | Unique identifier for the role                   | Auto-generated |
| `orgId`            | UUID     | Reference to the organization                    | Required       |
| `name`             | String   | Name of the role                                 | Required       |
| `purpose`          | String   | The role's purpose or mission                    | Required       |
| `domain`           | String   | Areas of authority and control                   | Required       |
| `accountabilities` | String   | List of accountabilities                         | Required       |
| `checklist`        | String   | Checklist of responsibilities                    | Required       |
| `indicators`       | String   | Performance indicators                           | Required       |
| `notes`            | String   | Additional notes                                 | Required       |
| `archived`         | Boolean  | Whether the role is archived                     | `false`        |
| `base`             | Boolean  | Whether this is a base role                      | `false`        |
| `singleMember`     | Boolean  | Whether the role can only have one member        | `false`        |
| `parentLink`       | Boolean  | Whether the role can be linked to parent circles | `false`        |
| `colorHue`         | Smallint | Color hue for visual representation              | Optional       |

## Relationships

### Object Relationships

- `org`: The organization this role belongs to

### Array Relationships

- `circles`: Circles that use this role

## GraphQL Examples

### Query Roles

```graphql
query GetRoles($orgId: uuid!) {
  role(where: { orgId: { _eq: $orgId } }) {
    id
    name
  }
}
```

### Get a Specific Role

```graphql
query GetRole($id: uuid!) {
  role_by_pk(id: $id) {
    id
    name
    purpose
    domain
    accountabilities
    checklist
    indicators
    notes
  }
}
```

### Create a Role

```graphql
mutation CreateRole {
  insert_role_one(
    object: {
      orgId: "your-org-id"
      name: "Software Engineer"
      purpose: "Develop and maintain software applications"
      domain: "Application codebase and development tools"
      accountabilities: "Write clean code, Review PRs, Debug issues"
      checklist: "Daily code review, Weekly status updates"
      indicators: "Code quality metrics, Bug resolution time"
      notes: "Focus on maintainable and scalable code"
      singleMember: false
    }
  ) {
    id
    name
    purpose
  }
}
```

### Update a Role

```graphql
mutation UpdateRole {
  update_role_by_pk(
    pk_columns: { id: "role-id" }
    _set: {
      name: "Senior Software Engineer"
      accountabilities: "Lead development, Mentor team members, Architect solutions"
    }
  ) {
    id
    name
    accountabilities
  }
}
```

## Permissions

The role entity has different access levels based on user roles:

- `Owner`: Full access to all roles
- `Admin/Member`: Can create and modify non-base roles
- All members can view roles in their organization

## Notes

- Base roles (`base: true`) are fundamental to the organization and can only be modified by owners
- The `singleMember` flag indicates if the role should be assigned to only one person
- `parentLink` allows the role to be linked to parent circles for cross-functional work
- The combination of purpose, domain, and accountabilities defines the complete scope of the role
