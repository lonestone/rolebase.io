# Meeting Recurring Entity

[Rolebase public API](../public-api.md)

The `meeting_recurring` entity represents a recurring meeting configuration in Rolebase. It defines the schedule, template, and settings for a series of meetings that occur on a regular basis.

## Fields

| Field Name        | Type               | Description                                | Default        |
| ----------------- | ------------------ | ------------------------------------------ | -------------- |
| `id`              | UUID               | Unique identifier for the recurring config | Auto-generated |
| `orgId`           | UUID               | Reference to the organization              | Required       |
| `circleId`        | UUID               | Reference to the circle                    | Required       |
| `templateId`      | UUID               | Reference to the meeting template          | Required       |
| `rrule`           | String             | iCal format recurrence rule                | Required       |
| `duration`        | smallint           | Meeting duration in minutes                | Required       |
| `scope`           | participants_scope | Configuration for participant selection    | Required       |
| `private`         | Boolean            | Whether meetings in series are private     | `false`        |
| `invitedReadonly` | Boolean            | Whether invited members are read-only      | `false`        |
| `videoConf`       | JSON               | Default video conferencing settings        | Optional       |
| `createdAt`       | Timestamp          | When the recurring config was created      | Current time   |

## Relationships

### Object Relationships

- `org`: The organization this recurring meeting belongs to
- `circle`: The circle this recurring meeting is associated with
- `template`: The meeting template used for each instance

### Array Relationships

- `meetings`: Individual meeting instances in the recurring series

## Recurrence Rule

The `rrule` field follows the iCalendar (RFC 5545) format and can specify:

- Frequency (daily, weekly, monthly, yearly)
- Interval between occurrences
- Specific days of the week
- Start and end dates
- Exclusion dates
- Count of occurrences

Example: `FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,WE,FR`

## Participant Scope

The `scope` field defines how participants are selected for each meeting instance:

- Circle members
- Specific roles or positions
- Custom participant lists
- Automatic attendee selection rules

## GraphQL Examples

### Query Recurring Meetings

```graphql
query MeetingRecurrings($orgId: uuid!) {
  meeting_recurring(where: { orgId: { _eq: $orgId } }) {
    id
    orgId
    circleId
    circle {
      role {
        name
        colorHue
      }
    }
    scope
    templateId
    template {
      title
      stepsConfig
    }
    rrule
    duration
    videoConf
    createdAt
    meetings {
      id
      recurringDate
    }
  }
}
```

### Create Recurring Meeting

```graphql
mutation CreateMeetingRecurring {
  insert_meeting_recurring_one(
    object: {
      orgId: "org-id"
      circleId: "circle-id"
      templateId: "template-id"
      rrule: "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO"
      duration: 60
      scope: { type: "circle_members" }
      private: false
      invitedReadonly: false
    }
  ) {
    id
    rrule
    duration
  }
}
```

### Update Recurring Meeting

```graphql
mutation UpdateMeetingRecurring($id: uuid!) {
  update_meeting_recurring_by_pk(
    pk_columns: { id: $id }
    _set: { rrule: "FREQ=WEEKLY;INTERVAL=2;BYDAY=TU,TH", duration: 90 }
  ) {
    id
    rrule
    duration
  }
}
```

## Permissions

Recurring meeting access is controlled based on circle and organization permissions:

- Circle participants can:
  - Create and manage recurring meetings in their circles
  - View and update recurring meeting settings
- Organization members can:
  - View non-private recurring meetings
  - Create recurring meetings if they have appropriate permissions
  - Manage recurring meetings they created

## Notes

- Each recurring meeting must have a template that defines its structure
- Meeting instances inherit settings from the recurring configuration
- Changes to the recurring configuration don't affect past meeting instances
- The `duration` field helps with scheduling and calendar integration
- Video conferencing settings can be customized per instance
- Participant scope allows for flexible attendee management
- The `rrule` field must follow the iCalendar specification
- Meeting instances are created automatically based on the recurrence rule
