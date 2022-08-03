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
import useAdmin from '@hooks/useAdmin'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import { ClaimRole } from '@shared/model/userClaims'
import { useStoreState } from '@store/hooks'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiEdit3, FiMail, FiPlus } from 'react-icons/fi'

export default function MembersPage() {
  const { t } = useTranslation()
  const isAdmin = useAdmin()
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
    <Container maxW="xl" py={10}>
      <Title>{t('pages.MembersPage.heading')}</Title>

      <Flex mb={5} alignItems="center" flexWrap="wrap">
        <Heading as="h1" size="md">
          {t('pages.MembersPage.heading')}
        </Heading>
        <Spacer />

        <InputGroup size="sm" w="auto">
          <Input
            type="text"
            placeholder={t('pages.MembersPage.searchPlaceholder')}
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
              {t('pages.MembersPage.invite')}
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
                {member.role === ClaimRole.Readonly && (
                  <Tag colorScheme="gray">
                    {t('pages.MembersPage.tags.readonly')}
                  </Tag>
                )}
                {member.role === ClaimRole.Member && (
                  <Tag colorScheme="blue">
                    {t('pages.MembersPage.tags.member')}
                  </Tag>
                )}
                {member.role === ClaimRole.Admin && (
                  <Tag colorScheme="red">
                    {t('pages.MembersPage.tags.admin')}
                  </Tag>
                )}
              </>
            ) : (
              <>
                {member.inviteDate ? (
                  <Tag colorScheme="transparent">
                    {t('pages.MembersPage.tags.invited')}
                  </Tag>
                ) : (
                  <Tag colorScheme="transparent" color="gray.500">
                    {t('pages.MembersPage.tags.notInvited')}
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

      {isEditOpen && editMemberId && (
        <MemberEditModal id={editMemberId} isOpen onClose={onEditClose} />
      )}
    </Container>
  )
}
