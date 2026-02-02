import * as Sentry from '@sentry/react'
import settings, { isLocal } from 'src/settings'

export function configureSentry() {
  if (isLocal) return

  Sentry.init({
    dsn: settings.sentry.dsn,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions
    tracePropagationTargets: [
      // Functions and Hasura urls of the Nhost project
      settings.functionsUrl,
      settings.backendUrl,
    ],
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  })
}
