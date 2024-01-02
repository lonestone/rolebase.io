import { Member_Scope_Enum, gql } from '@gql'
import { ParticipantsScope } from '@shared/model/participants'
import { adminRequest } from '@utils/adminRequest'
import { route } from '@utils/route'

export default route(async () => {
  const { meeting_recurring } = await adminRequest(GET_RECURRING_MEETINGS)

  for (const meeting of meeting_recurring) {
    const scope: ParticipantsScope = {
      // Circle participants
      circles:
        meeting.participantsScope === Member_Scope_Enum.None
          ? []
          : [
              {
                id: meeting.circleId,
                children:
                  meeting.participantsScope !== Member_Scope_Enum.CircleLeaders,
                excludeMembers: [],
              },
            ],
      // Additionnal members
      members: Array.isArray(meeting.participantsMembersIds)
        ? meeting.participantsMembersIds
        : [],
    }

    // Insert attendees
    try {
      await adminRequest(MIGRATE_RECURRING_MEETING, {
        id: meeting.id,
        scope,
      })
      console.log(`Migrated recurring meeting ${meeting.id}`)
    } catch (e) {
      console.log(
        `Error migrating recurring meeting ${meeting.id}: ${JSON.stringify(e)}`
      )
    }
  }

  return 'OK'
})

const GET_RECURRING_MEETINGS = gql(`
  query getOrgRecurringMeetingsForMigration {
    meeting_recurring {
      id
      circleId
      participantsScope
      participantsMembersIds
    }
  }
`)

const MIGRATE_RECURRING_MEETING = gql(`
  mutation migrateRecurringMeeting($id: uuid!, $scope: json!) {
    update_meeting_recurring_by_pk(
      pk_columns: { id: $id }
      _set: { scope: $scope }
    ) {
      id
    }
  }
`)
