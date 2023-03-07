import { gql } from '@gql'
import { adminRequest } from './adminRequest'
import { RouteError } from './route'

export async function getOrg(id: string) {
  if (!id) throw new RouteError(404, 'Bad request')

  const orgResult = await adminRequest(GET_ORG, { id })
  const org = orgResult.org_by_pk
  if (!org) throw new RouteError(404, 'Org not found')

  return org
}

const GET_ORG = gql(`
  query getOrg($id: uuid!) {
    org_by_pk(id: $id) {
        ...OrgFull
    }
}`)
