import { DragHandleIcon } from '@chakra-ui/icons'
import { Center, HStack, IconButton, Input, Tag, Text } from '@chakra-ui/react'
import { MeetingStepTypes } from '@shared/model/meetingStep'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Control, FieldErrors } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FiX } from 'react-icons/fi'
import { fieldName, StepsValues } from './MeetingStepsConfigController'

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
  const { t } = useTranslation()

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <HStack
          ref={provided.innerRef}
          role="none"
          mb={2}
          {...provided.draggableProps}
        >
          <Center {...provided.dragHandleProps} cursor="grab">
            <DragHandleIcon />
          </Center>

          <Tag
            size="lg"
            borderRadius="full"
            cursor="grab"
            {...provided.dragHandleProps}
          >
            {index + 1}
          </Tag>

          <Text flex={1} pl={5}>
            {t(`common.meetingSteps.${stepType}`)}
          </Text>

          <Input
            {...control.register(`${fieldName}.${index}.title`)}
            flex={1}
            isInvalid={!!errors?.[fieldName]?.[index]}
            placeholder={t(`MeetingStepSortableItem.placeholder`)}
          />

          {onRemove && (
            <IconButton
              aria-label={t('common.delete')}
              variant="ghost"
              icon={<FiX />}
              onClick={() => onRemove?.(index)}
            />
          )}
        </HStack>
      )}
    </Draggable>
  )
}
