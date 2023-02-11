import {
  Accordion,
  Alert,
  AlertIcon,
  Box,
  Flex,
  Heading,
} from '@chakra-ui/react'
import { CircleMemberContext } from '@contexts/CircleMemberContext'
import { MemberFragment } from '@gql'
import useAddCircleMember from '@hooks/useAddCircleMember'
import useCurrentOrg from '@hooks/useCurrentOrg'
import useOrgMember from '@hooks/useOrgMember'
import { getCircleAndParents } from '@shared/helpers/getCircleAndParents'
import { RoleLink } from '@shared/model/role'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus } from 'react-icons/fi'
import CircleSearchButton from '../search/entities/circles/CircleSearchButton'
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
  const isMember = useOrgMember()

  // Get all circles and roles of member
  const memberCircles = useMemo(() => {
    if (!circles) return []
    return circles
      .filter((c) => c.members.some((m) => m.memberId === member.id))
      .map((circle) => getCircleAndParents(circles, circle.id))
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
  }, [member.id, circles])

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
    (index: number | number[]) => {
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
    [circles, member]
  )

  return (
    <Box>
      <Flex mb={2} alignItems="center" justifyContent="space-between">
        <Heading as="h3" size="sm">
          {t('MemberRoles.heading')}
        </Heading>

        {isMember && (
          <CircleSearchButton
            excludeIds={memberCircles.map((mc) => mc[mc.length - 1].id)}
            size="sm"
            variant="outline"
            borderRadius="full"
            leftIcon={<FiPlus />}
            onSelect={handleAddCircle}
          >
            {t('MemberRoles.addRole')}
          </CircleSearchButton>
        )}
      </Flex>

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
            circleAndParents={entries}
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
    </Box>
  )
}
