import { ChevronRightIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'
import { FiMessageSquare } from 'react-icons/fi'
import { SearchItem, SearchItemTypes } from '../molecules/search/searchItems'

interface ComboboxItemProps extends ButtonProps {
  item: SearchItem
  highlighted: boolean
}

const ComboboxItem = React.forwardRef<HTMLButtonElement, ComboboxItemProps>(
  ({ item, highlighted, ...buttonProps }, ref) => {
    return (
      <Button
        isActive={highlighted}
        ref={ref}
        pointerEvents="auto"
        {...buttonProps}
      >
        {item.type === SearchItemTypes.Circle &&
          item.circleRoles.map((circle, i) => (
            <React.Fragment key={circle.id}>
              {i !== 0 && <ChevronRightIcon />}
              {circle.role?.name || '?'}
            </React.Fragment>
          ))}

        {item.type === SearchItemTypes.Member && (
          <>
            <Avatar
              name={item.member.name}
              src={item.member.picture || undefined}
              size="sm"
              marginLeft="-10px"
              marginRight={2}
            />
            {item.member.name}
          </>
        )}

        {item.type === SearchItemTypes.CircleMember && (
          <>
            {item.circleRoles.map((circle, i) => (
              <React.Fragment key={circle.id}>
                {i !== 0 && <ChevronRightIcon />}
                {circle.role?.name || '?'}
              </React.Fragment>
            ))}

            <Avatar
              name={item.member.name || '?'}
              src={item.member.picture || undefined}
              size="sm"
              marginLeft={3}
              marginRight={2}
            />
            {item.member.name || '?'}
          </>
        )}

        {item.type === SearchItemTypes.Thread && (
          <>
            <FiMessageSquare />
            <Box ml={2}>{item.thread.title}</Box>
          </>
        )}
      </Button>
    )
  }
)

export default ComboboxItem
