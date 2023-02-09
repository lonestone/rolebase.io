import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { guardAuth } from '@utils/guardAuth'
import { route } from '@utils/route'
import settings from '@utils/settings'
import { Novu } from '@novu/node'
import { guardBodyParams } from '@utils/guardBodyParams'
import * as yup from 'yup'
import { guardWebhookSecret } from '@utils/guardWebhookSecret'

const yupSchema = yup.object({
  email: yup.string().email(),
  locale: yup.string(),
})

export default route(async (context): Promise<void> => {
  const { headers, body } = context.req

  const nhostWebhookSecretFromHeader = headers['x-nhost-webhook-secret']

  let userId: string | undefined
  const fields: yup.InferType<typeof yupSchema> = {
    email: undefined,
    locale: undefined,
  }

  if (nhostWebhookSecretFromHeader) {
    // Here we use an event trigger on email update to change it in Novu too
    guardWebhookSecret(context)

    // Get user email
    const { user } = await adminRequest(GET_USER_EMAIL, {
      id: body.event.data.new.id!,
    })

    if (user?.email) fields.email = user.email
    userId = body.event.data.new.id
  } else {
    guardAuth(context)
    // Locale is retrieve or set in app, we can change it directly
    const { locale } = guardBodyParams(context, yupSchema)
    fields.locale = locale
    userId = context.userId!
  }

  const novu = new Novu(settings.novu.apiKey)

  // Update subscriber registered in Novu
  await novu.subscribers.update(userId!, fields)
})

const GET_USER_EMAIL = gql(`
  query getUserEmail($id: uuid!) {
    user(id: $id) {
      id
      email
    }
  }`)
