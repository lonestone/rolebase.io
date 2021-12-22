import { CloseIcon } from '@chakra-ui/icons'
import { IconButton, Input, Stack, Tag } from '@chakra-ui/react'
import MeetingStepTypeSelect from '@components/atoms/MeetingStepTypeSelect'
import { defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import React, { useCallback } from 'react'
import { Control, FieldErrors } from 'react-hook-form'
import { fieldName, StepsValues } from './MeetingStepsConfigController'

interface Props {
  id: string // react-hook-form id
  index: number
  control: Control<StepsValues>
  errors?: FieldErrors<StepsValues>
  onRemove(index: number): void
}

export default function MeetingStepDraggable({
  id,
  index,
  control,
  errors,
  onRemove,
}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      animateLayoutChanges: (args) =>
        args.isSorting || args.wasDragging
          ? defaultAnimateLayoutChanges(args)
          : true,
    })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleRemove = useCallback(() => onRemove(index), [index, onRemove])

  return (
    <Stack
      ref={setNodeRef}
      spacing={2}
      direction="row"
      style={style}
      {...attributes}
      zIndex={1}
    >
      <Tag size="lg" borderRadius="full" cursor="grab" {...listeners}>
        {index + 1}
        {id}
      </Tag>
      <Stack spacing={2} direction="row" flex="1">
        <MeetingStepTypeSelect
          {...control.register(`${fieldName}.${index}.type`)}
        />
        <Input
          {...control.register(`${fieldName}.${index}.title`)}
          isInvalid={!!errors?.[fieldName]?.[index]}
          placeholder="Titre de l'étape..."
          control={control}
        />
      </Stack>
      <IconButton aria-label="" icon={<CloseIcon />} onClick={handleRemove} />
    </Stack>
  )
}
