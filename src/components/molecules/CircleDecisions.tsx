import { subscribeDecisions } from '@api/entities/decisions'
import { Button, Text, useDisclosure } from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import DecisionEditModal from '@components/organisms/modals/DecisionEditModal'
import DecisionModal from '@components/organisms/modals/DecisionModal'
import { useOrgId } from '@hooks/useOrgId'
import useSubscription from '@hooks/useSubscription'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus } from 'react-icons/fi'
import DecisionItem from './DecisionItem'

interface Props {
  circleId: string
}

export default function CircleDecisions({ circleId }: Props) {
  const { t } = useTranslation()
  const orgId = useOrgId()

  // Subscribe to threads
  const {
    data: decisions,
    error,
    loading,
  } = useSubscription(
    orgId ? subscribeDecisions(orgId, undefined, circleId) : undefined
  )

  // Modals
  const [createdId, setCreatedId] = useState<string | undefined>()
  const showModal = useDisclosure()
  const editModal = useDisclosure()

  const handleOpen = (id: string) => {
    setCreatedId(id)
    showModal.onOpen()
  }

  return (
    <>
      <Button size="sm" mb={4} leftIcon={<FiPlus />} onClick={editModal.onOpen}>
        {t('molecules.CircleDecisions.create')}
      </Button>

      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      {decisions?.length === 0 && (
        <Text fontStyle="italic">{t('molecules.CircleDecisions.empty')}</Text>
      )}

      {decisions?.map((decision) => (
        <DecisionItem key={decision.id} decision={decision} />
      ))}

      {editModal.isOpen && (
        <DecisionEditModal
          defaultCircleId={circleId}
          isOpen
          onClose={editModal.onClose}
          onCreate={handleOpen}
        />
      )}

      {showModal.isOpen && createdId && (
        <DecisionModal id={createdId} isOpen onClose={showModal.onClose} />
      )}
    </>
  )
}
