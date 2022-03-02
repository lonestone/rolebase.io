import { updateTask } from '@api/entities/tasks'
import { Checkbox, HStack, LinkBox, Text, useToast } from '@chakra-ui/react'
import CircleByIdButton from '@components/atoms/CircleByIdButton'
import TaskLinkOverlay from '@components/atoms/TaskLinkOverlay'
import useCreateLog from '@hooks/useCreateLog'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import { TaskEntry } from '@shared/task'
import { formatRelative } from 'date-fns'
import { Timestamp } from 'firebase/firestore'
import React, { useCallback } from 'react'
import { dateFnsLocale } from 'src/locale'
import { EntityChangeType, LogType } from '@shared/log'
interface Props {
  task: TaskEntry
  showCircle?: boolean
}

export default function TaskItem({ task, showCircle }: Props) {
  const toast = useToast()
  const hover = useHoverItemStyle()
  const createLog = useCreateLog()

  // Toggle done status of a task
  const handleToggleDone = useCallback(() => {
    const doneDate = task.doneDate ? null : Timestamp.now()
    updateTask(task.id, { doneDate })
    createLog({
      display: {
        type: LogType.TaskUpdate,
        id: task.id,
        name: task.title,
        status: doneDate ? 'terminé' : 'non terminé',
      },
      changes: {
        tasks: [
          {
            type: EntityChangeType.Update,
            id: task.id,
            prevData: { doneDate: task.doneDate ? task.doneDate : null },
            newData: { doneDate },
          },
        ],
      },
    })
    // Toast to cancel
    toast({
      status: 'success',
      duration: 2000,
      title: doneDate
        ? 'Tâche marquée comme terminée'
        : 'Tâche marquée comme non terminée',
    })
  }, [task])

  return (
    <LinkBox px={2} py={1} _hover={hover}>
      <HStack>
        <Checkbox
          isChecked={!!task.doneDate}
          onChange={handleToggleDone}
          zIndex={1}
        />
        <TaskLinkOverlay task={task} />
        {task.dueDate && (
          <Text fontSize="sm" color="gray.500">
            {formatRelative(task.dueDate.toDate(), new Date(), {
              locale: dateFnsLocale,
            })}
          </Text>
        )}
        {showCircle && <CircleByIdButton circleId={task.circleId} />}
      </HStack>
    </LinkBox>
  )
}
