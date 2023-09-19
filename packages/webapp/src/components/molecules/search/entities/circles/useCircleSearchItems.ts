import { CircleFragment } from '@gql'
import { searchItemTitleSeparator } from '@molecules/search/SearchResultItem'
import { getCircleAndParents } from '@shared/helpers/getCircleAndParents'
import { SearchTypes } from '@shared/model/search'
import { useStoreState } from '@store/hooks'
import { truthy } from '@utils/truthy'
import { useMemo } from 'react'
import { SearchItem } from '../../searchTypes'

export function useCircleSearchItems(
  circles?: CircleFragment[],
  excludeIds?: string[],
  singleMember?: boolean
): SearchItem[] {
  const circlesInStore = useStoreState((state) => state.org.circles)

  return useMemo(
    () =>
      (circlesInStore && (circles || circlesInStore))
        ?.map((circle): SearchItem | undefined => {
          // Exclude by id
          if (excludeIds?.includes(circle.id)) return

          // Get roles and ancestors
          const circleFull = getCircleAndParents(circlesInStore, circle.id)
          const role = circleFull[circleFull.length - 1]?.role

          // Exclude by singleMember property
          if (
            !role ||
            (singleMember !== undefined &&
              (role.singleMember || false) !== singleMember)
          ) {
            return
          }

          return {
            id: circle.id,
            text: role.name.toLowerCase(),
            type: SearchTypes.Circle,
            title: circleFull
              .map((cr) => cr.role.name)
              .join(searchItemTitleSeparator),
          }
        })
        .filter(truthy) || [],
    [circles, circlesInStore, excludeIds, singleMember]
  )
}