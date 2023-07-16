import DayLabel from '@atoms/DayLabel'
import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
} from '@chakra-ui/react'
import { useLastNewsQuery } from '@gql'
import { useOrgId } from '@hooks/useOrgId'
import DecisionItem from '@molecules/DecisionItem'
import MeetingItem from '@molecules/meeting/MeetingItem'
import ThreadItem from '@molecules/thread/ThreadItem'
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

const limit = 20

export default function DashboardNews() {
  const { t } = useTranslation()
  const orgId = useOrgId()

  const bottomRef = useRef(null)

  // Subscribe to news
  const { data, error, loading, fetchMore } = useLastNewsQuery({
    skip: !orgId,
    variables: { orgId: orgId!, limit },
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
    <Card>
      <CardHeader>
        <Heading as="h2" size="md">
          {t('DashboardNews.heading')}
        </Heading>
      </CardHeader>

      <CardBody p={4} pt={0}>
        <Stack spacing={1}>
          {news?.map((item, i) => (
            <React.Fragment key={item.id}>
              <DayLabel
                date={item.createdAt!}
                prevDate={news[i - 1]?.createdAt || undefined}
                mt={i === 0 ? 0 : 4}
              />

              {item.thread && <ThreadItem thread={item.thread} showCircle />}

              {item.meeting && (
                <MeetingItem meeting={item.meeting} showCircle showIcon />
              )}

              {item.decision && (
                <DecisionItem decision={item.decision} showCircle showIcon />
              )}
            </React.Fragment>
          ))}
        </Stack>

        <Box ref={bottomRef} textAlign="center">
          {loading && <Loading active />}
        </Box>

        <TextErrors errors={[error]} />
      </CardBody>
    </Card>
  )
}
