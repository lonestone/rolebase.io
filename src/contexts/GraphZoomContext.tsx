import React, { createContext, useMemo, useState } from 'react'
import { Zoom } from 'src/circles-viz/types'

interface GraphZoomContextValue {
  zoom: Zoom | undefined
  setZoom(zoom: Zoom | undefined): void
}

export const GraphZoomContext = createContext<
  GraphZoomContextValue | undefined
>(undefined)

interface GraphZoomProviderProps {
  children: React.ReactNode
}

export function GraphZoomProvider({ children }: GraphZoomProviderProps) {
  const [zoom, setZoom] = useState<Zoom | undefined>()

  const value = useMemo(
    () => ({
      zoom,
      setZoom,
    }),
    [zoom, setZoom]
  )

  return (
    <GraphZoomContext.Provider value={value}>
      {children}
    </GraphZoomContext.Provider>
  )
}
