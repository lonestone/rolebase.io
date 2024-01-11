import { CircleMemberContext } from '@/circle/contexts/CircleMemberContext'
import { getCircleMemberUrlSearch } from '@/circle/contexts/CircleMemberProvider'
import { useNormalClickHandler } from '@/common/hooks/useNormalClickHandler'
import { useCallback, useContext, useMemo } from 'react'
import { useOrgId } from '../../org/hooks/useOrgId'
import { usePathInOrg } from '../../org/hooks/usePathInOrg'

export default function useCircleMemberLink(
  circleId?: string,
  memberId?: string
) {
  const orgId = useOrgId()
  const circleMemberContext = useContext(CircleMemberContext)
  const path = usePathInOrg('roles')

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
