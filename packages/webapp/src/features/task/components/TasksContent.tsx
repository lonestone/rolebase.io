import Loading from '@/common/atoms/Loading'
import OverflowContainer, {
  OverflowContainerParams,
} from '@/common/atoms/OverflowContainer'
import TextErrors from '@/common/atoms/TextErrors'
import useOrgMember from '@/member/hooks/useOrgMember'
import { AspectRatio, Container } from '@chakra-ui/react'
import { TasksViewTypes } from '@rolebase/shared/model/task'
import React, { useContext } from 'react'
import { TasksModuleContext } from '../contexts/TasksModuleContext'
import { useTasks } from '../hooks/useTasks'
import TasksKanban from './TasksKanban'
import TasksList from './TasksList'
import useOrgAdmin from '@/member/hooks/useOrgAdmin'

interface Props {
  overflowContainer?: OverflowContainerParams
}

export default function TasksContent({ overflowContainer }: Props) {
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

          {isAdmin && tasks.length === 0 && (
            // Video: Comment utiliser les sujets et tâches
            // https://www.tella.tv/video/cmg6ckxqh006f0blagzaw70w1/view
            <AspectRatio ratio={16 / 9} mt={10} maxW="3xl" mx="auto">
              <iframe
                src="https://www.tella.tv/video/cmg6ckxqh006f0blagzaw70w1/embed?b=0&title=1&a=1&loop=0&t=0&muted=0&wt=0"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
              ></iframe>
            </AspectRatio>
          )}
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

          {isAdmin && tasks.length === 0 && (
            // Video: Comment utiliser les sujets et tâches
            // https://www.tella.tv/video/cmg6ckxqh006f0blagzaw70w1/view
            <AspectRatio ratio={16 / 9} mt={10}>
              <iframe
                src="https://www.tella.tv/video/cmg6ckxqh006f0blagzaw70w1/embed?b=0&title=1&a=1&loop=0&t=0&muted=0&wt=0"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
              ></iframe>
            </AspectRatio>
          )}
        </Container>
      )}

      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />
    </>
  )
}
