import { CircleMemberContext } from '@/circle/contexts/CircleMemberContext'
import {
  Accordion,
  Alert,
  AlertDescription,
  AlertIcon,
  BoxProps,
  Text,
} from '@chakra-ui/react'
import { MemberFragment } from '@gql'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import useCurrentMember from '../hooks/useCurrentMember'
import useOrgOwner from '../hooks/useOrgOwner'
import MemberRoleItem from './MemberRoleItem'

interface Props extends BoxProps {
  member: MemberFragment
  selectedCircleId?: string
}

export default function MemberRoles({
  member,
  selectedCircleId,
  ...boxProps
}: Props) {
  const { t } = useTranslation()
  const circles = useStoreState((state) => state.org.circles)
  const circleMemberContext = useContext(CircleMemberContext)
  const currentMember = useCurrentMember()
  const isCurrentMember = currentMember?.id === member.id
  const isOwner = useOrgOwner()

  // Get all circles and roles of member
  const memberCircles = useMemo(() => {
    if (!circles) return []
    return circles
      .filter((circle) => circle.members.some((m) => m.member.id === member.id))
      .sort((a, b) => {
        // Put leaders at the top
        if (a.role.parentLink && !b.role.parentLink) {
          return -1
        }
        if (!a.role.parentLink && b.role.parentLink) {
          return 1
        }
        // Sort by name
        return a.role.name.localeCompare(b.role.name)
      })
  }, [member.id, circles])

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
      {memberCircles.length === 0 &&
        (isCurrentMember ? (
          <Alert status="warning">
            <AlertIcon />
            <AlertDescription>
              <Text>{t('MemberRoles.emptyCurrentMember.noRole')}</Text>
              {isOwner && (
                <Text>{t('MemberRoles.emptyCurrentMember.canEdit')}</Text>
              )}
            </AlertDescription>
          </Alert>
        ) : (
          <Alert status="warning">
            <AlertIcon />
            <AlertDescription>
              <Text>
                {t('MemberRoles.empty.noRole', { name: member.name })}
              </Text>
              {isOwner && <Text>{t('MemberRoles.empty.canEdit')}</Text>}
            </AlertDescription>
          </Alert>
        ))}

      <Accordion
        index={selectedCircleIndex}
        allowToggle
        {...boxProps}
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
    </>
  )
}
