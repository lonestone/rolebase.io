import { Link, LinkProps, useDisclosure } from '@chakra-ui/react'
import DecisionModal from '@components/organisms/modals/DecisionModal'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import { usePathInOrg } from '@hooks/usePathInOrg'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'

interface Props extends LinkProps {
  name: string
  id: string
}

export default function DecisionLink({ id, name, ...linkProps }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleOpen = useNormalClickHandler(onOpen)
  const path = usePathInOrg(`decisions/${id}`)

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

      {isOpen && <DecisionModal id={id} isOpen onClose={onClose} />}
    </>
  )
}
