import { Accordion, Alert, AlertIcon, ExpandedIndex } from '@chakra-ui/react'
import useAddCircleMember from '@hooks/useAddCircleMember'
import useCurrentOrg from '@hooks/useCurrentOrg'
import useOrgMember from '@hooks/useOrgMember'
import { enrichCirclesWithRoles } from '@shared/helpers/enrichCirclesWithRoles'
import { getCircleAndParents } from '@shared/helpers/getCircleAndParents'
import { MemberEntry } from '@shared/model/member'
import { RoleLink } from '@shared/model/role'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus } from 'react-icons/fi'
import { CircleMemberContext } from 'src/contexts/CircleMemberContext'
import MemberRoleItem from './MemberRoleItem'
import CircleSearchButton from './search/entities/circles/CircleSearchButton'

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
  const isMember = useOrgMember()

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
        if (roleA.link === RoleLink.Parent && roleB.link !== RoleLink.Parent) {
          return -1
        }
        if (roleA.link !== RoleLink.Parent && roleB.link === RoleLink.Parent) {
          return 1
        }
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

  // Index of the currently selected circle in list
  const selectedCircleIndex = useMemo(
    () =>
      memberCircles.findIndex(
        (mc) => mc[mc.length - 1].id === selectedCircleId
      ),
    [memberCircles, selectedCircleId]
  )

  // Change URL path when a circle is selected in the accordion
  const handleAccordionChange = useCallback(
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

  // Add member to an existing circle
  const addCircleMember = useAddCircleMember()
  const handleAddCircle = useCallback(
    async (circleId: string) => {
      await addCircleMember(circleId, member.id)
      circleMemberContext?.goTo(circleId, member.id)
    },
    [circles, roles, member]
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
        {memberCircles.map((entries) => (
          <MemberRoleItem
            key={entries[entries.length - 1].id}
            memberId={member.id}
            circlesWithRole={entries}
          />
        ))}
      </Accordion>

      {isMember && (
        <CircleSearchButton
          excludeIds={memberCircles.map((mc) => mc[mc.length - 1].id)}
          size="sm"
          variant="ghost"
          borderRadius="full"
          leftIcon={<FiPlus />}
          onSelect={handleAddCircle}
        >
          {t('MemberRoles.addRole')}
        </CircleSearchButton>
      )}

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
