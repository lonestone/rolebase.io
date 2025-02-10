import { UnregisterCallback } from 'history'
import { useCallback, useEffect, useRef } from 'react'

const message = 'You have unsaved changes. Are you sure you want to leave?'

// Count number of components using this hook, to use history.block once at a time
let historyBlockCount = 0
let historyReleaseCallback: UnregisterCallback | undefined = undefined

// Prevents window from closing when preventHandler returns true
export function usePreventClose() {
  const isPreventingClose = useRef(false)
  // const { navigator } = useContext(UNSAFE_NavigationContext)

  const preventClose = useCallback(() => {
    if (isPreventingClose.current) return
    isPreventingClose.current = true
    if (historyBlockCount === 0) {
      // TODO: FIX: react-router v6 does not have navigator.block (for now?)
      // historyReleaseCallback = navigator.block(message)
    }
    historyBlockCount++
  }, [])

  const allowClose = useCallback(() => {
    if (!isPreventingClose.current) return
    isPreventingClose.current = false
    historyBlockCount--
    if (historyBlockCount === 0) {
      historyReleaseCallback?.()
      historyReleaseCallback = undefined
    }
  }, [])

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      if (isPreventingClose.current) {
        const confirmationMessage = message
        event.returnValue = confirmationMessage // Gecko, Trident, Chrome 34+
        return confirmationMessage // Gecko, WebKit, Chrome <34
      }
    }
    window.addEventListener('beforeunload', handler)
    return () => {
      window.removeEventListener('beforeunload', handler)
      allowClose()
    }
  }, [])

  return {
    isPreventingClose: () => isPreventingClose.current,
    preventClose,
    allowClose,
  }
}
