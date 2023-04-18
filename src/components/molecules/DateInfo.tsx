import { BoxProps, HStack, Text } from '@chakra-ui/react'
import useDateLocale from '@hooks/useDateLocale'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import { format } from 'date-fns'
import { useMemo } from 'react'
import { FiClock } from 'react-icons/fi'

interface Props extends BoxProps {
  date: Date | string
}

export default function DateInfo({ date, ...boxProps }: Props) {
  const dateLocale = useDateLocale()
  const dateMemo = useMemo(
    () => (typeof date === 'string' ? new Date(date) : date),
    [date]
  )

  return (
    <HStack spacing={2} {...boxProps}>
      <FiClock />
      <Text>
        {capitalizeFirstLetter(
          format(dateMemo, 'PPPP', {
            locale: dateLocale,
          })
        )}
      </Text>
    </HStack>
  )
}
