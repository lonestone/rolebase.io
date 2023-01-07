import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { Button, Text, useDisclosure } from '@chakra-ui/react'
import { useSubscribeCircleDecisionsSubscription } from '@gql'
import useOrgMember from '@hooks/useOrgMember'
import DecisionEditModal from '@organisms/decision/DecisionEditModal'
import DecisionModal from '@organisms/decision/DecisionModal'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus } from 'react-icons/fi'
import DecisionItem from '../DecisionItem'

interface Props {
  circleId: string
}

export default function CircleDecisions({ circleId }: Props) {
  const { t } = useTranslation()
  const isMember = useOrgMember()

  // Subscribe to decisions
  const { data, error, loading } = useSubscribeCircleDecisionsSubscription({
    variables: { circleId, archived: false },
  })
  const decisions = data?.decision

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
      {isMember && (
        <Button
          size="sm"
          mb={4}
          leftIcon={<FiPlus />}
          onClick={editModal.onOpen}
        >
          {t('CircleDecisions.create')}
        </Button>
      )}

      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      {decisions?.length === 0 && (
        <Text fontStyle="italic">{t('CircleDecisions.empty')}</Text>
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
