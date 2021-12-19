import { Button, ButtonProps } from '@chakra-ui/react'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import { CircleWithRoleEntry } from '@shared/circle'
import React, { useCallback } from 'react'

interface Props extends ButtonProps {
  circle: CircleWithRoleEntry
}

export default function CircleButton({ circle, ...buttonProps }: Props) {
  // Go to circle panel
  const navigateOrg = useNavigateOrg()
  const navigateToCircle = useCallback((circleId: string) => {
    navigateOrg(`?circleId=${circleId}`)
  }, [])

  return (
    <Button
      size="sm"
      borderRadius="full"
      onClick={() => navigateToCircle(circle.id)}
      {...buttonProps}
    >
      {circle.role?.name || '?'}
    </Button>
  )
}
