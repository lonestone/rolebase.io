import { Flex, Heading, Spacer } from '@chakra-ui/react'
import HeaderButton from '@components/atoms/HeaderButton'
import OrgMenu from '@components/molecules/OrgMenu'
import HeaderSearchCombobox from '@components/molecules/search/HeaderSearchCombobox'
import UserMenu from '@components/molecules/UserMenu'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { useStoreState } from '@store/hooks'
import React from 'react'
import {
  FiCalendar,
  FiCheckSquare,
  FiDisc,
  FiMessageSquare,
} from 'react-icons/fi'

export default function Header() {
  const user = useStoreState((state) => state.auth.user)
  const org = useCurrentOrg()

  if (!user) return null
  return (
    <Flex
      w="100%"
      h="48px"
      alignItems="center"
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

      {org && <HeaderSearchCombobox />}

      <UserMenu ml={2} />
    </Flex>
  )
}
