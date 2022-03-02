import { ChevronRightIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'
import { FiMessageSquare, FiSquare } from 'react-icons/fi'
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
              ml="-10px"
              mr={2}
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
              ml={3}
              mr={2}
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
        {item.type === SearchItemTypes.Task && (
          <>
            <FiSquare />
            <Box ml={2}>{item.task.title}</Box>
          </>
        )}
      </Button>
    )
  }
)

ComboboxItem.displayName = 'ComboboxItem'

export default ComboboxItem
