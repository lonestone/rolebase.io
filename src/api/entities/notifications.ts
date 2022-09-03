import {
  MagicbellConfig,
  NotificationPayload,
} from '@shared/model/notification'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../firebase'

export async function getMagicbellConfig(): Promise<MagicbellConfig> {
  const { data: config } = await httpsCallable<{}, MagicbellConfig>(
    functions,
    'getMagicbellConfig'
  )()
  return config
}

export async function sendNotification(
  params: NotificationPayload
): Promise<void> {
  if (params.recipientMemberIds.length === 0) return
  await httpsCallable<{}, MagicbellConfig>(
    functions,
    'sendNotification'
  )(params)
}
