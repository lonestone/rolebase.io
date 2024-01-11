import { StarIcon } from '@chakra-ui/icons'
import { Flex, FlexProps, IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'

export interface StarsRateProps extends Omit<FlexProps, 'onChange'> {
  value?: number
  onChange(value: number): void
}

const stars = [1, 2, 3, 4, 5]

export function StarsRating({
  value = 0,
  onChange,
  ...flexProps
}: StarsRateProps) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <Flex {...flexProps}>
      {stars.map((star) => (
        <IconButton
          key={star}
          aria-label={star.toString()}
          icon={<StarIcon />}
          variant="ghost"
          fontSize="2xl"
          cursor="pointer"
          color="#b6a109"
          _dark={{ color: 'yellow' }}
          opacity={(hovered ?? value) >= star ? 1 : 0.3}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
        />
      ))}
    </Flex>
  )
}
