import Loading from '@atoms/Loading'
import TextError from '@atoms/TextError'
import { Box, Text } from '@chakra-ui/react'
import { useNewsFeed } from '@hooks/useNewsFeed'
import NewsItem from '@molecules/news/NewsItem'
import { NewsSeparator } from '@molecules/news/NewsSeparator'
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

      {news?.map((item, i) => (
        // Cards Separator
        <React.Fragment key={item.id}>
          {i !== 0 && <NewsSeparator />}
          <NewsItem item={item} />
        </React.Fragment>
      ))}

      <Box ref={bottomRef} textAlign="center">
        {loading && <Loading active size="sm" mt={10} />}
      </Box>
    </>
  )
}
