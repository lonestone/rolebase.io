import { createClient } from '@nhost/nhost-js'
import settings from './settings'

export const nhost = createClient(settings.nhost)
