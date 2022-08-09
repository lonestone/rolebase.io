import { Box, ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import CirclesGraph from '@components/organisms/circle/CirclesGraph'
import useWindowSize from '@hooks/useWindowSize'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { I18nextProvider } from 'react-i18next'
import { Graph, GraphEvents } from 'src/circles-viz/createGraph'
import settings from 'src/circles-viz/settings'
import i18n from '../i18n'
import theme from '../theme'
import { circles, members, roles } from './demo1.data'

const rootElement = document.getElementById('demo1')

interface Step {
  y: number
  circleId: string | undefined
}

const steps: Step[] = [
  {
    y: 0,
    circleId: undefined,
  },
  {
    y: 200,
    circleId: 'circle-super',
  },
  {
    y: 400,
    circleId: 'circle-agence',
  },
  {
    y: 600,
    circleId: 'circle-studio',
  },
  {
    y: 800,
    circleId: 'circle-studio-leader',
  },
  {
    y: 1000,
    circleId: undefined,
  },
]

function getCurrentStep(): Step {
  const y = window.scrollY - (rootElement?.offsetTop || 0)
  for (let i = steps.length - 1; i >= 0; i--) {
    if (y >= steps[i].y) {
      return steps[i]
    }
  }
  return steps[0]
}

function Demo1() {
  // Dimensions
  const windowSize = useWindowSize()
  const containerBoxRef = useRef<HTMLDivElement | null>(null)

  // Sticky
  const [stickyTop, setStickyTop] = useState(false)
  const [stickyBottom, setStickyBottom] = useState(false)
  const sticky = stickyTop || stickyBottom

  // Graph
  const graphRef = useRef<Graph | undefined>()
  const events: GraphEvents = {}
  const [circleId, setCircleId] = useState<string | undefined>()

  const goToStep = useCallback((step: Step) => {
    setCircleId(step.circleId)
    if (!step.circleId) {
      graphRef.current?.zoom.focusCircle?.(undefined, true)
    }
  }, [])

  useEffect(() => {
    let step: Step | undefined
    let lastTime: number | undefined
    let timeout: number | undefined

    const handleScroll = () => {
      // Update sticky states
      if (containerBoxRef.current) {
        const boxRect = containerBoxRef.current.getBoundingClientRect()
        setStickyTop(boxRect.top > 0)
        setStickyBottom(boxRect.bottom < windowSize.height)
      }

      // Show step
      const newStep = getCurrentStep()
      if (newStep !== step) {
        const time = new Date().getTime()
        const nextTime = Math.max(
          (lastTime || 0) + settings.zoom.duration,
          time
        )
        step = newStep
        clearTimeout(timeout)
        timeout = window.setTimeout(() => {
          lastTime = new Date().getTime()
          goToStep(newStep)
        }, nextTime - time)
      }
    }
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => {
      clearTimeout(timeout)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [goToStep])

  return (
    <Box
      ref={containerBoxRef}
      h={`${windowSize.height + steps[steps.length - 1].y}px`}
    >
      <Box
        position={sticky ? 'absolute' : 'fixed'}
        top={
          !sticky
            ? 0
            : stickyBottom
            ? (containerBoxRef.current?.offsetTop || 0) +
              (containerBoxRef.current?.offsetHeight || 0) -
              windowSize.height
            : undefined
        }
        left={0}
        right={0}
        w="100%"
        overflow="hidden"
      >
        <CirclesGraph
          ref={graphRef}
          id="graph"
          circles={circles}
          roles={roles}
          members={members}
          events={events}
          selectedCircleId={circleId}
          panzoomDisabled
          width={windowSize.width}
          height={windowSize.height}
        />
      </Box>
    </Box>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Demo1 />
      </ChakraProvider>
    </I18nextProvider>
  </React.StrictMode>,
  rootElement
)
