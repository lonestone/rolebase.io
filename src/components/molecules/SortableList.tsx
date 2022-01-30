import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import React, { useCallback } from 'react'
import * as yup from 'yup'

interface Props {
  items: Array<{ id: string }>
  children: React.ReactNode
  onDragEnd(oldIndex: number, newIndex: number): void
}

export const stepsConfigSchema = yup.array().of(
  yup.object().shape({
    title: yup.string().required(),
  })
)

export default function SortableList({ items, children, onDragEnd }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (!over || active.id === over.id) return
      const oldIndex = items.findIndex((step) => step.id === active.id)
      const newIndex = items.findIndex((step) => step.id === over.id)
      onDragEnd(oldIndex, newIndex)
    },
    [items, onDragEnd]
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}
