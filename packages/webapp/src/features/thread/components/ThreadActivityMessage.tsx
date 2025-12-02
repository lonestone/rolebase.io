import Markdown from '@/common/atoms/Markdown'
import { useAuth } from '@/user/hooks/useAuth'
import { ThreadActivityMessageFragment } from '@rolebase/shared/model/thread_activity'
import React, { useState } from 'react'
import ThreadActivityLayout from './ThreadActivityLayout'
import ThreadActivityMessageEdit from './ThreadActivityMessageEdit'

interface Props {
  activity: ThreadActivityMessageFragment
}

export default function ThreadActivityMessage({ activity }: Props) {
  const { user } = useAuth()

  // Edition
  const isUserOwner = user?.id === activity.userId
  const [editing, setEditing] = useState(false)

  return (
    <ThreadActivityLayout
      activity={activity}
      allowDelete
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
