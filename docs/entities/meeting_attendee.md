# Meeting Attendee Entity

[Rolebase public API](../public-api.md)

The `meeting_attendee` entity represents a member's participation in a meeting in Rolebase. It tracks attendance, presence status, and notification state for each meeting participant.

## Fields

| Field Name      | Type    | Description                                   | Default        |
| --------------- | ------- | --------------------------------------------- | -------------- |
| `id`            | UUID    | Unique identifier for the attendee record     | Auto-generated |
| `meetingId`     | UUID    | Reference to the meeting                      | Required       |
| `memberId`      | UUID    | Reference to the member                       | Required       |
| `present`       | Boolean | Whether the member is present in the meeting  | Optional       |
| `startNotified` | Boolean | Whether start notification was sent to member | `false`        |

## Relationships

### Object Relationships

- `meeting`: The meeting this attendance record belongs to
- `member`: The member attending the meeting

## Constraints

- Primary key on `id`
- Unique constraint on (`meetingId`, `memberId`) combination
- Foreign key constraints:
  - `meetingId` references `meeting.id` (cascade delete)
  - `memberId` references `member.id` (cascade delete)

## GraphQL Examples

### Query Meeting Attendees

```graphql
query GetMeetingAttendees($meetingId: uuid!) {
  meeting_attendee(where: { meetingId: { _eq: $meetingId } }) {
    id
    memberId
    present
    startNotified
    member {
      name
      picture
    }
  }
}
```

### Create Meeting Attendee

```graphql
mutation CreateMeetingAttendee {
  insert_meeting_attendee_one(
    object: {
      meetingId: "meeting-id"
      memberId: "member-id"
      present: false
      startNotified: false
    }
  ) {
    id
    present
    startNotified
  }
}
```

### Update Attendance Status

```graphql
mutation UpdateMeetingAttendee($id: uuid!) {
  update_meeting_attendee_by_pk(
    pk_columns: { id: $id }
    _set: { present: true }
  ) {
    id
    present
  }
}
```

### Delete Meeting Attendee

```graphql
mutation DeleteMeetingAttendee($id: uuid!) {
  delete_meeting_attendee_by_pk(id: $id) {
    id
  }
}
```

## Permissions

Meeting attendee access is controlled based on meeting permissions:

- Circle participants can:
  - Add and remove attendees in their circle's meetings
  - Update attendance status
- Meeting attendees can:
  - View other attendees in meetings they're invited to
  - Update their own attendance status if not in read-only mode
- Organization members can:
  - View attendees in non-private meetings
  - Add/remove attendees if they have appropriate permissions

## Notes

- Each member can only be added once to a meeting (enforced by unique constraint)
- Attendance tracking (`present` field) is optional and can be updated during the meeting
- Start notifications are tracked to prevent duplicate notifications
- Deleting a meeting or member automatically removes related attendance records
- Attendee records are used for:
  - Meeting participation tracking
  - Notification management
  - Access control to meeting content
  - Attendance reporting
