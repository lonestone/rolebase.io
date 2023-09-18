import { useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import useQueryParams from './useQueryParams'

// Return query params and a function to update them

export default function useUpdatableQueryParams<
  Params extends Record<string, string>,
>() {
  const navigate = useNavigate()
  const params = useQueryParams<Params>()

  // We use a timeout to batch changes
  const timeoutRef = useRef<number>(0)
  const pendingParams = useRef<Params | undefined>()

  // Update params in URL
  const applyParams = useCallback(() => {
    navigate(`?${new URLSearchParams(pendingParams.current).toString()}`)
    pendingParams.current = undefined
  }, [])

  // Change some filters
  const changeParams = useCallback(
    (changedParams: Partial<Params>) => {
      const newParams = {
        ...(pendingParams.current || params),
        ...changedParams,
      }

      // Remove keys that have undefined value
      Object.keys(newParams).forEach((key) => {
        if (typeof newParams[key] === 'undefined') {
          delete newParams[key]
        }
      })

      pendingParams.current = newParams as Params
      clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(applyParams, 0)
    },
    [params]
  )

  return { params, changeParams }
}
