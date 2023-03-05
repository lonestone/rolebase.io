import {
  Thread_Activity_Type_Enum,
  useCreateThreadActivityMutation,
} from '@gql'
import useSuperAdmin from '@hooks/useSuperAdmin'
import { useUserId } from '@nhost/react'
import { useCallback } from 'react'

export default function useCreateThreadMeetingNote() {
  const userId = useUserId()
  const isSuperAdmin = useSuperAdmin()
  const [createThreadActivity] = useCreateThreadActivityMutation()

  // Update notes
  return useCallback(
    async (threadId: string, meetingId: string, notes: string) => {
      // Create activity
      await createThreadActivity({
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
    },
    [isSuperAdmin, userId]
  )
}
