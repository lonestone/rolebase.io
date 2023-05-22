import { BoxProps, Circle, Tooltip } from '@chakra-ui/react'
import { Thread_Status_Enum } from '@gql'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { threadStatusColors } from 'src/theme'

export interface CircleThreadStatusProps extends BoxProps {
  status: Thread_Status_Enum
}

export const CircleThreadStatus = ({
  status,
  ...boxProps
}: CircleThreadStatusProps) => {
  const { t } = useTranslation()

  return (
    <Tooltip
      hasArrow
      placement="left"
      label={t(`CircleThreadStatus.status.${status}`)}
    >
      <Circle
        size={6}
        bg={threadStatusColors[status].bg}
        _dark={{ bg: threadStatusColors[status].darkBg }}
        {...boxProps}
      />
    </Tooltip>
  )
}
