import Loading from '@atoms/Loading'
import TextError from '@atoms/TextError'
import { Box, Text } from '@chakra-ui/react'
import { useNewsFeed } from '@hooks/useNewsFeed'
import NewsList from '@molecules/news/NewsList'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  circleId: string
}

export default function CircleNews({ circleId }: Props) {
  const { t } = useTranslation()

  // Subscribe to news
  const { news, error, loading, bottomRef } = useNewsFeed(circleId)

  if (error) {
    return <TextError error={error} />
  }

  return (
    <>
      {news?.length === 0 && (
        <Text fontStyle="italic" textAlign="center">
          {t('DashboardNews.empty')}
        </Text>
      )}

      {news && <NewsList items={news} />}

      <Box ref={bottomRef} textAlign="center">
        {loading && <Loading active size="sm" mt={10} />}
      </Box>
    </>
  )
}
