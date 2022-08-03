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
      bg="gray.50"
      _dark={{ bg: 'whiteAlpha.100' }}
      _expanded={{ fontWeight: 'bold' }}
    >
      {icon}
      <Text fontSize="md" ml={2}>
        {children}
      </Text>
      <Spacer />
      <AccordionIcon />
    </AccordionButton>
  )
}
