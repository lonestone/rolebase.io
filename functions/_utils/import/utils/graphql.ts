import { gql } from '@gql'

export const GET_USER = gql(`
  query getUserImport($id: uuid!) {
    user(id: $id) {
      id
      email
      displayName
    }
  }`)

export const CREATE_ORG = gql(`
  mutation createOrgImport($name: String!) {
    insert_org_one(object: {
      name: $name
      defaultWorkedMinPerWeek: 2100
    }) {
      id
    }
  }`)

export const CREATE_MEMBERS = gql(`
  mutation createMembersImport( $members: [member_insert_input!]!) {
    insert_member(objects: $members) {
      returning {
        id
        inviteEmail
      }
    }
  }`)

export const CREATE_ROLES = gql(`
  mutation createRolesImport($roles: [role_insert_input!]!) {
    insert_role(objects: $roles) {
      returning {
        ...Role
      }
    }
  }`)

export const CREATE_CIRCLES = gql(`
  mutation createCirclesImport($circles: [circle_insert_input!]!) {
    insert_circle(objects: $circles) {
      returning {
        id
      }
    }
  }`)

export const CREATE_CIRCLES_MEMBERS = gql(`
  mutation createCirclesMembersImport($circleMembers: [circle_member_insert_input!]!) {
    insert_circle_member(objects: $circleMembers) {
      returning {
        id
      }
    }
  }`)

export const CREATE_DECISIONS = gql(`
  mutation createDecisionsImport($decisions: [decision_insert_input!]!) {
    insert_decision(objects: $decisions) {
      returning {
        id
      }
    }
  }`)

export const CREATE_TASKS = gql(`
  mutation createTasksImport($tasks: [task_insert_input!]!) {
    insert_task(objects: $tasks) {
      returning {
        id
      }
    }
  }`)
