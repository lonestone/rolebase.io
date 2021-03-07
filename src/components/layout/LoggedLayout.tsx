import { Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useStoreActions } from '../store/hooks'
import Header from './Header'

const LoggedLayout: React.FC = ({ children }) => {
  const actions = useStoreActions((actions) => ({
    subscribeOrgs: actions.orgs.subscribe,
    unsubscribeOrgs: actions.orgs.unsubscribe,
  }))

  useEffect(() => {
    actions.subscribeOrgs({ orgId: '' })
    return () => {
      actions.unsubscribeOrgs()
    }
  }, [])

  return (
    <Flex minHeight="100vh" flexDirection="column">
      <Header />
      {children}
    </Flex>
  )
}

export default LoggedLayout
