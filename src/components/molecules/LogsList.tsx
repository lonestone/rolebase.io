import { useDisclosure } from '@chakra-ui/react'
import LogCancelModal from '@components/organisms/modals/LogCancelModal'
import { LogEntry } from '@shared/log'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import LogItem from './LogItem'

interface Props {
  logs: LogEntry[]
}

export default function LogsList({ logs }: Props) {
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

  return (
    <>
      {logs.length === 0 && <i>{t('molecules.LogsList.empty')}</i>}

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
    </>
  )
}
