import { Box, ModalCloseButton } from '@chakra-ui/react'
import { CircleContext } from '@contexts/CIrcleContext'
import CircleAndParentsLinks from '@molecules/circle/CircleAndParentsLinks'
import CircleRole from '@molecules/circle/CircleRole'
import React, { useContext } from 'react'

interface Props {
  id: string
}

export default function CircleCard({ id }: Props) {
  const circleContext = useContext(CircleContext)
  if (!circleContext) return null

  const { circle } = circleContext

  return (
    <Box p={5}>
      <ModalCloseButton />
      <CircleAndParentsLinks circle={circle} size="md" mb={5} />
      <CircleRole skipFetchRole />
    </Box>
  )
}
