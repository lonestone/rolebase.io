import { RefObject, useEffect, useState } from 'react'

function getSize(element?: HTMLElement | null) {
  if (element) {
    return {
      width: element.offsetWidth,
      height: element.offsetHeight,
    }
  }
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

export default function useWindowSize(ref?: RefObject<HTMLElement>) {
  const [windowSize, setWindowSize] = useState(() => getSize(ref?.current))

  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize(ref?.current))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
