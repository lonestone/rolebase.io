# Meeting Template Entity

[Rolebase public API](../public-api.md)

The `meeting_template` entity represents a reusable meeting configuration in Rolebase. Templates define the structure and flow of meetings, allowing organizations to standardize their meeting formats and ensure consistency across different sessions.

## Fields

| Field Name    | Type                  | Description                        | Default        |
| ------------- | --------------------- | ---------------------------------- | -------------- |
| `id`          | UUID                  | Unique identifier for the template | Auto-generated |
| `orgId`       | UUID                  | Reference to the organization      | Required       |
| `title`       | String                | Title of the template              | Required       |
| `stepsConfig` | [meeting_step_config] | Configuration for meeting steps    | Required       |

## Relationships

### Object Relationships

- `org`: The organization this template belongs to

## Step Configuration

The `stepsConfig` field is an array of step configurations that define the meeting structure. Each step configuration can include:

- Title and description
- Step type (check-in, updates, discussion, etc.)
- Duration guidelines
- Required fields and inputs
- Custom settings based on step type

## GraphQL Examples

### Query Meeting Templates

```graphql
query meetingTemplates($orgId: uuid!) {
  meeting_template(
    where: { orgId: { _eq: $orgId } }
    order_by: { title: asc }
  ) {
    id
    orgId
    title
    stepsConfig
  }
}
```

### Create Meeting Template

```graphql
mutation createMeetingTemplate($values: meeting_template_insert_input!) {
  insert_meeting_template_one(
    object: {
      orgId: "org-id"
      title: "Weekly Team Sync"
      stepsConfig: [
        { id: "step-1", type: Tour, title: "Notes" }
        { id: "step-2", type: Threads, title: "Topics" }
        { id: "step-3", type: Checklist, title: "Checklist" }
        { id: "step-4", type: Indicators, title: "Indicators" }
        { id: "step-5", type: Tasks, title: "Tasks" }
      ]
    }
  ) {
    id
    title
    stepsConfig
  }
}
```

### Update Meeting Template

```graphql
mutation updateMeetingTemplate($id: uuid!) {
  update_meeting_template_by_pk(
    pk_columns: { id: $id }
    _set: {
      title: "Updated Team Sync"
      stepsConfig: [{ id: "step-1", type: Tour, title: "Notes" }]
    }
  ) {
    id
    title
    stepsConfig
  }
}
```

### Delete Meeting Template

```graphql
mutation deleteMeetingTemplate($id: uuid!) {
  delete_meeting_template_by_pk(id: $id) {
    id
  }
}
```

## Permissions

Meeting template access is controlled based on organization membership:

- Organization members can:
  - View all templates in their organization
  - Create new templates
  - Update existing templates
  - Delete templates they have access to
- Permissions are inherited from organization member roles
- Templates are organization-wide resources

## Notes

- Templates can be used for both one-time and recurring meetings
- Step configurations define the default structure but can be customized per meeting
- Templates help maintain consistent meeting formats across teams
- The order of steps in `stepsConfig` determines the meeting flow
- Templates can be shared and reused within an organization
- Step durations are guidelines and can be adjusted during meetings
- Templates support various meeting types and methodologies
- Changes to a template don't affect existing meetings using that template
