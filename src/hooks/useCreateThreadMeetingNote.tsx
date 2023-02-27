import {
  Thread_Activity_Type_Enum,
  useCreateThreadActivityMutation,
  useUpdateThreadMutation,
} from '@gql'
import useSuperAdmin from '@hooks/useSuperAdmin'
import { useUserId } from '@nhost/react'
import { useCallback } from 'react'

export default function useCreateThreadMeetingNote() {
  const userId = useUserId()
  const isSuperAdmin = useSuperAdmin()

  const [createThreadActivity] = useCreateThreadActivityMutation()
  const [updateThread] = useUpdateThreadMutation()

  // Update notes
  return useCallback(
    async (threadId: string, meetingId: string, notes: string) => {
      // Create activity
      const { data } = await createThreadActivity({
        variables: {
          values: {
            userId: isSuperAdmin ? userId : undefined,
            threadId,
            type: Thread_Activity_Type_Enum.MeetingNote,
            refMeetingId: meetingId,
            data: {
              notes,
            },
          },
        },
      })
      const id = data?.insert_thread_activity_one?.id

      // Update thread
      await updateThread({
        variables: {
          id: threadId,
          values: {
            lastActivityId: id,
            lastActivityDate: new Date().toISOString(),
          },
        },
      })
    },
    [isSuperAdmin, userId]
  )
}
