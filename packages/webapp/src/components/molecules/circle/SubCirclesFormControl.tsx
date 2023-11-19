import { Box, Heading, StackItem, VStack } from '@chakra-ui/react'
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
import { CreateIcon } from 'src/icons'
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

  // Get direct circles children
  const subCircles = useMemo(
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

  const subRolesIds = useMemo(
    () => subCircles?.map((c) => c.role.id),
    [subCircles]
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

  // Hide if read only and empty
  if (!isMember && !subCircles?.length) return null

  return (
    <Box>
      <Heading as="h3" size="sm" mb={3}>
        {t('SubCirclesFormControl.roles')}
      </Heading>
      <VStack spacing={2} align="start">
        {subCircles?.map((subCircle, i) => (
          <CircleWithLeaderItem
            key={subCircle.id}
            className={`userflow-circle-${i}`}
            circle={subCircle}
            parentCircle={circle}
            participants={participants}
          />
        ))}

        {isMember && (
          <StackItem>
            <RoleSearchButton
              className="userflow-add-role-btn"
              excludeIds={subRolesIds}
              size="sm"
              variant="outline"
              borderRadius="full"
              leftIcon={<CreateIcon size={20} />}
              onSelect={handleAddRole}
              onCreate={handleCreateCircle}
            >
              {t('SubCirclesFormControl.addRole')}
            </RoleSearchButton>
          </StackItem>
        )}
      </VStack>
    </Box>
  )
}
