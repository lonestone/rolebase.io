import { Text } from '@chakra-ui/react'
import { LogType } from '@rolebase/shared/model/log'
import { ThreadActivityChangeStatusFragment } from '@rolebase/shared/model/thread_activity'
import React from 'react'
import { Trans } from 'react-i18next'
import ThreadActivityLayout from './ThreadActivityLayout'
import ThreadStatusTag from './ThreadStatusTag'

export type Props = {
  activity: ThreadActivityChangeStatusFragment
}

export const ThreadActivityChangeStatus = ({ activity }: Props) => {
  const { display } = activity.data

  return (
    <ThreadActivityLayout activity={activity}>
      {display.type === LogType.ThreadStatusUpdate && (
        <Text color="gray.500" _dark={{ color: 'gray.300' }}>
          <Trans
            i18nKey={`ThreadActivityChangeStatus.text`}
            components={{
              status: <ThreadStatusTag status={display.status} />,
            }}
          />
        </Text>
      )}
    </ThreadActivityLayout>
  )
}
