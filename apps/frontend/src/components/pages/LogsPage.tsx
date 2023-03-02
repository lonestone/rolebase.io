import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { Title } from '@atoms/Title'
import { Container, Flex, Heading } from '@chakra-ui/react'
import { useLastLogsSubscription } from '@gql'
import { useOrgId } from '@hooks/useOrgId'
import LogsList from '@molecules/log/LogsList'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function LogsPage() {
  const { t } = useTranslation()
  const orgId = useOrgId()

  // Subscribe to logs
  const { data, error, loading } = useLastLogsSubscription({
    skip: !orgId,
    variables: { orgId: orgId! },
  })
  const logs = data?.log

  return (
    <Container maxW="xl" py={10}>
      <Title>{t('LogsPage.heading')}</Title>

      <Flex mb={5} alignItems="center" flexWrap="wrap">
        <Heading as="h1" size="md">
          {t('LogsPage.heading')}
        </Heading>
      </Flex>

      {loading && <Loading active center />}
      <TextErrors errors={[error]} />

      {logs && <LogsList logs={logs} />}
    </Container>
  )
}
