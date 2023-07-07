import React from 'react'
import DashboardMyInfosItem from '@molecules/dashboard/DashboardMyInfosItem'
import { useTranslation } from 'react-i18next'
import { MemberFragment } from '@gql'
import { useTasks } from '@hooks/useTasks'
import { TasksViewTypes } from '@shared/model/task'
import { Container, useDisclosure } from '@chakra-ui/react'
import TaskModal from '@organisms/task/TaskModal'
import IconTextButton from '@atoms/IconTextButton'
import { FiPlus } from 'react-icons/fi'
import TaskItem from '@molecules/task/TaskItem'

export type DashboardMyTasksProps = {
  path: string
  member: MemberFragment
}

const DashboardMyTasks = ({ path, member }: DashboardMyTasksProps) => {
  const { t } = useTranslation()

  const { tasks } = useTasks(TasksViewTypes.List, {
    memberId: member.id,
  })

  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

  return (
    <DashboardMyInfosItem
      title={t('DashboardMyTasks.title')}
      path={path}
      actions={
        <IconTextButton
          aria-label={t('DashboardMyTasks.add')}
          icon={<FiPlus />}
          size="sm"
          onClick={onCreateOpen}
        />
      }
    >
      <Container maxW="3xl" p={0}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} showCircle />
        ))}
      </Container>

      {isCreateOpen && (
        <TaskModal isOpen defaultMemberId={member.id} onClose={onCreateClose} />
      )}
    </DashboardMyInfosItem>
  )
}

export default DashboardMyTasks
