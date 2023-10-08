import { App_Type_Enum, UserAppFullFragment, gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { RouteError, route } from '@utils/route'
import * as yup from 'yup'
import Office365App from './office365/_Office365App'

const yupSchema = yup.object().shape({
  id: yup.string().required(),
  action: yup.string().required(),
  args: yup.array(),
})

export default route(async (context) => {
  const userId = guardAuth(context)
  const { id, action, args } = guardBodyParams(context, yupSchema)

  // Instanciate app
  const app = await loadAppById(id).catch((e) => {
    console.warn(e)
    throw new RouteError(400, 'App not found')
  })

  // Check app ownership
  if (userId !== app.userApp.userId) {
    throw new RouteError(403, 'Forbidden')
  }

  // Check if action is allowed
  if (!app.actions.includes(action as any)) {
    throw new RouteError(400, 'Invalid action')
  }

  // Call action
  const actionFn = app[action].bind(app)
  if (args) {
    return actionFn(...args)
  } else {
    return actionFn()
  }
})

export async function loadAppById(id: string) {
  const { user_app_by_pk: userApp } = await adminRequest(GET_USER_APP, { id })
  if (!userApp) {
    throw new Error('User app not found')
  }
  return appFactory(userApp)
}

export function appFactory(userApp: UserAppFullFragment) {
  switch (userApp.type) {
    case App_Type_Enum.Office365:
      return new Office365App(userApp)
    default:
      throw new Error('Invalid app type')
  }
}

const GET_USER_APP = gql(`
  query getUserApp($id: uuid!) {
    user_app_by_pk(id: $id) {
      ...UserAppFull
    }
  }
`)
