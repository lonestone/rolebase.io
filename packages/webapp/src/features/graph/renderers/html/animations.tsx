import { keyframes } from '@chakra-ui/react'

export const enterKeyframes = keyframes`
  0% { transform: scale(0); }
	100% { transform: scale(1);}
`

export const leaveKeyframes = keyframes`
  0% { transform: scale(1); }
	100% { transform: scale(0);}
`

const cubicInOut = 'cubic-bezier(0.645, 0.045, 0.355, 1)'

export const enterAnimation = `${enterKeyframes} 0.2s ${cubicInOut}`
export const leaveAnimation = `${leaveKeyframes} 0.2s ${cubicInOut}`
