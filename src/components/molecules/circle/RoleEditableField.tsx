import { Alert, AlertDescription, AlertIcon, BoxProps } from '@chakra-ui/react'
import { RoleFragment, useUpdateRoleMutation } from '@gql'
import useCreateLog from '@hooks/useCreateLog'
import useOrgMember from '@hooks/useOrgMember'
import { EditableField } from '@molecules/EditableField'
import { EntityChangeType, LogType } from '@shared/model/log'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props extends Omit<BoxProps, 'role'> {
  label: string
  placeholder?: string
  role: RoleFragment
  field: keyof RoleFragment
  initValue?: string
}

export function RoleEditableField({
  label,
  placeholder,
  role,
  field,
  initValue,
  ...boxProps
}: Props) {
  const { t } = useTranslation()
  const isMember = useOrgMember()
  const [updateRole] = useUpdateRoleMutation()
  const createLog = useCreateLog()

  // Value
  const rawValue = role[field]
  const value = typeof rawValue === 'string' ? rawValue : ''

  const handleSave = async (newValue: string) => {
    // Update role data
    await updateRole({
      variables: {
        id: role.id,
        values: {
          [field]: newValue,
        },
      },
    })

    // Log change
    createLog({
      display: {
        type: LogType.RoleUpdate,
        id: role.id,
        name: role.name,
      },
      changes: {
        roles: [
          {
            type: EntityChangeType.Update,
            id: role.id,
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
      key={role.id}
      label={label}
      placeholder={placeholder}
      editable={isMember}
      value={value}
      initValue={initValue}
      info={
        role.base ? (
          <Alert status="warning">
            <AlertIcon />
            <AlertDescription>
              {t('RoleEditableField.baseRoleInfo', { role: role.name })}
            </AlertDescription>
          </Alert>
        ) : undefined
      }
      onSave={handleSave}
      {...boxProps}
    />
  )
}
