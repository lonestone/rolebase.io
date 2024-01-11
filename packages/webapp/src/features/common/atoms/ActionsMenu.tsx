import {
  IconButton,
  IconButtonProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  ArchiveIcon,
  CopyIcon,
  DeleteIcon,
  EditIcon,
  ExportIcon,
  LinkIcon,
  MarkUnreadIcon,
  MoreIcon,
  MoveIcon,
  RestoreIcon,
} from 'src/icons'
import useCopyUrl from '../hooks/useCopyUrl'

interface Props extends Omit<IconButtonProps, 'aria-label'> {
  copyLinkUrl?: string
  onEdit?(): void
  onMove?(): void
  onDuplicate?(): void
  onExport?(): void
  onDelete?(): void
  onArchive?(): void
  onUnarchive?(): void
  onMarkUnread?(): void
}

export default function ActionsMenu({
  copyLinkUrl,
  onEdit,
  onMove,
  onDuplicate,
  onExport,
  onArchive,
  onUnarchive,
  onDelete,
  onMarkUnread,
  ...props
}: Props) {
  const { t } = useTranslation()

  const handleCopyLink = useCopyUrl(copyLinkUrl)

  return (
    <Menu isLazy>
      <MenuButton
        aria-label={t('ActionsMenu.label')}
        as={IconButton}
        icon={<MoreIcon size={20} />}
        variant="ghost"
        size="sm"
        {...props}
      />

      <Portal>
        <MenuList
          fontFamily="body"
          fontSize="1rem"
          fontWeight="normal"
          shadow="lg"
          zIndex={2000}
        >
          {onEdit && (
            <MenuItem icon={<EditIcon size={20} />} onClick={onEdit}>
              {t('common.edit')}
            </MenuItem>
          )}
          {onMove && (
            <MenuItem icon={<MoveIcon size={20} />} onClick={onMove}>
              {t('common.move')}
            </MenuItem>
          )}
          {onDuplicate && (
            <MenuItem icon={<CopyIcon size={20} />} onClick={onDuplicate}>
              {t('common.duplicate')}
            </MenuItem>
          )}
          {onExport && (
            <MenuItem icon={<ExportIcon size={20} />} onClick={onExport}>
              {t('common.export')}
            </MenuItem>
          )}
          {onMarkUnread && (
            <MenuItem
              icon={<MarkUnreadIcon size={20} />}
              onClick={onMarkUnread}
            >
              {t('common.markUnread')}
            </MenuItem>
          )}
          {copyLinkUrl && (
            <MenuItem icon={<LinkIcon size={20} />} onClick={handleCopyLink}>
              {t('common.copyLink')}
            </MenuItem>
          )}
          {onArchive && (
            <MenuItem icon={<ArchiveIcon size={20} />} onClick={onArchive}>
              {t('common.archive')}
            </MenuItem>
          )}
          {onUnarchive && (
            <MenuItem icon={<RestoreIcon size={20} />} onClick={onUnarchive}>
              {t('common.unarchive')}
            </MenuItem>
          )}
          {onDelete && (
            <MenuItem icon={<DeleteIcon size={20} />} onClick={onDelete}>
              {t('common.delete')}
            </MenuItem>
          )}
        </MenuList>
      </Portal>
    </Menu>
  )
}
