import { useStoreState } from '@store/hooks'

export default function useSuperAdmin(): boolean {
  return useStoreState((state) => state.auth.claims?.superAdmin || false)
}
