import { AddIcon, EditIcon } from '@chakra-ui/icons'
import {
  Button,
  CloseButton,
  Heading,
  HStack,
  ListItem,
  Spacer,
  StackItem,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import Panel from '../common/Panel'
import { useStoreState } from '../store/hooks'
import BaseRoleCreateModal from './BaseRoleCreateModal'
import RoleEditModal from './RoleEditModal'

interface Props {
  onClose(): void
}

export default function BaseRolesPanel({ onClose }: Props) {
  const roles = useStoreState((state) => state.roles.entries)
  const baseRoles = useMemo(() => roles?.filter((role) => role.base), [roles])

  // Create modal
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

  // Edit modal
  const [editRoleId, setEditRoleId] = useState<string | undefined>()
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  const handleOpenEdit = (id: string) => {
    setEditRoleId(id)
    onEditOpen()
  }

  return (
    <Panel>
      <Heading size="md" mb={5}>
        <HStack spacing={5}>
          <StackItem>Rôles de base</StackItem>
          <Button leftIcon={<AddIcon />} onClick={onCreateOpen}>
            Créer
          </Button>
          <Spacer />
          <CloseButton onClick={onClose} />
        </HStack>
      </Heading>

      {!baseRoles?.length ? (
        <i>Aucun rôle de base</i>
      ) : (
        <UnorderedList>
          {baseRoles?.map((role) => (
            <ListItem key={role.id}>
              {role.name}{' '}
              <Button size="sm" onClick={() => handleOpenEdit(role.id)}>
                <EditIcon />
              </Button>
            </ListItem>
          ))}
        </UnorderedList>
      )}

      <BaseRoleCreateModal
        isOpen={isCreateOpen}
        onClose={onCreateClose}
        onCreate={(id) => handleOpenEdit(id)}
      />

      {editRoleId && (
        <RoleEditModal
          id={editRoleId}
          isOpen={isEditOpen}
          onClose={onEditClose}
        />
      )}
    </Panel>
  )
}
