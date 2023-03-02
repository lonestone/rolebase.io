import { AccordionButton, AccordionIcon, Spacer, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
  icon?: React.ReactNode
  children: React.ReactNode
}

export default function AccordionIconButton({ icon, children }: Props) {
  return (
    <AccordionButton
      px={6}
      bg="rgba(246, 246, 249, 0.5)"
      fontSize="sm"
      _dark={{ bg: 'whiteAlpha.50' }}
      _expanded={{ fontWeight: 'bold' }}
    >
      {icon}
      <Text ml={2}>{children}</Text>
      <Spacer />
      <AccordionIcon />
    </AccordionButton>
  )
}
