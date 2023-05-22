import { Circle, Tooltip } from '@chakra-ui/react'
import { Thread_Status_Enum } from '@gql'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export type CircleThreadStatusProps = {
  status?: Thread_Status_Enum
  hasHover?: boolean
}

export const CircleThreadStatus = ({ status }: CircleThreadStatusProps) => {
  const { t } = useTranslation()

  return useMemo(() => {
    switch (status) {
      case Thread_Status_Enum.Preparation:
        return (
          <Tooltip
            hasArrow
            placement="left"
            label={t(
              `CircleThreadStatus.status.${Thread_Status_Enum.Preparation}`
            )}
          >
            <Circle size={6} bg="gray.200" _dark={{ bg: 'whiteAlpha.100' }} />
          </Tooltip>
        )
      case Thread_Status_Enum.Active:
        return (
          <Tooltip
            hasArrow
            placement="left"
            label={t(`CircleThreadStatus.status.${Thread_Status_Enum.Active}`)}
          >
            <Circle size={6} bg="blue.400" _dark={{ bg: 'blue.400' }} />
          </Tooltip>
        )
      case Thread_Status_Enum.Blocked:
        return (
          <Tooltip
            hasArrow
            placement="left"
            label={t(`CircleThreadStatus.status.${Thread_Status_Enum.Blocked}`)}
          >
            <Circle size={6} bg="red.400" _dark={{ bg: 'red.400' }} />
          </Tooltip>
        )
      case Thread_Status_Enum.Closed:
        return (
          <Tooltip
            hasArrow
            placement="left"
            label={t(`CircleThreadStatus.status.${Thread_Status_Enum.Closed}`)}
          >
            <Circle size={6} bg="green.400" _dark={{ bg: 'green.400' }} />
          </Tooltip>
        )
      default:
        return (
          <Tooltip
            hasArrow
            placement="left"
            label={t(
              `CircleThreadStatus.status.${Thread_Status_Enum.Preparation}`
            )}
          >
            <Circle size={6} bg="gray.200" _dark={{ bg: 'whiteAlpha.100' }} />
          </Tooltip>
        )
    }
  }, [status])
}
