import { useNormalClickHandler } from '@/common/hooks/useNormalClickHandler'
import { usePathInOrg } from '@/org/hooks/usePathInOrg'
import { Link, LinkProps, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'
import TaskModal from '../modals/TaskModal'

interface Props extends LinkProps {
  name: string
  id: string
}

export default function TaskLink({ id, name, ...linkProps }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleOpen = useNormalClickHandler(onOpen)
  const path = usePathInOrg(`tasks/${id}`)

  return (
    <>
      <Link
        as={ReachLink}
        to={path}
        tabIndex={-1}
        onClick={handleOpen}
        {...linkProps}
      >
        {name}
      </Link>

      {isOpen && <TaskModal id={id} isOpen onClose={onClose} />}
    </>
  )
}
