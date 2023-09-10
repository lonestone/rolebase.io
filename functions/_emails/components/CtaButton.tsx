import { Button, ButtonProps } from '@react-email/components'
import React from 'react'

export default function CtaButton(props: ButtonProps) {
  return (
    <Button
      pX={20}
      pY={12}
      className="bg-[#faa68c] text-[#29241f] rounded-lg font-semibold no-underline text-center"
      {...props}
    />
  )
}
