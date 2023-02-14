import { useLocation } from 'react-router-dom'

export default function useQueryParams<
  Params extends Record<string, string>
>(): Partial<Params> {
  const params: Record<string, string> = {}
  const searchParams = new URLSearchParams(useLocation().search)
  for (const [key, value] of searchParams) {
    params[key] = value
  }
  return params as Partial<Params>
}
