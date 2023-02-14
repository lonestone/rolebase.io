import { getOrgPath } from '@shared/helpers/getOrgPath'
import useCurrentOrg from './useCurrentOrg'

export function usePathInOrg(path: string) {
  const org = useCurrentOrg()
  return org ? `${getOrgPath(org)}/${path}` : ''
}
