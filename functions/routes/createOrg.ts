import { gql } from '@gql'
import { nameSchema } from '@shared/schemas'
import { getSeedRoles } from '@shared/seeds/roles'
import { adminRequest } from '@utils/adminRequest'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { route } from '@utils/route'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  name: nameSchema.required(),
})

export default route(async (context): Promise<string> => {
  guardAuth(context)
  const { name } = guardBodyParams(context, yupSchema)

  // Get user
  const userResult = await adminRequest(GET_USER, { id: context.userId! })

  // Create org
  const orgResult = await adminRequest(CREATE_ORG, {
    name,
    userId: context.userId!,
    memberName: userResult.user!.displayName,
  })
  const orgId = orgResult.insert_org_one!.id

  // Create role
  const roleResult = await adminRequest(CREATE_ROLE, {
    orgId,
    name,
  })
  const roleId = roleResult.insert_role_one!.id

  // Create circle
  await adminRequest(CREATE_CIRCLE, {
    orgId,
    roleId,
  })

  // Create seed roles
  const roles = getSeedRoles(orgId)
  await adminRequest(CREATE_ROLES, { roles })

  return orgId
})

const GET_USER = gql(`
  query getUser($id: uuid!) {
    user(id: $id) {
      id
      displayName
    }
  }`)

const CREATE_ORG = gql(`
  mutation createOrg($name: String!, $userId: uuid!, $memberName: String!) {
    insert_org_one(object: {
      name: $name
      archived: false
      defaultWorkedMinPerWeek: 2100
      members: {
        data: [
          {
            userId: $userId
            name: $memberName
            role: Admin
          }
        ]
      }
    }) {
      id
    }
  }`)

const CREATE_ROLE = gql(`
  mutation createRole($orgId: uuid!, $name: String!) {
    insert_role_one(object: {
      orgId: $orgId
      name: $name
    }) {
      id
    }
  }`)

const CREATE_ROLES = gql(`
  mutation createRoles($roles: [role_insert_input!]!) {
    insert_role(objects: $roles) {
      returning {
        id
      }
    }
  }`)

const CREATE_CIRCLE = gql(`
  mutation createCircle($orgId: uuid!, $roleId: uuid!) {
    insert_circle_one(object: {
      orgId: $orgId
      roleId: $roleId
    }) {
      id
    }
  }`)
