import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import {
  Box,
  BoxProps,
  Button,
  Collapse,
  Heading,
  useDisclosure,
} from '@chakra-ui/react'
import { useMeetingLogsSubscription } from '@gql'
import { useOrgId } from '@hooks/useOrgId'
import { LogType } from '@shared/model/log'
import React, { useMemo } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import LogsList from '../log/LogsList'

interface Props extends BoxProps {
  meetingId: string
  title: string
  includeTypes?: LogType[]
  excludeTypes?: LogType[]
  hideEmpty?: boolean
}

export default function MeetingLogs({
  meetingId,
  title,
  includeTypes,
  excludeTypes,
  hideEmpty,
  ...boxProps
}: Props) {
  const orgId = useOrgId()
  const showLogs = useDisclosure()

  // Subscribe to logs
  const { data, error, loading } = useMeetingLogsSubscription({
    skip: !orgId,
    variables: { meetingId },
  })

  const logs = useMemo(
    () =>
      data?.log.filter((log) => {
        if (includeTypes && !includeTypes.includes(log.display.type)) {
          return false
        }
        if (excludeTypes && excludeTypes.includes(log.display.type)) {
          return false
        }
        return true
      }),
    [data, includeTypes, excludeTypes]
  )

  if (hideEmpty && logs?.length === 0) return null

  return (
    <Box {...boxProps}>
      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      {logs && (
        <>
          <Button
            variant="link"
            leftIcon={showLogs.isOpen ? <FiChevronUp /> : <FiChevronDown />}
            onClick={showLogs.onToggle}
          >
            {showLogs.isOpen ? (
              <Heading as="h2" size="md" mb={2}>
                {title}
              </Heading>
            ) : (
              title
            )}
          </Button>
          <Collapse in={showLogs.isOpen} animateOpacity>
            <LogsList logs={logs} />
          </Collapse>
        </>
      )}
    </Box>
  )
}
