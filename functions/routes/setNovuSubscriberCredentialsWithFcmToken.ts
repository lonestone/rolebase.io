import { Novu, PushProviderIdEnum } from '@novu/node'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { route, RouteError } from '@utils/route'
import settings from '@utils/settings'
import * as yup from 'yup'

const yupSchema = yup.object({
  token: yup.string().required(),
})

export default route(async (context): Promise<void> => {
  guardAuth(context)

  const { token } = guardBodyParams(context, yupSchema)
  if (!token || !context?.userId) {
    new RouteError(400, 'Bad request')
  }

  const novu = new Novu(settings.novu.apiKey)
  await novu.subscribers.setCredentials(
    context.userId!,
    PushProviderIdEnum.FCM,
    {
      deviceTokens: [token],
    }
  )
})
