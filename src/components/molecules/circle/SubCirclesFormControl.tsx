import { FormControl, FormLabel, StackItem, VStack } from '@chakra-ui/react'
import {
  CircleWithRoleFragment,
  RoleFragment,
  useCreateCircleMutation,
  useCreateRoleMutation,
} from '@gql'
import useCreateLog from '@hooks/useCreateLog'
import { useOrgId } from '@hooks/useOrgId'
import useOrgMember from '@hooks/useOrgMember'
import { EntitiesChanges, EntityChangeType, LogType } from '@shared/model/log'
import { ParticipantMember } from '@shared/model/member'
import { RoleLink } from '@shared/model/role'
import { useStoreState } from '@store/hooks'
import { omit } from '@utils/omit'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus } from 'react-icons/fi'
import RoleSearchButton from '../search/entities/roles/RoleSearchButton'
import CircleWithLeaderItem from './CircleWithLeaderItem'

interface Props {
  circle: CircleWithRoleFragment
  participants: ParticipantMember[]
}

export default function SubCirclesFormControl({ circle, participants }: Props) {
  const { t } = useTranslation()
  const isMember = useOrgMember()
  const circles = useStoreState((state) => state.org.circles)
  const roles = useStoreState((state) => state.org.baseRoles)
  const orgId = useOrgId()
  const [createCircle] = useCreateCircleMutation()
  const [createRole] = useCreateRoleMutation()
  const createLog = useCreateLog()

  // Get direct circles children and their roles
  const childrenAndRoles = useMemo(
    () =>
      circles &&
      circles
        .filter((c) => c.parentId === circle.id)
        .sort((a, b) => {
          // Put leaders at the top
          if (
            a.role.link === RoleLink.Parent &&
            b.role.link !== RoleLink.Parent
          ) {
            return -1
          }
          if (
            a.role.link !== RoleLink.Parent &&
            b.role.link === RoleLink.Parent
          ) {
            return 1
          }
          // Sort by name
          return a.role.name.localeCompare(b.role.name)
        }),
    [circles, circle]
  )

  const childrenRolesIds = useMemo(
    () => childrenAndRoles?.map((c) => c.role.id),
    [childrenAndRoles]
  )

  // Create circle and open it
  const handleCreateCircle = useCallback(
    async (roleOrName: RoleFragment | string) => {
      if (!orgId) return

      // Create role
      let role: RoleFragment
      if (typeof roleOrName === 'string') {
        const { data } = await createRole({
          variables: {
            values: {
              orgId,
              name: roleOrName,
            },
          },
        })
        role = data?.insert_role_one!
      } else {
        role = roleOrName
      }

      // Create circle
      const { data } = await createCircle({
        variables: {
          orgId,
          roleId: role.id,
          parentId: circle.id,
        },
      })
      const newCircle = data?.insert_circle_one!

      const changes: EntitiesChanges = {
        circles: [
          {
            type: EntityChangeType.Create,
            id: newCircle.id,
            data: { ...omit(newCircle, '__typename') },
          },
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
    [orgId, circle]
  )

  const handleAddRole = useCallback(
    (roleId: string) => {
      const role = roles?.find((r) => r.id === roleId)
      if (!role) return
      handleCreateCircle(role)
    },
    [handleCreateCircle, roles]
  )

  return (
    <FormControl>
      <FormLabel>{t('SubCirclesFormControl.roles')}</FormLabel>
      <VStack spacing={2} align="start">
        {childrenAndRoles?.map((circle, i) => (
          <CircleWithLeaderItem
            key={circle.id}
            className={`userflow-circle-${i}`}
            circle={circle}
            participants={participants}
          />
        ))}

        {isMember && (
          <StackItem>
            <RoleSearchButton
              className="userflow-add-role-btn"
              excludeIds={childrenRolesIds}
              size="sm"
              variant="outline"
              borderRadius="full"
              leftIcon={<FiPlus />}
              onSelect={handleAddRole}
              onCreate={handleCreateCircle}
            >
              {t('SubCirclesFormControl.addRole')}
            </RoleSearchButton>
          </StackItem>
        )}
      </VStack>
    </FormControl>
  )
}
