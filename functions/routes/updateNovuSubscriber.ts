import { guardAuth } from '@utils/guardAuth'
import { route } from '@utils/route'
import settings from '@utils/settings'
import { Novu } from '@novu/node'
import { guardBodyParams } from '@utils/guardBodyParams'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  email: yup.string().email(),
  locale: yup.string(),
})

export default route(async (context): Promise<void> => {
  guardAuth(context)

  const { email, locale } = guardBodyParams(context, yupSchema)

  const novu = new Novu(settings.novu.apiKey)

  // Update subscriber registered in Novu
  await novu.subscribers.update(context.userId!, {
    email,
    locale,
  })
})
