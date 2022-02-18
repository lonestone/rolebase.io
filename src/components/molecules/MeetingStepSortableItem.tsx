import { Box, Text } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { IconButton, Input, Stack, Tag } from '@chakra-ui/react'
import React from 'react'
import { Control, FieldErrors } from 'react-hook-form'
import useSortableItem from '../../hooks/useSortableItem'
import { fieldName, StepsValues } from './MeetingStepsConfigController'
import { MeetingStepTypes } from '@shared/meetingStep'

interface Props {
  id: string // react-hook-form id
  index: number
  stepType: MeetingStepTypes
  control: Control<StepsValues>
  errors?: FieldErrors<StepsValues>
  onRemove?(index: number): void
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
  const getTitle = (value: MeetingStepTypes) => {
    switch (value) {
      case MeetingStepTypes.Tour:
        return 'Tour de table'
      case MeetingStepTypes.Threads:
        return 'Discussions'
      case MeetingStepTypes.Checklist:
        return 'Checklist'
      case MeetingStepTypes.Indicators:
        return 'Indicateurs'
      case MeetingStepTypes.Tasks:
        return 'Tâches'
      default:
        return 'Tour de table'
    }
  }
  return (
    <Stack {...attributes} spacing={2} direction="row">
      <Tag size="lg" borderRadius="full" cursor="grab" {...listeners}>
        {index + 1}
      </Tag>
      <Stack spacing={2} direction="row" flex="1">
        <Box w="100%" alignItems="center" lineHeight="1" display="flex">
          <Text pl="5">{getTitle(stepType)}</Text>
        </Box>

        <Input
          {...control.register(`${fieldName}.${index}.title`)}
          isInvalid={!!errors?.[fieldName]?.[index]}
          placeholder="Titre de l'étape..."
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
