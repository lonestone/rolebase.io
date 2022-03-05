import { IconButton } from '@chakra-ui/react'
import React from 'react'
import { FiMaximize2 } from 'react-icons/fi'
import { Link, LinkProps } from 'react-router-dom'

export default function ModalMaximizeButton(props: LinkProps) {
  return (
    <Link {...props} tabIndex={-1}>
      <IconButton
        aria-label="Ouvrir en pleine page"
        variant="ghost"
        size="sm"
        icon={<FiMaximize2 />}
      />
    </Link>
  )
}
