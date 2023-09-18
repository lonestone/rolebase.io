import { useEffect } from 'react'

interface Props {
  children: string
}

export function Title({ children }: Props) {
  useEffect(() => {
    document.title = `${children} - Rolebase`
  }, [children])
  return null
}
