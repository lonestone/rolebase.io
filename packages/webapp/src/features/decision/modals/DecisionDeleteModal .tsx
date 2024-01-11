import useCreateLog from '@/log/hooks/useCreateLog'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogProps,
  Button,
  Text,
} from '@chakra-ui/react'
import { DecisionFragment, useArchiveDecisionMutation } from '@gql'
import { EntityChangeType, LogType } from '@shared/model/log'
import React, { useRef } from 'react'
import { Trans, useTranslation } from 'react-i18next'

interface Props
  extends Omit<AlertDialogProps, 'children' | 'leastDestructiveRef'> {
  decision: DecisionFragment
  onDelete?(): void
}

export default function DecisionDeleteModal({
  decision,
  onDelete,
  ...alertProps
}: Props) {
  const { t } = useTranslation()
  const [archiveDecision] = useArchiveDecisionMutation()
  const createLog = useCreateLog()
  const cancelRef = useRef<HTMLButtonElement>(null)

  const handleDelete = async () => {
    await archiveDecision({ variables: { id: decision.id } })
    onDelete?.()
    createLog({
      display: {
        type: LogType.DecisionArchive,
        id: decision.id,
        name: decision.title,
      },
      changes: {
        decisions: [
          {
            type: EntityChangeType.Update,
            id: decision.id,
            prevData: { archived: false },
            newData: { archived: true },
          },
        ],
      },
    })
    alertProps.onClose()
  }

  return (
    <AlertDialog {...alertProps} leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>
            {t('DecisionDeleteModal.heading')}
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              <Trans
                i18nKey="DecisionDeleteModal.info"
                values={{ name: decision.title }}
                components={{ b: <strong /> }}
              />
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={alertProps.onClose}>
              {t('common.cancel')}
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              {t('common.delete')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
