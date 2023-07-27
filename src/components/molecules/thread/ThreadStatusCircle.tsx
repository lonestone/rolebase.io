import { Circle, Menu, MenuButton, Portal, Tooltip } from '@chakra-ui/react'
import { Thread_Status_Enum } from '@gql'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { threadStatusColors } from 'src/theme'
import ThreadStatusMenuList from './ThreadStatusMenuList'

interface Props {
  value?: Thread_Status_Enum
  readOnly?: boolean
  onChange: (value: Thread_Status_Enum) => void
}

export default function ThreadStatusCircle({
  value = Thread_Status_Enum.Preparation,
  readOnly,
  onChange,
}: Props) {
  const { t } = useTranslation()

  return (
    <Menu>
      <Tooltip
        hasArrow
        placement="left"
        label={t(`common.threadStatus.${value}`)}
      >
        <MenuButton disabled={readOnly}>
          <Circle size="18px" bg={`${threadStatusColors[value]}.400`} />
        </MenuButton>
      </Tooltip>
      <Portal>
        <ThreadStatusMenuList value={value} onChange={onChange} />
      </Portal>
    </Menu>
  )
}
