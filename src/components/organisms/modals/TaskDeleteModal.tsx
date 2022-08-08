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
import { EntityChangeType, LogType } from '@shared/model/log'
import { TaskEntry } from '@shared/model/task'
import React, { useRef } from 'react'
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
  const cancelRef = useRef<HTMLButtonElement>(null)

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
    <AlertDialog {...alertProps} leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>{t('TaskDeleteModal.heading')}</AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              <Trans
                i18nKey="TaskDeleteModal.info"
                values={{ name: task.title }}
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
