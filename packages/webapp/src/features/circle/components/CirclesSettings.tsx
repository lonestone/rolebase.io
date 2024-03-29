import IconTextButton, {
  IconTextButtonProps,
} from '@/common/atoms/IconTextButton'
import useOrgAdmin from '@/member/hooks/useOrgAdmin'
import useOrgMember from '@/member/hooks/useOrgMember'
import useOrgOwner from '@/member/hooks/useOrgOwner'
import { useNavigateOrg } from '@/org/hooks/useNavigateOrg'
import OrgEditModal from '@/org/modals/OrgEditModal'
import BaseRolesModal from '@/role/modals/BaseRolesModal'
import VacantRolesModal from '@/role/modals/VacantRolesModal'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react'
import { useStoreState } from '@store/hooks'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  CircleIcon,
  ExportCircleIcon,
  LogsIcon,
  SettingsIcon,
  ShareIcon,
  ShortcutsIcon,
  VacantCircle,
} from 'src/icons'
import CirclesKeyboardShortcutsModal from '../modals/CirclesKeyboardShortcutsModal'
import CirclesShareModal from '../modals/CirclesShareModal'

export default function CirclesSettings(
  buttonProps: Omit<IconTextButtonProps, 'aria-label'>
) {
  const { t } = useTranslation()
  const navigateOrg = useNavigateOrg()
  const isMember = useOrgMember()
  const isAdmin = useOrgAdmin()
  const isOwner = useOrgOwner()
  const [isMobile] = useMediaQuery('(max-width: 600px)')

  // Get org circle id
  const circles = useStoreState((state) => state.org.circles)
  const orgCircleId = useMemo(() => {
    if (!circles) return undefined
    return circles.find((c) => c.parentId === null)?.id
  }, [circles])

  // Modals
  const orgEditModal = useDisclosure()
  const baseRolesModal = useDisclosure()
  const vacantRolesModal = useDisclosure()
  const shortcutsModal = useDisclosure()
  const shareModal = useDisclosure()

  return (
    <Menu>
      <MenuButton
        as={IconTextButton}
        icon={<SettingsIcon size={20} />}
        aria-label={t('CirclesSettings.label')}
        fontWeight="normal"
        {...buttonProps}
      />

      <MenuList zIndex={2000} shadow="md">
        {isMember && (
          <>
            {isAdmin && (
              <MenuItem
                icon={<SettingsIcon size={20} />}
                onClick={orgEditModal.onOpen}
              >
                {t('CirclesSettings.orgEdit')}
              </MenuItem>
            )}
            {isOwner && (
              <MenuItem
                icon={<CircleIcon size={20} />}
                onClick={baseRolesModal.onOpen}
              >
                {t('CirclesSettings.baseRoles')}
              </MenuItem>
            )}
            <MenuItem
              icon={<VacantCircle size={20} />}
              onClick={vacantRolesModal.onOpen}
            >
              {t('CirclesSettings.vacantRoles')}
            </MenuItem>
            <MenuItem
              icon={<LogsIcon size={20} />}
              onClick={() => navigateOrg('logs')}
            >
              {t('CirclesSettings.logs')}
            </MenuItem>
            {isMember && !isMobile && (
              <MenuItem
                icon={<ShortcutsIcon size={20} />}
                onClick={shortcutsModal.onOpen}
              >
                {t('CirclesSettings.shortcuts')}
              </MenuItem>
            )}
            <MenuItem
              icon={<ExportCircleIcon size={20} />}
              onClick={() => navigateOrg(`export-circle/${orgCircleId}`)}
            >
              {t('CirclesSettings.export')}
            </MenuItem>
            {isAdmin && (
              <MenuItem
                icon={<ShareIcon size={20} />}
                onClick={shareModal.onOpen}
              >
                {t('CirclesSettings.share')}
              </MenuItem>
            )}
          </>
        )}
      </MenuList>

      {orgEditModal.isOpen && (
        <OrgEditModal isOpen onClose={orgEditModal.onClose} />
      )}

      {baseRolesModal.isOpen && (
        <BaseRolesModal isOpen onClose={baseRolesModal.onClose} />
      )}

      {vacantRolesModal.isOpen && (
        <VacantRolesModal isOpen onClose={vacantRolesModal.onClose} />
      )}

      {shortcutsModal.isOpen && (
        <CirclesKeyboardShortcutsModal
          isOpen
          onClose={shortcutsModal.onClose}
        />
      )}

      {shareModal.isOpen && (
        <CirclesShareModal isOpen onClose={shareModal.onClose} />
      )}
    </Menu>
  )
}
