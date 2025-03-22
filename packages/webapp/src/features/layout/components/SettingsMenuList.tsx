import CircleMemberLink from '@/circle/components/CircleMemberLink'
import ThemeSwitch from '@/common/atoms/ThemeSwitch'
import useCurrentMember from '@/member/hooks/useCurrentMember'
import useOrgAdmin from '@/member/hooks/useOrgAdmin'
import useOrgOwner from '@/member/hooks/useOrgOwner'
import { useOrgId } from '@/org/hooks/useOrgId'
import { usePathInOrg } from '@/org/hooks/usePathInOrg'
import OrgEditModal from '@/org/modals/OrgEditModal'
import LangSelect from '@/user/components/LangSelect'
import useSuperAdmin from '@/user/hooks/useSuperAdmin'
import useUserSignOut from '@/user/hooks/useUserSignOut'
import CurrentUserModal from '@/user/modals/CurrentUserModal'
import LangModal from '@/user/modals/LangModal'
import NotificationsSettingsModal from '@/user/modals/NotificationsSettingsModal'
import {
  BoxProps,
  Flex,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react'
import { useUserData } from '@nhost/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  AppsIcon,
  CircleIcon,
  CurrentMemberIcon,
  LogoutIcon,
  MembersIcon,
  NotificationIcon,
  SubscriptionIcon,
  SuperAdminIcon,
  UserInfoIcon,
} from 'src/icons'

export default function SettingsMenuList({ children, ...boxProps }: BoxProps) {
  const { t } = useTranslation()
  const user = useUserData()
  const member = useCurrentMember()
  const orgId = useOrgId()
  const isAdmin = useOrgAdmin()
  const isOwner = useOrgOwner()
  const isSuperAdmin = useSuperAdmin()
  const rootPath = usePathInOrg('')
  const signOut = useUserSignOut()

  // Modals
  const orgEditModal = useDisclosure()
  const currentUserModal = useDisclosure()
  const notificationsModal = useDisclosure()
  const langModal = useDisclosure()

  if (!user) return null

  return (
    <MenuList zIndex={10} shadow="lg">
      <Flex px={2} gap={5}>
        {(orgId || isSuperAdmin) && (
          <MenuGroup title={t('SettingsMenu.org.heading')}>
            {orgId && (
              <Link to={`${rootPath}members`}>
                <MenuItem icon={<MembersIcon size={20} />}>
                  {t('SettingsMenu.org.members')}
                </MenuItem>
              </Link>
            )}

            {isAdmin && (
              <MenuItem
                icon={<CircleIcon size={20} />}
                onClick={orgEditModal.onOpen}
              >
                {t('SettingsMenu.org.settings')}
              </MenuItem>
            )}

            {isOwner && (
              <Link to={`${rootPath}subscription`}>
                <MenuItem icon={<SubscriptionIcon size={20} />}>
                  {t('SettingsMenu.org.subscription')}
                </MenuItem>
              </Link>
            )}

            {isSuperAdmin && (
              <Link to="admin">
                <MenuItem icon={<SuperAdminIcon size={20} />}>
                  {t('SettingsMenu.org.superAdmin')}
                </MenuItem>
              </Link>
            )}
          </MenuGroup>
        )}

        <MenuGroup title={t('SettingsMenu.user.heading')} mx={3}>
          {member && (
            <CircleMemberLink memberId={member.id}>
              <MenuItem icon={<CurrentMemberIcon size={20} />}>
                {t('SettingsMenu.user.member')}
              </MenuItem>
            </CircleMemberLink>
          )}

          <MenuItem
            icon={<UserInfoIcon size={20} />}
            onClick={currentUserModal.onOpen}
          >
            {t('SettingsMenu.user.credentials')}
          </MenuItem>

          <MenuItem
            icon={<NotificationIcon size={20} />}
            onClick={notificationsModal.onOpen}
          >
            {t('SettingsMenu.user.notifications')}
          </MenuItem>

          <Link to="apps">
            <MenuItem icon={<AppsIcon size={20} />}>
              {t('SettingsMenu.user.apps')}
            </MenuItem>
          </Link>

          <MenuItem icon={<LogoutIcon size={20} />} onClick={signOut}>
            {t('SettingsMenu.user.signout')}
          </MenuItem>
        </MenuGroup>
      </Flex>

      <MenuDivider />
      <Flex
        py={1}
        pl={1}
        pr={3}
        mt={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <LangSelect />
        <ThemeSwitch />
      </Flex>

      {orgEditModal.isOpen && (
        <OrgEditModal isOpen onClose={orgEditModal.onClose} />
      )}

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
    </MenuList>
  )
}
