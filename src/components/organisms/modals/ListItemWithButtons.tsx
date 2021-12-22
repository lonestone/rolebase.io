import { HStack, LinkBox, LinkOverlay, Spacer } from '@chakra-ui/react'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'

interface Props {
  title: string
  buttons: React.ReactNode
  onClick(): void
}

export default function ListItemWithButtons({
  title,
  buttons,
  onClick,
}: Props) {
  return (
    <LinkBox
      px={2}
      py={1}
      display="flex"
      minH="32px"
      alignItems="center"
      role="group"
      _hover={{ background: '#fafafa' }}
    >
      <LinkOverlay to="#" as={ReachLink} onClick={onClick}>
        {title}
      </LinkOverlay>
      <Spacer />
      <HStack spacing={2} opacity={0} _groupHover={{ opacity: 1 }}>
        {buttons}
      </HStack>
    </LinkBox>
  )
}
