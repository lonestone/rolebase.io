import { enrichCirclesWithRoles } from '@shared/helpers/enrichCirclesWithRoles'
import { getCircleAndParents } from '@shared/helpers/getCircleAndParents'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'
import { SearchItem, SearchItemTypes } from '../../searchTypes'

export function useCircleMemberSearchItems(): SearchItem[] {
  const circles = useStoreState((state) => state.circles.entries)
  const members = useStoreState((state) => state.members.entries)

  // Roles data
  const roles = useStoreState((state) => state.roles.entries)

  // Circle members items
  return useMemo(
    () =>
      members && circles && roles
        ? circles.flatMap((circle) => {
            const circleRoles = enrichCirclesWithRoles(
              getCircleAndParents(circles, circle.id),
              roles
            )

            const circleRolesText =
              circleRoles
                .map((cr) => cr.role.name)
                .join(' > ')
                .toLowerCase() + ' '

            return circle.members
              .map((circleMember): SearchItem | undefined => {
                const member = members.find(
                  (m) => m.id === circleMember.memberId
                )
                if (!member) return
                return {
                  id: circleMember.id,
                  text: circleRolesText + member?.name.toLowerCase() || '?',
                  type: SearchItemTypes.CircleMember,
                  circle,
                  member,
                  circleMember,
                  circleRoles,
                }
              })
              .filter(Boolean) as SearchItem[]
          })
        : [],
    [members, circles, roles]
  )
}
