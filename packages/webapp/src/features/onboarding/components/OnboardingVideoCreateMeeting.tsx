import { AspectRatio, StyleProps } from '@chakra-ui/react'
import React from 'react'

export default function OnboardingVideoCreateMeeting(styleProps: StyleProps) {
  return (
    <AspectRatio ratio={16 / 9} {...styleProps}>
      <iframe
        src="https://www.tella.tv/video/cmg6cu7of00350bl48k57cpu8/embed?b=0&title=1&a=1&loop=0&t=0&muted=0&wt=0"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
      />
    </AspectRatio>
  )
}
