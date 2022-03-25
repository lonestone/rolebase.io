import { Button, ButtonProps, useDisclosure } from '@chakra-ui/react'
import TaskModal from '@components/organisms/modals/TaskModal'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { Link } from 'react-router-dom'

interface Props extends ButtonProps {
  name: string
  id: string
}

export default function TaskLink({ id, name, ...butonsProps }: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleOpen = useNormalClickHandler(onOpen)

  return (
    <>
      <Link to={`/orgs/${orgId}/tasks/${id}`} onClick={handleOpen}>
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
