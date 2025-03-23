# User App Entity

[Rolebase public API](../public-api.md)

The `user_app` entity represents a user's connected application or integration in Rolebase. It tracks application settings, preferences, and authentication details for third-party integrations and services.

## Fields

| Field Name     | Type      | Description                              | Default           |
| -------------- | --------- | ---------------------------------------- | ----------------- |
| `id`           | UUID      | Unique identifier for the app connection | Auto-generated    |
| `userId`       | UUID      | Reference to the user                    | Required          |
| `type`         | Text      | Type of application or integration       | Required          |
| `config`       | JSON      | Public application configuration         | Required          |
| `secretConfig` | JSON      | Sensitive application configuration      | Required          |
| `tmpData`      | JSON      | Temporary data storage                   | Optional          |
| `createdAt`    | Timestamp | When the app was connected               | Current timestamp |

## Application Types

The `type` field can have the following values:

- `GoogleCalendar`: Google Calendar integration
- `Office365`: Microsoft 365 Calendar integration

## Relationships

### Object Relationships

- `user`: The user this app connection belongs to

## GraphQL Examples

### Query User Apps

```graphql
query GetUserApps {
  user_app(order_by: { createdAt: desc }) {
    id
    type
    config
    createdAt
    userId
  }
}
```

## Permissions

App connection access is restricted to the owning user:

- Users can view their own app connections (limited to `config`, `id`, `type`, and `userId` fields)

## Notes

- Each user can have multiple app connections
- The `config` field stores public configuration data
- The `secretConfig` field stores sensitive data like tokens
- The `tmpData` field can be used for temporary storage
- There is a unique constraint on (`userId`, `type`) pairs
