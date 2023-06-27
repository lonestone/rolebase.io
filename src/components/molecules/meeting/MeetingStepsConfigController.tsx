import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { Meeting_Step_Type_Enum } from '@gql'
import { MeetingStepConfig } from '@shared/model/meeting'
import { nanoid } from 'nanoid'
import React from 'react'
import { Control, FieldErrors, useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FiChevronDown, FiHelpCircle, FiPlus } from 'react-icons/fi'
import SortableList from '../SortableList'
import MeetingStepSortableItem from './MeetingStepSortableItem'
import { stepsAndIcons } from './stepTypes'

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
            onRemove={removeStep}
            stepType={field.type}
          />
        ))}
      </SortableList>

      <Menu>
        <MenuButton
          as={Button}
          size="sm"
          leftIcon={<FiPlus />}
          rightIcon={<FiChevronDown />}
          mt={2}
        >
          {t(`MeetingStepsConfigController.addStep`)}
        </MenuButton>
        <MenuList>
          {stepsAndIcons.map((step) => (
            <MenuItem
              key={step.type}
              display="block"
              py={2}
              onClick={() => handleAdd(step.type)}
            >
              <Flex alignItems="center">
                <step.icon />
                <Text ml={2}>{t(`common.meetingSteps.${step.type}`)}</Text>
                <Tooltip
                  label={t(`common.meetingSteps.${step.type}_desc`)}
                  placement="top"
                  hasArrow
                  p={3}
                >
                  <Box ml={3}>
                    <FiHelpCircle />
                  </Box>
                </Tooltip>
              </Flex>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  )
}
