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
  FiArchive,
  FiCopy,
  FiEdit3,
  FiEyeOff,
  FiMoreVertical,
  FiMove,
  FiTrash2,
} from 'react-icons/fi'

interface Props extends Omit<IconButtonProps, 'aria-label'> {
  onEdit?(): void
  onMove?(): void
  onDuplicate?(): void
  onDelete?(): void
  onArchive?(): void
  onUnarchive?(): void
  onMarkUnread?(): void
}

export default function ActionsMenu({
  onEdit,
  onMove,
  onDuplicate,
  onArchive,
  onUnarchive,
  onDelete,
  onMarkUnread,
  ...props
}: Props) {
  const { t } = useTranslation()

  return (
    <Menu>
      <MenuButton
        aria-label={t('ActionsMenu.label')}
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
            {t('common.edit')}
          </MenuItem>
        )}
        {onMove && (
          <MenuItem icon={<FiMove />} onClick={onMove}>
            {t('common.move')}
          </MenuItem>
        )}
        {onDuplicate && (
          <MenuItem icon={<FiCopy />} onClick={onDuplicate}>
            {t('common.duplicate')}
          </MenuItem>
        )}
        {onMarkUnread && (
          <MenuItem icon={<FiEyeOff />} onClick={onMarkUnread}>
            {t('common.markUnread')}
          </MenuItem>
        )}
        {onArchive && (
          <MenuItem icon={<FiArchive />} onClick={onArchive}>
            {t('common.archive')}
          </MenuItem>
        )}
        {onUnarchive && (
          <MenuItem icon={<FiArchive />} onClick={onUnarchive}>
            {t('common.unarchive')}
          </MenuItem>
        )}
        {onDelete && (
          <MenuItem icon={<FiTrash2 />} onClick={onDelete}>
            {t('common.delete')}
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  )
}
