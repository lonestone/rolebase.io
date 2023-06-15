import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { BoxProps } from '@chakra-ui/react'
import { useTaskLogsSubscription } from '@gql'
import { useOrgId } from '@hooks/useOrgId'
import LogsList from '@molecules/log/LogsList'
import React, { ReactNode } from 'react'

interface Props extends BoxProps {
  taskId: string
  hideEmpty?: boolean
  header?: ReactNode
}

export const TaskLogs = ({ taskId, header, hideEmpty, ...boxProps }: Props) => {
  const orgId = useOrgId()

  //Subscribe to logs
  const { data, error, loading } = useTaskLogsSubscription({
    skip: !orgId,
    variables: { taskId },
  })

  const logs = data?.log

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
