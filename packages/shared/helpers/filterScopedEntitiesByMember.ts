import { CircleFullFragment } from '../gql'
import { EntityWithScope } from '../model/participants'
import { getCircleParents } from './getCircleParents'
import { getParticipantCircles } from './getParticipantCircles'

export default function filterScopedEntitiesByMember<
  Entity extends EntityWithScope,
>(data: Entity[], memberId?: string, circles?: CircleFullFragment[]): Entity[] {
  if (!memberId) return data

  // Circles where current member participate
  const memberCircles = circles && getParticipantCircles(memberId, circles)
  const memberCirclesIds = memberCircles?.map((c) => c.id)

  // Parent circles of those circles
  const memberParentCircleIds =
    circles &&
    memberCircles?.flatMap((circleId) =>
      getCircleParents(circles, circleId).map((c) => c.id)
    )

  return data.filter(
    ({ scope }) =>
      // Member is explicitly included
      scope.members.includes(memberId) ||
      // or member is included in a circle
      scope.circles.some(
        ({ id, children, excludeMembers }) =>
          // Member is not explicitly excluded
          !excludeMembers.includes(memberId) &&
          // and member is included in the circle
          (memberCirclesIds?.includes(id) ||
            (children && memberParentCircleIds?.includes(id)))
      )
  )
}
