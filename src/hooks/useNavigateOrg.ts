import { getOrgPath } from '@shared/helpers/getOrgPath'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { store } from '../store'

export function useNavigateOrg() {
  const navigate = useNavigate()
  return useCallback((path = '') => {
    const orgId = store.getState().orgs.currentId
    const orgs = store.getState().orgs.entries
    const org = orgs?.find((org) => org.id === orgId)
    if (!org) return
    navigate(`${getOrgPath(org)}/${path}`)
  }, [])
}
