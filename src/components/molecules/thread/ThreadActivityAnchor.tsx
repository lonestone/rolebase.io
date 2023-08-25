import { Box } from '@chakra-ui/react'
import React from 'react'

interface Props {
  activityId: string
}

// Anchor for links and scroll
export default function ThreadActivityAnchor({ activityId }: Props) {
  return <Box id={`activity-${activityId}`} transform="translateY(-100px)" />
}
