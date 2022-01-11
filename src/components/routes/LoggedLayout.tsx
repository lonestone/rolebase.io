import { Flex } from '@chakra-ui/react'
import Header from '@components/organisms/Header'
import { useStoreActions, useStoreState } from '@store/hooks'
import React, { useEffect, useMemo } from 'react'

const LoggedLayout: React.FC = ({ children }) => {
  const userId = useStoreState((state) => state.auth.user?.id)
  const claims = useStoreState((state) => state.auth.claims)

  const orgIds = useMemo(
    () =>
      claims &&
      (Object.keys(claims)
        .map((value) => value?.match(/^org-(.+)$/)?.[1])
        .filter(Boolean) as string[]),
    [claims]
  )

  const actions = useStoreActions((actions) => ({
    subscribeOrgs: actions.orgs.subscribe,
    unsubscribeOrgs: actions.orgs.unsubscribe,
  }))

  useEffect(() => {
    if (!userId || !orgIds?.length) return
    actions.subscribeOrgs(orgIds)
    return () => {
      actions.unsubscribeOrgs()
    }
  }, [userId, orgIds])

  return (
    <Flex h="0" minH="100vh" flexDirection="column">
      <Header />
      {children}
    </Flex>
  )
}

export default LoggedLayout
