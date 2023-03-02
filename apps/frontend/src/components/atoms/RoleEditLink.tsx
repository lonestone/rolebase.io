import { Link, useDisclosure } from '@chakra-ui/react'
import RoleEditModal from '@organisms/role/RoleEditModal'
import React from 'react'

interface Props {
  id: string
  name: string
}

export default function RoleEditLink({ id, name }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Link href="#" onClick={onOpen}>
        {name}
      </Link>

      {isOpen && <RoleEditModal isOpen id={id} onClose={onClose} />}
    </>
  )
}
