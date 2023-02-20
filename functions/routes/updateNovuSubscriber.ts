import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { route, RouteError } from '@utils/route'
import settings from '@utils/settings'
import { Novu } from '@novu/node'
import * as yup from 'yup'
import { guardWebhookSecret } from '@utils/guardWebhookSecret'

const yupSchema = yup.object({
  email: yup.string().email(),
  locale: yup.string(),
})

export default route(async (context): Promise<void> => {
  const { body } = context.req

  const fields: yup.InferType<typeof yupSchema> = {
    email: undefined,
    locale: undefined,
  }

  // Here we use an event trigger on email or locale update to change it in Novu too
  guardWebhookSecret(context)

  // Check if userId is provided in body
  const userId = body.event.data.new.id
  if (!userId) {
    throw new RouteError(401, 'Unauthorized')
  }

  // Get user fields used in Novu subscription
  const { user } = await adminRequest(GET_USER_NOVU_FIELDS, {
    id: body.event.data.new.id!,
  })

  if (!user?.email && !user?.locale) return

  fields.email = user?.email ? user.email : undefined
  fields.locale = user?.locale ? user.locale : undefined

  const novu = new Novu(settings.novu.apiKey)
  // Update subscriber registered in Novu
  await novu.subscribers.update(userId!, fields)
})

const GET_USER_NOVU_FIELDS = gql(`
  query getUserNovuFields($id: uuid!) {
    user(id: $id) {
      id
      email
      locale
    }
  }`)
