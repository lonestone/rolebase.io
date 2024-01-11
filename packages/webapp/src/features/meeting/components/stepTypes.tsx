import { Meeting_Step_Type_Enum } from '@gql'
import {
  ChecklistIcon,
  IndicatorsIcon,
  NoteIcon,
  TaskIcon,
  ThreadIcon,
} from 'src/icons'

export const stepsAndIcons = [
  {
    type: Meeting_Step_Type_Enum.Tour,
    icon: NoteIcon,
  },
  {
    type: Meeting_Step_Type_Enum.Threads,
    icon: ThreadIcon,
  },
  {
    type: Meeting_Step_Type_Enum.Tasks,
    icon: TaskIcon,
  },
  {
    type: Meeting_Step_Type_Enum.Checklist,
    icon: ChecklistIcon,
  },
  {
    type: Meeting_Step_Type_Enum.Indicators,
    icon: IndicatorsIcon,
  },
]
