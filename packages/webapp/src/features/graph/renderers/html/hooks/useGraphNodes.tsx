import { CirclesGraph } from '@/graph/graphs/CirclesGraph'
import { useEffect, useState } from 'react'

export function useGraphNodes(graph: CirclesGraph) {
  const [nodes, setNodes] = useState(graph.nodes)

  useEffect(() => {
    graph.on('nodesData', setNodes)
    return () => {
      graph.off('nodesData', setNodes)
    }
  }, [graph])

  return nodes
}
