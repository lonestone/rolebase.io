import Loading from '@/common/atoms/Loading'
import ScrollableLayout from '@/common/atoms/ScrollableLayout'
import { Title } from '@/common/atoms/Title'
import { useHoverItemStyle } from '@/common/hooks/useHoverItemStyle'
import { useAlgoliaSearch } from '@/search/hooks/useAlgoliaSearch'
import { SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  LinkBox,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react'
import { truthy } from '@rolebase/shared/helpers/truthy'
import { SearchTypes } from '@rolebase/shared/model/search'
import { useStoreState } from '@store/hooks'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EmailIcon } from 'src/icons'
import MemberLinkOverlay from '../components/MemberLinkOverlay'
import MemberOrgRoleSelect from '../components/MemberOrgRoleSelect'
import useOrgAdmin from '../hooks/useOrgAdmin'
import MembersInviteModal from '../modals/MembersInviteModal'

export default function MembersPage() {
  const { t } = useTranslation()
  const isAdmin = useOrgAdmin()
  const members = useStoreState((state) => state.org.members)
  const hover = useHoverItemStyle()

  // Invite modal
  const {
    isOpen: isInviteOpen,
    onOpen: onInviteOpen,
    onClose: onInviteClose,
  } = useDisclosure()

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
              <Button
                size="md"
                colorScheme="blue"
                leftIcon={<EmailIcon size={20} />}
                ml={3}
                onClick={onInviteOpen}
              >
                {t('MembersPage.invite')}
              </Button>
            )}
          </Flex>
        }
      >
        <Box maxW="2xl" my={10} px={{ base: 5, sm: 10 }}>
          {filteredMembers?.map((member) => (
            <LinkBox key={member.id} px={2} py={1} _hover={hover}>
              <HStack>
                <MemberLinkOverlay member={member} />
                <MemberOrgRoleSelect member={member} size="sm" />
              </HStack>
            </LinkBox>
          ))}
        </Box>

        <Loading active={loading} size="md" />
      </ScrollableLayout>

      {isInviteOpen && <MembersInviteModal isOpen onClose={onInviteClose} />}
    </>
  )
}
