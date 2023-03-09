import { useDisclosure } from '@chakra-ui/react'
import React, { createContext, useMemo, useState } from 'react'

export const defaultSidebarWidth = 200 // Side bar
export const defaultSidebarHeight = 50 // Top bar on small screen

interface SidebarContextValue {
  expand: ReturnType<typeof useDisclosure>
  width: number
  height: number
  setWidth(width: number): void
  setHeight(height: number): void
}

export const SidebarContext = createContext<SidebarContextValue | undefined>(
  undefined
)

interface SidebarProviderProps {
  children: React.ReactNode
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const expand = useDisclosure()
  const [width, setWidth] = useState<number>(defaultSidebarWidth)
  const [height, setHeight] = useState<number>(0)

  const value = useMemo(
    () => ({
      expand,
      width,
      height,
      setWidth,
      setHeight,
    }),
    [expand.isOpen, width, height]
  )

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  )
}
