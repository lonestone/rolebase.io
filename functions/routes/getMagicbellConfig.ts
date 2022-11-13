import { MagicbellConfig } from '@shared/model/notification'
import { guardAuth } from '@utils/guardAuth'
import { route } from '@utils/route'
import settings from '@utils/settings'
import crypto from 'crypto'

export default route(async (context): Promise<MagicbellConfig> => {
  guardAuth(context)

  const userKey = crypto
    .createHmac('sha256', settings.magicbell.apiSecret)
    .update(context.userId!)
    .digest('base64')

  return {
    apiKey: settings.magicbell.apiKey,
    userKey,
    expiration: new Date().getTime() + 1000 * 60 * 60 * 24,
  }
})
