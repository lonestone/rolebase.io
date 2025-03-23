# Organization File Entity

[Rolebase public API](../public-api.md)

The `org_file` entity represents an association between an organization and a file in Rolebase. It enables organizations to manage their files and control access to shared documents.

## Fields

| Field Name | Type | Description                                | Default        |
| ---------- | ---- | ------------------------------------------ | -------------- |
| `id`       | UUID | Unique identifier for the file association | Auto-generated |
| `orgId`    | UUID | Reference to the organization              | Required       |
| `fileId`   | UUID | Reference to the file                      | Required       |

## Relationships

### Object Relationships

- `org`: The organization this file association belongs to
- `file`: The associated file

## GraphQL Examples

### Query Organization Files

```graphql
query GetOrgFiles($orgId: uuid!) {
  org_file(where: { orgId: { _eq: $orgId } }) {
    id
    file {
      name
      mimeType
      size
      createdAt
    }
    org {
      name
    }
  }
}
```

### Create Organization File Association

```graphql
mutation CreateOrgFile {
  insert_org_file_one(object: { orgId: "your-org-id", fileId: "file-id" }) {
    id
    file {
      name
      mimeType
    }
  }
}
```

## Permissions

Organization file access is controlled based on organization membership:

- Organization members can:
  - View files associated with their organization
  - Create new file associations
  - Delete file associations they have access to
- Access requires one of the following roles:
  - Member
  - Admin
  - Owner

## Notes

- Files can be associated with multiple organizations
- The association enables organization-level file management
- Deleting an association doesn't delete the actual file
- File access is controlled through organization membership
- The entity supports organization-wide file sharing and access control
- File metadata and content are managed through the `file` entity
