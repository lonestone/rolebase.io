import { Member_Insert_Input, Member_Role_Enum, gql } from '@gql'
import { getSeedRoles } from '@shared/seeds/roles'
import { adminRequest } from '@utils/adminRequest'
import { FunctionContext } from '@utils/getContext'
import { RouteError } from '@utils/route'
import xlsx from 'xlsx'
import { Importer } from '..'
import { HolaspiritSheets } from './types'

export const Holaspirit: Importer = async (
  context: FunctionContext,
  fileData: Buffer
) => {
  const data: Partial<HolaspiritSheets> = {}

  try {
    // Read Excel file
    const workbook = xlsx.read(fileData, {
      cellDates: true,
    })

    // Read sheets and lines
    for (const sheetName of workbook.SheetNames) {
      const sheet = workbook.Sheets[sheetName]
      const sheetData = xlsx.utils.sheet_to_json(sheet, {})

      data[sheetName] = sheetData
      console.log('sheetName', sheetName, sheetData[0])
    }
  } catch (error: any) {
    throw new RouteError(400, error.message)
  }

  // Get user
  const { user } = await adminRequest(GET_USER, { id: context.userId! })

  if (!user) throw new RouteError(400, 'User not found')

  const newMembers: Member_Insert_Input[] = []
  let includedUser = false

  for (const member of data.Members!) {
    const name = member['First name'] + ' ' + member['Last name']
    const role =
      member.Privilege === 'owner'
        ? Member_Role_Enum.Owner
        : member.Privilege === 'admin'
        ? Member_Role_Enum.Admin
        : member.Privilege === 'member'
        ? Member_Role_Enum.Member
        : Member_Role_Enum.Readonly

    const newMember: Member_Insert_Input = {
      name,
      inviteEmail: member.Email,
      picture: member.Avatar, // TODO: download avatar
      role,
      description: member.Phone,
      archived: member.Suspended,
    }

    if (member.Email === user.email) {
      includedUser = true
      newMember.userId = context.userId!
      newMember.role = Member_Role_Enum.Owner
    }

    newMembers.push(newMember)
  }

  if (!includedUser) {
    newMembers.push({
      name: user.displayName,
      userId: context.userId!,
      role: Member_Role_Enum.Owner,
    })
  }

  // Create org

  const orgName = data['Circles & Roles']!.find((c) => !c['Circle ID'])!.Role

  const orgResult = await adminRequest(CREATE_ORG, {
    name: orgName,
    userId: context.userId!,
    members: newMembers,
  })
  const orgId = orgResult.insert_org_one!.id

  // Create role
  const roleResult = await adminRequest(CREATE_ROLE, {
    orgId,
    name: orgName,
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

  // TODO: Finish import script
  // Warning: Holaspirit export doesn't include parent id in circles sheet,
  // so we can't import circles hierarchy
}

const GET_USER = gql(`
  query getUserImport($id: uuid!) {
    user(id: $id) {
      id
      email
      displayName
    }
  }`)

const CREATE_ORG = gql(`
  mutation createOrgImport($name: String!, $userId: uuid!, $members: [member_insert_input!]!) {
    insert_org_one(object: {
      name: $name
      defaultWorkedMinPerWeek: 2100
      members: {
        data: $members
      }
    }) {
      id
    }
  }`)

const CREATE_ROLE = gql(`
  mutation createRoleImport($orgId: uuid!, $name: String!) {
    insert_role_one(object: {
      orgId: $orgId
      name: $name
    }) {
      id
    }
  }`)

const CREATE_ROLES = gql(`
  mutation createRolesImport($roles: [role_insert_input!]!) {
    insert_role(objects: $roles) {
      returning {
        id
      }
    }
  }`)

const CREATE_CIRCLE = gql(`
  mutation createCircleImport($orgId: uuid!, $roleId: uuid!) {
    insert_circle_one(object: {
      orgId: $orgId
      roleId: $roleId
    }) {
      id
    }
  }`)
