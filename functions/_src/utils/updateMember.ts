import { Member_Set_Input, gql } from '@gql'
import { adminRequest } from './adminRequest'

export async function updateMember(id: string, values: Member_Set_Input) {
  await adminRequest(UPDATE_MEMBER, { id, values })
}

const UPDATE_MEMBER = gql(`
  mutation updateMember($id: uuid!, $values: member_set_input!) {
    update_member_by_pk(pk_columns: { id: $id }, _set: $values) {
      id
    }
  }
`)
