import Loading from '@/common/atoms/Loading'
import TextErrors from '@/common/atoms/TextErrors'
import useOrgMember from '@/member/hooks/useOrgMember'
import { useNavigateOrg } from '@/org/hooks/useNavigateOrg'
import { useTasks } from '@/task/hooks/useTasks'
import TaskModal from '@/task/modals/TaskModal'
import {
  AspectRatio,
  Button,
  Flex,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react'
import { TasksViewTypes } from '@rolebase/shared/model/task'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { CreateIcon, KanbanIcon } from 'src/icons'
import TasksList from '../../task/components/TasksList'
import useOrgAdmin from '@/member/hooks/useOrgAdmin'

interface Props {
  circleId: string
}

export default function CircleTasks({ circleId }: Props) {
  const { t } = useTranslation()
  const isMember = useOrgMember()
  const isAdmin = useOrgAdmin()
  const navigateOrg = useNavigateOrg()

  // Subscribe to tasks
  const { tasks, error, loading, changeOrder } = useTasks(TasksViewTypes.List, {
    circleId,
  })

  // Task create modal
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

  return (
    <>
      <Flex mb={4}>
        {isMember && (
          <Button
            size="sm"
            leftIcon={<CreateIcon size={20} />}
            onClick={onCreateOpen}
          >
            {t('CircleTasks.create')}
          </Button>
        )}

        <Spacer />
        <Button
          size="sm"
          variant="outline"
          leftIcon={<KanbanIcon size={18} />}
          onClick={() => navigateOrg(`tasks?circle=${circleId}&view=Kanban`)}
        >
          Kanban
        </Button>
      </Flex>

      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      <TasksList
        tasks={tasks}
        onOrderChange={isMember ? changeOrder : undefined}
        showMember
        showDueDate
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

      {isCreateOpen && (
        <TaskModal defaults={{ circleId }} isOpen onClose={onCreateClose} />
      )}
    </>
  )
}
