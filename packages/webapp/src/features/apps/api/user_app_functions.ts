import { CalendarApp } from '@shared/model/user_app'
import { fn } from '../../common/api/functions'

// Invoke a function from an app
const appsAction = fn<{ id: string; action: string; args?: Array<any> }, any>(
  'apps'
)

// App proxy to serve as an interface to the API
export function calendarAppFactory(id: string) {
  return new window.Proxy<CalendarApp>({ id } as any, {
    get(target, prop) {
      return (...args: any[]) => {
        if (typeof prop !== 'string') {
          throw new Error('Invalid property')
        }
        return appsAction({
          id: (target as any).id,
          action: prop,
          args,
        })
      }
    },
  })
}
