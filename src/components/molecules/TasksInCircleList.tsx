import { subscribeTasksByCircle } from '@api/entities/tasks'
import { Button, Text, useDisclosure } from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import TaskModal from '@components/organisms/modals/TaskModal'
import { useOrgId } from '@hooks/useOrgId'
import { useSortedTasks } from '@hooks/useSortedTasks'
import useSubscription from '@hooks/useSubscription'
import React from 'react'
import { FiPlus } from 'react-icons/fi'
import TaskItem from './TaskItem'

interface Props {
  circleId: string
}

export default function TasksInCircleList({ circleId }: Props) {
  const orgId = useOrgId()

  // Subscribe to tasks
  const { data, error, loading } = useSubscription(
    orgId ? subscribeTasksByCircle(orgId, circleId) : undefined
  )

  // Sort tasks by due date
  const tasks = useSortedTasks(data)

  // Task create modal
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

  return (
    <>
      <Button size="sm" mb={4} leftIcon={<FiPlus />} onClick={onCreateOpen}>
        Créer une tâche
      </Button>

      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      {tasks?.length === 0 && <Text>Aucune tâche pour le moment</Text>}

      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}

      {isCreateOpen && (
        <TaskModal defaultCircleId={circleId} isOpen onClose={onCreateClose} />
      )}
    </>
  )
}
