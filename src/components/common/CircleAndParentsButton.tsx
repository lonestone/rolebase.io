import { ChevronRightIcon } from '@chakra-ui/icons'
import { Button, StackItem } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import useCircleAndParents from '../../hooks/useCircleAndParents'
import { useNavigateOrg } from '../../hooks/useNavigateOrg'

interface Props {
  id: string
}

export default function CircleAndParentsButton({ id }: Props) {
  const circleAndParents = useCircleAndParents(id)
  const circle = circleAndParents?.[circleAndParents.length - 1]

  // Go to circle panel
  const navigateOrg = useNavigateOrg()
  const navigateToCircle = useCallback((circleId: string) => {
    navigateOrg(`?circleId=${circleId}`)
  }, [])
  if (!circle) return null

  return (
    <StackItem maxW="80%" style={{ textIndent: '-1em', marginLeft: '0.4em' }}>
      {circleAndParents?.map((c, i) => {
        const last = i === circleAndParents.length - 1
        const prevLast = i === circleAndParents.length - 2
        return (
          <>
            {last && <br />}
            <span key={c.id}>
              <Button
                variant={last ? 'solid' : 'ghost'}
                size={last ? 'md' : 'sm'}
                borderRadius="full"
                fontWeight={last ? 600 : 400}
                ml={last ? '0.3em' : 0}
                onClick={() => navigateToCircle(c.id)}
              >
                {c.role?.name || '?'}
              </Button>
              {!last && !prevLast && <ChevronRightIcon margin="0 -0.3em" />}
            </span>
          </>
        )
      }) || null}
    </StackItem>
  )
}
