import { Box, BoxProps, Text, useDisclosure } from '@chakra-ui/react'
import LogCancelModal from '@components/organisms/log/LogCancelModal'
import { LogEntry } from '@shared/model/log'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import LogItem from './LogItem'

interface Props extends BoxProps {
  logs: LogEntry[]
  hideEmpty?: boolean
}

export default function LogsList({ logs, hideEmpty, ...boxProps }: Props) {
  const { t } = useTranslation()

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

  if (hideEmpty && logs.length === 0) return null

  return (
    <Box {...boxProps}>
      {logs.length === 0 && (
        <Text fontStyle="italic">{t('LogsList.empty')}</Text>
      )}

      {logs.map((log) => (
        <LogItem
          key={log.id}
          log={log}
          onCancel={() => handleOpenCancel(log)}
        />
      ))}

      {isCancelOpen && cancelLog && (
        <LogCancelModal log={cancelLog} isOpen onClose={onCancelClose} />
      )}
    </Box>
  )
}
