import { gql } from '@gql'
import { adminRequest } from './adminRequest'
import { RouteError } from './route'

export async function getMemberById(id: string) {
  const memberResult = await adminRequest(GET_MEMBER, { id })
  const member = memberResult.member_by_pk
  if (!member) throw new RouteError(404, 'Member not found')
  return member
}

const GET_MEMBER = gql(`
  query getMember($id: uuid!) {
    member_by_pk(id: $id) {
      id
      orgId
      userId
      name
      role
      inviteDate
    }
  }
`)
