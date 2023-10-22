import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { route } from '@utils/route'
import Office365App from './_Office365App'

// Migrate legacy calendars
// (remove this route after execution)
export default route(async (context) => {
  const { user_app } = await adminRequest(
    gql(`
      query getUserApps {
        user_app {
          ...UserAppFull
        }
      }
    `)
  )

  for (const userApp of user_app) {
    await new Office365App(userApp).migrateLegacyCalendars()
  }

  return 'Migration OK'
})
