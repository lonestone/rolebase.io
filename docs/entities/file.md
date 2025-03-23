# File Entity

[Rolebase public API](../public-api.md)

The `file` entity represents a stored file in Rolebase. Files can be associated with organizations and members, and are used for various purposes such as profile pictures, document storage, and attachments.

## Fields

| Field Name         | Type      | Description                                 | Default           |
| ------------------ | --------- | ------------------------------------------- | ----------------- |
| `id`               | UUID      | Unique identifier for the file              | Auto-generated    |
| `bucketId`         | String    | Reference to the storage bucket             | Required          |
| `name`             | String    | Original name of the file                   | Optional          |
| `mimeType`         | String    | MIME type of the file                       | Optional          |
| `size`             | Integer   | Size of the file in bytes                   | Optional          |
| `etag`             | String    | Entity tag for caching                      | Optional          |
| `isUploaded`       | Boolean   | Whether the file is fully uploaded          | Optional          |
| `metadata`         | JSON      | Additional metadata about the file          | Optional          |
| `createdAt`        | Timestamp | When the file was created                   | Current timestamp |
| `updatedAt`        | Timestamp | When the file was last updated              | Current timestamp |
| `uploadedByUserId` | UUID      | Reference to the user who uploaded the file | Optional          |

## Relationships

### Object Relationships

- `bucket`: The storage bucket containing the file

### Array Relationships

- `members`: Members using this file (e.g., as profile picture)
- `orgs`: Organizations associated with this file

## Storage Buckets

Files are stored in buckets that define storage parameters:

- `cacheControl`: Cache control settings
- `downloadExpiration`: Download link expiration time
- `maxUploadFileSize`: Maximum allowed file size
- `minUploadFileSize`: Minimum allowed file size
- `presignedUrlsEnabled`: Whether presigned URLs are enabled

## GraphQL Examples

### Get a Specific File

```graphql
query GetFile($id: uuid!) {
  file_by_pk(id: $id) {
    id
    name
    mimeType
    size
    createdAt
    metadata
  }
}
```

### Get Organization Files

See [org_file](./org_file.md)

## Permissions

File access is controlled by several factors:

- Organization membership
- Member role
- File association type
- Storage bucket permissions

The following rules apply:

- Organization members can access files associated with their organization
- Members can upload files within size limits defined by buckets
- File metadata can be updated by the original uploader
- Bucket access is controlled by storage configuration
- Virus scanning is performed on uploaded files

## Notes

- Files are stored securely in configurable storage buckets
- Metadata can store additional file information
- Files can be associated with multiple entities
- Presigned URLs enable secure temporary access
- File sizes are constrained by bucket configuration
- MIME type validation ensures proper file handling
- ETags support caching and conditional requests
