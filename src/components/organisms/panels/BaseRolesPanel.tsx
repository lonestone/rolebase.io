import { AddIcon } from '@chakra-ui/icons'
import {
  Button,
  CloseButton,
  Heading,
  HStack,
  IconButton,
  ListItem,
  Spacer,
  StackItem,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react'
import Panel from '@components/atoms/Panel'
import { useStoreState } from '@store/hooks'
import React, { useMemo, useState } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import BaseRoleCreateModal from '../modals/BaseRoleCreateModal'
import RoleEditModal from '../modals/RoleEditModal'

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
              <IconButton
                aria-label=""
                size="sm"
                onClick={() => handleOpenEdit(role.id)}
                icon={<FiEdit3 />}
              />
            </ListItem>
          ))}
        </UnorderedList>
      )}

      {isCreateOpen && (
        <BaseRoleCreateModal
          isOpen
          onClose={onCreateClose}
          onCreate={(id) => handleOpenEdit(id)}
        />
      )}

      {isEditOpen && editRoleId && (
        <RoleEditModal id={editRoleId} isOpen onClose={onEditClose} />
      )}
    </Panel>
  )
}
