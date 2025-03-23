# Task View Entity

[Rolebase public API](../public-api.md)

The `task_view` entity represents a custom view of tasks in Rolebase. Task views allow users to organize and filter tasks in a way that suits their workflow, providing flexible task management capabilities within an organization.

## Fields

| Field Name | Type          | Description                                     | Default        |
| ---------- | ------------- | ----------------------------------------------- | -------------- |
| `id`       | UUID          | Unique identifier for the task view             | Auto-generated |
| `orgId`    | UUID          | Reference to the organization                   | Required       |
| `key`      | String        | Unique key for the view within the organization | Required       |
| `tasksIds` | Array of UUID | Array of task IDs included in this view         | Required       |

## Relationships

### Object Relationships

- `org`: The organization this task view belongs to

## GraphQL Examples

### Query Task Views

```graphql
query GetTaskViews($orgId: uuid!) {
  task_view(where: { orgId: { _eq: $orgId } }) {
    id
    key
    tasksIds
    org {
      name
    }
  }
}
```

### Get Tasks with View

```graphql
query GetTasksWithView(
  $orgId: uuid!
  $filters: [task_bool_exp!]!
  $taskViewKey: String!
) {
  org_by_pk(id: $orgId) {
    tasks(where: { _and: $filters }) {
      id
      title
      status
      dueDate
    }
    task_views(where: { key: { _eq: $taskViewKey } }) {
      id
      key
      tasksIds
    }
  }
}
```

### Create a Task View

```graphql
mutation CreateTaskView {
  insert_task_view_one(
    object: {
      orgId: "your-org-id"
      key: "my-custom-view"
      tasksIds: ["task-id-1", "task-id-2"]
    }
  ) {
    id
    key
    tasksIds
  }
}
```

### Update a Task View

```graphql
mutation UpdateTaskView {
  update_task_view(
    where: { orgId: { _eq: "your-org-id" }, key: { _eq: "my-custom-view" } }
    _set: { tasksIds: ["task-id-1", "task-id-2", "task-id-3"] }
  ) {
    returning {
      id
      key
      tasksIds
    }
  }
}
```

## Permissions

Task view access is controlled based on organization membership:

- Organization members can:
  - Create task views
  - View task views
  - Update task views they have access to
- Access requires one of the following roles:
  - Member
  - Admin
  - Owner

## Notes

- The combination of `orgId` and `key` must be unique
- Task views provide a way to create custom task organizations
- Views can be used to create different task groupings or filters
- Task IDs in the view must correspond to existing tasks in the organization
- Views can be shared among organization members
- The `key` field can be used to identify specific views (e.g., "backlog", "sprint", "done")
- Task views are useful for implementing different task management methodologies (e.g., Kanban, Scrum)
