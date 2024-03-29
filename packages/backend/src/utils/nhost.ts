import { NhostClient } from '@nhost/nhost-js'
import settings from '../settings'

const nhost = new NhostClient(settings.nhost)

export enum HasuraEventOp {
  INSERT = 'INSERT',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  MANUAL = 'MANUAL',
}

export { nhost }

export interface HasuraEvent<T = any> {
  event: {
    session_variables: { [x: string]: string }
    op: HasuraEventOp
    data: {
      old: T | null
      new: T | null
    }
  }
  created_at: string
  id: string
  delivery_info: {
    max_retries: number
    current_retry: number
  }
  trigger: {
    name: string
  }
  table: {
    schema: string
    name: string
  }
}
