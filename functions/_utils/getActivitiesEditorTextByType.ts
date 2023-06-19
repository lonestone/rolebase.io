// Get the text from the JSON editor based on the type of activity
// This is used to search message or question from the activities
// Check if json parse is valid and if the root exists

import { Thread_Activity_Type_Enum } from '@gql'
import getTextFromJSONEditor from '@utils/getTextFromJSONEditor'

export default function getActivitiesEditorTextByType(
  data: any,
  type: Thread_Activity_Type_Enum
) {
  try {
    if (type === Thread_Activity_Type_Enum.Message) {
      return getTextFromJSONEditor(JSON.parse(data.message).root)
    }
    if (type === Thread_Activity_Type_Enum.Poll) {
      return getTextFromJSONEditor(JSON.parse(data.question).root)
    }
  } catch (error) {
    console.error(error)
  }
}
