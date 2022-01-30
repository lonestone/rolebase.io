import { CloseIcon } from '@chakra-ui/icons'
import { IconButton, Input, Stack, Tag } from '@chakra-ui/react'
import MeetingStepTypeSelect from '@components/atoms/MeetingStepTypeSelect'
import React from 'react'
import { Control, FieldErrors } from 'react-hook-form'
import useSortableItem from '../../hooks/useSortableItem'
import { fieldName, StepsValues } from './MeetingStepsConfigController'

interface Props {
  id: string // react-hook-form id
  index: number
  control: Control<StepsValues>
  errors?: FieldErrors<StepsValues>
  onRemove?(index: number): void
}

export default function MeetingStepSortableItem({
  id,
  index,
  control,
  errors,
  onRemove,
}: Props) {
  const { attributes, listeners } = useSortableItem(id)

  return (
    <Stack {...attributes} spacing={2} direction="row">
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
