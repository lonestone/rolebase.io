import { subscribeTasksByCircle } from '@api/entities/tasks'
import { Button, useDisclosure, VStack } from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import TaskModal from '@components/organisms/modals/TaskModal'
import { useSortedTasks } from '@hooks/useSortedTasks'
import useSubscription from '@hooks/useSubscription'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { FiPlus } from 'react-icons/fi'
import TaskItem from './TaskItem'

interface Props {
  circleId: string
}

export default function TasksInCircleList({ circleId }: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)

  // Subscribe to tasks
  const { data, error, loading } = useSubscription(
    orgId ? subscribeTasksByCircle(orgId, circleId, false) : undefined
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

      {tasks && (
        <VStack spacing={0} align="stretch">
          {tasks.length === 0 && <i>Aucune tâche pour le moment</i>}

          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </VStack>
      )}

      {isCreateOpen && (
        <TaskModal defaultCircleId={circleId} isOpen onClose={onCreateClose} />
      )}
    </>
  )
}
