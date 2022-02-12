import { Button, useDisclosure } from '@chakra-ui/react'
import RoleEditModal from '@components/organisms/modals/RoleEditModal'
import React from 'react'

interface Props {
  id: string
  name: string
}

export default function RoleEditLink({ id, name }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        variant="link"
        color="inherit"
        textDecoration="none"
        onClick={onOpen}
      >
        {name}
      </Button>

      {isOpen && <RoleEditModal isOpen id={id} onClose={onClose} />}
    </>
  )
}
