import {
  Accordion,
  Alert,
  AlertIcon,
  ExpandedIndex,
  Text,
} from '@chakra-ui/react'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { enrichCirclesWithRoles } from '@shared/helpers/enrichCirclesWithRoles'
import { getCircleAndParents } from '@shared/helpers/getCircleAndParents'
import { MemberEntry } from '@shared/model/member'
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
    return circles
      .filter((c) => c.members.some((m) => m.memberId === member.id))
      .map((circle) =>
        enrichCirclesWithRoles(getCircleAndParents(circles, circle.id), roles)
      )
      .sort((a, b) => {
        const roleA = a[a.length - 1].role
        const roleB = b[b.length - 1].role
        // Put leaders at the top
        if (roleA.link === true && roleB.link !== true) return -1
        if (roleA.link !== true && roleB.link === true) return 1
        // Sort by name
        return roleA.name.localeCompare(roleB.name)
      })
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
    return <Text fontStyle="italic">{t(`MemberRoles.emptyRoles`)}</Text>
  }
  return (
    <>
      <Accordion
        index={selectedCircleIndex}
        allowToggle
        mx={-4}
        onChange={handleAccordeonChange}
      >
        {memberCircles.map((entries) => (
          <MemberRoleItem
            key={entries[entries.length - 1].id}
            memberId={member.id}
            circlesWithRole={entries}
          />
        ))}
      </Accordion>

      <Alert status="info" mt={5}>
        <AlertIcon />
        {t(`MemberRoles.totalAllocatedTime`)}{' '}
        {Math.floor(totalWorkedMin / 6) / 10}h /{' '}
        {Math.floor(maxWorkedMin / 6) / 10}h
      </Alert>

      {totalWorkedMin > maxWorkedMin && (
        <Alert status="warning" mt={2}>
          <AlertIcon />
          {t(`MemberRoles.alertTooMuchTime`)}
        </Alert>
      )}
    </>
  )
}
