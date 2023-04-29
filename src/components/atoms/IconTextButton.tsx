import {
  Button,
  forwardRef,
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

export default forwardRef(function IconTextButton(
  { showText, tooltipPlacement, icon, 'aria-label': label, ...props }: Props,
  ref
) {
  return showText ? (
    <Button ref={ref} leftIcon={icon} {...props}>
      {label}
    </Button>
  ) : (
    <Tooltip label={label} placement={tooltipPlacement || 'top'} hasArrow>
      <IconButton ref={ref} aria-label={label} icon={icon} {...props} />
    </Tooltip>
  )
})
