import { MagicbellConfig } from '@shared/model/notification'
import crypto from 'crypto'
import * as functions from 'firebase-functions'
import { guardAuth } from '../helpers/guards'
import settings from '../settings'

export const getMagicbellConfig = functions.https.onCall(
  async (d, context): Promise<MagicbellConfig> => {
    const { uid } = guardAuth(context)

    const userKey = crypto
      .createHmac('sha256', settings.magicbell.apiSecret)
      .update(uid)
      .digest('base64')

    return {
      apiKey: settings.magicbell.apiKey,
      userKey,
    }
  }
)
