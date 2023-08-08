import { NhostClient } from '@nhost/react'
import settings from './settings'

export const nhost = new NhostClient(settings.nhost)

export const apolloHeaders = {
  'x-hasura-role': 'user',
}
