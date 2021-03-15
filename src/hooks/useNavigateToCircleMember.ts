import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { store } from '../components/store'

export function useNavigateToCircleMember() {
  const history = useHistory()
  return useCallback((circleId: string, memberId: string) => {
    const orgId = store.getState().orgs.currentId
    history.push(`/orgs/${orgId}?circleId=${circleId}&memberId=${memberId}`)
  }, [])
}
