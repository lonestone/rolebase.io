import { Button, ButtonProps, useDisclosure } from '@chakra-ui/react'
import CircleModal from '@components/organisms/modals/CircleModal'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import { CircleWithRoleEntry } from '@shared/circle'
import React, { useCallback } from 'react'

interface Props extends ButtonProps {
  circle: CircleWithRoleEntry
  modal?: boolean
}

export default function CircleButton({ circle, modal, ...buttonProps }: Props) {
  const navigateOrg = useNavigateOrg()

  const handleClick = useCallback(() => {
    if (modal) {
      // Open modal
      onOpen()
    } else {
      // Go to circle panel
      navigateOrg(`?circleId=${circle.id}`)
    }
  }, [circle.id, modal])

  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        size="sm"
        borderRadius="full"
        onClick={handleClick}
        {...buttonProps}
      >
        {circle.role?.name || '?'}
      </Button>

      {isOpen && <CircleModal id={circle.id} isOpen onClose={onClose} />}
    </>
  )
}
