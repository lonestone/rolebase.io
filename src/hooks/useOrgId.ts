import { useStoreState } from '@store/hooks'

export function useOrgId(): string | undefined {
  return useStoreState((state) => state.org.currentId)
}
