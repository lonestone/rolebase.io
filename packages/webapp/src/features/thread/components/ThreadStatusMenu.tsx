import { Button, Menu, MenuButton } from '@chakra-ui/react'
import { Thread_Status_Enum } from '@gql'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDownIcon } from 'src/icons'
import ThreadStatusMenuList from './ThreadStatusMenuList'

export type ThreadStatusMenuProps = {
  value: Thread_Status_Enum
  size?: 'sm' | 'md' | 'lg'
  onChange: (value: Thread_Status_Enum) => void
}

export const ThreadStatusMenu = ({
  value,
  size = 'sm',
  onChange,
}: ThreadStatusMenuProps) => {
  const { t } = useTranslation()

  return (
    <Menu>
      <MenuButton
        as={Button}
        size={size}
        variant="outline"
        rightIcon={<ChevronDownIcon size="1em" />}
      >
        {t(`common.threadStatus.${value ?? Thread_Status_Enum.Preparation}`)}
      </MenuButton>
      <ThreadStatusMenuList value={value} onChange={onChange} />
    </Menu>
  )
}
