import { createCircle } from '@api/entities/circles'
import { createRole } from '@api/entities/roles'
import {
  FormControl,
  FormLabel,
  StackItem,
  VStack,
  WrapItem,
} from '@chakra-ui/react'
import useCreateLog from '@hooks/useCreateLog'
import { useOrgId } from '@hooks/useOrgId'
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
  const circles = useStoreState((state) => state.circles.entries)
  const roles = useStoreState((state) => state.roles.entries)
  const orgId = useOrgId()
  const createLog = useCreateLog()

  // Get direct circles children and their roles
  const childrenAndRoles = useMemo(
    () =>
      circles && roles && getCircleChildrenAndRoles(circles, roles, circle.id),
    [circles, roles, circle]
  )

  const childrenRolesIds = useMemo(
    () => childrenAndRoles?.map((c) => c.role.id),
    [childrenAndRoles]
  )

  // Create circle and open it
  const create = useCallback(
    async (roleOrName: RoleEntry | string, singleMember: boolean) => {
      if (!orgId || !roles) return

      // Create role
      let role: RoleEntry
      if (typeof roleOrName === 'string') {
        role = await createRole({
          orgId,
          base: false,
          name: roleOrName,
          singleMember: !!singleMember,
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
    [orgId, roles, circle, createLog]
  )

  const handleRoleAdd = useCallback(
    (roleId: string) => {
      const role = roles?.find((r) => r.id === roleId)
      if (!role) return
      create(role, true)
    },
    [create, roles]
  )

  const handleRoleCreate = useCallback(
    async (name: string) => create(name, true),
    [create, roles]
  )

  const handleCircleAdd = useCallback(
    (roleId: string) => {
      const role = roles?.find((r) => r.id === roleId)
      if (!role) return
      create(role, false)
    },
    [create, roles]
  )

  const handleCircleCreate = useCallback(
    async (name: string) => create(name, false),
    [create, roles]
  )

  return (
    <>
      <FormControl>
        <FormLabel>{t('molecules.SubCirclesFormControl.roles')}</FormLabel>
        <VStack spacing={2} align="stretch">
          {childrenAndRoles
            ?.filter((circle) => circle.role.singleMember)
            .map((circle) => (
              <CircleWithLeaderItem
                key={circle.id}
                circle={circle}
                participants={participants}
              />
            ))}
          <StackItem>
            <RoleSearchButton
              base
              singleMember
              excludeIds={childrenRolesIds}
              size="sm"
              variant="ghost"
              borderRadius="full"
              leftIcon={<FiPlus />}
              onSelect={handleRoleAdd}
              onCreate={handleRoleCreate}
            >
              {t('molecules.SubCirclesFormControl.addRole')}
            </RoleSearchButton>
          </StackItem>
        </VStack>
      </FormControl>

      <FormControl>
        <FormLabel>{t('molecules.SubCirclesFormControl.circles')}</FormLabel>
        <VStack spacing={2} align="stretch">
          {childrenAndRoles
            ?.filter((circle) => !circle.role.singleMember)
            .map((circle) => (
              <CircleWithLeaderItem
                key={circle.id}
                circle={circle}
                participants={participants}
              />
            ))}
          <WrapItem>
            <RoleSearchButton
              base
              singleMember={false}
              excludeIds={childrenRolesIds}
              size="sm"
              variant="ghost"
              borderRadius="full"
              leftIcon={<FiPlus />}
              onSelect={handleCircleAdd}
              onCreate={handleCircleCreate}
            >
              {t('molecules.SubCirclesFormControl.addCircle')}
            </RoleSearchButton>
          </WrapItem>
        </VStack>
      </FormControl>
    </>
  )
}
