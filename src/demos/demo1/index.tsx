import { Box, chakra, ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import CirclesGraph from '@components/organisms/circle/CirclesGraph'
import useWindowSize from '@hooks/useWindowSize'
import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { I18nextProvider } from 'react-i18next'
import { Transition, TransitionGroup } from 'react-transition-group'
import { Graph, GraphEvents } from 'src/circles-viz/createGraph'
import settings from 'src/circles-viz/settings'
import i18n from '../../i18n'
import theme from '../../theme'
import { circles, members, roles } from './data'

const rootElement = document.getElementById('demo1')

interface Step {
  circleId?: string | null
  text?: string
}

const steps: Step[] = [
  {
    text: 'Voici une entreprise.',
  },
  {
    circleId: 'circle-super',
    text: 'Ses fonctions sont décomposées en Rôles représentés par des cercles.',
  },
  {
    circleId: 'circle-finance',
    text: 'Angela occupe par exemple le Rôle Finance.',
  },
  {
    circleId: 'circle-finance',
    text: 'Passez la souris sur sa photo pour voir son prénom.',
  },
  {
    circleId: 'circle-product',
    text: 'Votre équipe Produit est aussi un Rôle...',
  },
  {
    circleId: 'circle-product-dev',
    text: "...qui contient d'autres Rôles.",
  },
  {
    circleId: 'circle-product-dev-leader',
    text: 'Un(e) Leader représente son Rôle dans le Rôle parent.',
  },
  {
    circleId: 'circle-product',
    text: "Darryl, Karen et Pam représentent les Rôles de l'équipe Produit.",
  },
  {
    circleId: 'circle-product',
    text: 'Ils et elles participent automatiquement aux réunions et aux discussions du Rôle Produit.',
  },
  {
    circleId: 'circle-business',
    text: 'Votre organisation devient limpide.',
  },
  {
    circleId: 'circle-super',
    text: 'Bienvenue dans la gouvernance partagée avec Rolebase !',
  },
  { circleId: null }, // Reset
]

const stepHeight = 500
const stepProgressionHeight = 50
const stepFadeHeight = 100

const textTransitions = {
  duration: 300,
  states: {
    toBottom: {
      entering: { opacity: 1, transform: 'translateY(0)' },
      entered: { opacity: 1, transform: 'translateY(0)' },
      exiting: {
        opacity: 0,
        transform: `translateY(-${stepProgressionHeight + stepFadeHeight}px)`,
      },
      exited: { opacity: 0, transform: `translateY(${stepFadeHeight}px)` },
      unmounted: {},
    },
    toTop: {
      entering: { opacity: 1, transform: 'translateY(0)' },
      entered: { opacity: 1, transform: 'translateY(0)' },
      exiting: { opacity: 0, transform: `translateY(${stepFadeHeight}px)` },
      exited: {
        opacity: 0,
        transform: `translateY(-${stepProgressionHeight + stepFadeHeight}px)`,
      },
      unmounted: {},
    },
  },
}

function getStepIndex(y: number): number {
  for (let i = steps.length - 1; i >= 0; i--) {
    if (y >= i * stepHeight) {
      return i
    }
  }
  return 0
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
  const graphRef = useRef<Graph>()
  const events: GraphEvents = {}

  // Current step
  const [stepIndex, setStepIndex] = useState<number>()
  const [toBottom, setToBottom] = useState(true)
  const step = stepIndex === undefined ? undefined : steps[stepIndex]
  const [stepProgression, setStepProgression] = useState(0)

  useEffect(() => {
    if (!step) return
    // When selectedCircleId is undefined or null, focus don't change
    if (step.circleId === undefined) {
      // Unzoom
      setTimeout(() => {
        const zoom = graphRef.current?.zoom
        if (!zoom) return
        zoom.to(0, 0, (2 / 3) * windowSize.height)
      }, settings.zoom.duration)
    } else if (step.circleId === null) {
      // Focus on root circle
      graphRef.current?.zoom.focusCircle?.(undefined, true)
    }
  }, [step])

  // Scroll handling
  const lastTime = useRef<number>(0)
  const timeout = useRef<number>()
  const nextStep = useRef<number>()

  useEffect(() => {
    const handleScroll = () => {
      const y = -Math.min(0, rootElement?.getBoundingClientRect().top || 0)

      // Update sticky states
      if (containerBoxRef.current) {
        const boxRect = containerBoxRef.current.getBoundingClientRect()
        setStickyTop(boxRect.top > 0)
        setStickyBottom(boxRect.bottom < windowSize.height)
      }

      // Show step
      const newStep = getStepIndex(y)
      if (newStep !== stepIndex && newStep !== nextStep.current) {
        const time = new Date().getTime()
        const nextTime = Math.max(
          (lastTime.current || 0) + settings.zoom.duration,
          time
        )
        nextStep.current = newStep
        clearTimeout(timeout.current)
        timeout.current = window.setTimeout(() => {
          lastTime.current = new Date().getTime()
          if (stepIndex !== undefined) {
            setToBottom(newStep > stepIndex)
          }
          setStepIndex(newStep)
        }, nextTime - time)
      } else {
        setStepProgression((y % stepHeight) / stepHeight)
      }
    }
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [stepIndex])

  useEffect(() => () => clearTimeout(timeout.current), [])

  return (
    <Box
      ref={containerBoxRef}
      h={`${windowSize.height + (steps.length - 1) * stepHeight}px`}
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
          selectedCircleId={step?.circleId ?? undefined}
          panzoomDisabled
          width={windowSize.width}
          height={windowSize.height}
        />

        <TransitionGroup>
          {step?.text && (
            <Transition key={stepIndex} timeout={textTransitions.duration}>
              {(state) => (
                <Box
                  position="absolute"
                  bottom={5}
                  left={5}
                  right={5}
                  textAlign="center"
                  transitionProperty="opacity,transform"
                  transitionDuration={`${textTransitions.duration}ms`}
                  transitionTimingFunction="ease"
                  style={{
                    marginBottom: `${
                      stepProgressionHeight * stepProgression
                    }px`,
                    ...textTransitions.states[toBottom ? 'toBottom' : 'toTop'][
                      state
                    ],
                  }}
                >
                  <h2 className="color-1 weight-title-h font-title section__title">
                    <chakra.span
                      p={1}
                      bg="white"
                      boxShadow="5px 0 0 white, -5px 0 0 white"
                    >
                      {step.text}
                    </chakra.span>
                  </h2>
                </Box>
              )}
            </Transition>
          )}
        </TransitionGroup>
      </Box>
    </Box>
  )
}

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Demo1 />
    </ChakraProvider>
  </I18nextProvider>,
  rootElement
)
