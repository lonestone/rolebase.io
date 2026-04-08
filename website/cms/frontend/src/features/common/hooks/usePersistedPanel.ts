import { useEffect, useState } from 'react'

export function usePersistedPanel(key: string, defaultValue = false) {
  const [open, setOpen] = useState(() => {
    const stored = localStorage.getItem(key)
    return stored !== null ? stored === 'true' : defaultValue
  })

  useEffect(() => {
    localStorage.setItem(key, String(open))
  }, [key, open])

  return [open, setOpen] as const
}
