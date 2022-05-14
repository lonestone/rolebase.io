import { updateMember } from '@api/entities/members'
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
import useCreateLog from '@hooks/useCreateLog'
import useMember from '@hooks/useMember'
import { EntityChangeType, LogType } from '@shared/model/log'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'

interface Props
  extends Omit<AlertDialogProps, 'children' | 'leastDestructiveRef'> {
  id: string
  onDelete?(): void
}

export default function MemberDeleteModal({
  id,
  onDelete,
  ...alertProps
}: Props) {
  const { t } = useTranslation()
  const member = useMember(id)
  const createLog = useCreateLog()

  const handleDelete = async () => {
    if (!member) return
    await updateMember(id, { archived: true })
    onDelete?.()
    alertProps.onClose()

    // Log change
    createLog({
      display: {
        type: LogType.MemberArchive,
        id,
        name: member.name,
      },
      changes: {
        members: [
          {
            type: EntityChangeType.Update,
            id: member.id,
            prevData: { archived: false },
            newData: { archived: true },
          },
        ],
      },
    })
  }

  if (!member) return null

  return (
    <AlertDialog {...alertProps} leastDestructiveRef={undefined}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>
            {t('organisms.modals.MemberDeleteModal.heading')}
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              <Trans
                i18nKey="organisms.modals.MemberDeleteModal.info"
                values={{ name: member.name }}
                components={{ b: <strong /> }}
              />
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={alertProps.onClose}>{t('common.cancel')}</Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              {t('common.delete')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
