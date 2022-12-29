import useCreateLog from '@hooks/useCreateLog'
import { CircleEntry } from '@shared/model/circle'
import { EntitiesChanges, EntityChangeType, LogType } from '@shared/model/log'
import { RoleEntry } from '@shared/model/role'
import { store } from '@store/index'
import { useCallback } from 'react'
import {
  Circle_Insert_Input,
  useCreateCirclesMutation,
} from 'src/graphql.generated'
import { omit } from 'src/utils/omit'
import { pick } from 'src/utils/pick'

function getCircleAndChildren(
  circles: CircleEntry[],
  roles: RoleEntry[],
  circleId: string
): Circle_Insert_Input | undefined {
  const circle = circles.find((c) => c.id === circleId)
  if (!circle) return
  const role = roles.find((r) => r.id === circle.roleId)
  if (!role) return

  // New circle
  const input: Circle_Insert_Input = pick(circle, 'orgId')

  if (role.base) {
    input.roleId = circle.roleId
  } else {
    // New role
    input.role = {
      data: pick(
        role,
        'orgId',
        'name',
        'purpose',
        'domain',
        'accountabilities',
        'checklist',
        'indicators',
        'notes',
        'singleMember',
        'link',
        'defaultMinPerWeek',
        'colorHue'
      ),
    }
  }

  // Add children
  const children = circles
    .filter((c) => c.parentId === circleId)
    .map((c) => getCircleAndChildren(circles, roles, c.id))
    .filter(Boolean) as Circle_Insert_Input[]

  if (children.length) {
    input.children = {
      data: children,
    }
  }

  // Add members
  if (circle.members.length) {
    input.members = {
      data: circle.members.map((cm) => pick(cm, 'memberId', 'avgMinPerWeek')),
    }
  }
  return input
}

export default function useCopyCircle() {
  const [createCircles] = useCreateCirclesMutation()
  const createLog = useCreateLog()

  return useCallback(
    async (circleId: string, targetCircleId: string | null) => {
      const { circles, roles } = store.getState()
      if (!circles.entries || !roles.entries) return

      // Prepare data for circles, roles and circle_members insertion
      const circlesInput = getCircleAndChildren(
        circles.entries,
        roles.entries,
        circleId
      )
      if (!circlesInput) return
      circlesInput.parentId = targetCircleId

      // Create new circles
      const { data, errors } = await createCircles({
        variables: {
          circles: circlesInput,
        },
      })
      const newCircles = data?.insert_circle?.returning
      if (errors || !newCircles) throw errors?.[0]

      // Log changes
      const copiedCircle = circles.entries?.find((c) => c.id === circleId)
      const targetCircle = circles.entries?.find((c) => c.id === targetCircleId)
      const targetRole = roles.entries?.find(
        (r) => r.id === targetCircle?.roleId
      )
      if (!copiedCircle) return

      // Build changes
      const changes: EntitiesChanges = { circles: [], roles: [] }

      for (const circle of newCircles) {
        changes.circles?.push({
          type: EntityChangeType.Create,
          id: circle.id,
          data: { ...omit(circle, '__typename', 'role'), members: [] },
        })
        if (!circle.role.base) {
          changes.roles?.push({
            type: EntityChangeType.Create,
            id: circle.role.id,
            data: omit(circle.role, '__typename'),
          })
        }
      }

      // FIXME: Circles and roles children are not included in changes

      createLog({
        display: {
          type: LogType.CircleCreate,
          id: newCircles[0].id,
          name: newCircles[0].role.name,
          parentId: targetCircleId,
          parentName: targetRole?.name || null,
        },
        changes,
      })

      return newCircles[0].id
    },
    []
  )
}
