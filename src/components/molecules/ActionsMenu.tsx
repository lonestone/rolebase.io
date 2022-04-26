import {
  IconButton,
  IconButtonProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import React from 'react'
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
  return (
    <Menu>
      <MenuButton
        aria-label="Actions"
        as={IconButton}
        icon={<FiMoreVertical />}
        variant="ghost"
        size="sm"
        {...props}
      />

      <MenuList fontSize="1rem" zIndex={1000}>
        {onEdit && (
          <MenuItem icon={<FiEdit3 />} onClick={onEdit}>
            Editer
          </MenuItem>
        )}
        {onDuplicate && (
          <MenuItem icon={<FiCopy />} onClick={onDuplicate}>
            Dupliquer
          </MenuItem>
        )}
        {onDelete && (
          <MenuItem icon={<FiTrash2 />} onClick={onDelete}>
            Supprimer
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  )
}
