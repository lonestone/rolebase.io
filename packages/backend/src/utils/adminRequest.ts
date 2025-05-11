import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { nhost } from './nhost'

export async function adminRequest<Result, Variables>(
  document: TypedDocumentNode<Result, Variables>,
  variables?: Variables
): Promise<Result> {
  // @ts-ignore
  const result = await nhost.graphql.request(document, variables)
  if (result.error) throw result.error
  return result.data
}
