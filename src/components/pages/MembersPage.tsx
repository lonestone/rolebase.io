import MemberLinkOverlay from '@atoms/MemberLinkOverlay'
import { Title } from '@atoms/Title'
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
import { Member_Role_Enum } from '@gql'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import useOrgAdmin from '@hooks/useOrgAdmin'
import MemberCreateModal from '@organisms/member/MemberCreateModal'
import MemberEditModal from '@organisms/member/MemberEditModal'
import MembersInviteModal from '@organisms/member/MembersInviteModal'
import { useStoreState } from '@store/hooks'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiEdit3, FiMail, FiPlus } from 'react-icons/fi'

export default function MembersPage() {
  const { t } = useTranslation()
  const isAdmin = useOrgAdmin()
  const members = useStoreState((state) => state.org.members)
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
    <Container maxW="xl" py={10}>
      <Title>{t('MembersPage.heading')}</Title>

      <Flex mb={5} alignItems="center" flexWrap="wrap">
        <Heading as="h1" size="md">
          {t('MembersPage.heading')}
        </Heading>
        <Spacer />

        <InputGroup size="sm" w="auto">
          <Input
            type="text"
            placeholder={t('MembersPage.searchPlaceholder')}
            borderRadius="md"
            w="200px"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <InputRightElement>
            <CloseButton
              colorScheme="gray"
              size="sm"
              onClick={() => setSearchText('')}
            />
          </InputRightElement>
        </InputGroup>

        {isAdmin && (
          <>
            <Button
              size="sm"
              ml={2}
              leftIcon={<FiMail />}
              onClick={onInviteOpen}
            >
              {t('MembersPage.invite')}
            </Button>
            <Button
              size="sm"
              colorScheme="blue"
              ml={1}
              leftIcon={<FiPlus />}
              onClick={onCreateOpen}
            >
              {t('common.create')}
            </Button>
          </>
        )}
      </Flex>

      {filteredMembers?.map((member) => (
        <LinkBox key={member.id} px={2} py={1} _hover={hover}>
          <HStack>
            <MemberLinkOverlay member={member} />

            {member.userId ? (
              <>
                {member.role === Member_Role_Enum.Readonly && (
                  <Tag colorScheme="gray">{t('MembersPage.tags.readonly')}</Tag>
                )}
                {member.role === Member_Role_Enum.Member && (
                  <Tag colorScheme="blue">{t('MembersPage.tags.member')}</Tag>
                )}
                {member.role === Member_Role_Enum.Admin && (
                  <Tag colorScheme="red">{t('MembersPage.tags.admin')}</Tag>
                )}
                {member.role === Member_Role_Enum.Owner && (
                  <Tag colorScheme="purple">{t('MembersPage.tags.owner')}</Tag>
                )}
              </>
            ) : (
              <>
                {member.inviteDate ? (
                  <Tag colorScheme="transparent">
                    {t('MembersPage.tags.invited')}
                  </Tag>
                ) : (
                  <Tag
                    colorScheme="transparent"
                    color="gray.500"
                    _dark={{ color: 'gray.300' }}
                  >
                    {t('MembersPage.tags.notInvited')}
                  </Tag>
                )}
              </>
            )}

            {isAdmin && (
              <IconButton
                aria-label={t('common.edit')}
                size="sm"
                icon={<FiEdit3 />}
                zIndex={2}
                onClick={() => handleOpenEdit(member.id)}
              />
            )}
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

      {isEditOpen &&
        editMemberId &&
        members?.some((m) => m.id === editMemberId) && (
          <MemberEditModal id={editMemberId} isOpen onClose={onEditClose} />
        )}
    </Container>
  )
}
