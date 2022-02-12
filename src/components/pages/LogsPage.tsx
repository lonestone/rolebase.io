import { subscribeLastLogs } from '@api/entities/logs'
import {
  Container,
  Flex,
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
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import { Title } from '@components/atoms/Title'
import LogCancelText from '@components/molecules/LogCancelText'
import LogText from '@components/molecules/LogText'
import LogCancelModal from '@components/organisms/modals/LogCancelModal'
import useSubscription from '@hooks/useSubscription'
import { LogEntry } from '@shared/log'
import { useStoreState } from '@store/hooks'
import { format } from 'date-fns'
import React, { MouseEventHandler, useState } from 'react'
import { FiRotateCcw } from 'react-icons/fi'
import { dateFnsLocale } from 'src/locale'
import { capitalizeFirstLetter } from 'src/utils'

export default function LogsPage() {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const { colorMode } = useColorMode()

  const subscribe = orgId ? subscribeLastLogs(orgId) : undefined
  const { data, error, loading } = useSubscription(subscribe)

  // Log modal
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

  return (
    <Container maxW="xl" mt={10}>
      <Title>Historique</Title>

      <Flex mb={5} alignItems="center" flexWrap="wrap">
        <Heading as="h1" size="md">
          Historique
        </Heading>
      </Flex>

      {loading && <Loading active center />}
      <TextErrors errors={[error]} />

      {data?.map((log) => (
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
    </Container>
  )
}
