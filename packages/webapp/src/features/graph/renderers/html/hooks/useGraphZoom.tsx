import { CirclesGraph } from '@/graph/graphs/CirclesGraph'
import { useEffect, useState } from 'react'

export function useGraphZoom(graph: CirclesGraph) {
  const [transform, setTransform] = useState(graph.zoomTransform)

  useEffect(() => {
    graph.on('zoom', setTransform)
    return () => {
      graph.off('zoom', setTransform)
    }
  }, [graph])

  return transform
}
