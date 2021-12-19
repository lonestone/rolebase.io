import {
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  Spacer,
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
import Markdown from '@components/atoms/Markdown'
import Panel from '@components/atoms/Panel'
import CircleMemberFormControl from '@components/molecules/CircleMemberFormControl'
import MeetingsInCircleList from '@components/molecules/MeetingsInCircleList'
import SubCirclesFormControl from '@components/molecules/SubCirclesFormControl'
import ThreadsInCircleList from '@components/molecules/ThreadsInCircleList'
import useCircleAndParents from '@hooks/useCircleAndParents'
import React from 'react'
import CircleDeleteModal from '../modals/CircleDeleteModal'
import RoleEditModal from '../modals/RoleEditModal'

interface Props {
  id: string
  onClose(): void
}

export default function CirclePanel({ id, onClose }: Props) {
  const circleAndParents = useCircleAndParents(id)
  const circle = circleAndParents?.[circleAndParents.length - 1]
  const role = circle?.role

  // Parent circles
  const parentCircle = circleAndParents?.[circleAndParents.length - 2]
  const parentParentCircle = circleAndParents?.[circleAndParents.length - 3]

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
    <Panel>
      <Flex mb={5}>
        <Flex>
          <CircleAndParentsButton
            id={id}
            ml="0.4em"
            colorScheme="green"
            onEdit={onEditRoleOpen}
            onDelete={onDeleteOpen}
          />
        </Flex>
        <Spacer />
        <CloseButton onClick={onClose} />
      </Flex>

      <Tabs isLazy variant="enclosed">
        <TabList mx={-5}>
          <Tab>{role?.singleMember ? 'Rôle' : 'Cercle'}</Tab>
          <Tab>Discussions</Tab>
          <Tab>Réunions</Tab>
        </TabList>

        <TabPanels mt={5}>
          <TabPanel p={0}>
            <VStack spacing={5}>
              {role?.purpose && (
                <FormControl>
                  <FormLabel>Raison d'être :</FormLabel>
                  <Markdown fontSize="xl">{role.purpose}</Markdown>
                </FormControl>
              )}

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

              {!role?.singleMember ? (
                <SubCirclesFormControl circleId={id} />
              ) : null}

              <CircleMemberFormControl circleId={id} />

              {role?.link && <Text>Représente le Cercle {}</Text>}
            </VStack>
          </TabPanel>

          <TabPanel p={0}>
            <ThreadsInCircleList circleId={id} />
          </TabPanel>

          <TabPanel p={0}>
            <MeetingsInCircleList circleId={id} />
          </TabPanel>
        </TabPanels>
      </Tabs>

      {isEditRoleOpen && (
        <RoleEditModal id={circle.roleId} isOpen onClose={onEditRoleClose} />
      )}

      {isDeleteOpen && (
        <CircleDeleteModal id={id} isOpen onClose={onDeleteClose} />
      )}
    </Panel>
  )
}
