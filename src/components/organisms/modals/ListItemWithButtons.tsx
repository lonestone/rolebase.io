import { HStack, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
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
  const hover = useHoverItemStyle()

  return (
    <LinkBox
      px={2}
      py={1}
      display="flex"
      minH="32px"
      alignItems="center"
      role="group"
      _hover={hover}
    >
      <LinkOverlay
        flex={1}
        to="#"
        as={ReachLink}
        onClick={(event) => {
          event.preventDefault()
          onClick()
        }}
      >
        {title}
      </LinkOverlay>
      <HStack spacing={2}>{buttons}</HStack>
    </LinkBox>
  )
}
