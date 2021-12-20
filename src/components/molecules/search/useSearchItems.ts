import { CircleEntry } from '@shared/circle'
import { enrichCirclesWithRoles } from '@shared/helpers/enrichCirclesWithRoles'
import { getCircleAndParents } from '@shared/helpers/getCircleAndParents'
import { MemberEntry } from '@shared/member'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'
import { SearchItem, SearchItemTypes } from './searchItems'

export interface SearchOptions {
  members?: boolean
  circles?: boolean
  circleMembers?: true
  excludeIds?: string[]
  membersOverride?: MemberEntry[]
  circlesOverride?: CircleEntry[]
}

export function useSearchItems(options: SearchOptions): SearchItem[] {
  const circlesInStore = useStoreState((state) => state.circles.entries)
  const circles = useMemo(
    () => options.circlesOverride || circlesInStore,
    [circlesInStore, options.circlesOverride]
  )

  const membersInStore = useStoreState((state) => state.members.entries)
  const members = useMemo(
    () => options.membersOverride || membersInStore,
    [membersInStore, options.membersOverride]
  )

  const roles = useStoreState((state) => state.roles.entries)

  // Circles items
  const circleItems: SearchItem[] = useMemo(
    () =>
      circles && roles && options.circles
        ? (circles
            .map((circle) => {
              if (options.excludeIds?.includes(circle.id)) return
              const circleRoles = enrichCirclesWithRoles(
                getCircleAndParents(circles, circle.id),
                roles
              )
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
            .filter(Boolean) as SearchItem[])
        : [],
    [circles, roles, options.circles, options.excludeIds]
  )

  // Members items
  const memberItems: SearchItem[] = useMemo(
    () =>
      members && options.members
        ? (members
            .map((member) => {
              if (options.excludeIds?.includes(member.id)) return
              return {
                text: member.name.toLowerCase(),
                type: SearchItemTypes.Member,
                member,
              }
            })
            .filter(Boolean) as SearchItem[])
        : [],
    [members, options.members, options.excludeIds]
  )

  // Circle members items
  const circleMemberItems: SearchItem[] = useMemo(
    () =>
      members && circles && roles && options.circleMembers
        ? circles.flatMap((circle) => {
            const circleRoles = enrichCirclesWithRoles(
              getCircleAndParents(circles, circle.id),
              roles
            )
            const circleRolesText =
              circleRoles
                .map((cr) => cr.role?.name || '?')
                .join(' > ')
                .toLowerCase() + ' '
            return circle.members
              .map((circleMember): SearchItem | undefined => {
                if (options.excludeIds?.includes(circleMember.id)) return
                const member = members.find(
                  (m) => m.id === circleMember.memberId
                )
                if (!member) return
                return {
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
    [members, circles, roles, options.circleMembers, options.excludeIds]
  )

  return useMemo(
    () => [...memberItems, ...circleItems, ...circleMemberItems],
    [memberItems, circleItems, circleMemberItems]
  )
}
