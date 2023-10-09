import CircleMemberLink from '@atoms/CircleMemberLink'
import MemberButton from '@atoms/MemberButton'
import {
  BoxProps,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useButtonGroup,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'
import useCurrentMember from '@hooks/useCurrentMember'
import useSuperAdmin from '@hooks/useSuperAdmin'
import useUserSignOut from '@hooks/useUserSignOut'
import { useUserData } from '@nhost/react'
import LangModal from '@organisms/layout/LangModal'
import CurrentUserModal from '@organisms/user/CurrentUserModal'
import NotificationsSettingsModal from '@organisms/user/NotificationsSettingsModal'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  AppsIcon,
  ChevronRightIcon,
  CurrentMemberIcon,
  DarkThemeIcon,
  LanguageIcon,
  LightThemeIcon,
  LogoutIcon,
  NotificationIcon,
  SuperAdminIcon,
  UserInfoIcon,
} from 'src/icons'

interface Props extends BoxProps {
  isMobile: boolean
}

export default function UserMenu({ isMobile, ...boxProps }: Props) {
  const { t } = useTranslation()
  const user = useUserData()
  const member = useCurrentMember()
  const isSuperAdmin = useSuperAdmin()
  const signOut = useUserSignOut()
  const { colorMode, toggleColorMode } = useColorMode()

  const menu = useDisclosure()
  const currentUserModal = useDisclosure()
  const notificationsModal = useDisclosure()
  const langModal = useDisclosure()
  const buttonGroup = useButtonGroup()
  const size = buttonGroup?.size

  if (!user) return null

  return (
    <Flex {...boxProps}>
      <Menu isOpen={menu.isOpen} placement={isMobile ? 'auto' : 'right-end'}>
        <MenuButton
          as={MemberButton}
          rightIcon={<ChevronRightIcon size="1em" />}
          size={size}
          variant="ghost"
          w="100%"
          pl={5}
          justifyContent="start"
          borderRadius="xl"
          member={
            member || {
              name: user?.displayName || '?',
              picture: user?.avatarUrl || '?',
            }
          }
          maxNameLength={15}
          _active={{ bg: 'white' }}
          _dark={{
            color: 'whiteAlpha.800',
            _active: {
              color: 'white',
              bg: 'whiteAlpha.100',
            },
          }}
          _before={
            // Hover zone to avoid closing menu when we move the mouse towards it
            menu.isOpen
              ? {
                  // bg: 'red', // To show hover zone (debug)
                  content: '""',
                  position: 'absolute',
                  right: 0,
                  bottom: '-6px',
                  w: '73px',
                  h: '150px',
                  transform: 'rotate(67deg)',
                }
              : undefined
          }
          onMouseEnter={menu.onOpen}
          onMouseLeave={menu.onClose}
        />

        <MenuList
          ml={-2}
          zIndex={10}
          shadow="lg"
          onMouseEnter={menu.onOpen}
          onMouseLeave={menu.onClose}
        >
          {member && (
            <CircleMemberLink memberId={member.id}>
              <MenuItem icon={<CurrentMemberIcon size={20} />}>
                {t('UserMenu.member')}
              </MenuItem>
            </CircleMemberLink>
          )}

          <MenuItem
            icon={<UserInfoIcon size={20} />}
            onClick={currentUserModal.onOpen}
          >
            {t('UserMenu.user')}
          </MenuItem>

          <MenuItem
            icon={<NotificationIcon size={20} />}
            onClick={notificationsModal.onOpen}
          >
            {t('UserMenu.notifications')}
          </MenuItem>

          <Link to="apps">
            <MenuItem icon={<AppsIcon size={20} />}>
              {t('UserMenu.apps')}
            </MenuItem>
          </Link>

          <MenuItem
            icon={
              colorMode === 'light' ? (
                <LightThemeIcon size={20} />
              ) : (
                <DarkThemeIcon size={20} />
              )
            }
            onClick={toggleColorMode}
          >
            {t('UserMenu.theme')}
          </MenuItem>

          <MenuItem
            icon={<LanguageIcon size={20} />}
            onClick={langModal.onOpen}
          >
            {t('UserMenu.lang')}
          </MenuItem>

          {isSuperAdmin && (
            <Link to="admin">
              <MenuItem icon={<SuperAdminIcon size={20} />}>
                {t('Sidebar.superAdmin')}
              </MenuItem>
            </Link>
          )}

          <MenuItem icon={<LogoutIcon size={20} />} onClick={signOut}>
            {t('UserMenu.signout')}
          </MenuItem>
        </MenuList>

        {currentUserModal.isOpen && (
          <CurrentUserModal isOpen onClose={currentUserModal.onClose} />
        )}

        {notificationsModal.isOpen && (
          <NotificationsSettingsModal
            isOpen
            onClose={notificationsModal.onClose}
          />
        )}

        {langModal.isOpen && <LangModal isOpen onClose={langModal.onClose} />}
      </Menu>
    </Flex>
  )
}
