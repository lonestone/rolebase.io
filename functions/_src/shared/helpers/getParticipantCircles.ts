import { CircleFullFragment } from '@gql'

export function getParticipantCircles(
  memberId: string,
  circles: CircleFullFragment[]
): CircleFullFragment[] {
  // Circles where memberId is a direct member
  const directMemberCircles = circles.filter((circle) =>
    circle.members.some((member) => member.member.id === memberId)
  )

  const leaderCircles: CircleFullFragment[] = []

  // Circles where the member is a representant
  const participantCircles = directMemberCircles.reduce<CircleFullFragment[]>(
    (acc, { id, parentId, role: { parentLink } }) => {
      const parent = circles.find((c) => c.id === parentId)
      if (!parent) return acc

      // Find if there is a leader
      const hasLeader = circles.some(
        (circle) =>
          circle.parentId === id &&
          circle.role.parentLink &&
          circle.members.length > 0
      )
      if (hasLeader) return acc

      // Member represents its role in its parent if there is no leader
      acc.push(parent)

      if (parentLink) {
        // It represents its parent in grandparent
        const grandParent = circles.find((c) => c.id === parent.parentId)
        if (grandParent) {
          acc.push(grandParent)
        }
        leaderCircles.push(parent)
      }
      return acc
    },
    []
  )

  // Circles where the member is a representant of an invited circle
  const invitedCircles = circles.filter((circle) =>
    circle.invitedCircleLinks.some(({ invitedCircle }) =>
      leaderCircles.some((c) => invitedCircle.id === c.id)
    )
  )

  return [...directMemberCircles, ...participantCircles, ...invitedCircles]
}
