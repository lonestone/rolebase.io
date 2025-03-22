import useCurrentOrg from '@/org/hooks/useCurrentOrg'
import { Alert, AlertIcon, Box, BoxProps } from '@chakra-ui/react'
import { MemberFragment } from '@gql'
import { useStoreState } from '@store/hooks'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

interface Props extends BoxProps {
  member: MemberFragment
}

export default function MemberWorkingTime({ member, ...boxProps }: Props) {
  const { t } = useTranslation()
  const org = useCurrentOrg()
  const circles = useStoreState((state) => state.org.circles)

  // Get all circles and roles of member
  const memberCircles = useMemo(() => {
    if (!circles) return []
    return circles.filter((circle) =>
      circle.members.some((m) => m.member.id === member.id)
    )
  }, [member.id, circles])

  // Compute total number of allocated hours
  const totalWorkedMin = useMemo(
    () =>
      memberCircles.reduce((total, circle) => {
        const circleMember = circle.members.find(
          (m) => m.member.id === member.id
        )
        return total + (circleMember?.avgMinPerWeek || 0)
      }, 0),
    [memberCircles]
  )
  const maxWorkedMin =
    member.workedMinPerWeek || org?.defaultWorkedMinPerWeek || 0

  // If no working time is allocated, don't show anything
  if (totalWorkedMin === 0) return null

  return (
    <Box {...boxProps}>
      <Alert status="info">
        <AlertIcon />
        {t(`MemberWorkingTime.totalAllocatedTime`)}{' '}
        {Math.floor(totalWorkedMin / 6) / 10}h /{' '}
        {Math.floor(maxWorkedMin / 6) / 10}h
      </Alert>

      {totalWorkedMin > maxWorkedMin && (
        <Alert status="warning" mt={2}>
          <AlertIcon />
          {t(`MemberWorkingTime.alertTooMuchTime`)}
        </Alert>
      )}
    </Box>
  )
}
