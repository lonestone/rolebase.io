import { getOrgPath } from '@shared/helpers/getOrgPath'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { store } from '../store'

export function useNavigateOrg() {
  const navigate = useNavigate()
  return useCallback((path = '') => {
    const org = store.getState().orgs.current
    if (!org) return
    navigate(`${getOrgPath(org)}/${path}`)
  }, [])
}
