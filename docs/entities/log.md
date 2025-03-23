# Log Entity

[Rolebase public API](../public-api.md)

The `log` entity represents an activity log entry in Rolebase. It tracks changes to entities, user actions, and provides an audit trail for organization activities. Logs can be used to track changes and support undo/redo functionality.

## Fields

| Field Name         | Type      | Description                                        | Default           |
| ------------------ | --------- | -------------------------------------------------- | ----------------- |
| `id`               | UUID      | Unique identifier for the log entry                | Auto-generated    |
| `orgId`            | UUID      | Reference to the organization                      | Required          |
| `userId`           | UUID      | User who made the change                           | Required          |
| `memberId`         | UUID      | Member who made the change                         | Required          |
| `memberName`       | String    | Name of the member (preserved for deleted members) | Required          |
| `createdAt`        | Timestamp | When the log entry was created                     | Current timestamp |
| `display`          | JSON      | Type of log and data to display                    | Required          |
| `changes`          | JSON      | Log of changes to entities for undo/redo           | Required          |
| `canceled`         | Boolean   | Whether this log entry has been canceled           | `false`           |
| `cancelLogId`      | UUID      | Reference to the log that was canceled             | Optional          |
| `cancelMemberId`   | UUID      | Member who canceled the action                     | Optional          |
| `cancelMemberName` | String    | Name of the member who canceled                    | Optional          |
| `meetingId`        | UUID      | Meeting during which this log was created          | Optional          |
| `taskId`           | UUID      | Task associated with this log                      | Optional          |
| `threadId`         | UUID      | Thread associated with this log                    | Optional          |

## Entity Changes

The `changes` field tracks modifications to entities with the following structure:

```typescript
type EntityChange = {
  type: 'Create' | 'Update' | 'Delete'
  id: string
  data?: Entity // For Create/Delete
  prevData?: Entity // For Update
  newData?: Entity // For Update
}
```

## Relationships

### Object Relationships

- `org`: The organization this log belongs to
- `user`: The user who made the change
- `member`: The member who made the change
- `cancelLog`: The log entry that was canceled (if this is a cancellation)
- `cancelMember`: The member who canceled the action
- `task`: The associated task (if any)
- `thread`: The associated thread (if any)

## GraphQL Examples

### Query Recent Logs

```graphql
query GetRecentLogs($orgId: uuid!) {
  log(
    where: { orgId: { _eq: $orgId } }
    order_by: { createdAt: desc }
    limit: 10
  ) {
    id
    createdAt
    memberName
    display
    changes
    canceled
    task {
      title
    }
    thread {
      title
    }
  }
}
```

### Create a Log Entry

```graphql
mutation CreateLog {
  insert_log_one(
    object: {
      orgId: "your-org-id"
      memberId: "member-id"
      memberName: "John Doe"
      display: { type: "task_created", title: "New Task" }
      changes: {
        type: "Create"
        id: "task-id"
        data: { title: "New Task", status: "TODO" }
      }
    }
  ) {
    id
    createdAt
    display
  }
}
```

### Cancel a Log Entry

```graphql
mutation CancelLog {
  insert_log_one(
    object: {
      orgId: "your-org-id"
      memberId: "member-id"
      memberName: "Jane Doe"
      cancelLogId: "original-log-id"
      cancelMemberId: "original-member-id"
      cancelMemberName: "John Doe"
      display: { type: "task_creation_canceled" }
      changes: {
        type: "Delete"
        id: "task-id"
        data: { title: "New Task", status: "TODO" }
      }
    }
  ) {
    id
    cancelLog {
      id
      display
    }
  }
}
```

## Permissions

Log access is controlled based on the following rules:

- Organization members can view logs from their organization
- Log creation requires organization membership with appropriate role
- The `userId` is automatically set to the authenticated user
- Log entries cannot be modified or deleted after creation
- Cancellation is handled through new log entries

## Notes

- Log entries provide an audit trail of organization activities
- The `display` field contains user-friendly information about the action
- The `changes` field stores technical details for undo/redo functionality
- Member names are preserved to maintain readability even if members are deleted
- Logs can be associated with meetings, tasks, and threads for context
- Cancellation creates a new log entry rather than modifying the original
