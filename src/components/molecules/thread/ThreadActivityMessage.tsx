import Markdown from '@atoms/Markdown'
import { useUserId } from '@nhost/react'
import { ActivityMessage } from '@shared/model/thread_activity'
import { WithId } from '@shared/model/types'
import React, { useState } from 'react'
import ThreadActivityLayout from './ThreadActivityLayout'
import ThreadActivityMessageEdit from './ThreadActivityMessageEdit'

interface Props {
  activity: WithId<ActivityMessage>
}

export default function ThreadActivityMessage({ activity }: Props) {
  const userId = useUserId()

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
        <Markdown>{activity.data.message}</Markdown>
      ) : (
        <ThreadActivityMessageEdit
          id={activity.id}
          defaultMessage={activity.data.message}
          onClose={() => setEditing(false)}
        />
      )}
    </ThreadActivityLayout>
  )
}
