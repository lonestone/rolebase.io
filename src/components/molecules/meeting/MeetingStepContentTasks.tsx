import { Box } from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import { Task_Status_Enum, useUpdateMeetingStepMutation } from '@gql'
import TasksModule from '@organisms/task/TasksModule'
import { LogType } from '@shared/model/log'
import { MeetingStepTasksFragment } from '@shared/model/meeting_step'
import { TasksViewTypes } from '@shared/model/task'
import throttle from 'lodash.throttle'
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import MeetingLogs from './MeetingLogs'

interface Props {
  step: MeetingStepTasksFragment
}

export const taskLogTypes = [
  LogType.TaskCreate,
  LogType.TaskUpdate,
  LogType.TaskStatusUpdate,
  LogType.TaskArchive,
]

export default function MeetingStepContentTasks({ step }: Props) {
  const { meeting, circle, isEnded } = useContext(MeetingContext)!
  const [updateMeetingStep] = useUpdateMeetingStepMutation()

  // Cached data for optimistic updates
  const cachedDataRef = useRef<MeetingStepTasksFragment['data']>(step.data)
  const [cachedData, setCachedData] = useState<
    MeetingStepTasksFragment['data']
  >(step.data)
  useEffect(() => setCachedData(step.data), [step.data])

  // We use throttle because we sometimes update the data multiple times at once
  const saveDataThrottled = useMemo(
    () =>
      throttle(
        () =>
          updateMeetingStep({
            variables: {
              id: step.id,
              values: {
                data: cachedDataRef.current,
              },
            },
          }),
        100,
        { leading: false }
      ),
    [step.id, updateMeetingStep]
  )

  const updateData = useCallback(
    (data: Partial<MeetingStepTasksFragment['data']>) => {
      const newData = { ...cachedDataRef.current, ...data }
      cachedDataRef.current = newData
      setCachedData(newData)
      saveDataThrottled()
    },
    [step.id]
  )

  const handleViewChange = useCallback(
    (viewType: TasksViewTypes) => updateData({ viewType }),
    [updateData]
  )

  const handleMemberChange = useCallback(
    (memberId: string | undefined) =>
      updateData({ filterMemberId: memberId || null }),
    [updateData]
  )

  const handleStatusChange = useCallback(
    (status: Task_Status_Enum | undefined) =>
      updateData({ filterStatus: status || null }),
    [updateData]
  )

  if (!meeting || !circle) return null

  return (
    <Box mb={5}>
      {!isEnded && (
        <TasksModule
          view={cachedData.viewType || TasksViewTypes.Kanban}
          circleId={circle.id}
          memberId={cachedData.filterMemberId || undefined}
          status={cachedData.filterStatus || undefined}
          overflowContainer={{
            expandLeft: true,
            expandRight: true,
          }}
          onViewChange={handleViewChange}
          onMemberChange={handleMemberChange}
          onStatusChange={handleStatusChange}
          mt={5}
          mb={10}
        />
      )}

      <MeetingLogs
        meetingId={meeting.id}
        includeTypes={taskLogTypes}
        hideEmpty
      />
    </Box>
  )
}
