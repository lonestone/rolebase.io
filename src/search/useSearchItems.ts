import { useMemo } from 'react'
import { useStoreState } from '../components/store/hooks'
import { getCircleRoles } from '../utils/getCircleRoles'
import { SearchItem, SearchItemTypes } from './types'

interface Options {
  members?: boolean
  circles?: boolean
  circleMembers?: boolean
}

export function useSearchItems(options: Options): SearchItem[] {
  const circles = useStoreState((state) => state.circles.entries)
  const members = useStoreState((state) => state.members.entries)
  const roles = useStoreState((state) => state.roles.entries)

  // Circles items
  const circleItems: SearchItem[] = useMemo(
    () =>
      circles && roles && options.circles
        ? circles.map((circle) => {
            const circleRoles = getCircleRoles(circles, roles, circle.id)
            return {
              text: circleRoles
                .map((cr) => cr.role?.name || '?')
                .join(' > ')
                .toLowerCase(),
              type: SearchItemTypes.Circle,
              circle,
              circleRoles,
            }
          })
        : [],
    [circles, roles]
  )

  // Members items
  const memberItems: SearchItem[] = useMemo(
    () =>
      members && options.members
        ? members.map((member) => ({
            text: member.name.toLowerCase(),
            type: SearchItemTypes.Member,
            member,
          }))
        : [],
    [members]
  )

  // Circle members items
  const circleMemberItems: SearchItem[] = useMemo(
    () =>
      members && circles && roles && options.circleMembers
        ? circles.flatMap((circle) => {
            const circleRoles = getCircleRoles(circles, roles, circle.id)
            const circleRolesText =
              circleRoles
                .map((cr) => cr.role?.name || '?')
                .join(' > ')
                .toLowerCase() + ' '
            return circle.members.map((circleMember) => {
              const member = members.find((m) => m.id === circleMember.memberId)
              return {
                text: circleRolesText + member?.name.toLowerCase() || '?',
                type: SearchItemTypes.CircleMember,
                circle,
                member,
                circleRoles,
              }
            })
          })
        : [],
    [members, circles, roles]
  )

  return useMemo(
    () => [...memberItems, ...circleItems, ...circleMemberItems],
    [memberItems, circleItems, circleMemberItems]
  )
}
