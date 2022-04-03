import { subscribeLastLogs } from '@api/entities/logs'
import { Container, Flex, Heading } from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import { Title } from '@components/atoms/Title'
import LogsList from '@components/molecules/LogsList'
import { useOrgId } from '@hooks/useOrgId'
import useSubscription from '@hooks/useSubscription'
import React from 'react'

export default function LogsPage() {
  const orgId = useOrgId()
  const subscribe = orgId ? subscribeLastLogs(orgId) : undefined
  const { data, error, loading } = useSubscription(subscribe)

  return (
    <Container maxW="xl" py={10}>
      <Title>Historique</Title>

      <Flex mb={5} alignItems="center" flexWrap="wrap">
        <Heading as="h1" size="md">
          Historique
        </Heading>
      </Flex>

      {loading && <Loading active center />}
      <TextErrors errors={[error]} />

      {data && <LogsList logs={data} />}
    </Container>
  )
}
