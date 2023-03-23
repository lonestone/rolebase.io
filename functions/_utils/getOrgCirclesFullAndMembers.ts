import { gql } from '@gql'
import { adminRequest } from './adminRequest'
import { RouteError } from './route'

export async function getOrgCirclesFullAndMembers(id: string) {
  if (!id) throw new RouteError(404, 'Bad request')

  const orgResult = await adminRequest(GET_ORG_CIRCLES_FULL_AND_MEMBERS, { id })
  const org = orgResult.org_by_pk
  if (!org) throw new RouteError(404, 'Org not found')

  return org
}

const GET_ORG_CIRCLES_FULL_AND_MEMBERS = gql(`
  query getOrgCirclesFullAndMembers($id: uuid!) {
    org_by_pk(id: $id) {
      circles(where: { archived: { _eq: false } }) {
        ...CircleFull
      }
      members(where: { archived: { _eq: false } }) {
        ...Member
      }
    }
}`)
