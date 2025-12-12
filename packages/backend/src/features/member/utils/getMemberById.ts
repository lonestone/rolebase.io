import { TRPCError } from '@trpc/server'
import { gql } from '../../../gql'
import { adminRequest } from '../../../utils/adminRequest'

export async function getMemberById(id: string) {
  const memberResult = await adminRequest(GET_MEMBER, { id })
  const member = memberResult.member_by_pk
  if (!member) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Member not found',
    })
  }
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
      inviteEmail
    }
  }
`)
