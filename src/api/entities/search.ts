import { AlgoliaConfig } from '@shared/model/search'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../firebase'

export async function getAlgoliaConfig(orgId: string): Promise<AlgoliaConfig> {
  const { data: config } = await httpsCallable<{}, AlgoliaConfig>(
    functions,
    'getAlgoliaConfig'
  )({
    orgId,
  })
  return config
}

export async function reindexAll(): Promise<void> {
  await httpsCallable<{}, string>(functions, 'searchReindexAll', {
    timeout: 540000,
  })()
}
