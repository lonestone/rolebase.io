# API Key Entity

[Rolebase public API](../public-api.md)

The `api_key` entity represents an API key in Rolebase. API keys are used to authenticate and authorize programmatic access to the Rolebase API, allowing integration with external applications and services.

## Fields

| Field Name  | Type      | Description                        | Default           |
| ----------- | --------- | ---------------------------------- | ----------------- |
| `id`        | UUID      | Unique identifier for the API key  | Auto-generated    |
| `userId`    | UUID      | Reference to the user              | Required          |
| `name`      | String    | Name or description of the API key | Required          |
| `value`     | String    | The actual API key value           | Auto-generated    |
| `createdAt` | Timestamp | When the API key was created       | Current timestamp |

## Relationships

### Object Relationships

- `user`: The user this API key belongs to

## GraphQL Examples

### Query API Keys

```graphql
query apiKeys($userId: uuid!) {
  api_key(where: { userId: { _eq: $userId } }) {
    id
    name
    value
    createdAt
  }
}
```

### Create API Key

```graphql
mutation createApiKey($userId: uuid!, $name: String!) {
  insert_api_key_one(object: { userId: $userId, name: $name }) {
    id
    name
    value
    createdAt
  }
}
```

### Rename API Key

```graphql
mutation renameApiKey($id: uuid!, $name: String!) {
  update_api_key_by_pk(pk_columns: { id: $id }, _set: { name: $name }) {
    id
    name
    value
    createdAt
  }
}
```

### Delete API Key

```graphql
mutation deleteApiKey($id: uuid!) {
  delete_api_key_by_pk(id: $id) {
    id
  }
}
```

## Permissions

API key management is restricted to the owning user:

- Users can:
  - Create their own API keys
  - View their own API keys
  - Rename their own API keys
  - Delete their own API keys

## Notes

- API keys should be treated as sensitive information
- The `value` is only shown once upon creation
- Each key should have a descriptive name
- Best practices for API key management:
  - Regularly rotate keys
  - Monitor key usage
  - Delete unused keys
  - Keep keys secure and never share them
