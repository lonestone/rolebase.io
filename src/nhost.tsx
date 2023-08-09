import { NhostClient } from '@nhost/react'
import settings from './settings'

export const nhost = new NhostClient(settings.nhost)
