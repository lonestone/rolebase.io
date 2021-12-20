import { Select, SelectProps } from '@chakra-ui/react'
import { MeetingStepTypes } from '@shared/meeting'
import React, { forwardRef } from 'react'

const MeetingStepTypeSelect = forwardRef<HTMLSelectElement, SelectProps>(
  (selectProps, ref) => {
    return (
      <Select ref={ref} {...selectProps}>
        <option value={MeetingStepTypes.Tour}>Tour de table</option>
        <option value={MeetingStepTypes.Threads}>Discussions</option>
        <option value={MeetingStepTypes.Checklist}>Checklist</option>
        <option value={MeetingStepTypes.Indicators}>Indicateurs</option>
        <option value={MeetingStepTypes.Tasks}>Tâches</option>
      </Select>
    )
  }
)

export default MeetingStepTypeSelect
