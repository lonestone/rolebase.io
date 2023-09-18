import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { nhost } from './nhost'

export async function adminRequest<Type, Params>(
  document: string | TypedDocumentNode<Type, Params>,
  variables?: Params
): Promise<Type> {
  // // Add admin secret to headers
  // config.headers['x-hasura-admin-secret'] = process.env
  //   .NHOST_ADMIN_SECRET as string

  const result = await nhost.graphql.request(document, variables)
  if (result.error) throw result.error
  return result.data
}
