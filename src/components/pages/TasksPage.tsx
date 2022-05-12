import {
  subscribeTasksByCircle,
  subscribeTasksByMember,
} from '@api/entities/tasks'
import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Spacer,
  StackItem,
  Tag,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import { Title } from '@components/atoms/Title'
import CircleSearchInput from '@components/molecules/search/entities/circles/CircleSearchInput'
import MemberSearchInput from '@components/molecules/search/entities/members/MemberSearchInput'
import TaskItem from '@components/molecules/TaskItem'
import { taskStatusColors } from '@components/molecules/TaskStatusInput'
import TaskModal from '@components/organisms/modals/TaskModal'
import useCurrentMember from '@hooks/useCurrentMember'
import { useOrgId } from '@hooks/useOrgId'
import { useSortedTasks } from '@hooks/useSortedTasks'
import useSubscription from '@hooks/useSubscription'
import { TaskStatus, taskStatusList } from '@shared/model/task'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronDown, FiPlus } from 'react-icons/fi'

enum AssignationFilters {
  Mine = 'Mine',
  Member = 'Member',
  Circle = 'Circle',
}

const statusNotDone = 'NotDone'

type StatusFilter = TaskStatus | typeof statusNotDone

export default function TasksPage() {
  const orgId = useOrgId()
  const currentMember = useCurrentMember()
  const { t } = useTranslation()

  // Assignation filter menu
  const [assignation, setAssignation] = useState(AssignationFilters.Mine)
  const [memberId, setMemberId] = useState<string | undefined>()
  const [circleId, setCircleId] = useState<string | undefined>()

  // Status filter menu
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(statusNotDone)
  const status = statusFilter === statusNotDone ? undefined : statusFilter

  // Subscribe to threads
  const getSubscribeFn = () => {
    if (!orgId) return
    switch (assignation) {
      case AssignationFilters.Mine:
        if (!currentMember) return
        return subscribeTasksByMember(orgId, currentMember.id, status)
      case AssignationFilters.Member:
        if (!memberId) return
        return subscribeTasksByMember(orgId, memberId, status)
      case AssignationFilters.Circle:
        if (!circleId) return
        return subscribeTasksByCircle(orgId, circleId, status)
    }
  }
  const { data, error, loading } = useSubscription(getSubscribeFn())

  // Sort tasks by due date
  const tasks = useSortedTasks(data)

  // Create modal
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

  return (
    <Container maxW="3xl" py={10}>
      <Title>{t('pages.TasksPage.heading')}</Title>

      <Flex mb={5} alignItems="center" flexWrap="wrap">
        <Heading as="h1" size="md">
          {t('pages.TasksPage.heading')}
        </Heading>

        {status && (
          <Tag colorScheme={taskStatusColors[status]} ml={2}>
            {t(`common.taskStatus.${status}`)}
          </Tag>
        )}

        <Spacer />

        <Menu closeOnSelect={false}>
          <MenuButton
            as={Button}
            size="sm"
            variant="ghost"
            rightIcon={<FiChevronDown />}
          >
            {t('common.filters')}
          </MenuButton>
          <MenuList zIndex={2}>
            <MenuOptionGroup
              title={t('pages.TasksPage.assignation.title')}
              type="radio"
              value={assignation}
              onChange={(value) => setAssignation(value as any)}
            >
              <MenuItemOption value={AssignationFilters.Mine}>
                {t('pages.TasksPage.assignation.mine')}
              </MenuItemOption>
              <MenuItemOption value={AssignationFilters.Circle}>
                {t('pages.TasksPage.assignation.circle')}
              </MenuItemOption>
              <MenuItemOption value={AssignationFilters.Member}>
                {t('pages.TasksPage.assignation.member')}
              </MenuItemOption>
            </MenuOptionGroup>
            <MenuDivider />
            <MenuOptionGroup
              title={t('pages.TasksPage.status.title')}
              type="radio"
              value={statusFilter}
              onChange={(value) => setStatusFilter(value as any)}
            >
              <MenuItemOption value={statusNotDone}>
                {t('pages.TasksPage.status.notDone')}
              </MenuItemOption>
              {taskStatusList.map((status) => (
                <MenuItemOption key={status} value={status}>
                  {t(`common.taskStatus.${status}`)}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu>

        <Button size="sm" ml={1} leftIcon={<FiPlus />} onClick={onCreateOpen}>
          {t('pages.TasksPage.create')}
        </Button>
      </Flex>

      {assignation === AssignationFilters.Member && (
        <HStack mb={5}>
          <StackItem>{t('pages.TasksPage.memberInput')}</StackItem>
          <MemberSearchInput value={memberId} onChange={setMemberId} />
        </HStack>
      )}

      {assignation === AssignationFilters.Circle && (
        <HStack mb={5}>
          <StackItem>{t('pages.TasksPage.circleInput')}</StackItem>
          <CircleSearchInput value={circleId} onChange={setCircleId} />
        </HStack>
      )}

      {loading && <Loading active center />}
      <TextErrors errors={[error]} />

      {tasks && (
        <VStack spacing={0} align="stretch">
          {tasks.length === 0 && <i>{t('pages.TasksPage.empty')}</i>}

          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} showCircle />
          ))}
        </VStack>
      )}

      {isCreateOpen && (
        <TaskModal
          isOpen
          defaultMemberId={currentMember?.id}
          onClose={onCreateClose}
        />
      )}
    </Container>
  )
}
