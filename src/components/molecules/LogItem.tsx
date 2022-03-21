import {
  Box,
  Flex,
  IconButton,
  Spacer,
  Text,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react'
import LogCancelText from '@components/molecules/LogCancelText'
import LogText from '@components/molecules/LogText'
import { LogEntry } from '@shared/log'
import { format } from 'date-fns'
import React from 'react'
import { FiRotateCcw } from 'react-icons/fi'
import { dateFnsLocale } from 'src/locale'
import { capitalizeFirstLetter } from 'src/utils'

interface Props {
  log: LogEntry
  onCancel(): void
}

export default function LogItem({ log, onCancel }: Props) {
  const { colorMode } = useColorMode()
  return (
    <Flex
      py={3}
      borderBottom="1px solid"
      borderBottomColor={colorMode === 'light' ? 'gray.200' : 'gray.550'}
    >
      <Box>
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
      </Box>

      <Spacer />

      {!log.canceled && (
        <Tooltip label="Annuler cette action" placement="top" hasArrow>
          <IconButton
            aria-label=""
            size="sm"
            variant="ghost"
            icon={<FiRotateCcw />}
            onClick={onCancel}
          />
        </Tooltip>
      )}
    </Flex>
  )
}
