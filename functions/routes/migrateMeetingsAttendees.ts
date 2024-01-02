import { Meeting_Attendee_Insert_Input, Member_Scope_Enum, gql } from '@gql'
import { getAllCircleMembersParticipants } from '@shared/helpers/getAllCircleMembersParticipants'
import { getCircleParticipants } from '@shared/helpers/getCircleParticipants'
import { adminRequest } from '@utils/adminRequest'
import { route } from '@utils/route'
import uniqBy from 'lodash.uniqby'

export default route(async () => {
  const orgs = await adminRequest(GET_ORGS)

  for (const org of orgs.org) {
    const { org_by_pk: meetingsOrg } = await adminRequest(GET_MEETINGS, {
      orgId: org.id,
    })
    if (!meetingsOrg) continue

    const { members, circles, meetings } = meetingsOrg

    for (const meeting of meetings || []) {
      const attendees: Meeting_Attendee_Insert_Input[] = []

      if (meeting.attendees) {
        // Attendees are already set (meeting has started)
        attendees.push(
          ...meeting.attendees.map(
            (attendee): Meeting_Attendee_Insert_Input => ({
              meetingId: meeting.id,
              memberId: attendee.memberId,
              present: attendee.present,
            })
          )
        )
      } else {
        if (meeting.participantsScope === Member_Scope_Enum.Organization) {
          // All members of the organization
          attendees.push(
            ...members.map(
              (member): Meeting_Attendee_Insert_Input => ({
                meetingId: meeting.id,
                memberId: member.id,
              })
            )
          )
        } else if (
          meeting.participantsScope === Member_Scope_Enum.CircleLeaders
        ) {
          // All participants of the circle
          attendees.push(
            ...getCircleParticipants(meeting.circleId, circles).map(
              (p): Meeting_Attendee_Insert_Input => ({
                meetingId: meeting.id,
                memberId: p.member.id,
              })
            )
          )
        } else if (
          meeting.participantsScope === Member_Scope_Enum.CircleMembers
        ) {
          // All participants of the circle and of its children
          attendees.push(
            ...getAllCircleMembersParticipants(meeting.circleId, circles).map(
              (p): Meeting_Attendee_Insert_Input => ({
                meetingId: meeting.id,
                memberId: p.member.id,
              })
            )
          )
        }

        if (Array.isArray(meeting.participantsMembersIds)) {
          // Additionnal members
          attendees.push(
            ...meeting.participantsMembersIds.map(
              (memberId): Meeting_Attendee_Insert_Input => ({
                meetingId: meeting.id,
                memberId,
              })
            )
          )
        }
      }

      // Insert attendees
      if (attendees.length) {
        try {
          await adminRequest(INSERT_MEETING_ATTENDEES, {
            attendees: uniqBy(attendees, (a) => a.memberId),
          })
          console.log(`Migrated attendees of meeting ${meeting.id}`)
        } catch (e) {
          console.log(
            `Error migrating attendees of meeting ${
              meeting.id
            }: ${JSON.stringify(e)}`
          )
        }
      }
    }
    console.log(`Migrated meetings of org ${org.id}`)
  }

  return 'OK'
})

const GET_ORGS = gql(`
  query getOrgsForMigration {
    org {
      id
    }
  }
`)

const GET_MEETINGS = gql(`
  query getOrgMeetingsForMigration($orgId: uuid!) {
    org_by_pk(id: $orgId) {
      circles(where: { archived: { _eq: false } }) {
        ...CircleFull
      }
      members(where: { archived: { _eq: false } }) {
        id
      }
      meetings {
        id
        attendees
        circleId
        participantsScope
        participantsMembersIds
      }
    }
  }
`)

const INSERT_MEETING_ATTENDEES = gql(`
  mutation insertMeetingAttendees($attendees: [meeting_attendee_insert_input!]!) {
    insert_meeting_attendee(objects: $attendees) {
      returning {
        id
      }
    }
  }
`)
