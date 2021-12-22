import { Button, Stack } from '@chakra-ui/react'
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
import { MeetingStepConfig, MeetingStepTypes } from '@shared/meeting'
import { nanoid } from 'nanoid'
import React, { useCallback } from 'react'
import { Control, FieldErrors, useFieldArray } from 'react-hook-form'
import { FiPlus } from 'react-icons/fi'
import * as yup from 'yup'
import MeetingStepDraggable from './MeetingStepDraggable'

export const fieldName = 'stepsConfig' as const

export interface StepsValues {
  [fieldName]: MeetingStepConfig[]
}

interface Props {
  control: Control<StepsValues>
  errors?: FieldErrors<StepsValues>
}

export const stepsConfigSchema = yup.array().of(
  yup.object().shape({
    title: yup.string().required(),
  })
)

export default function MeetingStepsConfigController({
  control,
  errors,
}: Props) {
  // Steps
  const {
    fields: stepsFields,
    append: appendStep,
    remove: removeStep,
    move: moveStep,
  } = useFieldArray({
    control,
    name: fieldName,
  })

  const handleAdd = () =>
    appendStep({
      id: nanoid(5),
      type: MeetingStepTypes.Tour,
      title: '',
    })

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (!over || active.id === over.id) return
      const oldIndex = stepsFields.findIndex((step) => step.id === active.id)
      const newIndex = stepsFields.findIndex((step) => step.id === over.id)
      moveStep(oldIndex, newIndex)
    },
    [stepsFields]
  )

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext
          items={stepsFields}
          strategy={verticalListSortingStrategy}
        >
          <Stack spacing={2}>
            {stepsFields.map((field, index) => (
              <MeetingStepDraggable
                key={field.id}
                id={field.id}
                index={index}
                control={control}
                errors={errors}
                onRemove={removeStep}
              />
            ))}
          </Stack>
        </SortableContext>
      </DndContext>

      <Button mt={2} w="100%" leftIcon={<FiPlus />} onClick={handleAdd}>
        Ajouter une étape
      </Button>
    </>
  )
}
