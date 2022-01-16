import { Accordion, ExpandedIndex } from '@chakra-ui/react'
import { enrichCirclesWithRoles } from '@shared/helpers/enrichCirclesWithRoles'
import { getCircleAndParents } from '@shared/helpers/getCircleAndParents'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useContext, useMemo } from 'react'
import { CircleMemberContext } from 'src/contexts/CircleMemberContext'
import MemberRoleItem from './MemberRoleItem'

interface Props {
  memberId: string
  selectedCircleId?: string
}

export default function MemberRoles({ memberId, selectedCircleId }: Props) {
  const roles = useStoreState((state) => state.roles.entries)
  const circles = useStoreState((state) => state.circles.entries)
  const circleMemberContext = useContext(CircleMemberContext)

  // Get all circles and roles of member
  const memberCircles = useMemo(() => {
    if (!roles || !circles) return []
    return (
      circles
        .filter((c) => c.members.some((m) => m.memberId === memberId))
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
  }, [memberId, roles, circles])

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
        circleMemberContext?.goTo(undefined, memberId)
      } else {
        const memberCircle = memberCircles[index]
        if (!memberCircle) return
        const circle = memberCircle[memberCircle.length - 1]
        circleMemberContext?.goTo(circle.id, memberId)
      }
    },
    [selectedCircleIndex, memberCircles]
  )

  return (
    <>
      {memberCircles.length === 0 ? (
        <i>Aucun</i>
      ) : (
        <Accordion
          index={selectedCircleIndex}
          onChange={handleAccordeonChange}
          allowToggle
        >
          {memberCircles.map((entries) => {
            const circle = entries[entries.length - 1]
            return (
              <MemberRoleItem
                key={circle.id}
                memberId={memberId}
                circlesWithRole={entries}
              />
            )
          })}
        </Accordion>
      )}
    </>
  )
}
