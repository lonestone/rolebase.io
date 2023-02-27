import { NovuConfig } from '@shared/model/notification'
import { guardAuth } from '@utils/guardAuth'
import { route } from '@utils/route'
import settings from '@utils/settings'
import { createHmac } from 'crypto'

export default route(async (context): Promise<NovuConfig> => {
  guardAuth(context)

  const userKey = createHmac('sha256', settings.novu.apiKey)
    .update(context.userId!)
    .digest('hex')

  return {
    appId: settings.novu.appId,
    userKey,
    expiration: new Date().getTime() + 1000 * 60 * 60 * 24,
  }
})
