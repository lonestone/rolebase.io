import { useOrgId } from '@/org/hooks/useOrgId'
import { uploadFile } from '@api/uploads'
import { useCallback } from 'react'

export default function useFileUpload() {
  const orgId = useOrgId()

  const handleUpload = useCallback(
    async (file: File) => {
      if (!orgId) return ''
      return uploadFile(orgId, file)
    },
    [orgId]
  )

  return { handleUpload }
}
