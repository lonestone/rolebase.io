import Loading from '@/common/atoms/Loading'
import ScrollableLayout from '@/common/atoms/ScrollableLayout'
import { Title } from '@/common/atoms/Title'
import { useHoverItemStyle } from '@/common/hooks/useHoverItemStyle'
import { useAlgoliaSearch } from '@/search/hooks/useAlgoliaSearch'
import { SearchIcon } from '@chakra-ui/icons'
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
  InputLeftElement,
  InputRightElement,
  LinkBox,
  Spacer,
  Tag,
  useDisclosure,
} from '@chakra-ui/react'
import { Member_Role_Enum } from '@gql'
import { truthy } from '@rolebase/shared/helpers/truthy'
import { SearchTypes } from '@rolebase/shared/model/search'
import { useStoreState } from '@store/hooks'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CreateIcon, EditIcon, EmailIcon } from 'src/icons'
import MemberEditModal from '../components/MemberEditModal'
import MemberLinkOverlay from '../components/MemberLinkOverlay'
import useOrgAdmin from '../hooks/useOrgAdmin'
import MemberCreateModal from '../modals/MemberCreateModal'
import MembersInviteModal from '../modals/MembersInviteModal'

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
  const { items, search, loading } = useAlgoliaSearch()
  const [searchText, setSearchText] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  useEffect(() => {
    if (searchText.length !== 0) {
      search(searchText, SearchTypes.Member)
    }
  }, [searchText])

  // Filter members
  const filteredMembers = useMemo(() => {
    if (searchText.length === 0 || !members) {
      return members
    }
    return items
      .map((item) => members.find((member) => member.id === item.id))
      .filter(truthy)
  }, [members, searchText, items])

  return (
    <>
      <Title>{t('MembersPage.heading')}</Title>

      <ScrollableLayout
        header={
          <Flex ml={5} w="100%" alignItems="center" flexWrap="wrap">
            <Heading as="h1" size="lg">
              {t('MembersPage.heading')}
            </Heading>
            <Spacer />

            <InputGroup size="sm" w="auto" my={2}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.500" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder={t('MembersPage.searchPlaceholder')}
                borderRadius="md"
                transition="width 0.2s"
                w={isSearchFocused ? '200px' : '130px'}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {searchText && (
                <InputRightElement _groupFocus={{ display: 'block' }}>
                  <CloseButton
                    colorScheme="gray"
                    size="sm"
                    onClick={() => setSearchText('')}
                  />
                </InputRightElement>
              )}
            </InputGroup>

            {isAdmin && (
              <>
                <Button
                  size="sm"
                  leftIcon={<EmailIcon size={20} />}
                  ml={3}
                  onClick={onInviteOpen}
                >
                  {t('MembersPage.invite')}
                </Button>

                <Button
                  size="md"
                  colorScheme="blue"
                  leftIcon={<CreateIcon size={20} />}
                  ml={2}
                  onClick={onCreateOpen}
                >
                  {t('common.create')}
                </Button>
              </>
            )}
          </Flex>
        }
      >
        <Container maxW="2xl" my={10}>
          {filteredMembers?.map((member) => (
            <LinkBox key={member.id} px={2} py={1} _hover={hover}>
              <HStack>
                <MemberLinkOverlay member={member} />

                {member.userId ? (
                  <>
                    {member.role === Member_Role_Enum.Readonly && (
                      <Tag colorScheme="gray">
                        {t('MembersPage.tags.readonly')}
                      </Tag>
                    )}
                    {member.role === Member_Role_Enum.Member && (
                      <Tag colorScheme="blue">
                        {t('MembersPage.tags.member')}
                      </Tag>
                    )}
                    {member.role === Member_Role_Enum.Admin && (
                      <Tag colorScheme="red">{t('MembersPage.tags.admin')}</Tag>
                    )}
                    {member.role === Member_Role_Enum.Owner && (
                      <Tag colorScheme="purple">
                        {t('MembersPage.tags.owner')}
                      </Tag>
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
                    icon={<EditIcon size={18} />}
                    zIndex={2}
                    onClick={() => handleOpenEdit(member.id)}
                  />
                )}
              </HStack>
            </LinkBox>
          ))}
        </Container>

        <Loading active={loading} size="md" />
      </ScrollableLayout>

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
    </>
  )
}
