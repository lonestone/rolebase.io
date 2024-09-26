import { CirclesGraph } from '@/graph/graphs/CirclesGraph'
import { useEffect, useState } from 'react'

export function useGraphSelectedCircleId(graph: CirclesGraph) {
  const [selectedCircleId, setSelectedCircleId] = useState(
    graph.selectedCircleId
  )

  useEffect(() => {
    graph.on('selectCircle', setSelectedCircleId)
    return () => {
      graph.off('selectCircle', setSelectedCircleId)
    }
  }, [graph])

  return selectedCircleId
}
