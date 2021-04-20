import { AddIcon } from '@chakra-ui/icons'
import {
  Button,
  CloseButton,
  Container,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import RoleCreateModal from '../roles/RoleCreateModal'
import RoleEditModal from '../roles/RoleEditModal'
import { useStoreState } from '../store/hooks'

export default function RolesPage() {
  const roles = useStoreState((state) => state.roles.entries)

  // Add modal
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
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

  // Search
  const [searchText, setSearchText] = useState('')

  // Filter members
  const filteredRoles = useMemo(() => {
    const text = searchText.toLowerCase()
    return roles?.filter((role) => role.name.toLowerCase().indexOf(text) !== -1)
  }, [roles, searchText])

  return (
    <Container maxW="xl" marginTop="60px">
      <HStack margin="30px 0">
        <Heading as="h2" size="md">
          Rôles
        </Heading>
        <Spacer />
        <Button ml="2em" leftIcon={<AddIcon />} onClick={onAddOpen}>
          Ajouter un rôle
        </Button>
        <Spacer />
        <InputGroup w="auto">
          <Input
            type="text"
            placeholder="Rechercher..."
            w="200px"
            _focus={{ width: '250px' }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <InputRightElement
            children={
              <CloseButton
                colorScheme="gray"
                size="sm"
                onClick={() => setSearchText('')}
              />
            }
          />
        </InputGroup>
      </HStack>

      <Stack direction="column" marginX="-1rem">
        {filteredRoles?.map((role) => (
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

      <RoleCreateModal
        isOpen={isAddOpen}
        onClose={onAddClose}
        onCreate={(id) => handleOpenEdit(id)}
      />

      {editRoleId && (
        <RoleEditModal
          id={editRoleId}
          isOpen={isEditOpen}
          onClose={onEditClose}
        />
      )}
    </Container>
  )
}
