import { Box, BoxProps, Text, useDisclosure } from '@chakra-ui/react'
import useOrgMember from '@hooks/useOrgMember'
import LogCancelModal from '@organisms/log/LogCancelModal'
import { LogEntry } from '@shared/model/log'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import LogItem from '../log/LogItem'

interface Props extends BoxProps {
  logs: LogEntry[]
}

export default function LogsList({ logs, ...boxProps }: Props) {
  const { t } = useTranslation()
  const isMember = useOrgMember()

  // Log modal
  const [cancelLog, setCancelLog] = useState<LogEntry | undefined>()
  const {
    isOpen: isCancelOpen,
    onOpen: onCancelOpen,
    onClose: onCancelClose,
  } = useDisclosure()

  const handleOpenCancel = useCallback((log: LogEntry) => {
    setCancelLog(log)
    onCancelOpen()
  }, [])

  return (
    <Box {...boxProps}>
      {logs.length === 0 && (
        <Text fontStyle="italic">{t('LogsList.empty')}</Text>
      )}

      {logs.map((log) => (
        <LogItem
          key={log.id}
          log={log}
          onCancel={isMember ? () => handleOpenCancel(log) : undefined}
        />
      ))}

      {isCancelOpen && cancelLog && (
        <LogCancelModal log={cancelLog} isOpen onClose={onCancelClose} />
      )}
    </Box>
  )
}
