import { MouseEvent, useCallback } from 'react'

export function useNormalClickHandler(
  onClick: (event?: MouseEvent<HTMLAnchorElement>) => void,
  dontPreventDefault?: boolean
) {
  return useCallback(
    (event?: MouseEvent<HTMLAnchorElement>) => {
      // Normal click (not Ctrl+click or Cmd+click)
      if (event && !(event.ctrlKey || event.metaKey)) {
        // Prevent default link behavior
        if (!dontPreventDefault) event.preventDefault()
        // Open modal
        onClick(event)
      }
    },
    [onClick]
  )
}
