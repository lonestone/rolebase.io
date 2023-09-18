import {
  Box,
  Flex,
  IconButton,
  Input,
  Tag,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { Meeting_Step_Type_Enum } from '@gql'
import { Draggable } from '@hello-pangea/dnd'
import React from 'react'
import { Control, FieldErrors } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { DeleteIcon } from 'src/icons'
import { StepsValues, fieldName } from './MeetingStepsConfigController'
import { stepsAndIcons } from './stepTypes'

interface Props {
  id: string // react-hook-form id
  index: number
  stepType: Meeting_Step_Type_Enum
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
  const StepIcon = stepsAndIcons.find((s) => s.type === stepType)?.icon

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Flex
          ref={provided.innerRef}
          role="none"
          alignItems="center"
          mb={2}
          {...provided.draggableProps}
        >
          <Tag
            size="lg"
            borderRadius="full"
            cursor="grab"
            {...provided.dragHandleProps}
          >
            {index + 1}
          </Tag>

          {StepIcon && (
            <Tooltip
              label={
                <Box>
                  <Text fontWeight="bold" mb={1}>
                    {t(`common.meetingSteps.${stepType}`)}
                  </Text>
                  {t(`common.meetingSteps.${stepType}_desc`)}
                </Box>
              }
              placement="top"
              gutter={15}
              hasArrow
              p={3}
            >
              <Box p={2} mx={2} cursor="help">
                <StepIcon />
              </Box>
            </Tooltip>
          )}

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
              icon={<DeleteIcon size={20} />}
              ml={1}
              mr={-2}
              onClick={() => onRemove?.(index)}
            />
          )}
        </Flex>
      )}
    </Draggable>
  )
}
