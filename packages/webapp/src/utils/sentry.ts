import * as Sentry from '@sentry/react'
import settings, { isLocal } from 'src/settings'

export function configureSentry() {
  if (isLocal || !settings.nhost.subdomain) {
    return
  }

  Sentry.init({
    dsn: settings.sentry.dsn,
    integrations: [
      new Sentry.BrowserTracing({
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: [
          // Functions and Hasura urls of the Nhost project
          settings.functionsUrl,
          settings.backendUrl,
        ],
      }),
      new Sentry.Replay(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  })
}
