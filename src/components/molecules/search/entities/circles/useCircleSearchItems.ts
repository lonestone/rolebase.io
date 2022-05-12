import { enrichCirclesWithRoles } from '@shared/helpers/enrichCirclesWithRoles'
import { getCircleAndParents } from '@shared/helpers/getCircleAndParents'
import { CircleEntry } from '@shared/model/circle'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'
import { SearchItem, SearchItemTypes } from '../../searchTypes'

export function useCircleSearchItems(
  circles?: CircleEntry[],
  excludeIds?: string[],
  singleMember?: boolean
): SearchItem[] {
  const circlesInStore = useStoreState((state) => state.circles.entries)
  const roles = useStoreState((state) => state.roles.entries)

  return useMemo(
    () =>
      ((roles && circlesInStore && (circles || circlesInStore))
        ?.map((circle): SearchItem | undefined => {
          // Exclude by id
          if (excludeIds?.includes(circle.id)) return

          // Get roles and ancestors
          const circleRoles = enrichCirclesWithRoles(
            getCircleAndParents(circlesInStore, circle.id),
            roles
          )

          // Exclude by singleMember property
          if (
            singleMember !== undefined &&
            (circleRoles[circleRoles.length - 1].role.singleMember || false) !==
              singleMember
          ) {
            return
          }

          return {
            id: circle.id,
            text: circleRoles
              .map((cr) => cr.role.name)
              .join(' > ')
              .toLowerCase(),
            type: SearchItemTypes.Circle,
            circle,
            circleRoles,
          }
        })
        .filter(Boolean) as SearchItem[]) || [],
    [circles, circlesInStore, roles, excludeIds, singleMember]
  )
}
