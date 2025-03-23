# Member Entity

[Rolebase public API](../public-api.md)

The `member` entity represents a member of an organization in Rolebase. Members can be assigned to circles, roles, and can participate in meetings and tasks.

## Fields

| Field Name         | Type             | Description                                  | Default        |
| ------------------ | ---------------- | -------------------------------------------- | -------------- |
| `id`               | UUID             | Unique identifier for the member             | Auto-generated |
| `orgId`            | UUID             | Reference to the organization                | Required       |
| `name`             | String           | Name of the member                           | Required       |
| `description`      | String           | Description or bio of the member             | Required       |
| `archived`         | Boolean          | Whether the member is archived               | `false`        |
| `picture`          | String           | URL of the member's profile picture          | Optional       |
| `pictureFileId`    | UUID             | Reference to the stored profile picture file | Optional       |
| `userId`           | UUID             | Reference to the user account                | Optional       |
| `inviteEmail`      | String           | Email used for invitation                    | Optional       |
| `inviteDate`       | Timestamp        | When the invitation was sent                 | Optional       |
| `workedMinPerWeek` | Integer          | Actual working minutes per week              | Optional       |
| `role`             | Member_Role_Enum | Member's role in the organization            | Optional       |

## Relationships

### Object Relationships

- `org`: The organization this member belongs to
- `pictureFile`: The stored profile picture file
- `user`: The associated user account

### Array Relationships

- `circle_members`: Circle memberships
- `meeting_attendees`: Meeting attendance records

## GraphQL Examples

### Query Members

```graphql
query GetMembers($orgId: uuid!) {
  member(where: { orgId: { _eq: $orgId } }) {
    id
    name
    description
    role
    workedMinPerWeek
    circle_members {
      circle {
        name
      }
    }
  }
}
```

### Get a Specific Member

```graphql
query GetMember($id: uuid!) {
  member_by_pk(id: $id) {
    id
    name
  }
}
```

### Create a Member

```graphql
mutation CreateMember {
  insert_member_one(
    object: {
      name: "John Doe"
      description: "Software Engineer"
      orgId: "your-org-id"
      workedMinPerWeek: 2400
    }
  ) {
    id
    name
    role
  }
}
```

### Update a Member

```graphql
mutation UpdateMember {
  update_member_by_pk(
    pk_columns: { id: "member-id" }
    _set: {
      name: "Jane Doe"
      description: "Senior Engineer"
      workedMinPerWeek: 3000
    }
  ) {
    id
    name
    description
    workedMinPerWeek
  }
}
```

## Permissions

The member entity has different access levels based on user roles:

- `Owner/Admin`: Can create, update, and archive members
- `Member`: Can view member information based on organization sharing settings

## Notes

- The combination of `orgId` and `userId` must be unique
- When a member is invited, `inviteEmail` and `inviteDate` are set
- When the invitation is accepted, `userId` is set and linked to the user account
- `workedMinPerWeek` can be used to track actual work time, different from the organization's default
