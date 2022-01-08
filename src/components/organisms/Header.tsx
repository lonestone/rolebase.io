import { Flex, Heading, Spacer } from '@chakra-ui/react'
import HeaderButton from '@components/atoms/HeaderButton'
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
import {
  FiCalendar,
  FiCheckSquare,
  FiDisc,
  FiMessageSquare,
} from 'react-icons/fi'

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
      w="100%"
      alignItems="center"
      h="48px"
      px={1}
      bg="hsl(192deg 22% 95%)"
      shadow="md"
      zIndex={1}
    >
      {org && (
        <>
          <OrgMenu />

          <Heading size="sm" ml={5} mr={5}>
            {org.name}
          </Heading>

          <HeaderButton exact to={`/orgs/${org.id}`} leftIcon={<FiDisc />}>
            Cercles
          </HeaderButton>

          <HeaderButton
            to={`/orgs/${org.id}/threads`}
            leftIcon={<FiMessageSquare />}
          >
            Discussions
          </HeaderButton>

          <HeaderButton
            to={`/orgs/${org.id}/meetings`}
            leftIcon={<FiCalendar />}
          >
            Réunions
          </HeaderButton>

          <HeaderButton
            to={`/orgs/${org.id}/tasks`}
            leftIcon={<FiCheckSquare />}
          >
            Tâches
          </HeaderButton>
        </>
      )}

      <Spacer />

      {org && <SearchCombobox onSelect={handleSelect} />}

      <UserMenu ml={2} />
    </Flex>
  )
}
