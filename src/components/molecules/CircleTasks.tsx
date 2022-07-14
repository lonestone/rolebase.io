import { Button, Flex, Spacer, useDisclosure } from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import TaskModal from '@components/organisms/modals/TaskModal'
import TasksList from '@components/organisms/TasksList'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import { useTasks } from '@hooks/useTasks'
import { TasksViewTypes } from '@shared/model/task'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus, FiTrello } from 'react-icons/fi'

interface Props {
  circleId: string
}

export default function CircleTasks({ circleId }: Props) {
  const { t } = useTranslation()
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
        <Button size="sm" leftIcon={<FiPlus />} onClick={onCreateOpen}>
          {t('molecules.CircleTasks.create')}
        </Button>
        <Spacer />
        <Button
          size="sm"
          variant="ghost"
          leftIcon={<FiTrello />}
          onClick={() => navigateOrg(`tasks?circle=${circleId}&view=Kanban`)}
        >
          Kanban
        </Button>
      </Flex>

      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      <TasksList tasks={tasks} onOrderChange={changeOrder} showMember />

      {isCreateOpen && (
        <TaskModal defaultCircleId={circleId} isOpen onClose={onCreateClose} />
      )}
    </>
  )
}
