import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { BoxProps } from '@chakra-ui/react'
import { useMeetingLogsSubscription } from '@gql'
import { useOrgId } from '@hooks/useOrgId'
import { LogType } from '@shared/model/log'
import { ReactNode, useMemo } from 'react'
import LogsList from '../log/LogsList'

interface Props extends BoxProps {
  meetingId: string
  includeTypes?: LogType[]
  excludeTypes?: LogType[]
  hideEmpty?: boolean
  header?: ReactNode
}

export default function MeetingLogs({
  meetingId,
  includeTypes,
  excludeTypes,
  hideEmpty,
  header,
  ...boxProps
}: Props) {
  const orgId = useOrgId()

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
    <>
      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      {header}
      {logs && <LogsList logs={logs} {...boxProps} />}
    </>
  )
}
