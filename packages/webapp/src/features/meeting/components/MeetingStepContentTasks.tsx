import TasksModule from '@/task/components/TasksModule'
import { Box } from '@chakra-ui/react'
import { Task_Status_Enum, useUpdateMeetingStepMutation } from '@gql'
import { LogType } from '@rolebase/shared/model/log'
import { MeetingStepTasksFragment } from '@rolebase/shared/model/meeting_step'
import { TasksViewTypes } from '@rolebase/shared/model/task'
import throttle from 'lodash.throttle'
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { MeetingContext } from '../contexts/MeetingContext'
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
  const { t } = useTranslation()
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
    <Box my={5}>
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
        />
      )}

      <MeetingLogs
        meetingId={meeting.id}
        title={t('MeetingStepContentTasks.logs')}
        includeTypes={taskLogTypes}
        hideEmpty
        mt={10}
      />
    </Box>
  )
}
