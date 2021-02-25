import { AddIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Spinner,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useRoles } from '../../data/roles'
import RoleCreateModal from '../roles/RoleCreateModal'
import RoleEditModal from '../roles/RoleEditModal'
import TextError from '../TextError'

export default function RolesPage() {
  const [roles, loading, error] = useRoles()
  const [editRoleId, setEditRoleId] = useState<string | undefined>()
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure()
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
    <Box width={200} p={5} borderRadius={3} boxShadow="0 0 5px rgb(0,0,0,0.3)">
      <Flex alignItems="center">
        <Heading as="h2" size="sm">
          Rôles
        </Heading>
        <Spacer />
        <IconButton
          aria-label="Ajouter un rôle"
          icon={<AddIcon />}
          onClick={onAddOpen}
        />
      </Flex>
      {error && <TextError error={error} />}
      {loading && <Spinner />}
      {roles && (
        <Stack direction="column" marginX="-1rem">
          {roles.map((role) => (
            <Button
              variant="ghost"
              key={role.name}
              justifyContent="left"
              onClick={() => handleOpenEdit(role.id)}
            >
              {role.name}
            </Button>
          ))}
        </Stack>
      )}

      <RoleCreateModal isOpen={isAddOpen} onClose={onAddClose} />

      {editRoleId && (
        <RoleEditModal
          id={editRoleId}
          isOpen={isEditOpen}
          onClose={onEditClose}
        />
      )}
    </Box>
  )
}
