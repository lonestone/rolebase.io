import { Circle, Tooltip } from '@chakra-ui/react'
import { Thread_Status_Enum } from '@gql'
import { useTranslation } from 'react-i18next'
import { threadStatusColors } from 'src/theme'

export type CircleThreadStatusProps = {
  status: Thread_Status_Enum
}

export const CircleThreadStatus = ({ status }: CircleThreadStatusProps) => {
  const { t } = useTranslation()

  return (
    <Tooltip
      hasArrow
      placement="left"
      label={t(`common.threadStatus.${status}`)}
    >
      <Circle
        size={6}
        bg={threadStatusColors[status].bg}
        _dark={{ bg: threadStatusColors[status].darkBg }}
      />
    </Tooltip>
  )
}
