import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  TagProps,
} from '@chakra-ui/react'
import { Task_Status_Enum } from '@gql'
import { taskStatusList } from '@shared/model/task'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { taskStatusColors } from 'src/theme'

interface Props extends Omit<TagProps, 'onChange'> {
  value: Task_Status_Enum
  readOnly?: boolean
  onChange(status: Task_Status_Enum): void
}

export default function TaskStatusInput({
  value,
  readOnly,
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
        disabled={readOnly}
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
            cursor="pointer"
            py={2}
            borderRadius={0}
            onClick={() => onChange(status)}
          >
            {t(`common.taskStatus.${status}`)}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}
