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
import React, { useMemo } from 'react'
import { FiCircle, FiMessageSquare, FiUser } from 'react-icons/fi'
import { auth } from '../../api/firebase'
import useCurrentOrg from '../../hooks/useCurrentOrg'
import { useNavigateOrg } from '../../hooks/useNavigateOrg'
import { useStoreState } from '../../store/hooks'
import LinkButton from '../atoms/LinkButton'
import Search from '../molecules/search/Search'

export default function Header() {
  const user = useStoreState((state) => state.auth.user)
  if (!user) return null

  const org = useCurrentOrg()
  const members = useStoreState((state) => state.members.entries)
  const navigateOrg = useNavigateOrg()
  const userMember = useMemo(
    () => members?.find((m) => m.userId === user.id),
    [user, members]
  )

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
            <LinkButton to="/">
              <ArrowLeftIcon />
            </LinkButton>

            <StackItem>
              <Heading size="md" marginLeft={5} marginRight={5}>
                {org.name}
              </Heading>
            </StackItem>

            <LinkButton
              to={`/orgs/${org.id}`}
              leftIcon={<FiCircle />}
              highlightActive
            >
              Cercles
            </LinkButton>
            <LinkButton
              to={`/orgs/${org.id}/members`}
              leftIcon={<FiUser />}
              highlightActive
            >
              Membres
            </LinkButton>
            <LinkButton
              to={`/orgs/${org.id}/threads`}
              leftIcon={<FiMessageSquare />}
              highlightActive
            >
              Discussions
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
          <Menu>
            <MenuButton as={Button} variant="ghost">
              <Avatar
                name={user.name}
                src={user.picture || undefined}
                size="sm"
              />
            </MenuButton>
            <MenuList>
              {userMember && (
                <MenuItem
                  onClick={() => navigateOrg(`?memberId=${userMember.id}`)}
                >
                  Mes rôles
                </MenuItem>
              )}
              <MenuItem onClick={() => auth.signOut()}>Déconnexion</MenuItem>
            </MenuList>
          </Menu>
        </StackItem>
      </HStack>
    </Flex>
  )
}
