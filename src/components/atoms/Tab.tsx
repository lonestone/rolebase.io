import {
  Tab as ChakraTab,
  TabProps as ChakraTabProps,
  Text
} from '@chakra-ui/react'
import React, { ReactElement } from 'react'

type TabProps = {
  title: string
  icon?: ReactElement
} & ChakraTabProps

export default function Tab({ title, icon, ...rest }: TabProps) {
  return (
    <ChakraTab {...rest}>
      <>
        {icon && icon}
        <Text fontWeight={600} fontSize="16" ml="2">
          {title}
        </Text>
      </>
    </ChakraTab>
  )
}
