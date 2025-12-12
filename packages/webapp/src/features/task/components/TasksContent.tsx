import Loading from '@/common/atoms/Loading'
import OverflowContainer, {
  OverflowContainerParams,
} from '@/common/atoms/OverflowContainer'
import TextErrors from '@/common/atoms/TextErrors'
import useOrgAdmin from '@/member/hooks/useOrgAdmin'
import useOrgMember from '@/member/hooks/useOrgMember'
import OnboardingVideoThreadsAndTasks from '@/onboarding/components/OnboardingVideoThreadsAndTasks'
import { Box } from '@chakra-ui/react'
import { TasksViewTypes } from '@rolebase/shared/model/task'
import React, { useContext } from 'react'
import { TasksModuleContext } from '../contexts/TasksModuleContext'
import { useTasks } from '../hooks/useTasks'
import TasksKanban from './TasksKanban'
import TasksList from './TasksList'

interface Props {
  overflowContainer?: OverflowContainerParams
  isFullPage?: boolean
}

export default function TasksContent({ overflowContainer, isFullPage }: Props) {
  const isMember = useOrgMember()
  const isAdmin = useOrgAdmin()

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

          {isAdmin && tasks.length === 0 && isFullPage && (
            // Video: Comment utiliser les sujets et tâches
            <OnboardingVideoThreadsAndTasks mt={10} maxW="3xl" mx="auto" />
          )}
        </OverflowContainer>
      )}

      {!loading && view === TasksViewTypes.List && (
        <Box maxW="3xl" px={{ base: 0, sm: 3 }}>
          <TasksList
            tasks={tasks}
            onOrderChange={isMember ? changeOrder : undefined}
            showMember={!memberId}
            showCircle={!circleId}
            showDueDate
            showCreateBtn
          />

          {isAdmin && tasks.length === 0 && isFullPage && (
            // Video: Comment utiliser les sujets et tâches
            <OnboardingVideoThreadsAndTasks mt={10} />
          )}
        </Box>
      )}

      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />
    </>
  )
}
