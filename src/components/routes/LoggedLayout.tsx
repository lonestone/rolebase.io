import { Box, Flex } from '@chakra-ui/react'
import Header, { headerHeight } from '@components/organisms/Header'
import { useStoreActions, useStoreState } from '@store/hooks'
import React, { useEffect, useMemo } from 'react'
import { CircleMemberProvider } from 'src/contexts/CircleMemberContext'

const LoggedLayout: React.FC = ({ children }) => {
  const userId = useStoreState((state) => state.auth.user?.id)
  const claims = useStoreState((state) => state.auth.claims)

  // Get orgs ids from user claims
  const orgIds = useMemo(
    () =>
      claims &&
      (Object.keys(claims)
        .map((value) => value?.match(/^org-(.+)$/)?.[1])
        .filter(Boolean) as string[]),
    [claims]
  )

  // Subscribe to orgs
  const actions = useStoreActions((actions) => ({
    subscribeOrgs: actions.orgs.subscribe,
    unsubscribeOrgs: actions.orgs.unsubscribe,
  }))
  useEffect(() => {
    if (!userId || !orgIds) return
    actions.subscribeOrgs(orgIds)
    return () => {
      actions.unsubscribeOrgs()
    }
  }, [userId, orgIds])

  return (
    <CircleMemberProvider>
      <Header />
      <Flex h="0" minH="100vh" flexDirection="column">
        <Box pt={`${headerHeight}px`} />
        {children}
      </Flex>
    </CircleMemberProvider>
  )
}

export default LoggedLayout
