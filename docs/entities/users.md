# Users Entity

[Rolebase public API](../public-api.md)

The `users` entity represents user accounts in Rolebase. It is managed by Hasura Auth and contains all user-related information, including authentication details, profile information, and relationships to other entities. This entity is crucial for user management and authentication.

## Fields

| Field Name            | Type      | Description                                | Default           |
| --------------------- | --------- | ------------------------------------------ | ----------------- |
| `id`                  | UUID      | Unique identifier for the user             | Auto-generated    |
| `displayName`         | String    | User's display name                        | Required          |
| `email`               | String    | User's email address (unique)              | Optional          |
| `emailVerified`       | Boolean   | Whether the email has been verified        | `false`           |
| `phoneNumber`         | String    | User's phone number (unique)               | Optional          |
| `phoneNumberVerified` | Boolean   | Whether the phone number has been verified | `false`           |
| `avatarUrl`           | String    | URL to the user's avatar image             | Required          |
| `locale`              | String    | User's preferred locale                    | Required          |
| `metadata`            | JSON      | Additional user metadata                   | Required          |
| `defaultRole`         | String    | User's default role in the system          | Required          |
| `isAnonymous`         | Boolean   | Whether this is an anonymous user          | `false`           |
| `disabled`            | Boolean   | Whether the user account is disabled       | `false`           |
| `lastSeen`            | Timestamp | When the user was last active              | Optional          |
| `createdAt`           | Timestamp | When the user account was created          | Current timestamp |
| `updatedAt`           | Timestamp | When the user account was last updated     | Current timestamp |

### Authentication Fields

| Field Name          | Type      | Description                                    | Default  |
| ------------------- | --------- | ---------------------------------------------- | -------- |
| `passwordHash`      | String    | Hashed password for password authentication    | Optional |
| `activeMfaType`     | String    | Active multi-factor authentication method      | Optional |
| `totpSecret`        | String    | Secret for time-based one-time password (TOTP) | Optional |
| `otpHash`           | String    | One-time password hash                         | Optional |
| `otpHashExpiresAt`  | Timestamp | When the OTP hash expires                      | Required |
| `otpMethodLastUsed` | String    | Last used OTP method                           | Optional |
| `ticket`            | String    | Authentication ticket                          | Optional |
| `ticketExpiresAt`   | Timestamp | When the authentication ticket expires         | Required |
| `currentChallenge`  | String    | Current authentication challenge               | Optional |
| `newEmail`          | String    | New email address pending verification         | Optional |

## Relationships

### Object Relationships

- `defaultRoleByRole`: The default role configuration for this user

### Array Relationships

- `apps`: User's connected applications
- `members`: Organization memberships
- `roles`: User's assigned roles
- `refreshTokens`: Authentication refresh tokens
- `securityKeys`: WebAuthn security keys
- `userProviders`: Connected authentication providers (OAuth, etc.)

## GraphQL Examples

### Query User Profile

```graphql
query GetUserProfile($userId: uuid!) {
  user(id: $userId) {
    id
    displayName
    email
    emailVerified
    avatarUrl
    locale
    metadata
    defaultRole
    lastSeen
    members {
      id
      org {
        name
      }
    }
  }
}
```

### Update User Profile

```graphql
mutation UpdateUserProfile {
  updateUser(
    pk_columns: { id: "user-id" }
    _set: {
      displayName: "New Name"
      locale: "en"
      metadata: { timezone: "Europe/Paris" }
    }
  ) {
    id
    displayName
    locale
    metadata
    updatedAt
  }
}
```

## Permissions

Access to user data is strictly controlled:

- Users can only view and modify their own profile data
- Sensitive fields (passwordHash, otpHash, etc.) are never exposed via the API
- Role management is handled through dedicated endpoints
- Email and phone number changes require verification
- Account disabling can only be done by administrators

## Notes

- The user entity is managed by Hasura Auth and should not be modified directly
- Email and phone number must be unique across all users
- The metadata field can store custom user preferences and settings
- The lastSeen timestamp is automatically updated on user activity
- Multi-factor authentication (MFA) can be enabled using various methods
- User roles determine access permissions throughout the application
- Connected providers (OAuth) are managed through the userProviders relationship
- WebAuthn security keys can be used for passwordless authentication
