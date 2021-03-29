import { ArrowLeftIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Button,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  StackItem,
} from '@chakra-ui/react'
import React from 'react'
import { auth } from '../../api/firebase'
import useOrg from '../../hooks/useOrg'
import Search from '../../search/Search'
import { useStoreState } from '../store/hooks'
import HeaderLink from './HeaderLink'

export default function Header() {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const org = useOrg(orgId)
  const user = useStoreState((state) => state.auth.user)

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
            <HeaderLink to="/">
              <ArrowLeftIcon />
            </HeaderLink>
            <StackItem>
              <Heading size="md" marginLeft={5} marginRight={5}>
                {org.name}
              </Heading>
            </StackItem>
            <HeaderLink to={`/orgs/${orgId}`}>Cercles</HeaderLink>
            <HeaderLink to={`/orgs/${orgId}/members`}>Membres</HeaderLink>
            <HeaderLink to={`/orgs/${orgId}/roles`}>Rôles</HeaderLink>
          </>
        )}

        <Spacer />

        <StackItem pointerEvents="auto">
          <Search />
        </StackItem>

        <StackItem pointerEvents="auto">
          <Menu>
            <MenuButton as={Button} variant="ghost">
              <Avatar
                name={user.name}
                src={user.picture || undefined}
                size="sm"
              />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => auth.signOut()}>Déconnexion</MenuItem>
            </MenuList>
          </Menu>
        </StackItem>
      </HStack>
    </Flex>
  )
}
