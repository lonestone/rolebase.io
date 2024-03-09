import type { BackendRouter } from '@rolebase/backend'
import { createTRPCClient, httpBatchLink } from '@trpc/client'
import { nhost } from './nhost'
import settings from './settings'

export const trpc = createTRPCClient<BackendRouter>({
  links: [
    httpBatchLink({
      url: settings.trpcUrl,
      // Auth with Nhost
      headers: () => ({
        Authorization: `Bearer ${nhost.auth.getAccessToken()}`,
      }),
    }),
  ],
})
