import { createCircle } from '@api/entities/circles'
import { createRole } from '@api/entities/roles'
import { FormControl, FormLabel, StackItem, VStack } from '@chakra-ui/react'
import useCreateLog from '@hooks/useCreateLog'
import { useOrgId } from '@hooks/useOrgId'
import useOrgMember from '@hooks/useOrgMember'
import { getCircleChildrenAndRoles } from '@shared/helpers/getCircleChildren'
import { CircleWithRoleEntry } from '@shared/model/circle'
import { EntitiesChanges, EntityChangeType, LogType } from '@shared/model/log'
import { ParticipantMember } from '@shared/model/member'
import { RoleEntry } from '@shared/model/role'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus } from 'react-icons/fi'
import CircleWithLeaderItem from './CircleWithLeaderItem'
import RoleSearchButton from './search/entities/roles/RoleSearchButton'

interface Props {
  circle: CircleWithRoleEntry
  participants: ParticipantMember[]
}

export default function SubCirclesFormControl({ circle, participants }: Props) {
  const { t } = useTranslation()
  const isMember = useOrgMember()
  const circles = useStoreState((state) => state.circles.entries)
  const roles = useStoreState((state) => state.roles.entries)
  const orgId = useOrgId()
  const createLog = useCreateLog()

  // Get direct circles children and their roles
  const childrenAndRoles = useMemo(
    () =>
      circles &&
      roles &&
      getCircleChildrenAndRoles(circles, roles, circle.id).sort((a, b) => {
        // Put leaders at the top
        if (a.role.link === true && b.role.link !== true) return -1
        if (a.role.link !== true && b.role.link === true) return 1
        // Sort by name
        return a.role.name.localeCompare(b.role.name)
      }),
    [circles, roles, circle]
  )

  const childrenRolesIds = useMemo(
    () => childrenAndRoles?.map((c) => c.role.id),
    [childrenAndRoles]
  )

  // Create circle and open it
  const handleCreateRole = useCallback(
    async (roleOrName: RoleEntry | string) => {
      if (!orgId || !roles) return

      // Create role
      let role: RoleEntry
      if (typeof roleOrName === 'string') {
        role = await createRole({
          orgId,
          base: false,
          name: roleOrName,
        })
      } else {
        role = roleOrName
      }

      // Create circle
      const newCircle = await createCircle({
        orgId,
        roleId: role.id,
        parentId: circle.id,
      })

      const changes: EntitiesChanges = {
        circles: [
          { type: EntityChangeType.Create, id: newCircle.id, data: newCircle },
        ],
      }

      // Add roles with autoCreate=true
      /*
      if (!singleMember) {
        const autoCreateRoles = roles.filter((r) => r.autoCreate)
        for (const autoCreateRole of autoCreateRoles) {
          const autoCreateCircle = await createCircle({
            orgId,
            roleId: autoCreateRole.id,
            parentId: newCircle.id,
            members: [],
          })

          changes.circles?.push({
            type: EntityChangeType.Create,
            id: autoCreateCircle.id,
            data: autoCreateCircle,
          })
        }
      }
      */

      // Log changes
      if (typeof roleOrName === 'string') {
        changes.roles = [
          { type: EntityChangeType.Create, id: role.id, data: role },
        ]
      }
      createLog({
        display: {
          type: LogType.CircleCreate,
          id: newCircle.id,
          name: role.name,
          parentId: circle?.id || null,
          parentName: circle?.role.name || null,
        },
        changes,
      })
    },
    [orgId, roles, circle]
  )

  const handleAddRole = useCallback(
    (roleId: string) => {
      const role = roles?.find((r) => r.id === roleId)
      if (!role) return
      handleCreateRole(role)
    },
    [handleCreateRole, roles]
  )

  return (
    <FormControl>
      <FormLabel>{t('SubCirclesFormControl.roles')}</FormLabel>
      <VStack spacing={2} align="start">
        {childrenAndRoles?.map((circle) => (
          <CircleWithLeaderItem
            key={circle.id}
            circle={circle}
            participants={participants}
          />
        ))}

        {isMember && (
          <StackItem>
            <RoleSearchButton
              base
              excludeIds={childrenRolesIds}
              size="sm"
              variant="ghost"
              borderRadius="full"
              leftIcon={<FiPlus />}
              onSelect={handleAddRole}
              onCreate={handleCreateRole}
            >
              {t('SubCirclesFormControl.addRole')}
            </RoleSearchButton>
          </StackItem>
        )}
      </VStack>
    </FormControl>
  )
}
