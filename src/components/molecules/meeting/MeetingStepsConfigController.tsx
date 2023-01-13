import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { MeetingStepConfig } from '@shared/model/meeting'
import { MeetingStepTypes } from '@shared/model/meeting_step'
import { nanoid } from 'nanoid'
import React from 'react'
import { Control, FieldErrors, useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FiChevronDown } from 'react-icons/fi'
import * as yup from 'yup'
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

export const stepsConfigSchema = yup.array().of(
  yup.object().shape({
    title: yup.string().required(),
  })
)

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

  const handleAdd = (stepType: MeetingStepTypes) => {
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
            MeetingStepTypes.Tour,
            MeetingStepTypes.Threads,
            MeetingStepTypes.Checklist,
            MeetingStepTypes.Indicators,
            MeetingStepTypes.Tasks,
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