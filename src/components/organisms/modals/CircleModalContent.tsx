import {
  Button,
  Collapse,
  FormControl,
  FormLabel,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import CircleAndParentsButton from '@components/atoms/CircleAndParentsButton'
import CircleButton from '@components/atoms/CircleButton'
import Markdown from '@components/atoms/Markdown'
import CircleMemberFormControl from '@components/molecules/CircleMemberFormControl'
import MeetingsInCircleList from '@components/molecules/MeetingsInCircleList'
import SubCirclesFormControl from '@components/molecules/SubCirclesFormControl'
import TasksInCircleList from '@components/molecules/TasksInCircleList'
import ThreadsInCircleList from '@components/molecules/ThreadsInCircleList'
import useCircle from '@hooks/useCircle'
import React from 'react'
import {
  FiCalendar,
  FiCheckSquare,
  FiChevronDown,
  FiChevronUp,
  FiDisc,
  FiMessageSquare,
} from 'react-icons/fi'
import CircleDeleteModal from './CircleDeleteModal'
import RoleEditModal from './RoleEditModal'

interface Props {
  id: string
}

enum TabTypes {
  Circle,
  Threads,
  Meetings,
  Tasks,
}

export default function CircleModalContent({ id }: Props) {
  const circle = useCircle(id)
  const role = circle?.role

  // Parent circles and linked circle
  const parentCircle = useCircle(circle?.parentId || undefined)
  const linkedCircle = useCircle(
    (role?.link === true ? parentCircle?.parentId : role?.link) || undefined
  )

  // Tabs
  const [tab, setTab] = React.useState<TabTypes>(0)

  // Role info toggle
  const { isOpen: isRoleInfoOpen, onToggle: onRoleInfoToggle } = useDisclosure()

  // Role edit modal
  const {
    isOpen: isEditRoleOpen,
    onOpen: onEditRoleOpen,
    onClose: onEditRoleClose,
  } = useDisclosure()

  // Delete modal
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  if (!circle) return null

  return (
    <>
      <ModalHeader>
        <CircleAndParentsButton
          id={id}
          onEdit={onEditRoleOpen}
          onDelete={onDeleteOpen}
        />
      </ModalHeader>
      <ModalCloseButton />

      <ModalBody pb={5}>
        <Tabs isLazy variant="enclosed" value={tab} onChange={setTab}>
          <TabList>
            <Tab>
              <FiDisc />
              {tab === TabTypes.Circle && (
                <Text ml={2}>{role?.singleMember ? 'Rôle' : 'Cercle'}</Text>
              )}
            </Tab>
            <Tab>
              <FiMessageSquare />
              {tab === TabTypes.Threads && <Text ml={2}>Discussions</Text>}
            </Tab>
            <Tab>
              <FiCalendar />
              {tab === TabTypes.Meetings && <Text ml={2}>Réunions</Text>}
            </Tab>
            <Tab>
              <FiCheckSquare />
              {tab === TabTypes.Tasks && <Text ml={2}>Tâches</Text>}
            </Tab>
          </TabList>

          <TabPanels mt={5}>
            <TabPanel p={0}>
              <VStack spacing={5} align="stretch">
                {role?.purpose && (
                  <FormControl>
                    <FormLabel>Raison d'être :</FormLabel>
                    <Markdown
                      mx={-3}
                      px={3}
                      py={2}
                      bg="hsl(192deg 100% 97%)"
                      borderRadius="xl"
                    >
                      {role.purpose}
                    </Markdown>
                  </FormControl>
                )}

                {(role?.domain || role?.accountabilities || role?.notes) && (
                  <>
                    <Button
                      variant="link"
                      rightIcon={
                        isRoleInfoOpen ? <FiChevronUp /> : <FiChevronDown />
                      }
                      onClick={onRoleInfoToggle}
                    >
                      {isRoleInfoOpen ? 'Voir moins' : 'Voir plus'}
                    </Button>
                    <Collapse in={isRoleInfoOpen} animateOpacity>
                      <VStack spacing={5} align="stretch">
                        {role?.domain && (
                          <FormControl>
                            <FormLabel>Domaine :</FormLabel>
                            <Markdown>{role.domain}</Markdown>
                          </FormControl>
                        )}

                        {role?.accountabilities && (
                          <FormControl>
                            <FormLabel>Redevabilités :</FormLabel>
                            <Markdown>{role.accountabilities}</Markdown>
                          </FormControl>
                        )}

                        {role?.notes && (
                          <FormControl>
                            <FormLabel>Notes :</FormLabel>
                            <Markdown>{role.notes}</Markdown>
                          </FormControl>
                        )}
                      </VStack>
                    </Collapse>
                  </>
                )}

                {!role?.singleMember ? (
                  <SubCirclesFormControl circleId={id} />
                ) : null}

                <CircleMemberFormControl circleId={id} />

                {parentCircle && linkedCircle && (
                  <Text>
                    Représente le Cercle <CircleButton circle={parentCircle} />
                    <br />
                    dans le Cercle <CircleButton circle={linkedCircle} />
                  </Text>
                )}
              </VStack>
            </TabPanel>

            <TabPanel p={0}>
              <ThreadsInCircleList circleId={id} />
            </TabPanel>

            <TabPanel p={0}>
              <MeetingsInCircleList circleId={id} />
            </TabPanel>

            <TabPanel p={0}>
              <TasksInCircleList circleId={id} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ModalBody>

      {isEditRoleOpen && (
        <RoleEditModal id={circle.roleId} isOpen onClose={onEditRoleClose} />
      )}

      {isDeleteOpen && (
        <CircleDeleteModal id={id} isOpen onClose={onDeleteClose} />
      )}
    </>
  )
}
