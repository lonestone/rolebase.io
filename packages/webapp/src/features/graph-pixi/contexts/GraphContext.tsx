import React, { createContext, useMemo, useState } from 'react'
import { Graph } from '../graphs/Graph'

interface GraphContextValue {
  graph: Graph | undefined
  setGraph(graph: Graph | undefined): void
}

export const GraphContext = createContext<GraphContextValue | undefined>(
  undefined
)

interface GraphProviderProps {
  children: React.ReactNode
}

export function GraphProvider({ children }: GraphProviderProps) {
  const [graph, setGraph] = useState<Graph | undefined>()

  const value = useMemo(
    () => ({
      graph,
      setGraph,
    }),
    [graph, setGraph]
  )

  return <GraphContext.Provider value={value}>{children}</GraphContext.Provider>
}
