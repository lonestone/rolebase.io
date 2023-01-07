import {
  Button,
  ButtonProps,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react'
import { TaskStatus, taskStatusList } from '@shared/model/task'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronDown } from 'react-icons/fi'

interface Props extends Omit<ButtonProps, 'value' | 'onChange'> {
  value: TaskStatus | undefined
  onChange: (value: TaskStatus | undefined) => void
}

// Status filter
const taskStatusNotDone = 'NotDone'
type TaskStatusFilter = TaskStatus | typeof taskStatusNotDone

const taskStatusFilterList: TaskStatusFilter[] = [
  taskStatusNotDone,
  ...taskStatusList,
]

export default function TasksFilterStatus({
  value,
  onChange,
  ...boxProps
}: Props) {
  const { t } = useTranslation()
  const statusFilter: TaskStatusFilter = value ?? taskStatusNotDone

  const handleChange = useCallback((status: string | string[]) => {
    if (typeof status !== 'string') return
    onChange(status === taskStatusNotDone ? undefined : (status as TaskStatus))
  }, [])

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<FiChevronDown />}
        {...(value ? { variant: 'solid' } : {})}
        {...boxProps}
      >
        {t(`common.taskStatus.${statusFilter}`)}
      </MenuButton>
      <MenuList zIndex={2000}>
        <MenuOptionGroup
          type="radio"
          value={statusFilter}
          onChange={handleChange}
        >
          {taskStatusFilterList.map((status) => (
            <MenuItemOption key={status} value={status}>
              {t(`common.taskStatus.${status}`)}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}
