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
import NewsList from '@molecules/news/NewsList'
import CircleSearchButton from '@molecules/search/entities/circles/CircleSearchButton'
import CircleSearchInput from '@molecules/search/entities/circles/CircleSearchInput'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDownIcon } from 'src/icons'
import { useNewsFeed } from '../../../hooks/useNewsFeed'

export default function DashboardNews(boxProps: BoxProps) {
  const { t } = useTranslation()
  const [circleId, setCircleId] = useState<string | undefined>()

  // Subscribe to news
  const { news, error, loading, bottomRef } = useNewsFeed(circleId)

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

      {news && <NewsList items={news} showSeparatorTop />}

      <Box ref={bottomRef} textAlign="center">
        {loading && <Loading active size="sm" mt={10} />}
      </Box>
    </Stack>
  )
}
