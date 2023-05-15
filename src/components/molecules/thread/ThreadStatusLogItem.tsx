import { Box, Button, Flex, Spacer, Text, useColorMode } from '@chakra-ui/react'
import { LogFragment } from '@gql'
import useDateLocale from '@hooks/useDateLocale'
import { usePathInOrg } from '@hooks/usePathInOrg'
import LogCancelText from '@molecules/log/LogCancelText'
import LogText from '@molecules/log/LogText'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import { format } from 'date-fns'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

interface Props {
  log: LogFragment
}

export default function ThreadStatusLogItem({ log }: Props) {
  const { t } = useTranslation()
  const { colorMode } = useColorMode()
  const dateLocale = useDateLocale()
  const logsPath = usePathInOrg('logs')

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
      <Button as={Link} to={logsPath}>
        {t('ThreadStatusLogItem.button')}
      </Button>
    </Flex>
  )
}
