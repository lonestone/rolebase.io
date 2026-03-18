import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchGitStatus, fetchGitDiff, gitCommit, gitDiscard } from '../api.js'

export function useGitStatus() {
  return useQuery({
    queryKey: ['gitStatus'],
    queryFn: fetchGitStatus,
    select: (data) => data.files,
  })
}

export function useGitDiff(path: string | null) {
  return useQuery({
    queryKey: ['gitDiff', path],
    queryFn: () => fetchGitDiff(path!),
    enabled: path !== null,
    select: (data) => data.diff,
  })
}

export function useGitCommit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (message: string) => {
      const result = await gitCommit(message)
      if (!result.ok) throw new Error(result.error || 'Commit failed')
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gitStatus'] })
      queryClient.invalidateQueries({ queryKey: ['gitDiff'] })
      queryClient.invalidateQueries({ queryKey: ['tree'] })
    },
  })
}

export function useGitDiscard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (path: string) => gitDiscard(path),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gitStatus'] })
      queryClient.invalidateQueries({ queryKey: ['gitDiff'] })
      queryClient.invalidateQueries({ queryKey: ['tree'] })
    },
  })
}
