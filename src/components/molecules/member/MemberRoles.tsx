import { Accordion, Alert, AlertIcon } from '@chakra-ui/react'
import { CircleMemberContext } from '@contexts/CircleMemberContext'
import { MemberFragment } from '@gql'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { RoleLink } from '@shared/model/role'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import MemberRoleItem from './MemberRoleItem'

interface Props {
  member: MemberFragment
  selectedCircleId?: string
}

export default function MemberRoles({ member, selectedCircleId }: Props) {
  const { t } = useTranslation()
  const org = useCurrentOrg()
  const circles = useStoreState((state) => state.org.circles)
  const circleMemberContext = useContext(CircleMemberContext)

  // Get all circles and roles of member
  const memberCircles = useMemo(() => {
    if (!circles) return []
    return circles
      .filter((circle) => circle.members.some((m) => m.member.id === member.id))
      .sort((a, b) => {
        // Put leaders at the top
        if (
          a.role.link === RoleLink.Parent &&
          b.role.link !== RoleLink.Parent
        ) {
          return -1
        }
        if (
          a.role.link !== RoleLink.Parent &&
          b.role.link === RoleLink.Parent
        ) {
          return 1
        }
        // Sort by name
        return a.role.name.localeCompare(b.role.name)
      })
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

  // Index of the currently selected circle in list
  const selectedCircleIndex = useMemo(
    () => memberCircles.findIndex((mc) => mc.id === selectedCircleId),
    [memberCircles, selectedCircleId]
  )

  // Change URL path when a circle is selected in the accordion
  const handleAccordionChange = useCallback(
    (index: number | number[]) => {
      if (typeof index !== 'number') return
      if (index === -1) {
        circleMemberContext?.goTo(undefined, member.id)
      } else {
        const memberCircle = memberCircles[index]
        if (!memberCircle) return
        circleMemberContext?.goTo(memberCircle.id, member.id)
      }
    },
    [selectedCircleIndex, memberCircles]
  )

  return (
    <>
      <Accordion
        index={selectedCircleIndex}
        allowToggle
        mx={-4}
        mb={5}
        onChange={handleAccordionChange}
      >
        {memberCircles.map((circle) => (
          <MemberRoleItem
            key={circle.id}
            memberId={member.id}
            circle={circle}
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
