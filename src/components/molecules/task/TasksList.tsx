import { Box, Text } from '@chakra-ui/react'
import { TaskFragment } from '@gql'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import TaskItem from './TaskItem'

interface Props {
  tasks: TaskFragment[]
  showCircle?: boolean
  showMember?: boolean
  onOrderChange?(tasksIds: string[]): void
}

export default function TasksList({
  tasks,
  showCircle,
  showMember,
  onOrderChange,
}: Props) {
  const { t } = useTranslation()

  // Move a task
  const handleDragEnd = useCallback(
    (result: DropResult) => {
      const taskId = result.draggableId
      const index = result.destination?.index
      const task = tasks.find((t) => t.id === taskId)
      if (!task || index === undefined) return

      const tasksIds = tasks.map((task) => task.id)
      // Remove taskId from previous position
      const prevIndex = tasksIds.indexOf(taskId)
      if (prevIndex !== -1) {
        tasksIds.splice(prevIndex, 1)
      }
      // Add taskId to new position
      tasksIds.splice(index, 0, taskId)

      onOrderChange?.(tasksIds)
    },
    [tasks, onOrderChange]
  )

  return (
    <DragDropContext
      key={!onOrderChange ? 0 : 1}
      enableDefaultSensors={!!onOrderChange}
      onDragEnd={handleDragEnd}
    >
      {tasks.length === 0 && (
        <Text fontStyle="italic">{t('TasksList.empty')}</Text>
      )}

      <Droppable droppableId="TasksList">
        {(provided) => (
          <Box ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <TaskItem
                    key={task.id}
                    ref={provided.innerRef}
                    task={task}
                    showCircle={showCircle}
                    showMember={showMember}
                    isDragging={snapshot.isDragging}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  />
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  )
}
