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
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'
import CircleMemberLink from '@components/atoms/CircleMemberLink'
import CurrentUserModal from '@components/organisms/modals/CurrentUserModal'
import useCurrentMember from '@hooks/useCurrentMember'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { FiEdit3, FiLogOut, FiMoon, FiSun, FiUser } from 'react-icons/fi'

export default function HeaderUserMenu(props: MenuButtonProps) {
  const firebaseUser = useStoreState((state) => state.auth.firebaseUser)
  const member = useCurrentMember()
  const { colorMode, toggleColorMode } = useColorMode()

  const name = member?.name || firebaseUser?.displayName || '?'
  const picture = member?.picture || firebaseUser?.photoURL || '?'

  const {
    isOpen: isCurrentUserOpen,
    onOpen: onCurrentUserOpen,
    onClose: onCurrentUserClose,
  } = useDisclosure()

  if (!firebaseUser) return null
  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" size="sm" px={1} {...props}>
        <Avatar name={name} src={picture || undefined} size="xs" />
      </MenuButton>

      <Portal>
        <MenuList zIndex={10} shadow="lg">
          {member && (
            <CircleMemberLink memberId={member.id}>
              <MenuItem icon={<FiUser />}>Ma fiche membre</MenuItem>
            </CircleMemberLink>
          )}

          <MenuItem icon={<FiEdit3 />} onClick={onCurrentUserOpen}>
            Informations personnelles
          </MenuItem>

          <MenuItem
            icon={colorMode === 'light' ? <FiSun /> : <FiMoon />}
            onClick={toggleColorMode}
          >
            Thème clair/sombre
          </MenuItem>

          <MenuItem icon={<FiLogOut />} onClick={() => auth.signOut()}>
            Déconnexion
          </MenuItem>
        </MenuList>
      </Portal>

      {isCurrentUserOpen && (
        <CurrentUserModal isOpen onClose={onCurrentUserClose} />
      )}
    </Menu>
  )
}
