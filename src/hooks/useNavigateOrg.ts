import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { store } from '../components/store'

export function useNavigateOrg() {
  const history = useHistory()
  return useCallback((path = '') => {
    const orgId = store.getState().orgs.currentId
    history.push(`/orgs/${orgId}${path}`)
  }, [])
}
