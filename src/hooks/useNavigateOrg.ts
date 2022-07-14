import { getOrgPath } from '@shared/helpers/getOrgPath'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { store } from '../store'

export function useNavigateOrg() {
  const history = useHistory()
  return useCallback((path = '') => {
    const orgId = store.getState().orgs.currentId
    const orgs = store.getState().orgs.entries
    const org = orgs?.find((org) => org.id === orgId)
    if (!org) return
    history.push(`${getOrgPath(org)}/${path}`)
  }, [])
}
