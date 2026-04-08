import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchFile, saveFile } from '../../../api.js'

export function useFile(filePath: string) {
  return useQuery({
    queryKey: ['file', filePath],
    queryFn: () => fetchFile(filePath),
  })
}

export function useSaveFile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ path, content }: { path: string; content: string }) =>
      saveFile(path, content),
    onSuccess: (_data, { path }) => {
      queryClient.invalidateQueries({ queryKey: ['file', path] })
      queryClient.invalidateQueries({ queryKey: ['tree'] })
      queryClient.invalidateQueries({ queryKey: ['gitStatus'] })
    },
  })
}
