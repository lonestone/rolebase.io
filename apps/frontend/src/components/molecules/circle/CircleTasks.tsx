import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { Button, Flex, Spacer, useDisclosure } from '@chakra-ui/react'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import useOrgMember from '@hooks/useOrgMember'
import { useTasks } from '@hooks/useTasks'
import TaskModal from '@organisms/task/TaskModal'
import { TasksViewTypes } from '@shared/model/task'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus, FiTrello } from 'react-icons/fi'
import TasksList from '../task/TasksList'

interface Props {
  circleId: string
}

export default function CircleTasks({ circleId }: Props) {
  const { t } = useTranslation()
  const isMember = useOrgMember()
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
          <Button size="sm" leftIcon={<FiPlus />} onClick={onCreateOpen}>
            {t('CircleTasks.create')}
          </Button>
        )}

        <Spacer />
        <Button
          size="sm"
          variant="outline"
          leftIcon={<FiTrello />}
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
      />

      {isCreateOpen && (
        <TaskModal defaultCircleId={circleId} isOpen onClose={onCreateClose} />
      )}
    </>
  )
}
