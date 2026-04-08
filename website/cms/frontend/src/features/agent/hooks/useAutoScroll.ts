import { useRef, useEffect, useCallback, type RefObject } from 'react'

/**
 * Auto-scrolls a container to the bottom when content changes,
 * but only if the user is already near the bottom.
 * Stops auto-scrolling when the user scrolls up to read.
 */
export function useAutoScroll<T extends HTMLElement>(): {
  ref: RefObject<T | null>
  onScroll: () => void
  scrollToBottom: () => void
} {
  const ref = useRef<T | null>(null)
  const isAtBottomRef = useRef(true)

  const onScroll = useCallback(() => {
    const el = ref.current
    if (!el) return
    isAtBottomRef.current =
      el.scrollHeight - el.scrollTop - el.clientHeight < 40
  }, [])

  const scrollToBottom = useCallback(() => {
    const el = ref.current
    if (el) {
      el.scrollTop = el.scrollHeight
      isAtBottomRef.current = true
    }
  }, [])

  // Observe DOM mutations and auto-scroll if pinned to bottom
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new MutationObserver(() => {
      if (isAtBottomRef.current) {
        el.scrollTop = el.scrollHeight
      }
    })

    observer.observe(el, { childList: true, subtree: true, characterData: true })
    return () => observer.disconnect()
  }, [])

  return { ref, onScroll, scrollToBottom }
}
