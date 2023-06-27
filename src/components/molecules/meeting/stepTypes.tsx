import { Meeting_Step_Type_Enum } from '@gql'
import {
  FiCheckSquare,
  FiCompass,
  FiFile,
  FiList,
  FiMessageSquare,
} from 'react-icons/fi'

export const stepsAndIcons = [
  {
    type: Meeting_Step_Type_Enum.Tour,
    icon: FiFile,
  },
  {
    type: Meeting_Step_Type_Enum.Threads,
    icon: FiMessageSquare,
  },
  {
    type: Meeting_Step_Type_Enum.Checklist,
    icon: FiList,
  },
  {
    type: Meeting_Step_Type_Enum.Indicators,
    icon: FiCompass,
  },
  {
    type: Meeting_Step_Type_Enum.Tasks,
    icon: FiCheckSquare,
  },
]
