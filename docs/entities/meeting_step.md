# Meeting Step Entity

[Rolebase public API](../public-api.md)

The `meeting_step` entity represents a specific step or agenda item within a meeting in Rolebase. Steps are used to structure meetings and track progress through different activities, such as check-ins, updates, discussions, and closing rounds.

## Fields

| Field Name     | Type                   | Description                          | Default        |
| -------------- | ---------------------- | ------------------------------------ | -------------- |
| `id`           | UUID                   | Unique identifier for the step       | Auto-generated |
| `meetingId`    | UUID                   | Reference to the meeting             | Required       |
| `stepConfigId` | String                 | Reference to step configuration      | Required       |
| `type`         | Meeting_Step_Type_Enum | Type of meeting step                 | Required       |
| `data`         | meeting_step_data      | Step-specific data and content       | Required       |
| `notes`        | String                 | Notes and documentation for the step | Required       |

## Relationships

### Object Relationships

- `meeting`: The meeting this step belongs to

## Step Types

Meeting steps can be of different types, including:

- `Tour`: Notes (yes it's a legacy name)
- `Threads`: Threads/topics
- `Checklist`: Circle checklist
- `Indicators`: Circle indicators
- `Tasks`: Tasks

## Step Data

The `data` field contains step-specific information and can include:

- Participant responses
- Discussion points
- Decisions made
- Action items
- Time tracking
- Custom fields based on step type

## GraphQL Examples

### Query Meeting Steps

```graphql
query GetMeetingSteps($meetingId: uuid!) {
  meeting_step(where: { meetingId: { _eq: $meetingId } }) {
    id
    type
    stepConfigId
    data
    notes
  }
}
```

### Create a Meeting Step

```graphql
mutation CreateMeetingStep($values: meeting_step_insert_input!) {
  insert_meeting_step_one(
    object: {
      meetingId: "meeting-id"
      stepConfigId: "step-1"
      type: Tour
      data: {}
      notes: "Opening check-in round"
    }
  ) {
    id
    type
    data
  }
}
```

### Update Step Data and Notes

```graphql
mutation UpdateMeetingStep($id: uuid!, $data: json!, $notes: String!) {
  update_meeting_step_by_pk(
    pk_columns: { id: $id }
    _set: { data: $data, notes: $notes }
  ) {
    id
    data
    notes
  }
}
```

## Permissions

Meeting step access is controlled based on meeting permissions:

- Circle participants can:
  - View and update steps in their circle's meetings
  - Add notes and modify step data
- Meeting attendees can:
  - View steps in meetings they're invited to
  - Update steps if not in read-only mode
- Organization members can view steps in non-private meetings

## Notes

- Steps are created based on the meeting template's `stepsConfig`
- Step data structure varies based on the step type (see [meeting_step.ts](/packages/shared/model/meeting_step.ts))
- Notes can be updated during and after the meeting
- Progress through steps is tracked via the meeting's `currentStepId`
