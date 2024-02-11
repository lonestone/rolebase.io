import * as Sentry from '@sentry/node'
// import { ProfilingIntegration } from '@sentry/profiling-node'
import settings from '@settings'

Sentry.init({
  dsn: settings.sentry.dsn,
  // integrations: [new ProfilingIntegration()],
  // Performance Monitoring
  tracesSampleRate: 1.0,
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
})

export function startErrorHandling(name: string) {
  return Sentry.startTransaction({ name })
}

export function captureError(error: Error) {
  // DISABLED: This is not working in the cloud function environment, because source maps are not available
  // Sentry.captureException(error)
}
