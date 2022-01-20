import { Box, Divider, Flex } from '@chakra-ui/react'
import { format } from 'date-fns'
import React from 'react'
import { dateFnsLocale } from 'src/locale'
import { capitalizeFirstLetter } from 'src/utils'

interface Props {
  date: Date
}

export default function ThreadDaySeparator({ date }: Props) {
  return (
    <Flex py="10px" justifyContent="center">
      <Divider pt="15px" />
      <Box
        fontSize="0.9em"
        whiteSpace="nowrap"
        height="30px"
        lineHeight="30px"
        px="15px"
        border="1px solid #E2E8F0"
        borderRadius="full"
      >
        {capitalizeFirstLetter(
          format(date, 'PPPP ', { locale: dateFnsLocale })
        )}
      </Box>
      <Divider pt="15px" />
    </Flex>
  )
}
