import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  TagProps,
} from '@chakra-ui/react'
import { TaskStatus, taskStatusList } from '@shared/task'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props extends Omit<TagProps, 'onChange'> {
  value: TaskStatus
  onChange(status: TaskStatus): void
}

export const taskStatusColors: Record<TaskStatus, string> = {
  [TaskStatus.Open]: 'gray',
  [TaskStatus.InProgress]: 'blue',
  [TaskStatus.InReview]: 'yellow',
  [TaskStatus.Blocked]: 'red',
  [TaskStatus.Done]: 'green',
}

export default function TaskStatusInput({
  value,
  onChange,
  ...tagProps
}: Props) {
  const { t } = useTranslation()

  return (
    <Menu>
      <MenuButton
        as={Tag}
        tabIndex={0}
        colorScheme={taskStatusColors[value]}
        height="fit-content"
        cursor="pointer"
        _hover={{
          opacity: 0.8,
        }}
        {...tagProps}
      >
        {t(`common.taskStatus.${value}`)}
      </MenuButton>

      <MenuList zIndex={2000} minW={0} p={0} shadow="md">
        {taskStatusList.map((status) => (
          <MenuItem
            key={status}
            as={Tag}
            colorScheme={taskStatusColors[status]}
            cursor="pointer"
            borderRadius={0}
            onClick={() => onChange(status)}
            _focus={{
              bg: undefined,
              opacity: 0.8,
            }}
          >
            {t(`common.taskStatus.${status}`)}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}
