import { OrgFragment } from '@gql'

export function getOrgPath(org: OrgFragment) {
  return org.slug ? `/${org.slug}` : `/orgs/${org.id}`
}
