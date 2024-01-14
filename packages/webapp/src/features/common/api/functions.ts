import { nhost } from 'src/nhost'

// Helper to call a function
export function fn<Params, Result = void>(route: string) {
  return async (params: Params): Promise<Result> => {
    const { error, res } = await nhost.functions.call<Result>(
      `routes/${route}`,
      params
    )
    if (error) throw error
    return res.data
  }
}
