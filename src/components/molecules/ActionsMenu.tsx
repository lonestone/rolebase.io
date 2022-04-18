import {
  IconButton,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import React from 'react'
import { FiEdit3, FiMoreVertical, FiTrash2 } from 'react-icons/fi'

interface Props extends MenuButtonProps {
  onEdit?(): void
  onDelete?(): void
}

export default function ActionsMenu({ onEdit, onDelete, ...props }: Props) {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<FiMoreVertical />}
        variant="ghost"
        size="sm"
        {...props}
      />

      <MenuList fontSize="1rem">
        {onEdit && (
          <MenuItem icon={<FiEdit3 />} onClick={onEdit}>
            Editer
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
