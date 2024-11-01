import useCurrentMember from '@/member/hooks/useCurrentMember'
import { useDisclosure } from '@chakra-ui/react'
import { Task_Status_Enum, TaskFragment } from '@gql'
import { TasksViewTypes } from '@rolebase/shared/model/task'
import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react'
import TaskModal from '../modals/TaskModal'

export interface TasksModuleContextParams {
  view: TasksViewTypes
  circleId?: string
  memberId?: string
  status?: Task_Status_Enum
  onViewChange?: (view: TasksViewTypes) => void
  onCircleChange?: (circleId: string | undefined) => void
  onMemberChange?: (memberId: string | undefined) => void
  onStatusChange?: (status: Task_Status_Enum | undefined) => void
}

export interface TasksModuleContextValue extends TasksModuleContextParams {
  openCreateTask?: (defaults?: Partial<TaskFragment>) => void
}

export const TasksModuleContext = createContext<TasksModuleContextValue>({
  view: TasksViewTypes.Kanban,
})

interface TasksModuleProviderProps extends TasksModuleContextParams {
  children: ReactNode
}

export function TasksModuleProvider({
  children,
  ...params
}: TasksModuleProviderProps) {
  const modal = useDisclosure()
  const currentMember = useCurrentMember()

  const [defaults, setDefaults] = useState<Partial<TaskFragment>>({})

  useEffect(() => {
    setDefaults({
      memberId: params.memberId || currentMember?.id,
      circleId: params.circleId,
      status: params.status,
    })
  }, [params.memberId, params.circleId, params.status])

  const value: TasksModuleContextValue = useMemo(
    () => ({
      ...params,
      openCreateTask: (defaults) => {
        if (defaults) {
          setDefaults((d) => ({ ...d, ...defaults }))
        }
        modal.onOpen()
      },
    }),
    [
      params.view,
      params.circleId,
      params.memberId,
      params.status,
      params.onViewChange,
      params.onCircleChange,
      params.onMemberChange,
      params.onStatusChange,
    ]
  )

  return (
    <TasksModuleContext.Provider value={value}>
      {children}

      {modal.isOpen && (
        <TaskModal isOpen defaults={defaults} onClose={modal.onClose} />
      )}
    </TasksModuleContext.Provider>
  )
}
