import {
  Tab as ChakraTab,
  TabProps as ChakraTabProps,
  Text,
} from '@chakra-ui/react'
import { ReactElement } from 'react'

type TabProps = {
  title: string
  icon?: ReactElement
} & ChakraTabProps

export default function Tab({ title, icon, ...chakraTabProps }: TabProps) {
  return (
    <ChakraTab {...chakraTabProps}>
      <>
        {icon && icon}
        <Text fontWeight={600} fontSize="16" ml="2">
          {title}
        </Text>
      </>
    </ChakraTab>
  )
}
