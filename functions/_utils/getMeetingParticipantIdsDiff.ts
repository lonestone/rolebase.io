import { MeetingFragment, MeetingRecurringFragment } from '@gql'
import { getScopeMemberIdsDiff } from '@utils/getScopeMemberIdsDiff'
import { RouteError } from '@utils/route'

export async function getMeetingParticipantIdsDiff<
  T extends Partial<MeetingFragment> | Partial<MeetingRecurringFragment>
>(oldMeeting: T, newMeeting: T) {
  if (!oldMeeting || !newMeeting) {
    throw new RouteError(400, 'Bad request')
  }

  let participantIdsDiff: string[] = []

  // Get participants diff between old and new participantsScope
  if (newMeeting.participantsScope !== oldMeeting.participantsScope) {
    const newMemberIdsFromScopeDiff = await getScopeMemberIdsDiff(
      newMeeting.orgId!,
      newMeeting.circleId!,
      oldMeeting.participantsScope!,
      newMeeting.participantsScope!
    )

    participantIdsDiff.push(...newMemberIdsFromScopeDiff)
  }

  // Get participants diff between old and new participantsMembersIds
  newMeeting.participantsMembersIds &&
    newMeeting.participantsMembersIds.every((id: string) => {
      if (
        oldMeeting.participantsMembersIds &&
        !oldMeeting.participantsMembersIds.includes(id)
      ) {
        participantIdsDiff.push(id)
      }
    })

  const newRecipientIds = [...new Set(participantIdsDiff)]
  return newRecipientIds
}
