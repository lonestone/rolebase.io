import { DragHandleIcon } from '@chakra-ui/icons'
import {
  Box,
  Center,
  Flex,
  HStack,
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
import { FiHelpCircle, FiTrash2 } from 'react-icons/fi'
import { StepsValues, fieldName } from './MeetingStepsConfigController'

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

          <Flex flex={1} pl={5} alignItems="center">
            <Text fontWeight="bold">
              {t(`common.meetingSteps.${stepType}`)}
            </Text>
            <Tooltip
              hasArrow
              p={3}
              label={t(`common.meetingSteps.${stepType}_desc`)}
            >
              <Box ml={3}>
                <FiHelpCircle />
              </Box>
            </Tooltip>
          </Flex>

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
              icon={<FiTrash2 />}
              onClick={() => onRemove?.(index)}
            />
          )}
        </HStack>
      )}
    </Draggable>
  )
}
