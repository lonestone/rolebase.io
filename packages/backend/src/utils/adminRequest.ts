import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { nhost } from './nhost'

export async function adminRequest<Result, Variables>(
  document: TypedDocumentNode<Result, Variables>,
  variables?: Variables
): Promise<Result> {
  const result = await nhost.graphql.request(document, variables)
  if (!result.body.data) {
    throw new Error('No data returned')
  }
  return result.body.data as Result
}
