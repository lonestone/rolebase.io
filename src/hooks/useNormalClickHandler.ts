import { MouseEvent, useCallback } from 'react'

export function useNormalClickHandler(
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void
) {
  return useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      // Normal click (not Ctrl+click or Cmd+click)
      if (!(event.ctrlKey || event.metaKey)) {
        // Prevent default link behavior
        event.preventDefault()
        // Open modal
        onClick(event)
      }
    },
    [onClick]
  )
}
