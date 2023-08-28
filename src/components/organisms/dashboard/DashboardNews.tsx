import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import {
  Box,
  BoxProps,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useLastNewsQuery } from '@gql'
import { useOrgId } from '@hooks/useOrgId'
import CircleSearchButton from '@molecules/search/entities/circles/CircleSearchButton'
import CircleSearchInput from '@molecules/search/entities/circles/CircleSearchInput'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDownIcon } from 'src/icons'
import DashboardNewsDecision from './DashboardNewsDecision'
import DashboardNewsMeeting from './DashboardNewsMeeting'
import DashboardNewsThread from './DashboardNewsThread'

const limit = 8

export default function DashboardNews(boxProps: BoxProps) {
  const { t } = useTranslation()
  const orgId = useOrgId()
  const [circleId, setCircleId] = useState<string | undefined>()

  const bottomRef = useRef(null)

  // Subscribe to news
  const { data, error, loading, fetchMore } = useLastNewsQuery({
    skip: !orgId && !circleId,
    variables: {
      where: circleId
        ? { circleId: { _eq: circleId } }
        : { orgId: { _eq: orgId } },
      limit,
    },
    fetchPolicy: 'cache-and-network',
    initialFetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  })
  const news = data?.news
  const count = data?.news_aggregate.aggregate?.count

  // Load more news when user reaches bottom of page
  useEffect(() => {
    if (!bottomRef.current || !news || news.length === count || loading) return

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchMore({
          variables: {
            offset: news.length,
          },
          // Update cache with new news
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              return previousResult
            }
            return {
              ...fetchMoreResult,
              news: [...previousResult.news, ...fetchMoreResult.news],
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
  }, [news, loading])

  return (
    <Stack spacing={0} {...boxProps}>
      <Card>
        <CardHeader
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading as="h2" size="md">
            {t('DashboardNews.heading')}
          </Heading>

          <ButtonGroup size="sm" variant="outline" spacing={2}>
            {circleId ? (
              <CircleSearchInput
                className="userflow-tasks-role"
                value={circleId}
                placeholder={t('DashboardNews.circle')}
                maxW="170px"
                onChange={setCircleId}
                onClear={() => setCircleId(undefined)}
              />
            ) : (
              <CircleSearchButton
                className="userflow-tasks-role"
                rightIcon={<ChevronDownIcon size="1em" />}
                fontWeight="normal"
                onSelect={setCircleId}
              >
                {t('DashboardNews.circle')}
              </CircleSearchButton>
            )}
          </ButtonGroup>
        </CardHeader>

        {error && (
          <CardBody p={4} pt={0}>
            <TextErrors errors={[error]} />
          </CardBody>
        )}
      </Card>

      {news?.length === 0 && (
        <Text fontStyle="italic" textAlign="center" mt={10}>
          {t('DashboardNews.empty')}
        </Text>
      )}

      {news?.map((item, i) => (
        // Cards Separator
        <React.Fragment key={item.id}>
          <Box
            h={10}
            // Card padding + avatar size / 2 - border width / 2
            ml="calc(var(--chakra-sizes-5) + 18px - 1px)"
            borderLeft="2px"
            borderColor="gray.200"
            _dark={{ borderColor: 'gray.700' }}
          />

          {item.thread && <DashboardNewsThread thread={item.thread} />}
          {item.meeting && <DashboardNewsMeeting meeting={item.meeting} />}
          {item.decision && <DashboardNewsDecision decision={item.decision} />}
        </React.Fragment>
      ))}

      <Box ref={bottomRef} textAlign="center">
        {loading && <Loading active size="sm" mt={10} />}
      </Box>
    </Stack>
  )
}
