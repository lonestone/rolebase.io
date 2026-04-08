import { useLocation } from 'react-router'

export function useCurrentFilePath(): string | null {
  const location = useLocation()
  if (!location.pathname.startsWith('/edit/')) return null
  const path = decodeURIComponent(location.pathname.slice('/edit/'.length))
  return path || null
}
