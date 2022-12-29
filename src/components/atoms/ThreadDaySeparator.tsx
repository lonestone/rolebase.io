import { Box, Flex, useColorMode } from '@chakra-ui/react'
import useDateLocale from '@hooks/useDateLocale'
import { format } from 'date-fns'
import React, { memo } from 'react'
import { capitalizeFirstLetter } from 'src/utils/capitalizeFirstLetter'

interface Props {
  date: string
}

export default memo(function ThreadDaySeparator({ date }: Props) {
  const dateLocale = useDateLocale()
  const { colorMode } = useColorMode()
  const borderColor = colorMode === 'light' ? 'gray.200' : 'gray.550'

  return (
    <Flex py="10px" alignItems="center">
      <Box flex={1} bg={borderColor} h="1px" />
      <Box
        fontSize="0.9em"
        whiteSpace="nowrap"
        height="30px"
        lineHeight="30px"
        px="15px"
        border="1px solid"
        borderColor={borderColor}
        borderRadius="full"
      >
        {capitalizeFirstLetter(
          format(new Date(date), 'PPPP', { locale: dateLocale })
        )}
      </Box>
      <Box flex={1} bg={borderColor} h="1px" />
    </Flex>
  )
})
