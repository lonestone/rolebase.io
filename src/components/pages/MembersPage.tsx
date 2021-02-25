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
import { useMembers } from '../../data/members'
import MemberCreateModal from '../members/MemberCreateModal'
import MemberEditModal from '../members/MemberEditModal'
import TextError from '../TextError'

export default function MembersPage() {
  const [members, loading, error] = useMembers()
  const [editMemberId, setEditMemberId] = useState<string | undefined>()
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
    setEditMemberId(id)
    onEditOpen()
  }

  return (
    <Box width={200} p={5} borderRadius={3} boxShadow="0 0 5px rgb(0,0,0,0.3)">
      <Flex alignItems="center">
        <Heading as="h2" size="sm">
          Membres
        </Heading>
        <Spacer />
        <IconButton
          aria-label="Ajouter un membre"
          icon={<AddIcon />}
          onClick={onAddOpen}
        />
      </Flex>
      {error && <TextError error={error} />}
      {loading && <Spinner />}
      {members && (
        <Stack direction="column" marginX="-1rem">
          {members.map((member) => (
            <Button
              variant="ghost"
              key={member.name}
              justifyContent="left"
              onClick={() => handleOpenEdit(member.id)}
            >
              {member.name}
            </Button>
          ))}
        </Stack>
      )}

      <MemberCreateModal isOpen={isAddOpen} onClose={onAddClose} />

      {editMemberId && (
        <MemberEditModal
          id={editMemberId}
          isOpen={isEditOpen}
          onClose={onEditClose}
        />
      )}
    </Box>
  )
}
