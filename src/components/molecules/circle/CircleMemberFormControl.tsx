import { FormControl, FormLabel, useDisclosure } from '@chakra-ui/react'
import { GraphZoomContext } from '@contexts/GraphZoomContext'
import { MemberFragment } from '@gql'
import useAddCircleMember from '@hooks/useAddCircleMember'
import useCircleAndParents from '@hooks/useCircleAndParents'
import useOrgMember from '@hooks/useOrgMember'
import CircleMemberDeleteModal from '@organisms/circle/CircleMemberDeleteModal'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useContext, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import MembersMultiSelect from '../member/MembersMultiSelect'

interface Props {
  circleId: string
}

export default function CircleMemberFormControl({ circleId }: Props) {
  const { t } = useTranslation()
  const isMember = useOrgMember()
  const zoomContext = useContext(GraphZoomContext)
  const circleAndParents = useCircleAndParents(circleId)
  const members = useStoreState((state) => state.org.members)
  const circle = circleAndParents?.[circleAndParents.length - 1]
  const role = circle?.role

  const membersIds = useMemo(
    () =>
      // Retrieve members
      (
        circle?.members
          .map((cm) => members?.find((m) => m.id === cm.member.id))
          .filter(Boolean) as MemberFragment[] | undefined
      )
        // Sort by name
        ?.sort((a, b) => a.name.localeCompare(b.name))
        // Keep ids
        .map((m) => m.id),
    [circle, members]
  )

  const addCircleMember = useAddCircleMember()
  const handleAddMember = useCallback(
    async (memberId: string) => {
      await addCircleMember(circleId, memberId)
      // Focus circle in graph
      zoomContext?.zoom?.focusCircleAfterDraw?.(circleId, true)
    },
    [circleId, circle]
  )

  const handleRemoveMember = useCallback((memberId: string) => {
    setMemberId(memberId)
    onDeleteOpen()
  }, [])

  // CircleMemberDeleteModal
  const [memberId, setMemberId] = useState<string | undefined>()
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  return (
    <FormControl>
      <FormLabel>
        {role?.singleMember
          ? t('CircleMemberFormControl.labelSingleMember')
          : t('CircleMemberFormControl.labelMultiMembers')}
      </FormLabel>

      {circle && membersIds && (
        <MembersMultiSelect
          circleId={circleId}
          membersIds={membersIds}
          max={role?.singleMember ? 1 : undefined}
          onAdd={isMember ? handleAddMember : undefined}
          onRemove={isMember ? handleRemoveMember : undefined}
        />
      )}

      {isDeleteOpen && memberId && (
        <CircleMemberDeleteModal
          memberId={memberId}
          circleId={circleId}
          isOpen
          onClose={onDeleteClose}
        />
      )}
    </FormControl>
  )
}
