import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import { useCallback, useContext, useMemo } from 'react'
import {
  CircleMemberContext,
  getCircleMemberUrlSearch,
} from 'src/contexts/CircleMemberContext'
import { useOrgId } from './useOrgId'
import { usePathInOrg } from './usePathInOrg'

export default function useCircleMemberLink(
  circleId?: string,
  memberId?: string
) {
  const orgId = useOrgId()
  const circleMemberContext = useContext(CircleMemberContext)
  const path = usePathInOrg('')

  const goToCircle = useCallback(() => {
    circleMemberContext?.goTo(circleId, memberId)
  }, [circleId, memberId, circleMemberContext])

  const handleClick = useNormalClickHandler(goToCircle)

  return useMemo(
    () => ({
      to: `${path}${getCircleMemberUrlSearch(circleId, memberId)}`,
      onClick: handleClick,
    }),
    [circleId, memberId, orgId, handleClick]
  )
}
