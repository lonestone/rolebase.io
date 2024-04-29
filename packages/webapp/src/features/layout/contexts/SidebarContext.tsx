import { useDisclosure } from '@chakra-ui/react'
import { UserLocalStorageKeys } from '@utils/localStorage'
import React, { createContext, useMemo, useState } from 'react'

const retrievedSidebarWidth = localStorage.getItem(
  UserLocalStorageKeys.SidebarWidth
)

// Width of sidebar
export const defaultSidebarWidth = retrievedSidebarWidth
  ? parseInt(retrievedSidebarWidth, 0)
  : 336
export const sidebarMinWidth = 250
export const sidebarMaxWidth = 600

// Top bar height on mobile
export const defaultSidebarHeight = 50

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
