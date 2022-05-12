import { updateRole } from '@api/entities/roles'
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
import useRole from '@hooks/useRole'
import { EntityChangeType, LogType } from '@shared/model/log'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'

interface Props
  extends Omit<AlertDialogProps, 'children' | 'leastDestructiveRef'> {
  id: string
  onDelete?(): void
}

export default function RoleDeleteModal({
  id,
  onDelete,
  ...alertProps
}: Props) {
  const { t } = useTranslation()
  const role = useRole(id)
  const createLog = useCreateLog()

  const handleDelete = async () => {
    if (!role) return
    await updateRole(id, { archived: true })
    onDelete?.()
    alertProps.onClose()

    // Log change
    createLog({
      display: {
        type: LogType.RoleArchive,
        id,
        name: role.name,
      },
      changes: {
        roles: [
          {
            type: EntityChangeType.Update,
            id: role.id,
            prevData: { archived: false },
            newData: { archived: true },
          },
        ],
      },
    })
  }

  if (!role) return null

  return (
    <AlertDialog {...alertProps} leastDestructiveRef={undefined}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {t('organisms.modals.RoleDeleteModal.heading')}
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              <Trans
                i18nKey="organisms.modals.RoleDeleteModal.info"
                values={{ name: role.name }}
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
