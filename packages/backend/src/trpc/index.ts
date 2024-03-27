import { initTRPC } from '@trpc/server'
import { Context } from './context'

// Init tRPC
const t = initTRPC.context<Context>().create()

// Router
export const router = t.router

// Public procedure with logging
export const publicProcedure = t.procedure.use(async (opts) => {
  const start = Date.now()

  const result = await opts.next()

  const durationMs = Date.now() - start

  console.log(`[${result.ok ? 'OK' : 'KO'}] ${opts.path} (${durationMs}ms)`)
  return result
})
