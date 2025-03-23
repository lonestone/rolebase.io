# Thread Activity Entity

[Rolebase public API](../public-api.md)

The `thread_activity` entity represents an activity or interaction within a thread in Rolebase. Activities can include messages, polls, reactions, and other types of content that make up the thread's conversation.

## Fields

| Field Name      | Type                      | Description                               | Default           |
| --------------- | ------------------------- | ----------------------------------------- | ----------------- |
| `id`            | UUID                      | Unique identifier for the activity        | Auto-generated    |
| `threadId`      | UUID                      | Reference to the thread                   | Required          |
| `userId`        | UUID                      | Reference to the user                     | Required          |
| `type`          | Thread_Activity_Type_Enum | Type of activity                          | Required          |
| `data`          | JSON                      | Activity content (format depends on type) | Required          |
| `createdAt`     | timestamptz               | When the activity was created             | Current timestamp |
| `refThreadId`   | UUID                      | Optional reference to a thread            | Optional          |
| `refMeetingId`  | UUID                      | Optional reference to a meeting           | Optional          |
| `refTaskId`     | UUID                      | Optional reference to a task              | Optional          |
| `refDecisionId` | UUID                      | Optional reference to a decision          | Optional          |

## Activity Types

The `type` field can have the following values:

- `Message`: Text message or rich content
- `Poll`: Poll for gathering opinions
- `Thread`: Thread reference
- `Meeting`: Meeting reference
- `Task`: Task reference
- `Decision`: Decision reference

## Relationships

### Object Relationships

- `thread`: The thread this activity belongs to
- `member`: The member who created the activity
- `refThread`: Optional referenced thread
- `refMeeting`: Optional referenced meeting
- `refTask`: Optional referenced task
- `refDecision`: Optional referenced decision

### Array Relationships

- `reactions`: Reactions to this activity
- `reactions_aggregate`: Aggregate data for reactions

## GraphQL Examples

### Query Thread Activities

```graphql
query GetThreadActivities($threadId: uuid!) {
  thread_activity(
    where: { threadId: { _eq: $threadId } }
    order_by: { createdAt: asc }
  ) {
    id
    threadId
    userId
    createdAt
    type
    data
    reactions {
      id
      shortcode
      userId
    }
    refThread {
      id
      title
    }
    refMeeting {
      id
      title
    }
    refTask {
      id
      title
    }
    refDecision {
      id
      title
    }
  }
}
```

### Create Thread Activity

```graphql
mutation CreateThreadActivity {
  insert_thread_activity_one(
    object: {
      threadId: "123e4567-e89b-12d3-a456-426614174000"
      userId: "123e4567-e89b-12d3-a456-426614174001"
      type: Message
      data: { message: "Hello team!" }
    }
  ) {
    id
    type
    data
    createdAt
  }
}
```

### Update Thread Activity

```graphql
mutation UpdateThreadActivity {
  update_thread_activity_by_pk(
    pk_columns: { id: "123e4567-e89b-12d3-a456-426614174002" }
    _set: { data: { message: "Updated message" } }
  ) {
    id
    data
    createdAt
  }
}
```

## Permissions

Thread activity access is controlled through Hasura permissions and row-level security:

- Users can:
  - View activities in threads they have access to
  - Create new activities in threads they have access to
  - Update their own activities
- Organization admins have full access to all activities in their organization

## Notes

- Activity data structure varies based on the type
- Activities are ordered chronologically within a thread
- Activities can reference other entities (threads, meetings, tasks, decisions)
- Activities support reactions with aggregation
- The data field contains type-specific content in JSON format
