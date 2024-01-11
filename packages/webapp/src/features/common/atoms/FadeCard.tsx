import { Card, CardProps } from '@chakra-ui/react'
import React from 'react'

export default function FadeCard({
  colorScheme,
  children,
  ...cardProps
}: CardProps) {
  return (
    <Card
      variant="outline"
      bg={`linear-gradient(180deg, var(--chakra-colors-${colorScheme}-100) -40%, transparent 80%)`}
      borderRadius="5px"
      borderTop="4px solid"
      borderTopColor={`${colorScheme}.500`}
      borderColor={`${colorScheme}.100`}
      _dark={{
        bg: `linear-gradient(180deg, var(--chakra-colors-${colorScheme}-700)-40%, transparent 80%)`,
        borderTopColor: `${colorScheme}.500`,
        borderColor: `${colorScheme}.700`,
      }}
      {...cardProps}
    >
      {children}
    </Card>
  )
}
