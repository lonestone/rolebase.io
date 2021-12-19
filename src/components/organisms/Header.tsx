import { Flex, Heading, HStack, Spacer, StackItem } from '@chakra-ui/react'
import LinkButton from '@components/atoms/LinkButton'
import OrgMenu from '@components/molecules/OrgMenu'
import Search from '@components/molecules/search/Search'
import UserMenu from '@components/molecules/UserMenu'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { FiCalendar, FiDisc, FiMessageSquare } from 'react-icons/fi'

export default function Header() {
  const user = useStoreState((state) => state.auth.user)
  const org = useCurrentOrg()

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
            <Search />
          </StackItem>
        )}

        <StackItem pointerEvents="auto">
          <UserMenu />
        </StackItem>
      </HStack>
    </Flex>
  )
}
