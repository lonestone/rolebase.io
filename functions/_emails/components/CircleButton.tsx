import { Button } from '@react-email/components'
import React from 'react'
import { circleColor } from '../../_shared/helpers/circleColor'

interface Props {
  name: string
  colorHue: number
  url: string
}

export default function CircleButton({ name, colorHue, url }: Props) {
  return (
    <Button
      href={url}
      className="m-0 text-inherit text-xs font-medium px-2 py-1 rounded-full"
      style={{
        backgroundColor: circleColor('92%', colorHue),
      }}
    >
      {name}
    </Button>
  )
}