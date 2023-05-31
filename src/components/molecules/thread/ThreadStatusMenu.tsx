import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react'
import { Thread_Status_Enum } from '@gql'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronDown } from 'react-icons/fi'

export type ThreadStatusMenuProps = {
  value?: Thread_Status_Enum
  onChange: (value: Thread_Status_Enum) => void
}

const threadStatusOptions = [
  Thread_Status_Enum.Active,
  Thread_Status_Enum.Blocked,
  Thread_Status_Enum.Closed,
  Thread_Status_Enum.Preparation,
]

export const ThreadStatusMenu = ({
  value,
  onChange,
}: ThreadStatusMenuProps) => {
  const { t } = useTranslation()

  return (
    <Menu>
      <MenuButton
        as={Button}
        className="userflow-threads-status"
        size="sm"
        variant="outline"
        rightIcon={<FiChevronDown />}
      >
        {t(`common.threadStatus.${value ?? Thread_Status_Enum.Preparation}`)}
      </MenuButton>
      <MenuList zIndex={2}>
        <MenuOptionGroup type="radio" value={value}>
          {threadStatusOptions.map((option) => (
            <MenuItemOption
              key={option}
              value={option}
              onClick={() => option !== value && onChange(option)}
            >
              {t(`common.threadStatus.${option}`)}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}
