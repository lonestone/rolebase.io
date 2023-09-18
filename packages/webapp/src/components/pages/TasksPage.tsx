import { Title } from '@atoms/Title'
import { Box, Heading } from '@chakra-ui/react'
import { Task_Status_Enum } from '@gql'
import useUpdatableQueryParams from '@hooks/useUpdatableQueryParams'
import ScrollableLayout from '@molecules/ScrollableLayout'
import TasksContent from '@molecules/task/TasksContent'
import TasksHeader from '@molecules/task/TasksHeader'
import { TasksViewTypes } from '@shared/model/task'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Params = {
  view: TasksViewTypes
  member: string
  circle: string
  status: Task_Status_Enum
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
  const status = params.status && Task_Status_Enum[params.status]
  const handleStatusChange = (status: Task_Status_Enum | undefined) =>
    changeParams({ status })

  const paramsProps = {
    view,
    circleId,
    memberId,
    status,
    onViewChange: handleViewChange,
    onCircleChange: handleCircleChange,
    onMemberChange: handleMemberChange,
    onStatusChange: handleStatusChange,
  }

  return (
    <ScrollableLayout
      header={
        <TasksHeader
          {...paramsProps}
          title={
            <Heading as="h1" size="lg" ml={5} mr={7}>
              {t('TasksPage.heading')}
            </Heading>
          }
        />
      }
    >
      <Title>{t('TasksPage.heading')}</Title>

      <Box h="100%" px={7} py={10} overflowX="auto">
        <TasksContent {...paramsProps} />
      </Box>
    </ScrollableLayout>
  )
}
