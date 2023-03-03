import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import axios from 'axios'
import { nhost } from './nhost'

export async function adminRequest<Type, Params>(
  document: string | TypedDocumentNode<Type, Params>,
  variables?: Params,
  config?: Parameters<typeof nhost.graphql.request>[2]
): Promise<Type> {
  if (!config) config = {}
  if (!config.headers) config.headers = {}

  // // Add admin secret to headers
  // config.headers['x-hasura-admin-secret'] = process.env
  //   .NHOST_ADMIN_SECRET as string

  const result = await nhost.graphql.request(document, variables, config)
  if (result.error) throw result.error
  return result.data
}

export async function adminRestRequest(
  route: string,
  body?: any
): Promise<any> {
  const url = process.env.NHOST_BACKEND_URL

  const result = await axios.post(`${url}${route}`, body, {
    headers: {
      'x-hasura-admin-secret': nhost.adminSecret ?? '',
    },
  })

  return result.data
}
