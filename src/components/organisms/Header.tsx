import { Flex, Heading, HStack, Spacer, StackItem } from '@chakra-ui/react'
import LinkButton from '@components/atoms/LinkButton'
import OrgMenu from '@components/molecules/OrgMenu'
import SearchCombobox from '@components/molecules/search/SearchCombobox'
import {
  SearchItem,
  SearchItemTypes,
} from '@components/molecules/search/searchItems'
import UserMenu from '@components/molecules/UserMenu'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import { useStoreState } from '@store/hooks'
import React, { useCallback } from 'react'
import { FiCalendar, FiDisc, FiMessageSquare } from 'react-icons/fi'

export default function Header() {
  const user = useStoreState((state) => state.auth.user)
  const org = useCurrentOrg()

  const navigateOrg = useNavigateOrg()

  const handleSelect = useCallback((item: SearchItem) => {
    if (item.type === SearchItemTypes.Member) {
      navigateOrg(`?memberId=${item.member.id}`)
    } else if (item.type === SearchItemTypes.Circle) {
      navigateOrg(`?circleId=${item.circle.id}`)
    } else if (item.type === SearchItemTypes.CircleMember) {
      navigateOrg(`?circleId=${item.circle.id}&memberId=${item.member.id}`)
    }
  }, [])

  if (!user) return null
  return (
    <Flex
      position="absolute"
      zIndex="1"
      top="0"
      left="0"
      width="100%"
      alignItems="center"
      padding={2}
      pointerEvents="none"
    >
      <HStack spacing={2} w="100%">
        {org && (
          <>
            <StackItem pointerEvents="auto">
              <OrgMenu />
            </StackItem>

            <StackItem>
              <Heading size="md" marginLeft={5} marginRight={5}>
                {org.name}
              </Heading>
            </StackItem>

            <LinkButton
              to={`/orgs/${org.id}`}
              leftIcon={<FiDisc />}
              size="sm"
              highlightActive
            >
              Cercles
            </LinkButton>

            <LinkButton
              to={`/orgs/${org.id}/threads`}
              leftIcon={<FiMessageSquare />}
              size="sm"
              highlightActive
            >
              Discussions
            </LinkButton>

            <LinkButton
              to={`/orgs/${org.id}/meetings`}
              leftIcon={<FiCalendar />}
              size="sm"
              highlightActive
            >
              Réunions
            </LinkButton>
          </>
        )}

        <Spacer />

        {org && (
          <StackItem pointerEvents="auto">
            <SearchCombobox onSelect={handleSelect} />
          </StackItem>
        )}

        <StackItem pointerEvents="auto">
          <UserMenu />
        </StackItem>
      </HStack>
    </Flex>
  )
}
