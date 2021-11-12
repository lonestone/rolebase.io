import { ChevronRightIcon } from '@chakra-ui/icons'
import { Avatar, Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'
import { SearchItem, SearchItemTypes } from './types'

interface ComboboxItemProps extends ButtonProps {
  item: SearchItem
  highlighted: boolean
}

const ComboboxItem = React.forwardRef<HTMLButtonElement, ComboboxItemProps>(
  ({ item, highlighted, ...props }, ref) => {
    return (
      <Button isActive={highlighted} ref={ref} {...props}>
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
    )
  }
)

export default ComboboxItem
