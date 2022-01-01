import { CloseIcon } from '@chakra-ui/icons'
import { IconButton, Input, Stack, Tag } from '@chakra-ui/react'
import MeetingStepTypeSelect from '@components/atoms/MeetingStepTypeSelect'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import React from 'react'
import { Control, FieldErrors } from 'react-hook-form'
import { fieldName, StepsValues } from './MeetingStepsConfigController'

interface Props {
  id: string // react-hook-form id
  index: number
  control: Control<StepsValues>
  errors?: FieldErrors<StepsValues>
  onRemove?(index: number): void
}

export default function MeetingStepDraggable({
  id,
  index,
  control,
  errors,
  onRemove,
}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    // There is an annoying bug with this transition and the end of drag
    // So we set to undefined when transition is 0ms
    transition: transition === 'transform 0ms linear' ? undefined : transition,
  }

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
      {onRemove && (
        <IconButton
          aria-label=""
          icon={<CloseIcon />}
          onClick={() => onRemove?.(index)}
        />
      )}
    </Stack>
  )
}
