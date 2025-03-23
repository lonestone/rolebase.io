# Meeting Entity

[Rolebase public API](../public-api.md)

The `meeting` entity represents a scheduled meeting within a circle in Rolebase. Meetings can be one-time events or part of a recurring series. They support structured steps, attendee tracking, and video conferencing integration.

## Fields

| Field Name         | Type                  | Description                           | Default           |
| ------------------ | --------------------- | ------------------------------------- | ----------------- |
| `id`               | UUID                  | Unique identifier for the meeting     | Auto-generated    |
| `orgId`            | UUID                  | Reference to the organization         | Required          |
| `circleId`         | UUID                  | Reference to the circle               | Required          |
| `title`            | String                | Title of the meeting                  | Required          |
| `summary`          | String                | Summary or notes from the meeting     | Required          |
| `startDate`        | Timestamp             | When the meeting starts               | Required          |
| `endDate`          | Timestamp             | When the meeting ends                 | Required          |
| `createdAt`        | Timestamp             | When the meeting was created          | Current timestamp |
| `ended`            | Boolean               | Whether the meeting has ended         | `false`           |
| `archived`         | Boolean               | Whether the meeting is archived       | `false`           |
| `private`          | Boolean               | Whether the meeting is private        | `false`           |
| `invitedReadonly`  | Boolean               | Whether invited members are read-only | `false`           |
| `currentStepId`    | UUID                  | ID of the current active step         | Optional          |
| `stepsConfig`      | [meeting_step_config] | Configuration for meeting steps       | Required          |
| `videoConf`        | videoconf             | Video conferencing details            | Optional          |
| `recurringId`      | UUID                  | Reference to recurring meeting config | Optional          |
| `recurringDate`    | Timestamp             | Date in recurring series              | Optional          |
| `lastUpdateSource` | String                | Source of last update                 | Optional          |

## Relationships

### Object Relationships

- `org`: The organization this meeting belongs to
- `circle`: The circle this meeting is associated with
- `recurring`: The recurring meeting configuration (if part of a series)

### Array Relationships

- `meeting_attendees`: Members attending the meeting
- `steps`: Steps or agenda items in the meeting

## Recurring Meetings

Recurring meetings are managed through the [meeting_recurring](./meeting_recurring.md) entity, which includes:

- `rrule`: Recurrence rule in iCal format
- `duration`: Meeting duration in minutes
- `scope`: Participant scope configuration
- `template`: Meeting template with default configuration
- `videoConf`: Default video conferencing settings

## Meeting Steps

Meeting steps define the structure and flow of the meeting. Each step has:

- `id`: Unique identifier
- `meetingId`: Reference to the meeting
- `data`: Step-specific data and content
- Configuration defined in `stepsConfig`

## GraphQL Examples

### Query Meetings

```graphql
query GetMeetings($orgId: uuid!) {
  meeting(where: { archived: { _eq: false }, orgId: { _eq: $orgId } }) {
    id
    title
    startDate
    endDate
    ended
    circle {
      role {
        name
      }
    }
    meeting_attendees {
      member {
        name
      }
      present
    }
    steps {
      id
      data
    }
    videoConf
  }
}
```

### Get a Specific Meeting

```graphql
query GetMeeting($id: uuid!) {
  meeting_by_pk(id: $id) {
    id
    title
    startDate
    endDate
    circle {
      role {
        name
      }
    }
  }
}
```

### Create a Meeting

```graphql
mutation CreateMeeting {
  insert_meeting_one(
    object: {
      orgId: "your-org-id"
      circleId: "circle-id"
      title: "Weekly Team Sync"
      startDate: "2024-01-15T10:00:00Z"
      endDate: "2024-01-15T11:00:00Z"
      summary: "Team sync meeting"
      stepsConfig: [
        { id: "step-1", type: Tour, title: "Notes" }
        { id: "step-2", type: Threads, title: "Topics" }
        { id: "step-3", type: Checklist, title: "Checklist" }
        { id: "step-4", type: Indicators, title: "Indicators" }
        { id: "step-5", type: Tasks, title: "Tasks" }
      ]
      private: false
      invitedReadonly: false
      meeting_attendees: {
        data: [{ memberId: "member-id-1" }, { memberId: "member-id-2" }]
      }
    }
  ) {
    id
    title
    startDate
  }
}
```

### Create a Recurring Meeting

```graphql
mutation CreateRecurringMeeting {
  insert_meeting_recurring_one(
    object: {
      orgId: "your-org-id"
      circleId: "circle-id"
      templateId: "template-id"
      rrule: "FREQ=WEEKLY;BYDAY=MO"
      duration: 60
      private: false
      invitedReadonly: false
      scope: "CIRCLE"
    }
  ) {
    id
    rrule
  }
}
```

### Update Meeting Status

```graphql
mutation UpdateMeeting {
  update_meeting_by_pk(
    pk_columns: { id: "meeting-id" }
    _set: { ended: true, summary: "Meeting notes and outcomes..." }
  ) {
    id
    ended
    summary
  }
}
```

## Permissions

Meeting access is controlled by several factors:

- Circle membership
- Meeting privacy settings
- Organization member role
- Invited attendee status
- Read-only settings

The following rules apply:

- Circle participants can access and manage their circle's meetings
- Private meetings are only visible to circle participants and invited attendees
- Organization members can access non-private meetings
- Invited attendees can participate based on read-only settings
- Meeting creation and management requires appropriate circle permissions

## Notes

- Meetings support structured agendas through steps configuration
- Video conferencing can be integrated with various providers
- Recurring meetings help manage regular team events
- Attendance tracking helps monitor participation
- Meeting summaries provide documentation of outcomes
- Steps can be customized based on meeting type and needs
- The combination of privacy and read-only settings enables flexible access control
