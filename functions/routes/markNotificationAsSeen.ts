import { guardAuth } from '@utils/guardAuth'
import { route } from '@utils/route'
import settings from '@utils/settings'
import { Novu } from '@novu/node'
import { guardBodyParams } from '@utils/guardBodyParams'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  messageId: yup.string().required(),
})

export default route(async (context): Promise<void> => {
  guardAuth(context)

  const { messageId } = guardBodyParams(context, yupSchema)

  const novu = new Novu(settings.novu.apiKey)

  // Currently mark notification as seen and read
  await novu.subscribers.markMessageSeen(context.userId!, messageId!)
})
