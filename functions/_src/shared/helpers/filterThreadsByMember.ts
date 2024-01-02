import { CircleFullFragment, ThreadFragment } from '@gql'
import { getParticipantCircles } from './getParticipantCircles'

export default function filterThreadsByMember<Entity extends ThreadFragment>(
  threads: Entity[],
  memberId?: string,
  circles?: CircleFullFragment[]
): Entity[] {
  if (!memberId) return threads

  // Circles where current member participate
  const memberCircles = circles && getParticipantCircles(memberId, circles)
  const memberCirclesIds = memberCircles?.map((c) => c.id)

  return threads.filter(
    ({ circleId, extra_members }) =>
      // Member is explicitly included
      extra_members.some((em) => em.memberId === memberId) ||
      // or member is included in a circle
      memberCirclesIds?.includes(circleId)
  )
}
