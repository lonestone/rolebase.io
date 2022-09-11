import { AccordionItem, AccordionPanel } from '@chakra-ui/react'
import AccordionIconButton from '@components/molecules/AccordionIconButton'
import React from 'react'

interface Props {
  icon?: React.ReactNode
  children: React.ReactNode
  label: string
}

export default function AccordionLazyItem({ icon, label, children }: Props) {
  return (
    <AccordionItem borderColor="gray.300" _dark={{ borderColor: 'gray.550' }}>
      {({ isExpanded }) => (
        <>
          <AccordionIconButton icon={icon}>{label}</AccordionIconButton>
          <AccordionPanel px={6} py={5}>
            {isExpanded && children}
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}
