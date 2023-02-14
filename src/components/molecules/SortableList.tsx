import { Box } from '@chakra-ui/react'
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd'
import React, { useCallback } from 'react'

interface Props {
  children: React.ReactNode
  disabled?: boolean
  onDragEnd(oldIndex: number, newIndex: number): void
}

export default function SortableList({ children, disabled, onDragEnd }: Props) {
  const handleDragEnd = useCallback(
    (result: DropResult) => {
      result.source.index
      const oldIndex = result.source.index
      const newIndex = result.destination?.index
      if (newIndex === undefined || oldIndex === newIndex) return
      onDragEnd(oldIndex, newIndex)
    },
    [onDragEnd]
  )

  return (
    <DragDropContext
      key={disabled ? 0 : 1}
      enableDefaultSensors={!disabled}
      onDragEnd={handleDragEnd}
    >
      <Droppable droppableId="list">
        {(provided) => (
          <Box ref={provided.innerRef} {...provided.droppableProps}>
            {children}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  )
}
