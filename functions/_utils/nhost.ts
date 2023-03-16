import { NhostClient } from '@nhost/nhost-js'

const nhost = new NhostClient({
  backendUrl: process.env.NHOST_BACKEND_URL,
  adminSecret: process.env.NHOST_ADMIN_SECRET,
})

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
