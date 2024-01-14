import { Button, Container, Heading, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  recomputeCircleParticipantCache,
  searchReindexAll,
} from '../../user/api/user_functions'
import Loading from '../atoms/Loading'

export default function SuperAdminPage() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  // Reindex all entities in search engine
  const handleSearchReindex = async () => {
    setLoading(true)
    await searchReindexAll({})
    setLoading(false)
  }

  // Recompute circle_participant_cache
  const handleRecomputeCircleParticipantCache = async () => {
    setLoading(true)
    await recomputeCircleParticipantCache({})
    setLoading(false)
  }

  return (
    <Container maxW="md" mt="60px">
      {loading && <Loading active center />}

      <Heading size="md" mb={10}>
        {t('SuperAdminPage.heading')}
      </Heading>

      <VStack mb={10} align="start">
        <Button
          size="sm"
          colorScheme="orange"
          isDisabled={loading}
          onClick={handleSearchReindex}
        >
          {t('SuperAdminPage.searchReindex')}
        </Button>

        <Button
          size="sm"
          colorScheme="orange"
          isDisabled={loading}
          onClick={handleRecomputeCircleParticipantCache}
        >
          {t('SuperAdminPage.recomputeCircleParticipantCache')}
        </Button>
      </VStack>
    </Container>
  )
}
