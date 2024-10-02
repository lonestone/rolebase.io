import { Box } from '@chakra-ui/react'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { CirclesGraph } from './graphs/CirclesGraph'
import useCirclesGraph, { CirclesGraphProps } from './hooks/useCirclesGraph'
import CirclesTitles from './renderers/html/CirclesTitles'
import Nodes from './renderers/html/Nodes'
import { Panzoom } from './renderers/html/Panzoom'
import { useNodeCursor } from './renderers/html/hooks/useNodeCursor'

// Force reset with fast refresh
// @refresh reset

export default forwardRef<CirclesGraph | undefined, CirclesGraphProps>(
  function CirclesHTMLGraph(props, ref) {
    const containerRef = useRef<HTMLDivElement>(null)

    // Instanciate graph
    const graph = useCirclesGraph(containerRef, props)

    // Expose ref
    useImperativeHandle(ref, () => graph)

    // Compute graph min size
    const cropWidth =
      props.width - (props.focusCrop?.left || 0) - (props.focusCrop?.right || 0)
    const cropHeight =
      props.height -
      (props.focusCrop?.top || 0) -
      (props.focusCrop?.bottom || 0)
    const graphMinSize = Math.min(cropWidth, cropHeight)

    // Cursor on nodes
    const cursor = useNodeCursor(graph)

    // Click outside => unselect circle
    const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === containerRef.current) {
        props.events?.onClickOutside?.()
      }
    }

    return (
      <Box
        ref={containerRef}
        width={props.width}
        height={props.height}
        style={
          {
            '--graph-min-size': graphMinSize,
            '--node-cursor': cursor,
          } as React.CSSProperties
        }
        onClick={handleClickOutside}
      >
        {graph && (
          <Panzoom graph={graph}>
            <Nodes graph={graph} />
            <CirclesTitles graph={graph} />
          </Panzoom>
        )}
      </Box>
    )
  }
)
