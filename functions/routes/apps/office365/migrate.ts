import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { guardQueryParams } from '@utils/guardQueryParams'
import { route } from '@utils/route'
import * as yup from 'yup'
import Office365App from './_Office365App'

const yupSchema = yup.object().shape({
  appId: yup.string().required(),
})

// Migrate legacy calendars
// (remove this route after execution)
export default route(async (context) => {
  const { appId } = guardQueryParams(context, yupSchema)

  const { user_app_by_pk: userApp } = await adminRequest(
    gql(`
      query getUserApps($id: uuid!) {
        user_app_by_pk(id: $id) {
          ...UserAppFull
        }
      }
    `),
    { id: appId }
  )
  if (!userApp) {
    return 'App not found'
  }

  try {
    await new Office365App(userApp).migrateLegacyCalendars()
    console.log(`Migrated user app ${userApp.id}`)
    return `Migrated user app ${userApp.id}`
  } catch (e) {
    console.log(`Error migrating user app ${userApp.id}`, e)
    return `Error migrating user app ${userApp.id}`
  }
})
