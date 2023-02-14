import { useEffect, useState } from 'react'

interface Size {
  width: number
  height: number
}

function getWindowSize(): Size {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

export default function useWindowSize(): Size {
  const [windowSize, setWindowSize] = useState(getWindowSize)

  useEffect(() => {
    const handleResize = () => setWindowSize(getWindowSize())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
