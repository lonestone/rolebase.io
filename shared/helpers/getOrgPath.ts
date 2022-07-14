import { OrgEntry } from '@shared/model/org'

export function getOrgPath(org: OrgEntry) {
  return org.slug ? `/${org.slug}` : `/orgs/${org.id}`
}
