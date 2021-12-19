import { auth } from '@api/firebase'
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import useCurrentMember from '@hooks/useCurrentMember'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import { useStoreState } from '@store/hooks'
import React from 'react'

export default function UserMenu() {
  const user = useStoreState((state) => state.auth.user)

  const navigateOrg = useNavigateOrg()
  const member = useCurrentMember()
  const org = useCurrentOrg()

  if (!user) return null
  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" size="sm" px={1}>
        <Avatar name={user.name} src={user.picture || undefined} size="xs" />
      </MenuButton>
      <MenuList shadow="lg">
        {org && member && (
          <MenuItem onClick={() => navigateOrg(`?memberId=${member.id}`)}>
            Mes rôles
          </MenuItem>
        )}
        <MenuItem onClick={() => auth.signOut()}>Déconnexion</MenuItem>
      </MenuList>
    </Menu>
  )
}
