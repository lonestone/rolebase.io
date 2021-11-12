import { List, ListProps } from '@chakra-ui/react'
import React from 'react'

interface ComboboxListProps extends ListProps {
  isOpen: boolean
}

const ComboboxList = React.forwardRef<HTMLUListElement, ComboboxListProps>(
  ({ isOpen, ...props }, ref) => {
    return <List display={isOpen ? '' : 'none'} py={2} {...props} ref={ref} />
  }
)

export default ComboboxList
