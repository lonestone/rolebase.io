import { ChevronRightIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, ButtonProps, Tag } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiMessageSquare, FiPlus } from 'react-icons/fi'
import { taskStatusColors } from '../TaskStatusInput'
import { SearchItem, SearchItemTypes } from './searchTypes'

interface Props extends ButtonProps {
  item: SearchItem
  highlighted: boolean
}

const SearchResultItem = React.forwardRef<HTMLButtonElement, Props>(
  ({ item, highlighted, ...buttonProps }, ref) => {
    const { t } = useTranslation()

    return (
      <Button
        isActive={highlighted}
        ref={ref}
        pointerEvents="auto"
        justifyContent="start"
        {...buttonProps}
      >
        {item.type === SearchItemTypes.CreateAction && (
          <>
            <FiPlus />
            <Box ml={2}>
              {t(`molecules.search.SearchResultItem.create`, {
                name: item.text,
              })}
            </Box>
          </>
        )}

        {item.type === SearchItemTypes.Circle &&
          item.circleRoles.map((circle, i) => (
            <React.Fragment key={circle.id}>
              {i !== 0 && <ChevronRightIcon />}
              {circle.role.name}
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
                {circle.role.name}
              </React.Fragment>
            ))}

            <Avatar
              name={item.member.name}
              src={item.member.picture || undefined}
              size="sm"
              ml={3}
              mr={2}
            />
            {item.member.name}
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
            <Tag colorScheme={taskStatusColors[item.task.status]}>
              {t(`common.taskStatus.${item.task.status}`)}
            </Tag>
            <Box ml={2}>{item.task.title}</Box>
          </>
        )}
      </Button>
    )
  }
)

SearchResultItem.displayName = 'SearchResultItem'

export default SearchResultItem
