import IconTextButton, { IconTextButtonProps } from '@atoms/IconTextButton'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import useOrgAdmin from '@hooks/useOrgAdmin'
import useOrgMember from '@hooks/useOrgMember'
import CirclesKeyboardShortcutsModal from '@organisms/circle/CirclesKeyboardShortcutsModal'
import CirclesShareModal from '@organisms/circle/CirclesShareModal'
import OrgEditModal from '@organisms/org/OrgEditModal'
import BaseRolesModal from '@organisms/role/BaseRolesModal'
import VacantRolesModal from '@organisms/role/VacantRolesModal'
import { useStoreState } from '@store/hooks'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FiCircle,
  FiCommand,
  FiDownload,
  FiRotateCcw,
  FiSettings,
  FiShare2,
} from 'react-icons/fi'

export default function CirclesSettings(
  buttonProps: Omit<IconTextButtonProps, 'aria-label'>
) {
  const { t } = useTranslation()
  const navigateOrg = useNavigateOrg()
  const isMember = useOrgMember()
  const isAdmin = useOrgAdmin()
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
        icon={<FiSettings />}
        aria-label={t('CirclesSettings.label')}
        {...buttonProps}
      />

      <MenuList zIndex={2000} shadow="md">
        {isMember && (
          <>
            {isAdmin && (
              <MenuItem icon={<FiSettings />} onClick={orgEditModal.onOpen}>
                {t('CirclesSettings.orgEdit')}
              </MenuItem>
            )}
            <MenuItem icon={<FiCircle />} onClick={baseRolesModal.onOpen}>
              {t('CirclesSettings.baseRoles')}
            </MenuItem>
            <MenuItem icon={<FiCircle />} onClick={vacantRolesModal.onOpen}>
              {t('CirclesSettings.vacantRoles')}
            </MenuItem>
            <MenuItem
              icon={<FiRotateCcw />}
              onClick={() => navigateOrg('logs')}
            >
              {t('CirclesSettings.logs')}
            </MenuItem>
            {isMember && !isMobile && (
              <MenuItem icon={<FiCommand />} onClick={shortcutsModal.onOpen}>
                {t('CirclesSettings.shortcuts')}
              </MenuItem>
            )}
            <MenuItem
              icon={<FiDownload />}
              onClick={() => navigateOrg(`export-circle/${orgCircleId}`)}
            >
              {t('CirclesSettings.export')}
            </MenuItem>
            {isAdmin && (
              <MenuItem icon={<FiShare2 />} onClick={shareModal.onOpen}>
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
