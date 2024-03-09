import { registerRestRoutes } from '../../rest/registerRestRoutes'
import { router } from '../../trpc'
import getMeetingsToken from './getMeetingsToken'
import ical from './ical'

export default router({
  getMeetingsToken,
})

registerRestRoutes((app) => {
  app.get('/meeting/ical', ical)
})
