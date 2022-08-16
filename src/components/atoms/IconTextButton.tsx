import {
  Button,
  IconButton,
  IconButtonProps,
  PlacementWithLogical,
  Tooltip,
} from '@chakra-ui/react'
import React from 'react'

interface Props extends IconButtonProps {
  showText?: boolean
  tooltipPlacement?: PlacementWithLogical | undefined
}

export default function IconTextButton({
  showText,
  tooltipPlacement,
  icon,
  'aria-label': label,
  ...props
}: Props) {
  return showText ? (
    <Button leftIcon={icon} colorScheme="blue" {...props}>
      {label}
    </Button>
  ) : (
    <Tooltip label={label} placement={tooltipPlacement || 'top'} hasArrow>
      <IconButton aria-label={label} icon={icon} {...props} />
    </Tooltip>
  )
}
