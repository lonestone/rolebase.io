import Loading from '@/common/atoms/Loading'
import OverflowContainer, {
  OverflowContainerParams,
} from '@/common/atoms/OverflowContainer'
import TextErrors from '@/common/atoms/TextErrors'
import useOrgMember from '@/member/hooks/useOrgMember'
import { Container } from '@chakra-ui/react'
import { Task_Status_Enum } from '@gql'
import { TasksViewTypes } from '@shared/model/task'
import React, { useMemo } from 'react'
import { useTasks } from '../hooks/useTasks'
import { TasksParams } from './TasksHeader'
import TasksKanban from './TasksKanban'
import TasksList from './TasksList'

interface Props extends TasksParams {
  overflowContainer?: OverflowContainerParams
}

export default function TasksContent({
  overflowContainer,
  view,
  circleId,
  memberId,
  status,
  onViewChange,
  onStatusChange,
}: Props) {
  const isMember = useOrgMember()

  // Subscribe to tasks
  const { tasks, loading, error, changeOrder } = useTasks(view, {
    memberId,
    circleId,
    status,
  })

  const handleDoneTasksClick = useMemo(
    () =>
      onStatusChange &&
      (() => {
        onViewChange(TasksViewTypes.List)
        onStatusChange?.(Task_Status_Enum.Done)
      }),
    [onViewChange, onStatusChange]
  )

  return (
    <>
      {view === TasksViewTypes.Kanban && (
        <OverflowContainer {...overflowContainer}>
          <TasksKanban
            tasks={tasks}
            onOrderChange={isMember ? changeOrder : undefined}
            showMember={!memberId}
            showCircle={!circleId}
            onDoneTasksClick={handleDoneTasksClick}
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
          />
        </Container>
      )}

      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />
    </>
  )
}
