import { Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'
import { FiMaximize2 } from 'react-icons/fi'

export default function ModalMaximizeButton(buttonProps: ButtonProps) {
  return (
    <Button
      size="sm"
      variant="outline"
      position="absolute"
      zIndex={1}
      top="0.5rem"
      right="3rem"
      leftIcon={<FiMaximize2 />}
      {...buttonProps}
    >
      Ouvrir
    </Button>
  )
}
