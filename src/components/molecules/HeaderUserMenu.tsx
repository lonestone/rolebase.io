import { auth } from '@api/firebase'
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'
import CircleMemberLink from '@components/atoms/CircleMemberLink'
import CurrentUserModal from '@components/organisms/modals/CurrentUserModal'
import LangModal from '@components/organisms/modals/LangModal'
import useCurrentMember from '@hooks/useCurrentMember'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiEdit3, FiLogOut, FiMoon, FiSun, FiUser } from 'react-icons/fi'
import { IoLanguage } from 'react-icons/io5'

export default function HeaderUserMenu(props: MenuButtonProps) {
  const { t } = useTranslation()
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

  const {
    isOpen: isLangOpen,
    onOpen: onLangOpen,
    onClose: onLangClose,
  } = useDisclosure()

  if (!firebaseUser) return null
  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" size="sm" px={1} {...props}>
        <Avatar name={name} src={picture || undefined} size="xs" />
      </MenuButton>

      <MenuList zIndex={10} shadow="lg">
        {member && (
          <CircleMemberLink memberId={member.id}>
            <MenuItem icon={<FiUser />}>
              {t('molecules.HeaderUserMenu.member')}
            </MenuItem>
          </CircleMemberLink>
        )}

        <MenuItem icon={<FiEdit3 />} onClick={onCurrentUserOpen}>
          {t('molecules.HeaderUserMenu.user')}
        </MenuItem>

        <MenuItem
          icon={colorMode === 'light' ? <FiSun /> : <FiMoon />}
          onClick={toggleColorMode}
        >
          {t('molecules.HeaderUserMenu.theme')}
        </MenuItem>

        <MenuItem icon={<IoLanguage />} onClick={onLangOpen}>
          {t('molecules.HeaderUserMenu.lang')}
        </MenuItem>

        <MenuItem icon={<FiLogOut />} onClick={() => auth.signOut()}>
          {t('molecules.HeaderUserMenu.signout')}
        </MenuItem>
      </MenuList>

      {isCurrentUserOpen && (
        <CurrentUserModal isOpen onClose={onCurrentUserClose} />
      )}

      {isLangOpen && <LangModal isOpen onClose={onLangClose} />}
    </Menu>
  )
}
