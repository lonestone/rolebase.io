import { Box } from '@chakra-ui/react'
import Header, { headerHeight } from '@components/organisms/Header'
import useSuperAdmin from '@hooks/useSuperAdmin'
import useWindowSize from '@hooks/useWindowSize'
import { useStoreActions, useStoreState } from '@store/hooks'
import React, { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { CircleMemberProvider } from 'src/contexts/CircleMemberContext'

const LoggedLayout: React.FC = ({ children }) => {
  const claims = useStoreState((state) => state.auth.claims)
  const windowSize = useWindowSize()
  const location = useLocation()
  const superAdmin = useSuperAdmin()

  const orgIdFromPath =
    superAdmin && location.pathname.match(/^\/orgs\/([^/]+)(?:\/|$)/)?.[1]

  // Get orgs ids from user claims
  const orgIds = useMemo(() => {
    if (!claims) return
    const ids = Object.keys(claims)
      .map((value) => value?.match(/^org-(.+)$/)?.[1])
      .filter(Boolean) as string[]

    // Add orgId from path to orgIds if super admin
    if (orgIdFromPath && ids.indexOf(orgIdFromPath) === -1) {
      ids.push(orgIdFromPath)
    }

    return ids
  }, [claims, superAdmin, orgIdFromPath])

  // Subscribe to orgs
  const actions = useStoreActions((actions) => ({
    subscribeOrgs: actions.orgs.subscribe,
    unsubscribeOrgs: actions.orgs.unsubscribe,
  }))
  useEffect(() => {
    if (!orgIds) return
    actions.subscribeOrgs(orgIds)
    return () => {
      actions.unsubscribeOrgs()
    }
  }, [orgIds])

  return (
    <CircleMemberProvider>
      <Header />
      <Box h={0} minH={`${windowSize.height}px`} pt={`${headerHeight}px`}>
        {children}
      </Box>
    </CircleMemberProvider>
  )
}

export default LoggedLayout
