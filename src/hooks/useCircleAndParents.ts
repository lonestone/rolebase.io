import { CircleFullFragment } from '@gql'
import { getCircleAndParents } from '@shared/helpers/getCircleAndParents'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'

export default function useCircleAndParents(
  id: string
): CircleFullFragment[] | undefined {
  const circles = useStoreState((state) => state.circles.entries)

  return useMemo(() => {
    if (!circles) return undefined
    return getCircleAndParents(circles, id)
  }, [circles, id])
}
