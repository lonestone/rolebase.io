# Thread Extra Member Entity

[Rolebase public API](../public-api.md)

The `thread_extra_member` entity represents additional members invited to participate in a thread in Rolebase. This allows threads to include members beyond the default circle participants, enabling broader collaboration when needed.

## Fields

| Field Name | Type | Description                            | Default        |
| ---------- | ---- | -------------------------------------- | -------------- |
| `id`       | UUID | Unique identifier for the extra member | Auto-generated |
| `threadId` | UUID | Reference to the thread                | Required       |
| `memberId` | UUID | Reference to the member                | Required       |

## Relationships

### Object Relationships

- `thread`: The thread this extra member belongs to
- `member`: The extra member added to the thread

## GraphQL Examples

### Query Thread Extra Members

```graphql
query GetThreadExtraMembers($threadId: uuid!) {
  thread_extra_member(where: { threadId: { _eq: $threadId } }) {
    id
    member {
      id
      name
    }
    threadId
  }
}
```

### Add Extra Member to Thread

```graphql
mutation AddThreadExtraMember {
  insert_thread_extra_member_one(
    object: { threadId: "thread-id", memberId: "member-id" }
  ) {
    id
    threadId
    memberId
  }
}
```

### Remove Extra Member

```graphql
mutation RemoveExtraMember {
  delete_thread_extra_member_by_pk(id: "extra-member-id") {
    id
    memberId
  }
}
```

## Permissions

Extra member access is controlled by the following permissions:

### Select Permissions (Read)

Users can view thread extra members when they meet any of these conditions:

- They are a participant in the thread's circle
- They are an extra member of the thread
- For non-private threads, they are a member of the organization

### Insert Permissions (Create)

Users can add extra members to threads when they meet any of these conditions:

- They are a participant in the thread's circle
- They are an extra member of the thread
- For non-private threads, they are an organization member with Member, Admin, or Owner role

## Notes

- Extra members extend thread participation beyond circle members
- Each member can only be added once as an extra member (enforced by unique constraint on threadId and memberId)
- Extra members have access to thread content based on the permission rules
- Adding extra members helps facilitate cross-circle collaboration
- Extra members can be removed without affecting thread content
- Thread privacy settings apply to all participants including extra members
