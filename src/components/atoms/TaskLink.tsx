import { Link, LinkProps, useDisclosure } from '@chakra-ui/react'
import TaskModal from '@components/organisms/modals/TaskModal'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import { useOrgId } from '@hooks/useOrgId'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'

interface Props extends LinkProps {
  name: string
  id: string
}

export default function TaskLink({ id, name, ...linkProps }: Props) {
  const orgId = useOrgId()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleOpen = useNormalClickHandler(onOpen)

  return (
    <>
      <Link
        as={ReachLink}
        to={`/orgs/${orgId}/tasks/${id}`}
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
