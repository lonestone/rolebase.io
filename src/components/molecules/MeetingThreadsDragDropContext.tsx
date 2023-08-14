import { MeetingContext } from '@contexts/MeetingContext'
import {
  Meeting_Step_Type_Enum,
  ThreadFragment,
  useCircleThreadsSubscription,
  useThreadsWithMeetingNoteSubscription,
  useUpdateMeetingStepMutation,
} from '@gql'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import { MeetingStepThreadsFragment } from '@shared/model/meeting_step'
import { shuffleArray } from '@utils/shuffleArray'
import { truthy } from '@utils/truthy'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { CircleThreadWithMeetingNote } from './meeting/MeetingStepContentThreadItem'

const emptyArray: any[] = []

interface Props {
  children: React.ReactNode
  disabled?: boolean
}

export interface MeetingThreadsContextValue {
  // Selected threads by step, with meeting activity note
  threadsByStep: Record<string, CircleThreadWithMeetingNote[]>
  // Threads that are not selected in any step
  availableThreads: ThreadFragment[]
  loading: boolean
  error: Error | undefined
  add: (stepId: string, threadId: string) => void
  remove: (stepId: string, threadId: string) => void
  randomize: (stepId: string) => void
}

export const MeetingThreadsContext = createContext<
  MeetingThreadsContextValue | undefined
>(undefined)

export default function MeetingThreadsDragDropContext({
  children,
  disabled,
}: Props) {
  const { meeting, circle, steps, editable } = useContext(MeetingContext)!
  const [updateMeetingStep] = useUpdateMeetingStepMutation()

  const threadSteps = useMemo(
    () =>
      steps?.filter(
        (s) =>
          s.type === Meeting_Step_Type_Enum.Threads &&
          // Check if step is active, because we can keep step data after step config deletion
          meeting?.stepsConfig.some((sc) => sc.id === s.stepConfigId)
      ),
    [steps, meeting]
  )

  // All threads ids used in steps
  const stepThreadsIds: string[] = useMemo(() => {
    if (!threadSteps) return emptyArray as string[]
    return threadSteps.reduce((acc, step) => {
      acc.push(
        ...(step as MeetingStepThreadsFragment).data.threadsIds
          // Prevent duplicates
          .filter((id) => !acc.includes(id))
          // Sort ids to prevent from reloading when changing order
          .sort((a, b) => a.localeCompare(b))
      )
      return acc
    }, [] as string[])
  }, [threadSteps])

  // Subscribe to selected threads
  const {
    data: selectedThreadsData,
    error,
    loading,
  } = useThreadsWithMeetingNoteSubscription({
    skip: !meeting || stepThreadsIds.length === 0,
    fetchPolicy: 'cache-first',
    variables: {
      threadsIds: stepThreadsIds,
      meetingId: meeting?.id || '',
    },
  })

  // Threads ids by step id
  const [threadsByStep, setThreadsByStep] = useState<
    Record<string, CircleThreadWithMeetingNote[]>
  >({})

  // Subscribe to all threads of circle
  const { data: threadsData } = useCircleThreadsSubscription({
    skip: !circle || !editable,
    variables: {
      circleId: circle?.id!,
    },
  })
  const threads = threadsData?.thread || (emptyArray as ThreadFragment[])

  // Threads that are not selected in any step
  const [availableThreads, setAvailableThreads] = useState<ThreadFragment[]>([])

  useEffect(() => {
    if (!threadSteps || !selectedThreadsData) return
    const ids: string[] = []

    setThreadsByStep(
      threadSteps.reduce((acc, step) => {
        acc[step.id] =
          (step as MeetingStepThreadsFragment).data.threadsIds
            .map((threadId) => {
              // Prevent duplicates
              if (ids.includes(threadId)) return
              ids.push(threadId)

              // Try getting thread with note first
              const threadWithNotes = selectedThreadsData.thread.find(
                (t) => t.id === threadId
              )
              if (threadWithNotes) {
                return threadWithNotes
              }

              // Or get thread without note if it's loading
              const thread = threads.find((t) => t.id === threadId)
              if (!thread) return
              return {
                ...thread,
                activities: [],
              }
            })
            .filter(truthy) || []
        return acc
      }, {} as Record<string, CircleThreadWithMeetingNote[]>)
    )

    setAvailableThreads(threads.filter((thread) => !ids.includes(thread.id)))
  }, [threadSteps, threads, selectedThreadsData])

  const update = useCallback((stepId: string, threadsIds: string[]) => {
    updateMeetingStep({
      variables: {
        id: stepId,
        values: {
          data: { threadsIds },
        },
      },
    })
  }, [])

  const change = useCallback(
    (stepId: string, selectedThreads: CircleThreadWithMeetingNote[]) => {
      setThreadsByStep((threadsByStep) => ({
        ...threadsByStep,
        [stepId]: selectedThreads,
      }))
      update(
        stepId,
        selectedThreads.map((thread) => thread.id)
      )
    },
    []
  )

  // Drag and drop a thread in a step or across steps
  const handleDragEnd = useCallback(
    ({ source, destination }: DropResult) => {
      const sameStep = destination?.droppableId === source.droppableId
      const sameIndex = destination?.index === source.index
      if (!destination || (sameStep && sameIndex)) {
        return
      }
      const sourceThreads = threadsByStep[source.droppableId]?.slice() || []
      const destinationThreads = sameStep
        ? sourceThreads
        : threadsByStep[destination.droppableId]?.slice() || []
      const [removed] = sourceThreads.splice(source.index, 1)
      destinationThreads.splice(destination.index, 0, removed)
      change(destination.droppableId, destinationThreads)
      if (!sameStep) {
        change(source.droppableId, sourceThreads)
      }
    },
    [threadsByStep]
  )

  // Add a thread to a step
  const add = useCallback(
    (stepId: string, threadId: string) => {
      const stepThreads = threadsByStep[stepId] || []
      const thread = threads.find((thread) => thread.id === threadId)
      if (!thread) {
        update(stepId, [...stepThreads.map((t) => t.id), threadId])
        return
      }
      const newThreads = [...stepThreads, { ...thread, activities: [] }]
      change(stepId, newThreads)
    },
    [threads, threadsByStep, change]
  )

  // Remove thread from step
  const remove = useCallback(
    (stepId: string, threadId: string) => {
      const newThreads = (threadsByStep[stepId] || []).filter(
        (thread) => thread.id !== threadId
      )
      change(stepId, newThreads)
    },
    [threadsByStep, change]
  )

  // Randomize threads order in a step
  const randomize = useCallback(
    (stepId: string) => {
      const stepThreads = threadsByStep[stepId]
      if (!stepThreads || stepThreads.length < 2) return
      change(stepId, shuffleArray(stepThreads))
    },
    [threadsByStep, change]
  )

  const value: MeetingThreadsContextValue = useMemo(() => {
    return {
      threadsByStep,
      availableThreads,
      loading,
      error,
      add,
      remove,
      randomize,
    }
  }, [threadsByStep, availableThreads, loading, error, add, remove, randomize])

  return (
    <MeetingThreadsContext.Provider value={value}>
      <DragDropContext
        key={disabled ? 0 : 1}
        enableDefaultSensors={!disabled}
        onDragEnd={handleDragEnd}
      >
        {children}
      </DragDropContext>
    </MeetingThreadsContext.Provider>
  )
}
