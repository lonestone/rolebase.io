import { Title } from '@atoms/Title'
import { Box, Heading } from '@chakra-ui/react'
import { Task_Status_Enum } from '@gql'
import useUpdatableQueryParams from '@hooks/useUpdatableQueryParams'
import TasksModule from '@organisms/task/TasksModule'
import { TasksViewTypes } from '@shared/model/task'
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

  return (
    <Box p={5}>
      <Title>{t('TasksPage.heading')}</Title>

      <TasksModule
        view={view}
        circleId={circleId}
        memberId={memberId}
        status={status}
        header={
          <Heading as="h1" size="md" mr={5} mb={3}>
            {t('TasksPage.heading')}
          </Heading>
        }
        headerPaddingBottom={16}
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
    </Box>
  )
}
