import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { Title } from '@atoms/Title'
import { Box, Container, Flex, Heading } from '@chakra-ui/react'
import { useLastLogsQuery } from '@gql'
import { useOrgId } from '@hooks/useOrgId'
import LogsList from '@molecules/log/LogsList'
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

const limit = 50

export default function LogsPage() {
  const { t } = useTranslation()
  const orgId = useOrgId()
  const bottomRef = useRef(null)

  // Subscribe to logs
  const { data, error, loading, fetchMore } = useLastLogsQuery({
    skip: !orgId,
    variables: { orgId: orgId!, limit },
    fetchPolicy: 'cache-and-network',
    initialFetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  })
  const logs = data?.log
  const count = data?.log_aggregate.aggregate?.count

  // Load more logs when user reaches bottom of page
  useEffect(() => {
    if (!bottomRef.current || !logs || logs.length === count || loading) return

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchMore({
          variables: {
            offset: logs.length,
          },
          // Update cache with new logs
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              return previousResult
            }
            return {
              ...fetchMoreResult,
              log: [...previousResult.log, ...fetchMoreResult.log],
            }
          },
        })
      }
    }, options)

    observer.observe(bottomRef.current)

    return () => {
      if (!bottomRef.current) return
      observer.unobserve(bottomRef.current)
    }
  }, [logs, loading])

  return (
    <Box p={5}>
      <Title>{t('LogsPage.heading')}</Title>

      <Flex mb={16} alignItems="center" flexWrap="wrap">
        <Heading as="h1" size="md">
          {t('LogsPage.heading')}
        </Heading>
      </Flex>

      <Container maxW="xl" p={0} pb={16}>
        {logs && <LogsList logs={logs} />}

        <Box ref={bottomRef} mt={3} textAlign="center">
          {loading && <Loading active />}
        </Box>

        <TextErrors errors={[error]} />
      </Container>
    </Box>
  )
}
