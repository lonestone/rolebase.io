import { useEffect, useMemo } from 'react'
import { Graph } from '../graphs/Graph'
import Renderer from '../renderers/Renderer'

export default function useRenderer(
  graph: Graph | undefined,
  instanciate: (graph: Graph) => Renderer
) {
  const renderer = useMemo(() => graph && instanciate(graph), [graph])

  // Destroy renderer on unmount
  useEffect(
    () => () => {
      renderer?.destroy()
    },
    [renderer]
  )
}
