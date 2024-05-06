import { Button, ButtonProps, Tooltip } from '@chakra-ui/react'
import React from 'react'

interface Props extends ButtonProps {
  tooltip?: string
}

export default function ReactionButton({ tooltip, ...props }: Props) {
  return (
    <>
      <Tooltip label={tooltip} placement="top" hasArrow openDelay={300}>
        <Button
          size="sm"
          borderRadius="full"
          variant="outline"
          px={2}
          h={7}
          _active={{
            bg: 'blue.50',
            borderColor: 'blue.400',
            _hover: { bg: 'blue.100' },
          }}
          _disabled={{
            opacity: 1,
          }}
          _dark={{
            _active: {
              bg: 'blue.800',
              borderColor: 'blue.600',
              _hover: { bg: 'blue.700' },
            },
          }}
          {...props}
        >
          {props.children}
        </Button>
      </Tooltip>
    </>
  )
}
