import {
  Heading,
  HStack,
  IconButton,
  Spacer,
  StackItem,
  Text,
  Tooltip,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'
import React, { MouseEventHandler, useState } from 'react'
import { LogEntry } from '@shared/log'
import LogCancelText from '@components/molecules/LogCancelText'
import LogText from '@components/molecules/LogText'
import { format } from 'date-fns'
import { dateFnsLocale } from 'src/locale'
import { capitalizeFirstLetter } from 'src/utils'
import LogCancelModal from '@components/organisms/modals/LogCancelModal'
import { FiRotateCcw } from 'react-icons/fi'

interface Props {
  logs?: LogEntry[]
  logsLoading: boolean
}

export default function Mettinglogs({ logs, logsLoading }: Props) {
  // Subscribe meeting steps
  const { colorMode } = useColorMode()
  const [cancelLog, setCancelLog] = useState<LogEntry | undefined>()
  const {
    isOpen: isCancelOpen,
    onOpen: onCancelOpen,
    onClose: onCancelClose,
  } = useDisclosure()
  const handleOpenCancel =
    (log: LogEntry): MouseEventHandler<HTMLButtonElement> =>
    (event) => {
      event.preventDefault()
      setCancelLog(log)
      onCancelOpen()
    }
  return logs && logs.length >= 1 ? (
    <>
      <Heading as="h2" size="md" mt="6" mb="2">
        Historique
      </Heading>
      {logs.map((log) => (
        <HStack
          key={log.id}
          py={3}
          alignItems="top"
          borderBottom="1px solid"
          borderBottomColor={colorMode === 'light' ? 'gray.200' : 'gray.550'}
        >
          <StackItem>
            <Text textDecoration={log.canceled ? 'line-through' : undefined}>
              <LogCancelText log={log} />
              <LogText log={log} />
            </Text>
            <Text fontSize="sm" color="gray.500">
              {capitalizeFirstLetter(
                format(log.createdAt.toDate(), 'PPpp ', {
                  locale: dateFnsLocale,
                })
              )}
            </Text>
          </StackItem>
          <Spacer />
          {!log.canceled && (
            <Tooltip label="Annuler cette action" placement="top" hasArrow>
              <IconButton
                aria-label=""
                size="sm"
                variant="ghost"
                icon={<FiRotateCcw />}
                onClick={handleOpenCancel(log)}
              />
            </Tooltip>
          )}
        </HStack>
      ))}
      {isCancelOpen && cancelLog && (
        <LogCancelModal log={cancelLog} isOpen onClose={onCancelClose} />
      )}
    </>
  ) : !logsLoading ? (
    <>
      <Heading as="h2" size="md" mt="6" mb="4">
        Historique
      </Heading>

      <Text fontSize="sm" color="gray.500">
        {capitalizeFirstLetter("Pas d'historique lié à cette réunion")}
      </Text>
    </>
  ) : (
    <>
      <Heading as="h2" size="md" mt="6" mb="4">
        Historique
      </Heading>

      <Text fontSize="sm" color="gray.500">
        {capitalizeFirstLetter("l'historique est en cours de chargement")}
      </Text>
    </>
  )
}
