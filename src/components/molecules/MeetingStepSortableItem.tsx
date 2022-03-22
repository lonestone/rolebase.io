import { CloseIcon } from '@chakra-ui/icons'
import { IconButton, Input, Stack, Tag, Text } from '@chakra-ui/react'
import { MeetingStepTypes } from '@shared/meetingStep'
import React from 'react'
import { Control, FieldErrors } from 'react-hook-form'
import useSortableItem from '../../hooks/useSortableItem'
import { fieldName, StepsValues } from './MeetingStepsConfigController'

interface Props {
  id: string // react-hook-form id
  index: number
  stepType: MeetingStepTypes
  control: Control<StepsValues>
  errors?: FieldErrors<StepsValues>
  onRemove?(index: number): void
}

export const meetingStepNames: Record<MeetingStepTypes, string> = {
  [MeetingStepTypes.Tour]: 'Tour de table',
  [MeetingStepTypes.Threads]: 'Discussions',
  [MeetingStepTypes.Checklist]: 'Checklist',
  [MeetingStepTypes.Indicators]: 'Indicateurs',
  [MeetingStepTypes.Tasks]: 'Tâches',
}

export default function MeetingStepSortableItem({
  id,
  index,
  stepType,
  control,
  errors,
  onRemove,
}: Props) {
  const { attributes, listeners } = useSortableItem(id)

  return (
    <Stack
      {...attributes}
      role="none"
      spacing={2}
      direction="row"
      align="center"
    >
      <Tag size="lg" borderRadius="full" cursor="grab" {...listeners}>
        {index + 1}
      </Tag>

      <Text flex={1} pl={5}>
        {meetingStepNames[stepType]}
      </Text>

      <Input
        {...control.register(`${fieldName}.${index}.title`)}
        flex={1}
        isInvalid={!!errors?.[fieldName]?.[index]}
        placeholder="Titre de l'étape..."
      />

      {onRemove && (
        <IconButton
          aria-label=""
          size="sm"
          variant="ghost"
          icon={<CloseIcon />}
          onClick={() => onRemove?.(index)}
        />
      )}
    </Stack>
  )
}
