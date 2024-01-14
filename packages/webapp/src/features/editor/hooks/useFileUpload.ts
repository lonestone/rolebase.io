import { uploadFile } from '@/common/api/uploads'
import { useOrgId } from '@/org/hooks/useOrgId'
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
