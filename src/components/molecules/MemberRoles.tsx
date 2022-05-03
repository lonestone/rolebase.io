import { Accordion, Alert, AlertIcon, ExpandedIndex } from '@chakra-ui/react'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { enrichCirclesWithRoles } from '@shared/helpers/enrichCirclesWithRoles'
import { getCircleAndParents } from '@shared/helpers/getCircleAndParents'
import { MemberEntry } from '@shared/member'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { CircleMemberContext } from 'src/contexts/CircleMemberContext'
import MemberRoleItem from './MemberRoleItem'

interface Props {
  member: MemberEntry
  selectedCircleId?: string
}

export default function MemberRoles({ member, selectedCircleId }: Props) {
  const { t } = useTranslation()
  const org = useCurrentOrg()
  const roles = useStoreState((state) => state.roles.entries)
  const circles = useStoreState((state) => state.circles.entries)
  const circleMemberContext = useContext(CircleMemberContext)

  // Get all circles and roles of member
  const memberCircles = useMemo(() => {
    if (!roles || !circles) return []
    return (
      circles
        .filter((c) => c.members.some((m) => m.memberId === member.id))
        .map((circle) =>
          enrichCirclesWithRoles(getCircleAndParents(circles, circle.id), roles)
        )
        // Sort by circle ids path
        .sort((a, b) =>
          a.reduce((str, c) => str + c.id, '') <
          b.reduce((str, c) => str + c.id, '')
            ? -1
            : 1
        )
    )
  }, [member.id, roles, circles])

  // Compute total number of allocated hours
  const totalWorkedMin = useMemo(
    () =>
      memberCircles.reduce((total, circleWithRoles) => {
        const circle = circleWithRoles[circleWithRoles.length - 1]
        const circleMember = circle.members.find(
          (m) => m.memberId === member.id
        )
        return total + (circleMember?.avgMinPerWeek || 0)
      }, 0),
    [memberCircles]
  )
  const maxWorkedMin =
    member.workedMinPerWeek || org?.defaultWorkedMinPerWeek || 0

  const selectedCircleIndex = useMemo(
    () =>
      memberCircles.findIndex(
        (mc) => mc[mc.length - 1].id === selectedCircleId
      ),
    [memberCircles, selectedCircleId]
  )

  const handleAccordeonChange = useCallback(
    (index: ExpandedIndex) => {
      if (typeof index !== 'number') return
      if (index === -1) {
        circleMemberContext?.goTo(undefined, member.id)
      } else {
        const memberCircle = memberCircles[index]
        if (!memberCircle) return
        const circle = memberCircle[memberCircle.length - 1]
        circleMemberContext?.goTo(circle.id, member.id)
      }
    },
    [selectedCircleIndex, memberCircles]
  )

  if (memberCircles.length === 0) {
    return <i>{t(`molecules.MemberRoles.emptyRoles`)}</i>
  }
  return (
    <>
      <Accordion
        index={selectedCircleIndex}
        allowToggle
        mx={-4}
        onChange={handleAccordeonChange}
      >
        {memberCircles.map((entries) => {
          const circle = entries[entries.length - 1]
          return (
            <MemberRoleItem
              key={circle.id}
              memberId={member.id}
              circlesWithRole={entries}
            />
          )
        })}
      </Accordion>

      <Alert status="info" mt={5}>
        <AlertIcon />
        {t(`molecules.MemberRoles.totalAllocatedTime`)}{' '}
        {Math.floor(totalWorkedMin / 6) / 10}h /{' '}
        {Math.floor(maxWorkedMin / 6) / 10}h
      </Alert>

      {totalWorkedMin > maxWorkedMin && (
        <Alert status="warning" mt={2}>
          <AlertIcon />
          {t(`molecules.MemberRoles.alertTooMuchTime`)}
        </Alert>
      )}
    </>
  )
}
