import Loading from '@/common/atoms/Loading'
import { Button, Heading, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { trpc } from 'src/trpc'

export default function AdminMaintenancePage() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  const handleSearchReindex = async () => {
    setLoading(true)
    await trpc.search.reindexAll.mutate()
    setLoading(false)
  }

  const handleRecomputeCircleParticipantCache = async () => {
    setLoading(true)
    await trpc.participants.recomputeCache.mutate()
    setLoading(false)
  }

  return (
    <>
      <Heading size="md" mb={6}>
        {t('SuperAdmin.maintenance.heading')}
      </Heading>

      {loading && <Loading active center />}

      <VStack align="start">
        <Button
          size="sm"
          colorScheme="orange"
          isDisabled={loading}
          onClick={handleSearchReindex}
        >
          {t('SuperAdmin.maintenance.searchReindex')}
        </Button>

        <Button
          size="sm"
          colorScheme="orange"
          isDisabled={loading}
          onClick={handleRecomputeCircleParticipantCache}
        >
          {t('SuperAdmin.maintenance.recomputeCache')}
        </Button>
      </VStack>
    </>
  )
}
