import {
  Box,
  BoxProps,
  keyframes,
  usePrefersReducedMotion,
} from '@chakra-ui/react'

interface Props extends BoxProps {
  active: boolean
}

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
	40% {transform: translateY(-6px);}
	60% {transform: translateY(-3px);}
`

export default function BounceAnimation({ active, ...boxProps }: Props) {
  const prefersReducedMotion = usePrefersReducedMotion()

  const animation =
    active && !prefersReducedMotion ? `${bounce} infinite 2s ease` : undefined

  return <Box animation={animation} {...boxProps} />
}
