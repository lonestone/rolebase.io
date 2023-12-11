import {
  CircleFullFragment,
  Circle_Insert_Input,
  useCreateCirclesMutation,
} from '@gql'
import useCreateLog from '@hooks/useCreateLog'
import { EntitiesChanges, EntityChangeType, LogType } from '@shared/model/log'
import { store } from '@store/index'
import { omit } from '@utils/omit'
import { pick } from '@utils/pick'
import { useCallback } from 'react'

function getCircleAndChildren(
  circles: CircleFullFragment[],
  circleId: string
): Circle_Insert_Input | undefined {
  const circle = circles.find((c) => c.id === circleId)
  if (!circle) return

  // New circle
  const input: Circle_Insert_Input = pick(circle, 'orgId')

  if (circle.role.base) {
    input.roleId = circle.roleId
  } else {
    // New role
    input.role = {
      data: {
        ...pick(
          circle.role,
          'name',
          'singleMember',
          'parentLink',
          'defaultMinPerWeek',
          'colorHue'
        ),
        orgId: circle.orgId,
      },
    }
  }

  // Add children
  const children = circles
    .filter((c) => c.parentId === circleId)
    .map((c) => getCircleAndChildren(circles, c.id))
    .filter(Boolean) as Circle_Insert_Input[]

  if (children.length) {
    input.children = {
      data: children,
    }
  }

  // Add members
  if (circle.members.length) {
    input.members = {
      data: circle.members.map((cm) => ({
        memberId: cm.member.id,
        avgMinPerWeek: cm.avgMinPerWeek,
      })),
    }
  }
  return input
}

export default function useCopyCircle() {
  const [createCircles] = useCreateCirclesMutation()
  const createLog = useCreateLog()

  return useCallback(
    async (circleId: string, targetCircleId: string | null) => {
      const { circles } = store.getState().org
      if (!circles) return

      // Prepare data for circles, roles and circle_members insertion
      const circlesInput = getCircleAndChildren(circles, circleId)
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
      const copiedCircle = circles?.find((c) => c.id === circleId)
      const targetCircle = circles?.find((c) => c.id === targetCircleId)
      if (!copiedCircle) return

      // Build changes
      const changes: EntitiesChanges = { circles: [], roles: [] }

      for (const circle of newCircles) {
        changes.circles?.push({
          type: EntityChangeType.Create,
          id: circle.id,
          data: { ...omit(circle, '__typename', 'role') },
        })
        if (!circle.role.base) {
          changes.roles?.push({
            type: EntityChangeType.Create,
            id: circle.role.id,
            data: omit(circle.role, '__typename'),
          })
        }
      }

      createLog({
        display: {
          type: LogType.CircleCreate,
          id: newCircles[0].id,
          name: newCircles[0].role.name,
          parentId: targetCircleId,
          parentName: targetCircle?.role.name || null,
        },
        changes,
      })

      return newCircles[0].id
    },
    []
  )
}
