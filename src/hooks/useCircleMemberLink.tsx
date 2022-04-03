import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import { useStoreState } from '@store/hooks'
import { useCallback, useContext, useMemo } from 'react'
import {
  CircleMemberContext,
  getCircleMemberUrlSearch,
} from 'src/contexts/CircleMemberContext'

export default function useCircleMemberLink(
  circleId?: string,
  memberId?: string
) {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const circleMemberContext = useContext(CircleMemberContext)

  const goToCircle = useCallback(() => {
    circleMemberContext?.goTo(circleId, memberId)
  }, [circleId, memberId, circleMemberContext])

  const handleClick = useNormalClickHandler(goToCircle)

  return useMemo(
    () => ({
      to: `/orgs/${orgId}${getCircleMemberUrlSearch(circleId, memberId)}`,
      onClick: handleClick,
    }),
    [circleId, memberId, orgId, handleClick]
  )
}
