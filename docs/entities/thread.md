# Thread Entity

[Rolebase public API](../public-api.md)

The `thread` entity represents a discussion or conversation thread in Rolebase. Threads are associated with circles and can include multiple participants. They support activities, reactions, and can reference other entities like tasks, meetings, and decisions.

## Fields

| Field Name          | Type               | Description                                    | Default           |
| ------------------- | ------------------ | ---------------------------------------------- | ----------------- |
| `id`                | UUID               | Unique identifier for the thread               | Auto-generated    |
| `orgId`             | UUID               | Reference to the organization                  | Required          |
| `circleId`          | UUID               | Reference to the circle                        | Required          |
| `initiatorMemberId` | UUID               | Reference to the member who started the thread | Required          |
| `title`             | String             | Title of the thread                            | Required          |
| `createdAt`         | Timestamp          | When the thread was created                    | Current timestamp |
| `archived`          | Boolean            | Whether the thread is archived                 | `false`           |
| `private`           | Boolean            | Whether the thread is private                  | `false`           |
| `status`            | Thread_Status_Enum | Current status of the thread                   | Required          |

## Relationships

### Object Relationships

- `org`: The organization this thread belongs to
- `circle`: The circle this thread is associated with
- `initiatorMember`: The member who started the thread

### Array Relationships

- `activities`: Activities (messages, updates) in the thread
- `extra_members`: Additional members added to the thread
- `member_status`: Tracking member read status
- `logs`: Activity logs for this thread

## Thread Activities

Thread activities represent messages and updates in the thread. Each activity has:

- `id`: Unique identifier
- `type`: Type of activity
- `data`: JSON data containing the activity content
- `createdAt`: Timestamp of creation
- `userId`: User who created the activity

Activities can reference other entities:

- `refDecision`: Referenced decision
- `refMeeting`: Referenced meeting
- `refTask`: Referenced task
- `refThread`: Referenced thread

## Member Status

The `thread_member_status` tracks reading status for each member:

- `lastReadActivityId`: ID of the last activity read
- `lastReadDate`: When the member last read the thread
- `memberId`: Member whose status is being tracked

## GraphQL Examples

### Query Threads

```graphql
query GetThreads($orgId: uuid!) {
  thread(where: { orgId: { _eq: $orgId } }) {
    id
    title
    status
    createdAt
    circle {
      role {
        name
      }
    }
  }
}
```

### Get a Specific Thread

```graphql
query GetThread($id: uuid!) {
  thread_by_pk(id: $id) {
    id
    title
    status
    createdAt
    circle {
      role {
        name
      }
    }
    initiatorMember {
      name
    }
    activities {
      id
      type
      data
      createdAt
      user {
        displayName
      }
      reactions {
        id
        shortcode
      }
    }
    member_status {
      lastReadDate
      member {
        name
      }
    }
  }
}
```

### Create a Thread

```graphql
mutation CreateThread {
  insert_thread_one(
    object: {
      orgId: "your-org-id"
      circleId: "circle-id"
      title: "Discussion about new feature"
      initiatorMemberId: "member-id"
      status: Active
      private: false
      extra_members: {
        data: [{ memberId: "member-id-1" }, { memberId: "member-id-2" }]
      }
    }
  ) {
    id
    title
    status
  }
}
```

### Add an Activity

```graphql
mutation AddThreadActivity {
  insert_thread_activity_one(
    object: {
      threadId: "thread-id"
      type: Message
      data: { message: "This is a message" }
      userId: "user-id"
    }
  ) {
    id
    type
    data
  }
}
```

### Update Thread Status

```graphql
mutation UpdateThreadStatus {
  update_thread_by_pk(
    pk_columns: { id: "thread-id" }
    _set: { status: Closed }
  ) {
    id
    status
  }
}
```

## Permissions

Thread access is controlled by several factors:

- Circle membership
- Thread privacy settings
- Organization member role
- Extra member status

The following rules apply:

- Circle participants can access their circle's threads
- Private threads are only visible to circle participants and extra members
- Organization members can access non-private threads
- Thread activities can be created by participants and extra members
- Member status can be updated by the respective member

## Notes

- Threads can be used for discussions, updates, and announcements
- Activities support rich content through the JSON data field
- Members can be added as extra participants even if they're not circle members
- Reading status helps track unread messages for each member
- Threads can reference other entities to provide context
- Activities support reactions for engagement
