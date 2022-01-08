import { Flex } from '@chakra-ui/react'
import Header from '@components/organisms/Header'
import { useStoreActions, useStoreState } from '@store/hooks'
import React, { useEffect } from 'react'

const LoggedLayout: React.FC = ({ children }) => {
  const userId = useStoreState((state) => state.auth.user?.id)

  const actions = useStoreActions((actions) => ({
    subscribeOrgs: actions.orgs.subscribe,
    unsubscribeOrgs: actions.orgs.unsubscribe,
  }))

  useEffect(() => {
    if (!userId) return
    actions.subscribeOrgs({ parentId: userId })
    return () => {
      actions.unsubscribeOrgs()
    }
  }, [userId])

  return (
    <Flex h="0" minH="100vh" flexDirection="column">
      <Header />
      {children}
    </Flex>
  )
}

export default LoggedLayout
