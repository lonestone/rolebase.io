// Get the text from the JSON editor based on the type of activity
// This is used to search message or question from the activities
// Check if json parse is valid and if the root exists

import { Thread_Activity_Type_Enum } from '@gql'
import {
  ThreadActivityDataMeetingNote,
  ThreadActivityDataMessage,
  ThreadActivityDataPoll,
} from '@shared/model/thread_activity'
import getTextFromJSONEditor from '@utils/getTextFromJSONEditor'

export default function getActivitiesEditorTextByType(
  data: any,
  type: Thread_Activity_Type_Enum
): string {
  try {
    switch (type) {
      case Thread_Activity_Type_Enum.Message: {
        const { message } = data as ThreadActivityDataMessage
        return getTextFromJSONEditor(JSON.parse(message).root)
      }
      case Thread_Activity_Type_Enum.Poll: {
        const { question } = data as ThreadActivityDataPoll
        return getTextFromJSONEditor(JSON.parse(question).root)
      }
      case Thread_Activity_Type_Enum.MeetingNote: {
        const { notes } = data as ThreadActivityDataMeetingNote
        return getTextFromJSONEditor(JSON.parse(notes).root)
      }
    }
  } catch (error) {
    console.error(error)
  }
  return ''
}
