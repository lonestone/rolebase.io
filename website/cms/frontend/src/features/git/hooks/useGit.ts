import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchGitStatus,
  fetchGitDiff,
  gitCommit,
  gitDiscard,
  gitStage,
  gitUnstage,
} from '../../../api.js'

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

function useGitInvalidate() {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({ queryKey: ['gitStatus'] })
    queryClient.invalidateQueries({ queryKey: ['gitDiff'] })
  }
}

export function useGitCommit() {
  const invalidate = useGitInvalidate()

  return useMutation({
    mutationFn: async (message: string) => {
      const result = await gitCommit(message)
      if (!result.ok) throw new Error(result.error || 'Commit failed')
      return result
    },
    onSuccess: invalidate,
  })
}

export function useGitDiscard() {
  const invalidate = useGitInvalidate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (path: string) => gitDiscard(path),
    onSuccess: () => {
      invalidate()
      queryClient.invalidateQueries({ queryKey: ['tree'] })
    },
  })
}

export function useGitStage() {
  const invalidate = useGitInvalidate()

  return useMutation({
    mutationFn: (paths: string[]) => gitStage(paths),
    onSuccess: invalidate,
  })
}

export function useGitUnstage() {
  const invalidate = useGitInvalidate()

  return useMutation({
    mutationFn: (paths: string[]) => gitUnstage(paths),
    onSuccess: invalidate,
  })
}
