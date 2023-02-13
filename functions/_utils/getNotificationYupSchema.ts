import { NotificationCategories } from '@shared/model/notification'
import * as yup from 'yup'

const inAppFields = {
  topic: yup.string(),
}

const emailFields = {
  notificationReceived: yup.string().required(),
  actionButton: yup.string().required(),
  automaticEmail: yup.string().required(),
  unsubscribe: yup.string().required(),
  appUrl: yup.string(),
}

const meetingStartedFields = {}

export function getNotificationYupSchema(
  category: keyof typeof NotificationCategories
) {
  const categoryFields = {
    meetingstarted: {
      ...inAppFields,
      ...emailFields,
      ...meetingStartedFields,
    },
  }

  const yupSchema = yup.object({
    category: yup.string().oneOf(Object.values(NotificationCategories)),
    recipientMemberIds: yup.array().of(yup.string().required()).required(),
    title: yup.string().required(),
    content: yup.string().required(),
    actionUrl: yup.string(),
    ...categoryFields[category],
  })

  return yupSchema
}
