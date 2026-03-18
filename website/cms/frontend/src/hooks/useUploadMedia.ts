import { useMutation } from '@tanstack/react-query'
import { uploadMedia } from '../api.js'

export function useUploadMedia() {
  return useMutation({
    mutationFn: ({ file, targetDir }: { file: File; targetDir: string }) =>
      uploadMedia(file, targetDir),
  })
}
