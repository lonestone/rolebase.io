import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'

export async function getMemberIdFromUserId(
  userId: string,
  orgId: string
): Promise<string | undefined> {
  const { member } = await adminRequest(
    gql(`
      query GetMemberIdFromUserId($userId: uuid!, $orgId: uuid!) {
        member(where: { userId: { _eq: $userId }, orgId: { _eq: $orgId } }) {
          id
        }
      }
    `),
    {
      userId,
      orgId,
    }
  )
  return member[0]?.id
}
