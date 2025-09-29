import Loading from '@/common/atoms/Loading'
import TextError from '@/common/atoms/TextError'
import NewsList from '@/news/components/NewsList'
import { useNewsFeed } from '@/news/hooks/useNewsFeed'
import { Box, Card, CardBody, Text } from '@chakra-ui/react'
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
        <Card boxShadow="none">
          <CardBody>
            <Text fontStyle="italic">{t('CircleNews.empty')}</Text>
          </CardBody>
        </Card>
      )}

      {news && <NewsList items={news} />}

      <Box ref={bottomRef} textAlign="center">
        {loading && <Loading active size="sm" mt={10} />}
      </Box>
    </>
  )
}
