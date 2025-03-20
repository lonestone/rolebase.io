import { TRPCError } from '@trpc/server'
import * as yup from 'yup'
import { gql } from '../../gql'
import { publicProcedure } from '../../trpc'
import { Context } from '../../trpc/context'
import { adminRequest } from '../../utils/adminRequest'

export default publicProcedure
  .input(
    yup.object().shape({
      orgId: yup.string().uuid().required(),
    })
  )
  .query(async (opts: { ctx: Context; input: { orgId: string } }) => {
    const { orgId } = opts.input

    const { org_by_pk } = await adminRequest(GET_PUBLIC_DATA, {
      orgId,
    })

    if (!org_by_pk) {
      throw new TRPCError({ code: 'NOT_FOUND' })
    }

    if (!org_by_pk.shareOrg) {
      throw new TRPCError({ code: 'FORBIDDEN' })
    }

    return {
      circles: org_by_pk.circles,
      roles: org_by_pk.roles,
      members: org_by_pk.shareMembers ? org_by_pk.members : [],
    }
  })

const GET_PUBLIC_DATA = gql(`
  query getPublicData($orgId: uuid!) {
    org_by_pk(id: $orgId) {
      archived
      shareOrg
      shareMembers
      circles(where: { archived: { _eq: false } }) {
        id
        orgId
        roleId
        parentId
        members(where: { archived: { _eq: false } }) {
          id
          memberId
        }
        invitedCircleLinks {
          invitedCircle {
            id
          }
        }
      }
      roles(where: { archived: { _eq: false } }) {
        id
        orgId
        base
        name
        purpose
        singleMember
        parentLink
        colorHue
      }
      members(where: { archived: { _eq: false } }) {
        id
        orgId
        name
        picture
      }
    }
  }
`)
