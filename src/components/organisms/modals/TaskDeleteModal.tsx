import { updateTask } from '@api/entities/tasks'
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
import { EntityChangeType, LogType } from '@shared/log'
import { TaskEntry } from '@shared/task'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'

interface Props
  extends Omit<AlertDialogProps, 'children' | 'leastDestructiveRef'> {
  task: TaskEntry
  onDelete?(): void
}

export default function TaskDeleteModal({
  task,
  onDelete,
  ...alertProps
}: Props) {
  const { t } = useTranslation()
  const createLog = useCreateLog()

  const handleDelete = async () => {
    updateTask(task.id, { archived: true })
    onDelete?.()
    createLog({
      display: {
        type: LogType.TaskArchive,
        id: task.id,
        name: task.title,
      },
      changes: {
        tasks: [
          {
            type: EntityChangeType.Update,
            id: task.id,
            prevData: { archived: false },
            newData: { archived: true },
          },
        ],
      },
    })
    alertProps.onClose()
  }

  return (
    <AlertDialog {...alertProps} leastDestructiveRef={undefined}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {t('organisms.modals.TaskDeleteModal.heading')}
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              <Trans
                i18nKey="organisms.modals.TaskDeleteModal.info"
                values={{ name: task.title }}
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
