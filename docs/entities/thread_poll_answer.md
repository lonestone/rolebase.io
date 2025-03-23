# Thread Poll Answer Entity

[Rolebase public API](../public-api.md)

The `thread_poll_answer` entity represents a member's response to a poll in a thread activity in Rolebase. Poll answers allow members to vote or provide structured responses to questions posed in thread polls.

## Fields

| Field Name      | Type          | Description                             | Default           |
| --------------- | ------------- | --------------------------------------- | ----------------- |
| `id`            | UUID          | Unique identifier for the poll answer   | Auto-generated    |
| `activityId`    | UUID          | Reference to the thread activity (poll) | Required          |
| `userId`        | UUID          | Reference to the user                   | Required          |
| `choicesPoints` | Integer Array | Array of points for each choice         | Required          |
| `createdAt`     | Timestamp     | When the answer was submitted           | Current timestamp |

## Relationships

### Object Relationships

- `activity`: The thread activity (poll) this answer belongs to

## GraphQL Examples

### Query Poll Answers

```graphql
query GetPollAnswers($activityId: uuid!) {
  thread_poll_answer(where: { activityId: { _eq: $activityId } }) {
    id
    activityId
    userId
    choicesPoints
    createdAt
  }
}
```

### Submit Poll Answer

```graphql
mutation CreateThreadPollAnswer($values: thread_poll_answer_insert_input!) {
  insert_thread_poll_answer_one(object: $values) {
    id
    activityId
    userId
    choicesPoints
    createdAt
  }
}
```

### Update Poll Answer

```graphql
mutation UpdateThreadPollAnswer(
  $id: uuid!
  $values: thread_poll_answer_set_input!
) {
  update_thread_poll_answer_by_pk(pk_columns: { id: $id }, _set: $values) {
    id
    activityId
    userId
    choicesPoints
    createdAt
  }
}
```

### Delete Poll Answers

```graphql
mutation DeleteThreadPollAnswers($activityId: uuid!) {
  delete_thread_poll_answer(where: { activityId: { _eq: $activityId } }) {
    returning {
      id
    }
  }
}
```

## Permissions

Poll answer access is controlled based on thread and activity permissions:

- Users can:
  - View poll answers in threads they have access to
  - Submit answers to polls in accessible threads
  - Update their own answers
  - Delete their own answers
- Thread owners can:
  - Delete any poll answers in their threads
- Organization admins and owners can:
  - Delete any poll answers in their organization's threads

## Notes

- Each user can submit only one answer per poll
- Answers can be updated if the user has appropriate permissions
- The `choicesPoints` field is an array of integers representing points for each choice
- Poll results can be aggregated for visualization
- Poll answers help track consensus and decision-making
- Poll answers can be used for:
  - Decision making
  - Scheduling
  - Opinion gathering
  - Quick surveys
