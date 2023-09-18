import { MenuItemOption, MenuList, MenuOptionGroup } from '@chakra-ui/react'
import { Thread_Status_Enum } from '@gql'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  value: Thread_Status_Enum
  onChange: (value: Thread_Status_Enum) => void
}

const threadStatusOptions = [
  Thread_Status_Enum.Preparation,
  Thread_Status_Enum.Active,
  Thread_Status_Enum.Blocked,
  Thread_Status_Enum.Closed,
]

export default function ThreadStatusMenuList({ value, onChange }: Props) {
  const { t } = useTranslation()

  return (
    <MenuList zIndex={2000}>
      <MenuOptionGroup type="radio" value={value}>
        {threadStatusOptions.map((status) => (
          <MenuItemOption
            key={status}
            value={status}
            onClick={() => status !== value && onChange(status)}
          >
            {t(`common.threadStatus.${status}`)}
          </MenuItemOption>
        ))}
      </MenuOptionGroup>
    </MenuList>
  )
}
