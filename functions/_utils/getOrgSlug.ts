import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'

export async function getOrgSlug(orgId: string) {
  const { org_by_pk } = await adminRequest(GET_ORG_SLUG, {
    id: orgId,
  })

  return org_by_pk
}

const GET_ORG_SLUG = gql(`
  query getOrgSlug($id: uuid!) {
    org_by_pk(id: $id) {
      ...Org
    }
}`)
