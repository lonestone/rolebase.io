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
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')

    // Enable CORS for OPTIONS (no need to return any body)
    if (req.method === 'OPTIONS') {
      res.status(204).send()
      return
    }

    const context = getContext(req, res)

    try {
      const result = await routeFn(context)
      res.status(200).send(result)
    } catch (error) {
      if (error instanceof RouteError) {
        res.status(error.status).send(error.message)
      } else {
        console.error(error)
        res.status(500).send('Internal Server Error')
      }
    }
  }
}
