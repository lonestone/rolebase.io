# Task Entity

[Rolebase public API](../public-api.md)

The `task` entity represents a task or to-do item in Rolebase. Tasks are associated with circles and can be assigned to members. They support tracking progress, due dates, and can be organized into custom views.

## Fields

| Field Name    | Type             | Description                      | Default           |
| ------------- | ---------------- | -------------------------------- | ----------------- |
| `id`          | UUID             | Unique identifier for the task   | Auto-generated    |
| `orgId`       | UUID             | Reference to the organization    | Required          |
| `circleId`    | UUID             | Reference to the circle          | Required          |
| `memberId`    | UUID             | Reference to the assigned member | Optional          |
| `title`       | String           | Title of the task                | Required          |
| `description` | String           | Detailed description             | Required          |
| `status`      | Task_Status_Enum | Current status of the task       | Required          |
| `dueDate`     | Timestamp        | When the task is due             | Optional          |
| `createdAt`   | Timestamp        | When the task was created        | Current timestamp |
| `archived`    | Boolean          | Whether the task is archived     | `false`           |
| `private`     | Boolean          | Whether the task is private      | `false`           |

## Relationships

### Object Relationships

- `org`: The organization this task belongs to
- `circle`: The circle this task is associated with
- `member`: The member assigned to this task (if any)

### Array Relationships

- `logs`: Activity logs for this task

## Task Status

The `status` field can have the following values:

- `Open`: Task is open and active
- `InProgress`: Task is in progress
- `InReview`: Task is in review
- `Blocked`: Task is blocked by another task or issue
- `Done`: Task is done

## Task Views

Tasks can be organized into custom views through the `task_view` entity, which has the following fields:

- `id`: Unique identifier for the view
- `orgId`: Reference to the organization
- `key`: Unique key for the view within the organization
- `tasksIds`: Array of task IDs in this view

## GraphQL Examples

### Query Tasks

```graphql
query GetTasks($orgId: uuid!) {
  task(where: { orgId: { _eq: $orgId } }) {
    id
    title
    description
    status
    dueDate
    circle {
      role {
        name
      }
    }
    member {
      name
    }
    logs {
      createdAt
      display
      changes
    }
  }
}
```

### Get a Specific Task

```graphql
query GetTask($id: uuid!) {
  task_by_pk(id: $id) {
    id
    title
    description
    status
    dueDate
    circle {
      role {
        name
      }
    }
    member {
      name
    }
  }
}
```

### Create a Task

```graphql
mutation CreateTask {
  insert_task_one(
    object: {
      orgId: "your-org-id"
      circleId: "circle-id"
      title: "Implement new feature"
      description: "Add user authentication to the app"
      status: Open
      dueDate: "2024-01-15T00:00:00Z"
      memberId: "assigned-member-id"
    }
  ) {
    id
    title
    status
  }
}
```

### Update a Task

```graphql
mutation UpdateTask {
  update_task_by_pk(
    pk_columns: { id: "task-id" }
    _set: { status: InProgress, description: "Updated task description" }
  ) {
    id
    status
    description
  }
}
```

## Permissions

Task access is controlled by several factors:

- Circle membership
- Task privacy settings
- Organization member role
- Task assignment

The following rules apply:

- Circle participants can access their circle's tasks
- Private tasks are only visible to assigned members and circle participants
- Organization members can access non-private tasks

## Notes

- Tasks can be organized and filtered using custom views (see [task_view](./task_view.md))
- Activity logs track changes to task status and assignments
- Tasks can be assigned to specific members or left unassigned
- Due dates help with task prioritization and tracking
