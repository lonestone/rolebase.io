import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { Meeting_Step_Type_Enum } from '@gql'
import { MeetingStepConfig } from '@shared/model/meeting'
import { nanoid } from 'nanoid'
import React from 'react'
import { Control, FieldErrors, useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FiChevronDown } from 'react-icons/fi'
import SortableList from '../SortableList'
import MeetingStepSortableItem from './MeetingStepSortableItem'

export const fieldName = 'stepsConfig' as const

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
        <MenuList>
          {[
            Meeting_Step_Type_Enum.Tour,
            Meeting_Step_Type_Enum.Threads,
            Meeting_Step_Type_Enum.Checklist,
            Meeting_Step_Type_Enum.Indicators,
            Meeting_Step_Type_Enum.Tasks,
          ].map((type) => (
            <MenuItem key={type} onClick={() => handleAdd(type)}>
              {t(`common.meetingSteps.${type}`)}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  )
}
