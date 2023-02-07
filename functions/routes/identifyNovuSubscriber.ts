import { guardAuth } from '@utils/guardAuth'
import { route } from '@utils/route'
import settings from '@utils/settings'
import { Novu } from '@novu/node'
import { guardBodyParams } from '@utils/guardBodyParams'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  email: yup.string().email().required(),
  locale: yup.string().required(),
})

export default route(async (context): Promise<void> => {
  guardAuth(context)

  const { email, locale } = guardBodyParams(context, yupSchema)

  const novu = new Novu(settings.novu.apiKey)

  // Identify the recipient for Novu to be able to send him/her notification
  await novu.subscribers.identify(context.userId!, {
    email,
    locale: locale || 'en',
  })
})
