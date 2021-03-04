import { AddIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Button,
  CloseButton,
  Container,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  useDisclosure,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import { useMembers } from '../../data/members'
import Loading from '../Loading'
import MemberCreateModal from '../members/MemberCreateModal'
import MemberEditModal from '../members/MemberEditModal'
import TextErrors from '../TextErrors'

export default function MembersPage() {
  const [members, loading, error] = useMembers()

  // Add modal
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure()

  // Edit modal
  const [editMemberId, setEditMemberId] = useState<string | undefined>()
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  const handleOpenEdit = (id: string) => {
    setEditMemberId(id)
    onEditOpen()
  }

  // Search
  const [searchText, setSearchText] = useState('')

  // Filter members
  const filteredMembers = useMemo(() => {
    const text = searchText.toLowerCase()
    return members?.filter(
      (member) => member.name.toLowerCase().indexOf(text) !== -1
    )
  }, [members, searchText])

  return (
    <Container maxW="xl" marginTop="60px">
      <HStack spacing={10} margin="30px 0">
        <Heading as="h2" size="md">
          Membres
        </Heading>
        <IconButton
          aria-label="Ajouter un membre"
          icon={<AddIcon />}
          onClick={onAddOpen}
        />
        <Spacer />
        <InputGroup>
          <Input
            type="text"
            placeholder="Rechercher..."
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

      <Loading active={loading} />
      <TextErrors errors={[error]} />

      {filteredMembers && (
        <Wrap spacing={5}>
          {filteredMembers.map((member) => (
            <WrapItem key={member.id}>
              <Button onClick={() => handleOpenEdit(member.id)}>
                <Avatar
                  name={member.name}
                  src={member.picture || undefined}
                  size="md"
                  marginLeft="-25px"
                  marginRight={2}
                />
                {member.name}
              </Button>
            </WrapItem>
          ))}
        </Wrap>
      )}

      <MemberCreateModal isOpen={isAddOpen} onClose={onAddClose} />

      {editMemberId && (
        <MemberEditModal
          id={editMemberId}
          isOpen={isEditOpen}
          onClose={onEditClose}
        />
      )}
    </Container>
  )
}
