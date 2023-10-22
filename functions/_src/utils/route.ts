import { Request, Response } from 'express'
import { FunctionContext, getContext } from './getContext'

export type RouteFn = (context: FunctionContext) => any

export class RouteError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message)
  }
}

export function route<F extends RouteFn>(routeFn: F) {
  return async (req: Request, res: Response): Promise<void> => {
    const startTime = Date.now()
    const getDuration = () => Date.now() - startTime

    // Set default headers
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')

    // Enable CORS for OPTIONS
    if (req.method === 'OPTIONS') {
      res.status(204).send()
      return
    }

    const context = getContext(req, res)

    try {
      const result = await routeFn(context)
      res.status(200).send(result)
    } catch (error) {
      let status = 500
      let message = 'Internal Server Error'

      if (error instanceof RouteError) {
        status = error.status
        message = error.message
      }

      if (status === 500) {
        console.log(
          `Error: ${
            error?.message || JSON.stringify(error)
          } (${getDuration()}ms)`
        )
      }

      res.status(status).send(message)
    }
  }
}
