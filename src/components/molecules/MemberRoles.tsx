import { Accordion, ExpandedIndex } from '@chakra-ui/react'
import { enrichCirclesWithRoles } from '@shared/helpers/enrichCirclesWithRoles'
import { getCircleAndParents } from '@shared/helpers/getCircleAndParents'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useMemo } from 'react'
import MemberRoleItem from './MemberRoleItem'

interface Props {
  memberId: string
  selectedCircleId?: string
  onCircleChange?(circleId: string | undefined): void
}

export default function MemberRoles({
  memberId,
  selectedCircleId,
  onCircleChange,
}: Props) {
  const roles = useStoreState((state) => state.roles.entries)
  const circles = useStoreState((state) => state.circles.entries)

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
        onCircleChange?.(undefined)
      } else {
        const memberCircle = memberCircles[index]
        if (!memberCircle) return
        const circle = memberCircle[memberCircle.length - 1]
        onCircleChange?.(circle.id)
      }
    },
    [selectedCircleIndex, memberCircles, onCircleChange]
  )

  return (
    <>
      {memberCircles.length === 0 ? (
        <p>
          <em>Aucun</em>
        </p>
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
