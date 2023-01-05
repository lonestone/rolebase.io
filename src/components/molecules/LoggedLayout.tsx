import { replaceOldIds } from '@api/functions'
import { Box } from '@chakra-ui/react'
import Sidebar from '@components/organisms/layout/Sidebar'
import useWindowSize from '@hooks/useWindowSize'
import { useStoreActions } from '@store/hooks'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CircleMemberProvider } from 'src/contexts/CircleMemberContext'
import { SidebarContext } from 'src/contexts/SidebarContext'
import { useSubscribeOrgsSubscription } from 'src/graphql.generated'

interface Props {
  children: React.ReactNode
}

export default function LoggedLayout({ children }: Props) {
  const windowSize = useWindowSize()
  const navigate = useNavigate()
  const sidebarContext = useContext(SidebarContext)

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
        navigate(newPath)
      })
    }
  }, [])

  return (
    <CircleMemberProvider>
      <Sidebar />
      <Box
        h={0}
        minH={`${windowSize.height}px`}
        pl={sidebarContext?.width ? `${sidebarContext?.width}px` : 0}
        pt={sidebarContext?.height ? `${sidebarContext?.height}px` : 0}
      >
        {children}
      </Box>
    </CircleMemberProvider>
  )
}
