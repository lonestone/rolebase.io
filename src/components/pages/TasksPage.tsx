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
import TaskModal from '@components/organisms/modals/TaskModal'
import useCurrentMember from '@hooks/useCurrentMember'
import { useSortedTasks } from '@hooks/useSortedTasks'
import useSubscription from '@hooks/useSubscription'
import { useStoreState } from '@store/hooks'
import React, { useState } from 'react'
import { FiChevronDown, FiPlus } from 'react-icons/fi'

enum AssignationFilters {
  Mine = 'Mine',
  Member = 'Member',
  Circle = 'Circle',
}

export default function TasksPage() {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const currentMember = useCurrentMember()

  // Assignation filter menu
  const [assignation, setAssignation] = useState(AssignationFilters.Mine)
  const [memberId, setMemberId] = useState<string | undefined>()
  const [circleId, setCircleId] = useState<string | undefined>()

  // Archives filter menu
  const [doneFilter, setDoneFilter] = useState(false)

  // Subscribe to threads
  const getSubscribeFn = () => {
    if (!orgId) return
    switch (assignation) {
      case AssignationFilters.Mine:
        if (!currentMember) return
        return subscribeTasksByMember(orgId, currentMember.id, doneFilter)
      case AssignationFilters.Member:
        if (!memberId) return
        return subscribeTasksByMember(orgId, memberId, doneFilter)
      case AssignationFilters.Circle:
        if (!circleId) return
        return subscribeTasksByCircle(orgId, circleId, doneFilter)
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
      <Title>Tâches</Title>

      <Flex mb={5} alignItems="center" flexWrap="wrap">
        <Heading as="h1" size="md">
          Tâches
        </Heading>

        {doneFilter && <Tag ml={2}>Terminées</Tag>}

        <Spacer />

        <Menu closeOnSelect={false}>
          <MenuButton
            as={Button}
            size="sm"
            variant="ghost"
            rightIcon={<FiChevronDown />}
          >
            Filtres
          </MenuButton>
          <MenuList zIndex={2}>
            <MenuOptionGroup
              title="Assignation"
              type="radio"
              value={assignation}
              onChange={(value) => setAssignation(value as any)}
            >
              <MenuItemOption value={AssignationFilters.Mine}>
                Mes tâches
              </MenuItemOption>
              <MenuItemOption value={AssignationFilters.Circle}>
                Tâches d'un cercle
              </MenuItemOption>
              <MenuItemOption value={AssignationFilters.Member}>
                Tâches d'un membre
              </MenuItemOption>
            </MenuOptionGroup>
            <MenuDivider />
            <MenuOptionGroup
              title="Terminées"
              type="checkbox"
              value={doneFilter ? ['done'] : []}
              onChange={(value) => setDoneFilter(value.includes('done'))}
            >
              <MenuItemOption value="done">
                Afficher les tâches terminées
              </MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>

        <Button size="sm" ml={1} leftIcon={<FiPlus />} onClick={onCreateOpen}>
          Nouvelle tâche
        </Button>
      </Flex>

      {assignation === AssignationFilters.Member && (
        <HStack mb={5}>
          <StackItem>Membre :</StackItem>
          <MemberSearchInput value={memberId} onChange={setMemberId} />
        </HStack>
      )}

      {assignation === AssignationFilters.Circle && (
        <HStack mb={5}>
          <StackItem>Cercle / Rôle :</StackItem>
          <CircleSearchInput value={circleId} onChange={setCircleId} />
        </HStack>
      )}

      {loading && <Loading active center />}
      <TextErrors errors={[error]} />

      {tasks && (
        <VStack spacing={0} align="stretch">
          {tasks.length === 0 && <i>Aucune tâche 🎉</i>}

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
