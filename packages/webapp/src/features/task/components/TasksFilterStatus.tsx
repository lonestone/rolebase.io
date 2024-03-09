import {
  Button,
  ButtonProps,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react'
import { Task_Status_Enum } from '@gql'
import { taskStatusList } from '@rolebase/shared/model/task'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDownIcon } from 'src/icons'

interface Props extends Omit<ButtonProps, 'value' | 'onChange'> {
  value: Task_Status_Enum | undefined
  onChange: (value: Task_Status_Enum | undefined) => void
}

// Status filter
const taskStatusNotDone = 'NotDone'
type TaskStatusFilter = Task_Status_Enum | typeof taskStatusNotDone

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
    onChange(
      status === taskStatusNotDone ? undefined : (status as Task_Status_Enum)
    )
  }, [])

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon size="1em" />}
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
