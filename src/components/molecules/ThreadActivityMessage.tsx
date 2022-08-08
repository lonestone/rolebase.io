import Markdown from '@components/atoms/Markdown'
import ThreadActivityLayout from '@components/molecules/ThreadActivityLayout'
import { ActivityMessage } from '@shared/model/activity'
import { WithId } from '@shared/model/types'
import { useStoreState } from '@store/hooks'
import React, { useState } from 'react'
import ThreadActivityMessageEdit from './ThreadActivityMessageEdit'

interface Props {
  activity: WithId<ActivityMessage>
}

export default function ThreadActivityMessage({ activity }: Props) {
  const userId = useStoreState((state) => state.auth.user?.id)

  // Edition
  const isUserOwner = userId === activity.userId
  const [editing, setEditing] = useState(false)

  return (
    <ThreadActivityLayout
      activity={activity}
      allowDelete={isUserOwner}
      onEdit={isUserOwner ? () => setEditing(true) : undefined}
    >
      {!editing ? (
        <Markdown>{activity.message}</Markdown>
      ) : (
        <ThreadActivityMessageEdit
          id={activity.id}
          defaultMessage={activity.message}
          onClose={() => setEditing(false)}
        />
      )}
    </ThreadActivityLayout>
  )
}
