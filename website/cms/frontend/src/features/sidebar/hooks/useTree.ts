import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchTree } from '../../../api.js'
import { useCallback } from 'react'

export function useTree() {
  const queryClient = useQueryClient()

  const { data: tree = [] } = useQuery({
    queryKey: ['tree'],
    queryFn: fetchTree,
  })

  const invalidateTree = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['tree'] })
  }, [queryClient])

  return { tree, invalidateTree }
}
