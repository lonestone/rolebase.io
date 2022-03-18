import { uploadFile } from '@api/uploads'
import { useStoreState } from '@store/hooks'
import { useCallback } from 'react'

export default function useFileUpload() {
  const orgId = useStoreState((state) => state.orgs.currentId)

  const handleUpload = useCallback(
    async (file: File) => {
      if (!orgId) return ''
      return uploadFile(orgId, file)
    },
    [orgId]
  )

  return { handleUpload }
}
