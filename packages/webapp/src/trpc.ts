import type { TrpcRouter } from '@rolebase/backend'
import { createTRPCClient, httpBatchLink } from '@trpc/client'
import { nhost } from './nhost'
import settings from './settings'

export const trpc = createTRPCClient<TrpcRouter>({
  links: [
    httpBatchLink({
      url: settings.backendUrl,
      // Auth with Nhost
      headers: () => ({
        Authorization: `Bearer ${nhost.sessionStorage.get()?.accessToken}`,
      }),
    }),
  ],
})
