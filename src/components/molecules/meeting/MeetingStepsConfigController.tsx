import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { Meeting_Step_Type_Enum } from '@gql'
import { MeetingStepConfig } from '@shared/model/meeting'
import { nanoid } from 'nanoid'
import React from 'react'
import { Control, FieldErrors, useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  FiCheckSquare,
  FiChevronDown,
  FiCompass,
  FiFile,
  FiList,
  FiMessageSquare,
} from 'react-icons/fi'
import SortableList from '../SortableList'
import MeetingStepSortableItem from './MeetingStepSortableItem'

export const fieldName = 'stepsConfig' as const

export const steps = [
  {
    type: Meeting_Step_Type_Enum.Tour,
    icon: FiFile,
  },
  {
    type: Meeting_Step_Type_Enum.Threads,
    icon: FiMessageSquare,
  },
  {
    type: Meeting_Step_Type_Enum.Checklist,
    icon: FiList,
  },
  {
    type: Meeting_Step_Type_Enum.Indicators,
    icon: FiCompass,
  },
  {
    type: Meeting_Step_Type_Enum.Tasks,
    icon: FiCheckSquare,
  },
]

export interface StepsValues {
  [fieldName]: MeetingStepConfig[]
}

interface Props {
  control: Control<StepsValues>
  errors?: FieldErrors<StepsValues>
}

export default function MeetingStepsConfigController({
  control,
  errors,
}: Props) {
  const { t } = useTranslation()

  // Steps
  const {
    fields: stepsFields,
    append: appendStep,
    remove: removeStep,
    move: moveStep,
  } = useFieldArray({
    control,
    name: fieldName,
    keyName: 'key',
  })

  const handleAdd = (stepType: Meeting_Step_Type_Enum) => {
    return appendStep({
      id: nanoid(8),
      type: stepType,
      title: t(`common.meetingSteps.${stepType}`),
    })
  }

  return (
    <>
      <SortableList onDragEnd={moveStep}>
        {stepsFields.map((field, index) => (
          <MeetingStepSortableItem
            key={field.key}
            id={field.id}
            index={index}
            control={control}
            errors={errors}
            onRemove={stepsFields.length > 1 ? removeStep : undefined}
            stepType={field.type}
          />
        ))}
      </SortableList>

      <Menu>
        <MenuButton as={Button} rightIcon={<FiChevronDown />} mt={2}>
          {t(`MeetingStepsConfigController.addStep`)}
        </MenuButton>
        <MenuList maxW="400">
          {steps.map((step) => (
            <MenuItem
              key={step.type}
              display="block"
              py={2}
              onClick={() => handleAdd(step.type)}
            >
              <Flex alignItems="center">
                <step.icon />
                <Text fontWeight="bold" ml={2}>
                  {t(`common.meetingSteps.${step.type}`)}
                </Text>
              </Flex>
              <Text>{t(`common.meetingSteps.${step.type}_desc`)}</Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  )
}
