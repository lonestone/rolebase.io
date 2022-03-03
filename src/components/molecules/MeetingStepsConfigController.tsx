import {
  Button,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { MeetingStepConfig } from '@shared/meeting'
import { MeetingStepTypes } from '@shared/meetingStep'
import { nanoid } from 'nanoid'
import React from 'react'
import { Control, FieldErrors, useFieldArray } from 'react-hook-form'
import { FiChevronDown } from 'react-icons/fi'
import * as yup from 'yup'
import MeetingStepSortableItem from './MeetingStepSortableItem'
import SortableList from './SortableList'

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
  console.log(stepsFields)
  const handleAdd = (stepType: MeetingStepTypes) => {
    console.log(stepType)

    return appendStep({
      id: nanoid(5),
      type: stepType,
      title: '',
    })
  }

  return (
    <>
      <SortableList items={stepsFields} onDragEnd={moveStep}>
        <Stack spacing={2}>
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
        </Stack>
      </SortableList>
      <Menu matchWidth={true}>
        <MenuButton as={Button} rightIcon={<FiChevronDown />} w="100%" mt={2}>
          Ajouter une étape
        </MenuButton>
        <MenuList w="100%">
          <MenuItem onClick={() => handleAdd(MeetingStepTypes.Tour)}>
            Tour de table
          </MenuItem>
          <MenuItem onClick={() => handleAdd(MeetingStepTypes.Threads)}>
            Discussions
          </MenuItem>
          <MenuItem onClick={() => handleAdd(MeetingStepTypes.Checklist)}>
            Checklist
          </MenuItem>
          <MenuItem onClick={() => handleAdd(MeetingStepTypes.Indicators)}>
            Indicateurs
          </MenuItem>
          <MenuItem onClick={() => handleAdd(MeetingStepTypes.Tasks)}>
            Tâches
          </MenuItem>
        </MenuList>
      </Menu>
      {/* <Button mt={2} w="100%" leftIcon={<FiPlus />} onClick={handleAdd}>
        Ajouter une étape
      </Button> */}
    </>
  )
}
