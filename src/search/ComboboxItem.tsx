import { ChevronRightIcon } from '@chakra-ui/icons'
import { Avatar, Button, ButtonProps, ListItem } from '@chakra-ui/react'
import React from 'react'
import { SearchItem, SearchItemTypes } from './types'

interface ComboboxItemProps extends ButtonProps {
  item: SearchItem
  itemIndex: number
  highlightedIndex: number
}

const ComboboxItem = React.forwardRef<HTMLButtonElement, ComboboxItemProps>(
  ({ item, itemIndex, highlightedIndex, ...props }, ref) => {
    const isActive = itemIndex === highlightedIndex

    return (
      <ListItem textAlign="right" mb={2}>
        <Button isActive={isActive} {...props} ref={ref} shadow="md">
          {item.type === SearchItemTypes.Circle && (
            <>
              Cercle{' '}
              {item.circleRoles.map((circle, i) => (
                <React.Fragment key={circle.id}>
                  {i !== 0 && <ChevronRightIcon />}
                  {circle.role?.name || '?'}
                </React.Fragment>
              ))}
            </>
          )}

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
                name={item.member?.name || '?'}
                src={item.member?.picture || undefined}
                size="sm"
                marginLeft={3}
                marginRight={2}
              />
              {item.member?.name || '?'}
            </>
          )}
        </Button>
      </ListItem>
    )
  }
)

export default ComboboxItem
