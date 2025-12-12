import { Button, Heading, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { trpc } from 'src/trpc'
import Loading from '../atoms/Loading'
import { Title } from '../atoms/Title'

export default function SuperAdminPage() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  // Reindex all entities in search engine
  const handleSearchReindex = async () => {
    setLoading(true)
    await trpc.search.reindexAll.mutate()
    setLoading(false)
  }

  // Recompute circle_participant_cache
  const handleRecomputeCircleParticipantCache = async () => {
    setLoading(true)
    await trpc.participants.recomputeCache.mutate()
    setLoading(false)
  }

  return (
    <>
      <Title>{t('SuperAdminPage.heading')}</Title>
      {loading && <Loading active center />}

      <Heading size="lg" mb={10}>
        {t('SuperAdminPage.heading')}
      </Heading>

      <VStack align="start">
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
    </>
  )
}
