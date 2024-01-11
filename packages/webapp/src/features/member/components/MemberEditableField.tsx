import { EditableField } from '@/common/atoms/EditableField'
import useCreateLog from '@/log/hooks/useCreateLog'
import { BoxProps } from '@chakra-ui/react'
import { MemberFragment, useUpdateMemberMutation } from '@gql'
import { EntityChangeType, LogType } from '@shared/model/log'
import React from 'react'

interface Props extends BoxProps {
  label: string
  placeholder?: string
  member: MemberFragment
  field: keyof MemberFragment
  editable: boolean
  hideTitle?: boolean
}

export function MemberEditableField({
  label,
  placeholder,
  member,
  field,
  editable,
  hideTitle,
  ...boxProps
}: Props) {
  const [updateMember] = useUpdateMemberMutation()
  const createLog = useCreateLog()

  // Value
  const rawValue = member[field]
  const value = typeof rawValue === 'string' ? rawValue : ''

  const handleSave = async (newValue: string) => {
    // Update role data
    await updateMember({
      variables: {
        id: member.id,
        values: {
          [field]: newValue,
        },
      },
    })

    // Log change
    createLog({
      display: {
        type: LogType.MemberUpdate,
        id: member.id,
        name: member.name,
      },
      changes: {
        roles: [
          {
            type: EntityChangeType.Update,
            id: member.id,
            prevData: {
              [field]: value,
            },
            newData: {
              [field]: newValue,
            },
          },
        ],
      },
    })
  }

  return (
    <EditableField
      key={member.id}
      label={label}
      placeholder={placeholder}
      editable={editable}
      hideTitle={hideTitle}
      value={value}
      onSave={handleSave}
      {...boxProps}
    />
  )
}
