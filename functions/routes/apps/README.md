# Apps

## Calendars

User can select:

- Calendars to use for availability
- Calendar to sync with meetings

### Synchronization

How to identify a Rolebase event: include "#rolebase" in subject.

Sync start:

- Delete Rolebase events from calendar
- Delete Rolebase recurring events from calendar
- Create events from Rolebase meetings
- Create events from Rolebase recurring meetings

Listen to Rolebase meetings' changes:

- Create: Create event
- Update: Get event by date and meeting URL, then update. If it doesn't exist, create it
- Delete: Get event by date and meeting URL, then delete

Listen to app events:

- Create:
  - If identified as a Rolebase event, extract role and template name from subject
  - If role and template exist and body doesn't include a meeting URL, create meeting
- Update: If identified as a Rolebase event, update meeting (create if doesn't exist)
- Delete: If identified as a Rolebase event, archive meeting

Remove/change selected calendar for sync:

- Stop sync subscription
- Delete Rolebase events from calendar
- Delete Rolebase recurring events from calendar
