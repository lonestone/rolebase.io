import { Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useStoreActions, useStoreState } from '../store/hooks'
import Header from './Header'

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
    <Flex minHeight="100vh" flexDirection="column">
      <Header />
      {children}
    </Flex>
  )
}

export default LoggedLayout
