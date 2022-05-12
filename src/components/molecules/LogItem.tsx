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
import useDateLocale from '@hooks/useDateLocale'
import { LogEntry } from '@shared/model/log'
import { format } from 'date-fns'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiRotateCcw } from 'react-icons/fi'
import { capitalizeFirstLetter } from 'src/utils'

interface Props {
  log: LogEntry
  onCancel(): void
}

export default function LogItem({ log, onCancel }: Props) {
  const { t } = useTranslation()
  const { colorMode } = useColorMode()
  const dateLocale = useDateLocale()

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
            format(log.createdAt.toDate(), 'PPpp', {
              locale: dateLocale,
            })
          )}
        </Text>
      </Box>

      <Spacer />

      {!log.canceled && (
        <Tooltip label={t('molecules.LogItem.cancel')} placement="top" hasArrow>
          <IconButton
            aria-label={t('molecules.LogItem.cancel')}
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
