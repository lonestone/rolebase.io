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
import {
  FiCopy,
  FiEdit3,
  FiMoreVertical,
  FiMove,
  FiTrash2,
} from 'react-icons/fi'

interface Props extends Omit<IconButtonProps, 'aria-label'> {
  onEdit?(): void
  onMove?(): void
  onDuplicate?(): void
  onDelete?(): void
}

export default function ActionsMenu({
  onEdit,
  onMove,
  onDuplicate,
  onDelete,
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

      <MenuList
        fontFamily="body"
        fontSize="1rem"
        fontWeight="normal"
        zIndex={1000}
      >
        {onEdit && (
          <MenuItem icon={<FiEdit3 />} onClick={onEdit}>
            {t('molecules.ActionsMenu.edit')}
          </MenuItem>
        )}
        {onMove && (
          <MenuItem icon={<FiMove />} onClick={onMove}>
            {t('molecules.ActionsMenu.move')}
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
