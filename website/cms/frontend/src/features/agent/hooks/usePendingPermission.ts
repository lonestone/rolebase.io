import { useState, useEffect, useCallback } from 'react'
import type { PendingPermission } from '../../../api.js'

export function usePendingPermission(active: boolean) {
  const [permission, setPermission] = useState<PendingPermission | null>(null)

  const clear = useCallback(() => setPermission(null), [])

  useEffect(() => {
    if (!active) {
      setPermission(null)
      return
    }

    const eventSource = new EventSource('/api/claude/permissions/events')

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        setPermission({ pending: true, ...data })
      } catch {
        // ignore
      }
    }

    return () => {
      eventSource.close()
    }
  }, [active])

  return { permission, clear }
}
