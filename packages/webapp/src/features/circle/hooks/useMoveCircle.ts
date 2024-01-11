import useCreateLog from '@/log/hooks/useCreateLog'
import { useUpdateCircleMutation } from '@gql'
import { EntityChangeType, LogType } from '@shared/model/log'
import { store } from '@store/index'
import { useCallback } from 'react'

export default function useMoveCircle() {
  const [updateCircle] = useUpdateCircleMutation()
  const createLog = useCreateLog()

  return useCallback(
    async (circleId: string, targetCircleId: string | null) => {
      const { data, errors } = await updateCircle({
        variables: { id: circleId, values: { parentId: targetCircleId } },
      })
      const result = data?.update_circle_by_pk
      if (errors || !result) throw errors?.[0]

      // Log changes
      const { circles } = store.getState().org
      const circle = circles?.find((c) => c.id === circleId)
      if (!circle) return
      createLog({
        display: {
          type: LogType.CircleMove,
          id: circleId,
          name: result.role.name,
          parentId: targetCircleId,
          parentName: result?.parent?.role?.name || null,
        },
        changes: {
          circles: [
            {
              type: EntityChangeType.Update,
              id: circleId,
              prevData: { parentId: circle.parentId },
              newData: { parentId: targetCircleId },
            },
          ],
        },
      })
    },
    []
  )
}
