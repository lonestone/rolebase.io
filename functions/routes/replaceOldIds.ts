import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { guardBodyParams } from '@utils/guardBodyParams'
import { route } from '@utils/route'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  text: yup.string().required(),
})

// Replace old ids (from Firebase) to new ids (in Postgres) in a string
// It's useful to convert urls from Firebase to Nhost
export default route(async (context): Promise<string> => {
  const { text } = guardBodyParams(context, yupSchema)

  // Get old ids
  const result = await adminRequest(GET_OLD_IDS)

  // Replace old ids with new ids in provided text
  let newText = text
  for (const { id, oldId } of result.old_id) {
    newText = newText.replaceAll(oldId, id)
  }

  return newText
})

const GET_OLD_IDS = gql(`
  query GetOldIds {
    old_id {
      id
      oldId
      type
    }
  }
`)
