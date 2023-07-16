import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { Button, useDisclosure } from '@chakra-ui/react'
import useCurrentMember from '@hooks/useCurrentMember'
import { useTasks } from '@hooks/useTasks'
import DashboardMyInfosItem from '@molecules/dashboard/DashboardMyInfosItem'
import TasksList from '@molecules/task/TasksList'
import TaskModal from '@organisms/task/TaskModal'
import { TasksViewTypes } from '@shared/model/task'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus } from 'react-icons/fi'

export default function DashboardMyTasks() {
  const { t } = useTranslation()
  const member = useCurrentMember()

  const { tasks, error, loading, changeOrder } = useTasks(TasksViewTypes.List, {
    memberId: member?.id,
  })

  const createModal = useDisclosure()

  return (
    <DashboardMyInfosItem
      title={t('DashboardMyTasks.title')}
      path={`tasks?member=${member?.id}`}
      actions={
        <Button
          size="sm"
          colorScheme="blue"
          leftIcon={<FiPlus />}
          onClick={createModal.onOpen}
        >
          {t('DashboardMyTasks.add')}
        </Button>
      }
    >
      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      <TasksList tasks={tasks} onOrderChange={changeOrder} showMember={false} />

      {createModal.isOpen && (
        <TaskModal
          isOpen
          defaultMemberId={member?.id}
          onClose={createModal.onClose}
        />
      )}
    </DashboardMyInfosItem>
  )
}
