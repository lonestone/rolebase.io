import { AccordionItem, AccordionPanel } from '@chakra-ui/react'
import AccordionIconButton from '@molecules/AccordionIconButton'
import React from 'react'

interface Props {
  icon?: React.ReactNode
  children: React.ReactNode
  label: string
  h?: number
}

export default function AccordionLazyItem({ icon, label, h, children }: Props) {
  return (
    <AccordionItem borderColor="gray.200" _dark={{ borderColor: 'gray.550' }}>
      {({ isExpanded }) => (
        <>
          <AccordionIconButton icon={icon}>{label}</AccordionIconButton>
          <AccordionPanel px={6} py={5} h={h} overflow="auto">
            {isExpanded && children}
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}
