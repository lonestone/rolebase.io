import { auth } from '@api/firebase'
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
  Portal,
  useDisclosure,
} from '@chakra-ui/react'
import CircleMemberLink from '@components/atoms/CircleMemberLink'
import CurrentUserModal from '@components/organisms/modals/CurrentUserModal'
import useCurrentMember from '@hooks/useCurrentMember'
import { useStoreState } from '@store/hooks'
import React from 'react'

export default function UserMenu(props: MenuButtonProps) {
  const firebaseUser = useStoreState((state) => state.auth.firebaseUser)
  const member = useCurrentMember()

  const name = member?.name || firebaseUser?.displayName || '?'
  const picture = member?.picture || firebaseUser?.photoURL || '?'

  const {
    isOpen: isCurrentUserOpen,
    onOpen: onCurrentUserOpen,
    onClose: onCurrentUserClose,
  } = useDisclosure()

  if (!firebaseUser) return null
  return (
    <>
      <Menu>
        <MenuButton as={Button} variant="ghost" size="sm" px={1} {...props}>
          <Avatar name={name} src={picture || undefined} size="xs" />
        </MenuButton>
        <Portal>
          <MenuList zIndex={10} shadow="lg">
            {member && (
              <CircleMemberLink memberId={member.id}>
                <MenuItem>Ma fiche membre</MenuItem>
              </CircleMemberLink>
            )}
            <MenuItem onClick={onCurrentUserOpen}>
              Informations personnelles
            </MenuItem>
            <MenuItem onClick={() => auth.signOut()}>Déconnexion</MenuItem>
          </MenuList>
        </Portal>
      </Menu>

      {isCurrentUserOpen && (
        <CurrentUserModal isOpen onClose={onCurrentUserClose} />
      )}
    </>
  )
}
