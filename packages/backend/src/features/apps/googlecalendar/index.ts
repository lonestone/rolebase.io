import { registerRestRoutes } from '../../../rest/registerRestRoutes'
import { router } from '../../../trpc'
import { authRedirect } from './authRedirect'
import notify from './notify'

export default router({
  authRedirect,
})

registerRestRoutes((app) => {
  app.post('/apps/googlecalendar/notify', notify)
})
