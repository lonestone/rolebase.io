# Organization Entity

[Rolebase public API](../public-api.md)

The `org` entity represents an organization in Rolebase. It is the top-level entity that contains all other entities like circles, roles, members, meetings, and tasks.

## Fields

| Field Name          | Type      | Description                                | Default           |
| ------------------- | --------- | ------------------------------------------ | ----------------- |
| `id`                | UUID      | Unique identifier for the organization     | Auto-generated    |
| `name`              | String    | Name of the organization                   | Required          |
| `slug`              | String    | URL-friendly unique identifier             | Optional          |
| `archived`          | Boolean   | Whether the organization is archived       | `false`           |
| `createdAt`         | Timestamp | When the organization was created          | Current timestamp |
| `defaultGraphView`  | String    | Default graph view setting                 | Optional          |
| `protectGovernance` | Boolean   | Whether governance is protected            | `false`           |
| `shareMembers`      | Boolean   | Whether member information is shared       | `false`           |
| `shareOrg`          | Boolean   | Whether organization information is shared | `false`           |

## Relationships

### One-to-One Relationships

- `org_subscription`: Organization's subscription information

### One-to-Many Relationships

- `circles`: Organizational circles
- `decisions`: Organization decisions
- `files`: Organization files
- `logs`: Activity logs
- `meeting_templates`: Meeting templates
- `meetings`: Meetings
- `meetings_recurring`: Recurring meetings
- `members`: Organization members
- `news`: News items
- `roles`: Organization roles
- `task_views`: Task views
- `tasks`: Tasks
- `threads`: Discussion threads

## GraphQL Examples

### Get a Specific Organization

```graphql
query GetOrganization($id: uuid!) {
  org_by_pk(id: $id) {
    id
    name
    slug
    archived
    createdAt
    members {
      id
      name
      role
    }
    circles {
      id
      name
    }
  }
}
```

### Update an Organization

```graphql
mutation UpdateOrganization {
  update_org_by_pk(
    pk_columns: { id: "your-org-id" }
    _set: {
      name: "New Organization Name"
      shareMembers: true
      protectGovernance: true
    }
  ) {
    id
    name
    shareMembers
    protectGovernance
  }
}
```

## Permissions

The organization entity has different access levels based on user roles:

- `Owner`: Full access to all organization settings and data
- `Admin`: Can manage most organization settings and data
- `Member`: Can view organization data based on sharing settings

## Notes

- The `slug` field must be unique across all organizations
- When `protectGovernance` is enabled, only specific roles can modify governance-related entities
- `shareMembers` and `shareOrg` control visibility of organization data to external users
