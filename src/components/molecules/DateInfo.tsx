import { BoxProps, HStack, Text } from '@chakra-ui/react'
import useDateLocale from '@hooks/useDateLocale'
import { format } from 'date-fns'
import React from 'react'
import { FiClock } from 'react-icons/fi'
import { capitalizeFirstLetter } from 'src/utils'

interface Props extends BoxProps {
  date: Date
}

export default function DateInfo({ date, ...boxProps }: Props) {
  const dateLocale = useDateLocale()
  return (
    <HStack spacing={2} color="gray.500" {...boxProps}>
      <FiClock />
      <Text>
        {capitalizeFirstLetter(
          format(date, 'PPPP', {
            locale: dateLocale,
          })
        )}
      </Text>
    </HStack>
  )
}
