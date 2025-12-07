import useCreateLog from '@/log/hooks/useCreateLog'
import { useOrgId } from '@/org/hooks/useOrgId'
import CircleSearchButton from '@/search/components/CircleSearchButton'
import {
  Box,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import {
  RoleFragment,
  RoleSummaryFragment,
  useCreateCircleLinkMutation,
  useCreateCircleMutation,
  useCreateRoleMutation,
  useDeleteCircleLinkMutation,
} from '@gql'
import { truthy } from '@rolebase/shared/helpers/truthy'
import {
  EntitiesChanges,
  EntityChangeType,
  LogType,
} from '@rolebase/shared/model/log'
import { useStoreState } from '@store/hooks'
import { omit } from '@utils/omit'
import React, { useCallback, useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FiX } from 'react-icons/fi'
import { CircleLinkIcon, CreateIcon } from 'src/icons'
import BaseRoleSearchButton from '../../search/components/BaseRoleSearchButton'
import { CircleContext } from '../contexts/CIrcleContext'
import CircleWithLeaderItem from './CircleWithLeaderItem'

export default function CircleRoleSubCircles() {
  const { t } = useTranslation()

  // Get circle context
  const circleContext = useContext(CircleContext)
  if (!circleContext) return null
  const {
    circle,
    participants,
    canEditSubCircles,
    canEditSubCirclesParentLinks,
  } = circleContext

  const circles = useStoreState((state) => state.org.circles)
  const roles = useStoreState((state) => state.org.baseRoles)
  const orgId = useOrgId()
  const [createCircle] = useCreateCircleMutation()
  const [createRole] = useCreateRoleMutation()
  const [createCircleLink] = useCreateCircleLinkMutation()
  const [deleteCircleLink] = useDeleteCircleLinkMutation()
  const createLog = useCreateLog()

  // Get direct circles children
  const subCircles = useMemo(
    () =>
      circles
        ?.filter((c) => c.parentId === circle.id)
        .sort((a, b) => {
          // Put leaders at the top
          if (a.role.parentLink && !b.role.parentLink) {
            return -1
          }
          if (!a.role.parentLink && b.role.parentLink) {
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

  const highlightButton = subRolesIds?.length === 0 && participants.length === 0

  // Create circle and open it
  const handleCreateCircle = useCallback(
    async (roleOrName: RoleSummaryFragment | string) => {
      if (!orgId) return

      // Create role
      let role: RoleFragment | RoleSummaryFragment
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
          {
            type: EntityChangeType.Create,
            id: role.id,
            data: role as RoleFragment,
          },
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
    async (roleId: string) => {
      const role = roles?.find((r) => r.id === roleId)
      if (!role) return
      handleCreateCircle(role)
    },
    [handleCreateCircle, roles]
  )

  // Get invited circles (links)
  const invitedCircles = useMemo(
    () =>
      circle.invitedCircleLinks
        .map((link) => circles?.find((c) => c.id === link.invitedCircle.id))
        .filter(truthy)
        .sort((a, b) => a.role.name.localeCompare(b.role.name)),
    [circles, circle]
  )

  // List of circles ids to exclude from circle search when adding a link
  const excludedCirclesIds = useMemo(() => {
    // Exclude current circle
    const ids = [circle.id]
    // Exclude parent circle
    if (circle.parentId) ids.push(circle.parentId)
    // Exclude already invited circle
    if (invitedCircles) ids.push(...invitedCircles.map((c) => c.id))
    // Exclude children circles
    const children = circles?.filter((c) => c.parentId === circle.id)
    if (children) ids.push(...children.map((c) => c.id))
    return ids
  }, [circle, invitedCircles])

  const handleAddLink = useCallback(
    async (circleId: string) => {
      createCircleLink({ variables: { parentId: circle.id, circleId } })
    },
    [circle]
  )

  const handleDeleteLink = useCallback(
    async (circleId: string) => {
      deleteCircleLink({ variables: { parentId: circle.id, circleId } })
    },
    [circle]
  )

  // Hide if read only and empty
  if (
    !canEditSubCircles &&
    !canEditSubCirclesParentLinks &&
    !subCircles?.length &&
    !invitedCircles?.length
  ) {
    return null
  }

  return (
    <Box>
      <Heading as="h3" size="sm" mb={3}>
        {t('CircleRoleSubCircles.roles')}
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

        {invitedCircles?.map((invitedCircle, i) => (
          <Flex key={invitedCircle.id} alignItems="center">
            <CircleWithLeaderItem
              className={`userflow-invited-circle-${i}`}
              circle={invitedCircle}
              parentCircle={circle}
              participants={participants}
            />
            <Tooltip
              label={t('CircleRoleSubCircles.linkTooltip')}
              placement="top"
              hasArrow
            >
              <Icon as={CircleLinkIcon} ml={2} />
            </Tooltip>
            {canEditSubCircles && (
              <Tooltip
                label={t('CircleRoleSubCircles.removeLink')}
                placement="top"
                hasArrow
              >
                <IconButton
                  aria-label={t('common.remove')}
                  icon={<FiX />}
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleDeleteLink(invitedCircle.id)
                  }}
                />
              </Tooltip>
            )}
          </Flex>
        ))}

        <HStack>
          {(canEditSubCircles || canEditSubCirclesParentLinks) && (
            <BaseRoleSearchButton
              className="userflow-add-role-btn"
              excludeIds={subRolesIds}
              size="sm"
              variant={highlightButton ? 'solid' : 'outline'}
              colorScheme={highlightButton ? 'blue' : undefined}
              borderRadius="full"
              parentLink={
                canEditSubCirclesParentLinks && !canEditSubCircles
                  ? true
                  : !canEditSubCirclesParentLinks && canEditSubCircles
                  ? false
                  : undefined
              }
              leftIcon={<CreateIcon size={20} />}
              onSelect={handleAddRole}
              onCreate={canEditSubCircles ? handleCreateCircle : undefined}
            >
              {t('CircleRoleSubCircles.addRole')}
            </BaseRoleSearchButton>
          )}

          {canEditSubCircles && (
            <CircleSearchButton
              className="userflow-invite-circle-btn"
              excludeIds={excludedCirclesIds}
              size="sm"
              variant="outline"
              borderRadius="full"
              leftIcon={<CircleLinkIcon size={20} />}
              onSelect={handleAddLink}
            >
              {t('CircleRoleSubCircles.inviteRole')}
            </CircleSearchButton>
          )}
        </HStack>
      </VStack>
    </Box>
  )
}
