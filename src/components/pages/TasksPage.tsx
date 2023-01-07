import { taskStatusColors } from '@atoms/TaskStatusTag'
import { Title } from '@atoms/Title'
import { Container as Column, Flex, Heading, Tag } from '@chakra-ui/react'
import useUpdatableQueryParams from '@hooks/useUpdatableQueryParams'
import TasksModule from '@organisms/task/TasksModule'
import { TaskStatus, TasksViewTypes } from '@shared/model/task'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Params = {
  view: TasksViewTypes
  member: string
  circle: string
  status: TaskStatus
}

export default function TasksPage() {
  const { t } = useTranslation()
  const { params, changeParams } = useUpdatableQueryParams<Params>()

  // View param
  const view =
    (params.view && TasksViewTypes[params.view]) || TasksViewTypes.Kanban
  const handleViewChange = (view: TasksViewTypes) =>
    changeParams({ view: TasksViewTypes[view] as any })

  // Member param
  const memberId =
    params.member && typeof params.member === 'string'
      ? params.member
      : undefined
  const handleMemberChange = (member: string | undefined) =>
    changeParams({ member })

  // Circle param
  const circleId =
    params.circle && typeof params.circle === 'string'
      ? params.circle
      : undefined
  const handleCircleChange = (circle: string | undefined) =>
    changeParams({ circle })

  // Status param
  const status = params.status && TaskStatus[params.status]
  const handleStatusChange = (status: TaskStatus | undefined) =>
    changeParams({ status })

  return (
    <Column maxW="3xl" py={10}>
      <Title>{t('TasksPage.heading')}</Title>

      <Flex mb={5} alignItems="center" flexWrap="wrap">
        <Heading as="h1" size="md">
          {t('TasksPage.heading')}
        </Heading>

        {status && (
          <Tag colorScheme={taskStatusColors[status]} ml={2}>
            {t(`common.taskStatus.${status}`)}
          </Tag>
        )}
      </Flex>

      <TasksModule
        view={view}
        circleId={circleId}
        memberId={memberId}
        status={status}
        overflowContainer={{
          expandLeft: true,
          expandRight: true,
          expandBottom: true,
        }}
        onViewChange={handleViewChange}
        onCircleChange={handleCircleChange}
        onMemberChange={handleMemberChange}
        onStatusChange={handleStatusChange}
      />
    </Column>
  )
}
