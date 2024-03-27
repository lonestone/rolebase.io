import useCreateLog from '@/log/hooks/useCreateLog'
import { useArchiveCirclesMutation } from '@gql'
import { getCircleChildren } from '@rolebase/shared/helpers/getCircleChildren'
import {
  EntitiesChanges,
  EntityChangeType,
  LogType,
} from '@rolebase/shared/model/log'
import { store } from '@store/index'
import { useCallback } from 'react'

// Archives circles and roles recursively (excluding base roles)
export default function useArchiveCircle() {
  const [archiveCircles] = useArchiveCirclesMutation()
  const createLog = useCreateLog()

  return useCallback(async (circleId: string) => {
    const { circles, baseRoles: roles } = store.getState().org
    if (!circles || !roles) return

    const circle = circles?.find((c) => c.id === circleId)
    if (!circle) return

    const children = getCircleChildren(circles, circleId)

    // Ids of all circles to archive
    const circlesIds = [circleId, ...children.map((c) => c.id)]

    // Ids of all roles to archive
    const rolesIds = [circle, ...children]
      .filter((c) => !c.role.base)
      .map((c) => c.role.id)

    // Prepare log changes
    const changes: EntitiesChanges = {
      circles: circlesIds.map((id) => ({
        type: EntityChangeType.Update,
        id,
        prevData: { archived: false },
        newData: { archived: true },
      })),
      roles: rolesIds.map((id) => ({
        type: EntityChangeType.Update,
        id,
        prevData: { archived: false },
        newData: { archived: true },
      })),
    }

    // Archive circles and roles
    await archiveCircles({
      variables: {
        circlesIds,
        rolesIds,
      },
    })

    // Log change
    createLog({
      display: {
        type: LogType.CircleArchive,
        id: circleId,
        name: circle.role.name,
      },
      changes,
    })
  }, [])
}
