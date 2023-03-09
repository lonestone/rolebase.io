import { Member_Scope_Enum } from '@gql'
import { getParticipantIdsByScope } from './getParticipantIdsByScope'
import { RouteError } from './route'

export async function getScopeMemberIdsDiff(
  orgId: string,
  circleId: string,
  oldScope: Member_Scope_Enum,
  newScope: Member_Scope_Enum
) {
  if (!orgId || !orgId || !oldScope || !newScope) {
    throw new RouteError(400, 'Bad request')
  }

  const oldScopeMemberIds = await getParticipantIdsByScope(
    orgId,
    circleId,
    oldScope
  )
  const newScopeMemberIds = await getParticipantIdsByScope(
    orgId,
    circleId,
    newScope
  )

  const newMemberIds = newScopeMemberIds.filter(
    (newScopeMemberId) => !oldScopeMemberIds.includes(newScopeMemberId)
  )

  return newMemberIds ?? []
}
