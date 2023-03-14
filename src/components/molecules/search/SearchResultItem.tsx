import { Box, Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'
import SearchResultIcon from './SearchResultIcon'
import { SearchItem } from './searchTypes'

interface Props extends ButtonProps {
  item?: SearchItem
  highlighted?: boolean
}

export default React.forwardRef<HTMLButtonElement, Props>(
  function SearchResultItem({ item, highlighted, ...buttonProps }, ref) {
    return (
      <Button
        isActive={highlighted}
        ref={ref}
        pointerEvents="auto"
        justifyContent="start"
        variant="solid"
        {...buttonProps}
      >
        {item && (
          <>
            <SearchResultIcon item={item} />
            <Box ml={2}>{item.title}</Box>
          </>
        )}
      </Button>
    )
  }
)
