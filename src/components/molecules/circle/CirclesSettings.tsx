import IconTextButton from '@atoms/IconTextButton'
import {
  ButtonProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react'
import useOrgMember from '@hooks/useOrgMember'
import BaseRolesModal from '@organisms/role/BaseRolesModal'
import VacantRolesModal from '@organisms/role/VacantRolesModal'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiSettings } from 'react-icons/fi'

export default function CirclesSettings(buttonProps: ButtonProps) {
  const { t } = useTranslation()
  const isMember = useOrgMember()

  // Modals
  const baseRolesModal = useDisclosure()
  const vacantRolesModal = useDisclosure()

  return (
    <Menu>
      <MenuButton
        as={IconTextButton}
        icon={<FiSettings />}
        aria-label={t('CirclesSettings.label')}
        className="userflow-graph-views"
        {...buttonProps}
      />

      <MenuList zIndex={2000} shadow="md">
        {isMember && (
          <>
            <MenuItem onClick={baseRolesModal.onOpen}>
              {t('CirclesSettings.baseRoles')}
            </MenuItem>
            <MenuItem onClick={vacantRolesModal.onOpen}>
              {t('CirclesSettings.vacantRoles')}
            </MenuItem>
          </>
        )}
      </MenuList>

      {baseRolesModal.isOpen && (
        <BaseRolesModal isOpen onClose={baseRolesModal.onClose} />
      )}

      {vacantRolesModal.isOpen && (
        <VacantRolesModal isOpen onClose={vacantRolesModal.onClose} />
      )}
    </Menu>
  )
}
