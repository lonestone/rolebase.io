import {
  CircleFragment,
  useArchiveCircleMutation,
  useArchiveRoleMutation,
} from '@gql'
import useCreateLog from '@hooks/useCreateLog'
import { EntitiesChanges, EntityChangeType, LogType } from '@shared/model/log'
import { store } from '@store/index'
import { useCallback } from 'react'

function getCircleIds(circles: CircleFragment[], circleId: string): string[] {
  return [
    circleId,
    ...circles
      .filter((c) => c.parentId === circleId)
      .flatMap((c) => getCircleIds(circles, c.id)),
  ]
}

export default function useArchiveCircle() {
  const [archiveCircle] = useArchiveCircleMutation()
  const [archiveRole] = useArchiveRoleMutation()
  const createLog = useCreateLog()

  return useCallback(async (circleId: string) => {
    const { circles, roles } = store.getState()
    if (!circles.entries || !roles.entries) return

    const changes: EntitiesChanges = { circles: [], roles: [] }

    // Archives circles
    const circlesIds = getCircleIds(circles.entries, circleId)
    for (const id of circlesIds) {
      await archiveCircle({ variables: { id } })
      changes.circles?.push({
        type: EntityChangeType.Update,
        id,
        prevData: { archived: false },
        newData: { archived: true },
      })

      // Archive role
      const circle = circles.entries.find((c) => c.id === id)
      const role = roles.entries.find((r) => r.id === circle?.roleId)
      if (role && !role.base) {
        await archiveRole({ variables: { id: role.id } })
        changes.roles?.push({
          type: EntityChangeType.Update,
          id: role.id,
          prevData: { archived: false },
          newData: { archived: true },
        })
      }
    }

    const circle = circles.entries?.find((c) => c.id === circleId)
    const role = roles.entries?.find((r) => r.id === circle?.roleId)
    if (!circle || !role) return

    // Log change
    createLog({
      display: {
        type: LogType.CircleArchive,
        id: circleId,
        name: role.name,
      },
      changes,
    })
  }, [])
}
