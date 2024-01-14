import { Collapse } from '@chakra-ui/react'
import React, { PropsWithChildren, useLayoutEffect, useState } from 'react'

export default function ExpandAtMount({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false)

  useLayoutEffect(() => {
    setTimeout(() => setMounted(true), 10)
  }, [])

  return (
    <Collapse in={mounted} animateOpacity>
      {children}
    </Collapse>
  )
}
