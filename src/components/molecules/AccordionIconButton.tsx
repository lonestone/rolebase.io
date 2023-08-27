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
      bg="menulight"
      fontSize="sm"
      _focus={{ bg: 'menulight' }}
      _dark={{ bg: 'menudark', _focus: { bg: 'menudark' } }}
      _expanded={{ fontWeight: 'bold' }}
    >
      {icon}
      <Text ml={2}>{children}</Text>
      <Spacer />
      <AccordionIcon />
    </AccordionButton>
  )
}
