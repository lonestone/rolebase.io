import { taskStatusColors } from '@atoms/TaskStatusTag'
import { Button, HStack } from '@chakra-ui/react'
import { TaskFragment, Task_Status_Enum } from '@gql'
import { DragDropContext, Draggable, DropResult } from '@hello-pangea/dnd'
import useUpdateTaskStatus from '@hooks/useUpdateTaskStatus'
import { KanbanColumn } from '@molecules/task/KanbanColumn'
import TaskCard from '@molecules/task/TaskCard'
import { taskStatusList } from '@shared/model/task'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  tasks: TaskFragment[]
  showCircle?: boolean
  showMember?: boolean
  onOrderChange?(tasksIds: string[], changedTask: TaskFragment): void
  onDoneTasksClick?(): void
}

export default function TasksKanban({
  tasks,
  onOrderChange,
  showCircle,
  showMember,
  onDoneTasksClick,
}: Props) {
  const { t } = useTranslation()
  const updateTaskStatus = useUpdateTaskStatus()

  // Move a task
  const handleDragEnd = useCallback(
    (result: DropResult) => {
      const taskId = result.draggableId
      const status = result.destination?.droppableId as
        | Task_Status_Enum
        | undefined
      const indexInStatus = result.destination?.index
      const task = tasks.find((t) => t.id === taskId)
      if (!task || !status || indexInStatus === undefined) return

      // Change status
      if (status !== task.status) {
        updateTaskStatus(task, status)
      }

      const tasksIds = taskStatusList.flatMap((s) => {
        const ids = tasks.filter((t) => t.status === s).map((task) => task.id)
        // Remove taskId from previous position
        const index = ids.indexOf(taskId)
        if (index !== -1) {
          ids.splice(index, 1)
        }
        // Add taskId to new position
        if (s === status) {
          ids.splice(indexInStatus, 0, taskId)
        }
        return ids
      })

      onOrderChange?.(tasksIds, { ...task, status })
    },
    [tasks, onOrderChange, updateTaskStatus]
  )

  return (
    <DragDropContext
      key={!onOrderChange ? 0 : 1}
      enableDefaultSensors={!!onOrderChange}
      onDragEnd={handleDragEnd}
    >
      <HStack align="start" pb={5} justifyContent="center" minW="min-content">
        {taskStatusList.map((status) => {
          const filteredTasks = tasks.filter((task) => task.status === status)
          return (
            <KanbanColumn
              key={status}
              id={status}
              title={t(`common.taskStatus.${status}`)}
              colorScheme={taskStatusColors[status]}
              count={filteredTasks.length}
            >
              {filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <TaskCard
                      ref={provided.innerRef}
                      task={task}
                      showCircle={showCircle}
                      showMember={showMember}
                      isDragging={snapshot.isDragging}
                      mb={2}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    />
                  )}
                </Draggable>
              ))}

              {status === Task_Status_Enum.Done && onDoneTasksClick && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onDoneTasksClick}
                  ml={1}
                >
                  {t('TasksKanban.showDoneTasks')}
                </Button>
              )}
            </KanbanColumn>
          )
        })}
      </HStack>
    </DragDropContext>
  )
}
