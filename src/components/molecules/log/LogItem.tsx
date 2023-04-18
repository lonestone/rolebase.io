import IconTextButton from '@atoms/IconTextButton'
import { Box, Flex, Spacer, Text, useColorMode } from '@chakra-ui/react'
import { LogFragment } from '@gql'
import useDateLocale from '@hooks/useDateLocale'
import LogCancelText from '@molecules/log/LogCancelText'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { FiRotateCcw } from 'react-icons/fi'
import LogText from './LogText'

interface Props {
  log: LogFragment
  onCancel?(): void
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
        <Text fontSize="sm" color="gray.500" _dark={{ color: 'gray.400' }}>
          {capitalizeFirstLetter(
            format(new Date(log.createdAt), 'PPpp', {
              locale: dateLocale,
            })
          )}
        </Text>
      </Box>

      <Spacer />

      {onCancel && !log.canceled && (
        <IconTextButton
          aria-label={t('LogItem.open')}
          size="sm"
          variant="ghost"
          icon={<FiRotateCcw />}
          onClick={onCancel}
        />
      )}
    </Flex>
  )
}
