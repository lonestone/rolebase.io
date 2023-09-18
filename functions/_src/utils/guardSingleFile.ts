import multer from 'multer'
import { FunctionContext } from './getContext'
import { RouteError } from './route'

const upload = multer()

/**
 * Receive a single uploaded file that can be sent like this:
  // Backend (in route)
  const file = await guardSingleFile(context)

  // Frontend
  const formData = new FormData()
  formData.append('file', file)

  const result = await fetch(
    `${nhost.functions.url}/routes/myRoute`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${nhost.auth.getAccessToken()}`,
      },
      body: formData,
    }
  )

  if (!result.ok) {
    throw new Error('Error uploading file')
  }

  const data = await result.json()
**/

export async function guardSingleFile(
  context: FunctionContext,
  field = 'file'
) {
  await new Promise((resolve) => {
    upload.single(field)(context.req, context.res, resolve)
  })
  if (!context.req.file) {
    throw new RouteError(400, 'File missing')
  }
  return context.req.file
}
