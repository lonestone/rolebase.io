import {
  IconButton,
  IconButtonProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiCopy, FiEdit3, FiMoreVertical, FiTrash2 } from 'react-icons/fi'

interface Props extends Omit<IconButtonProps, 'aria-label'> {
  onEdit?(): void
  onDuplicate?(): void
  onDelete?(): void
}

export default function ActionsMenu({
  onEdit,
  onDelete,
  onDuplicate,
  ...props
}: Props) {
  const { t } = useTranslation()

  return (
    <Menu>
      <MenuButton
        aria-label={t('molecules.ActionsMenu.label')}
        as={IconButton}
        icon={<FiMoreVertical />}
        variant="ghost"
        size="sm"
        {...props}
      />

      <MenuList fontSize="1rem" zIndex={1000}>
        {onEdit && (
          <MenuItem icon={<FiEdit3 />} onClick={onEdit}>
            {t('molecules.ActionsMenu.edit')}
          </MenuItem>
        )}
        {onDuplicate && (
          <MenuItem icon={<FiCopy />} onClick={onDuplicate}>
            {t('molecules.ActionsMenu.duplicate')}
          </MenuItem>
        )}
        {onDelete && (
          <MenuItem icon={<FiTrash2 />} onClick={onDelete}>
            {t('molecules.ActionsMenu.delete')}
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  )
}
