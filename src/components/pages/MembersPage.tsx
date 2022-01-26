import {
  Button,
  CloseButton,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  LinkBox,
  Spacer,
  Tag,
  useDisclosure,
} from '@chakra-ui/react'
import MemberLinkOverlay from '@components/atoms/MemberLinkOverlay'
import { Title } from '@components/atoms/Title'
import MemberCreateModal from '@components/organisms/modals/MemberCreateModal'
import MemberEditModal from '@components/organisms/modals/MemberEditModal'
import MembersInviteModal from '@components/organisms/modals/MembersInviteModal'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import { ClaimRole } from '@shared/userClaims'
import { useStoreState } from '@store/hooks'
import React, { useMemo, useState } from 'react'
import { FiEdit3, FiMail, FiPlus } from 'react-icons/fi'

export default function MembersPage() {
  const members = useStoreState((state) => state.members.entries)
  const hover = useHoverItemStyle()

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
    <Container maxW="xl" mt={10}>
      <Title>Membres</Title>

      <Flex mb={5} alignItems="center" flexWrap="wrap">
        <Heading as="h1" size="md">
          Membres
        </Heading>
        <Spacer />

        <InputGroup size="sm" w="auto">
          <Input
            type="text"
            placeholder="Rechercher..."
            borderRadius="md"
            w="200px"
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

        <Button size="sm" ml={2} leftIcon={<FiMail />} onClick={onInviteOpen}>
          Inviter
        </Button>
        <Button size="sm" ml={2} leftIcon={<FiPlus />} onClick={onCreateOpen}>
          Créer
        </Button>
      </Flex>

      {filteredMembers?.map((member) => (
        <LinkBox key={member.id} px={2} py={1} _hover={hover}>
          <HStack>
            <MemberLinkOverlay member={member} />

            {member.userId ? (
              <>
                {member.role === ClaimRole.Readonly && (
                  <Tag colorScheme="gray">Lecture seule</Tag>
                )}
                {member.role === ClaimRole.Member && (
                  <Tag colorScheme="blue">Membre</Tag>
                )}
                {member.role === ClaimRole.Admin && (
                  <Tag colorScheme="red">Admin</Tag>
                )}
              </>
            ) : (
              <>
                {member.inviteDate ? (
                  <Tag colorScheme="transparent">Invité.e</Tag>
                ) : (
                  <Tag colorScheme="transparent" color="gray.400">
                    Pas invité.e
                  </Tag>
                )}
              </>
            )}

            <IconButton
              aria-label=""
              size="sm"
              icon={<FiEdit3 />}
              onClick={() => handleOpenEdit(member.id)}
            />
          </HStack>
        </LinkBox>
      ))}

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
