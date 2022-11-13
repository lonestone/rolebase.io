import { guardBodyParams } from '@utils/guardBodyParams'
import { route } from '@utils/route'
import * as yup from 'yup'
import { oldIds, retrieveOldIds } from '_migration/oldIds'

const yupSchema = yup.object().shape({
  text: yup.string().required(),
})

// Replace old ids (from Firebase) to new ids (in Postgres) in a string
// It's useful to convert urls from Firebase to Nhost
export default route(async (context): Promise<string> => {
  const { text } = guardBodyParams(context, yupSchema)
  if (oldIds.size === 0) {
    await retrieveOldIds()
  }

  let newText = text
  for (const [oldId, { newId }] of oldIds) {
    newText = newText.replaceAll(oldId, newId)
  }
  return newText
})
