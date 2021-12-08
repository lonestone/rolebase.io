import { AddIcon, EmailIcon } from '@chakra-ui/icons'
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
  useDisclosure,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import MemberButton from '@components/atoms/MemberButton'
import MemberCreateModal from '@components/organisms/modals/MemberCreateModal'
import MemberEditModal from '@components/organisms/modals/MemberEditModal'
import MembersInviteModal from '@components/organisms/modals/MembersInviteModal'
import { useStoreState } from '@store/hooks'
import React, { useMemo, useState } from 'react'

export default function MembersPage() {
  const members = useStoreState((state) => state.members.entries)

  // Create modal
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

  // Invite modal
  const {
    isOpen: isInviteOpen,
    onOpen: onInviteOpen,
    onClose: onInviteClose,
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
    <Container maxW="3xl" marginTop="60px">
      <HStack margin="30px 0">
        <Heading as="h2" size="md">
          Membres
        </Heading>
        <Spacer />
        <Button leftIcon={<AddIcon />} onClick={onCreateOpen}>
          Créer
        </Button>
        <Button leftIcon={<EmailIcon />} onClick={onInviteOpen}>
          Inviter
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

      {filteredMembers && (
        <Wrap spacing={5}>
          {filteredMembers.map((member) => (
            <WrapItem key={member.id}>
              <MemberButton
                member={member}
                onClick={() => handleOpenEdit(member.id)}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}

      {isCreateOpen && (
        <MemberCreateModal
          isOpen
          onClose={onCreateClose}
          onCreate={(id) => handleOpenEdit(id)}
        />
      )}

      {isInviteOpen && <MembersInviteModal isOpen onClose={onInviteClose} />}

      {isEditOpen && editMemberId && (
        <MemberEditModal id={editMemberId} isOpen onClose={onEditClose} />
      )}
    </Container>
  )
}
