import { Box, Divider, Flex, useColorMode } from '@chakra-ui/react'
import useDateLocale from '@hooks/useDateLocale'
import { format } from 'date-fns'
import React, { memo } from 'react'
import { capitalizeFirstLetter } from 'src/utils'

interface Props {
  date: string
}

export default memo(function ThreadDaySeparator({ date }: Props) {
  const dateLocale = useDateLocale()
  const { colorMode } = useColorMode()

  return (
    <Flex py="10px" justifyContent="center">
      <Divider pt="15px" />
      <Box
        fontSize="0.9em"
        whiteSpace="nowrap"
        height="30px"
        lineHeight="30px"
        px="15px"
        border="1px solid"
        borderColor={colorMode === 'light' ? 'gray.200' : 'gray.550'}
        borderRadius="full"
      >
        {capitalizeFirstLetter(
          format(new Date(date), 'PPPP', { locale: dateLocale })
        )}
      </Box>
      <Divider pt="15px" />
    </Flex>
  )
})
