export function getOrgPath(org: {
  id: string
  slug?: string | null | undefined
}) {
  return org.slug ? `/${org.slug}` : `/orgs/${org.id}`
}
