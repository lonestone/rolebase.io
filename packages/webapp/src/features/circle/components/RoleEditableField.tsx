import { EditableField } from '@/common/atoms/EditableField'
import useCreateLog from '@/log/hooks/useCreateLog'
import { Alert, AlertDescription, AlertIcon, BoxProps } from '@chakra-ui/react'
import { RoleFragment, useUpdateRoleMutation } from '@gql'
import { EntityChangeType, LogType } from '@shared/model/log'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { CircleContext } from '../contexts/CIrcleContext'

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
  const [updateRole] = useUpdateRoleMutation()
  const createLog = useCreateLog()

  // Get circle context
  const circleContext = useContext(CircleContext)
  if (!circleContext) return null
  const { canEditRole } = circleContext

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
      editable={canEditRole}
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
