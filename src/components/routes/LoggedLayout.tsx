import { replaceOldIds } from '@api/functions'
import { Box } from '@chakra-ui/react'
import Header, { headerHeight } from '@components/organisms/layout/Header'
import useWindowSize from '@hooks/useWindowSize'
import { useStoreActions } from '@store/hooks'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { CircleMemberProvider } from 'src/contexts/CircleMemberContext'
import { useSubscribeOrgsSubscription } from 'src/graphql.generated'

const LoggedLayout: React.FC = ({ children }) => {
  const windowSize = useWindowSize()
  const history = useHistory()

  // Subscribe to orgs
  const result = useSubscribeOrgsSubscription({
    variables: { archived: false },
  })
  const setSubscriptionResult = useStoreActions(
    (actions) => actions.orgs.setSubscriptionResult
  )
  useEffect(() => {
    setSubscriptionResult({
      entries: result.data?.org,
      loading: result.loading,
      error: result.error,
    })
  }, [result])

  // Redirect old urls
  // TODO: Delete this block in 2023
  useEffect(() => {
    const path = window.location.pathname + window.location.search
    // If path contains a Firebase id
    if (/[/=][a-zA-Z0-9]{20}([/&]|$)/.test(path)) {
      replaceOldIds({ text: path }).then((newPath) => {
        history.push(newPath)
      })
    }
  }, [])

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
