import {
  Button,
  Center,
  CloseButton,
  FormControl,
  FormLabel,
  HStack,
  Spacer,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import CircleAndParentsButton from '@components/atoms/CircleAndParentsButton'
import Markdown from '@components/atoms/Markdown'
import Panel from '@components/atoms/Panel'
import CircleMemberFormControl from '@components/molecules/CircleMemberFormControl'
import SubCirclesFormControl from '@components/molecules/SubCirclesFormControl'
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
      <HStack spacing={5} mb={5}>
        <CircleAndParentsButton id={id} />
        <Spacer />
        <CloseButton onClick={onClose} />
      </HStack>

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

        <Center>
          <Button onClick={onEditRoleOpen}>Modifier le rôle</Button>
          <Button colorScheme="red" variant="ghost" onClick={onDeleteOpen}>
            Supprimer
          </Button>
        </Center>

        {!role?.singleMember ? <SubCirclesFormControl circleId={id} /> : null}

        <CircleMemberFormControl circleId={id} />
      </VStack>

      <RoleEditModal
        id={circle.roleId}
        isOpen={isEditRoleOpen}
        onClose={onEditRoleClose}
      />

      <CircleDeleteModal
        id={id}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
      />
    </Panel>
  )
}
