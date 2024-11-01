import Loading from '@/common/atoms/Loading'
import OverflowContainer, {
  OverflowContainerParams,
} from '@/common/atoms/OverflowContainer'
import TextErrors from '@/common/atoms/TextErrors'
import useOrgMember from '@/member/hooks/useOrgMember'
import { Container } from '@chakra-ui/react'
import { TasksViewTypes } from '@rolebase/shared/model/task'
import React, { useContext } from 'react'
import { TasksModuleContext } from '../contexts/TasksModuleContext'
import { useTasks } from '../hooks/useTasks'
import TasksKanban from './TasksKanban'
import TasksList from './TasksList'

interface Props {
  overflowContainer?: OverflowContainerParams
}

export default function TasksContent({ overflowContainer }: Props) {
  const isMember = useOrgMember()

  const { view, circleId, memberId, status } = useContext(TasksModuleContext)

  // Subscribe to tasks
  const { tasks, loading, error, changeOrder } = useTasks(view, {
    memberId,
    circleId,
    status,
  })

  return (
    <>
      {view === TasksViewTypes.Kanban && (
        <OverflowContainer {...overflowContainer}>
          <TasksKanban
            tasks={tasks}
            onOrderChange={isMember ? changeOrder : undefined}
            showMember={!memberId}
            showCircle={!circleId}
          />
        </OverflowContainer>
      )}

      {!loading && view === TasksViewTypes.List && (
        <Container maxW="3xl" p={0}>
          <TasksList
            tasks={tasks}
            onOrderChange={isMember ? changeOrder : undefined}
            showMember={!memberId}
            showCircle={!circleId}
            showDueDate
            showCreateBtn
          />
        </Container>
      )}

      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />
    </>
  )
}
