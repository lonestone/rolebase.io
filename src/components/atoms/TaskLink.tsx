import { Button, ButtonProps, useDisclosure } from '@chakra-ui/react'
import TaskModal from '@components/organisms/modals/TaskModal'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import { useOrgId } from '@hooks/useOrgId'
import React from 'react'
import { Link } from 'react-router-dom'

interface Props extends ButtonProps {
  name: string
  id: string
}

export default function TaskLink({ id, name, ...butonsProps }: Props) {
  const orgId = useOrgId()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleOpen = useNormalClickHandler(onOpen)

  return (
    <>
      <Link
        to={`/orgs/${orgId}/tasks/${id}`}
        tabIndex={-1}
        onClick={handleOpen}
      >
        <Button
          variant="link"
          color="inherit"
          textDecoration="none"
          minW={0}
          {...butonsProps}
        >
          {name}
        </Button>
      </Link>

      {isOpen && <TaskModal id={id} isOpen onClose={onClose} />}
    </>
  )
}
