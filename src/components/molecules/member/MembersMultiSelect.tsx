import CircleMemberLink from '@atoms/CircleMemberLink'
import MemberButton from '@atoms/MemberButton'
import { BoxProps, ButtonGroup, IconButton, VStack } from '@chakra-ui/react'
import { MemberFragment } from '@gql'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus, FiX } from 'react-icons/fi'
import MemberSearchButton from '../search/entities/members/MemberSearchButton'

interface Props extends BoxProps {
  circleId?: string // Used for member link
  membersIds: string[]
  excludeMembersIds?: string[]
  max?: number
  onAdd?(memberId: string): void
  onRemove?(memberId: string): void
}

export default function MembersMultiSelect({
  circleId,
  membersIds,
  excludeMembersIds,
  max,
  onAdd,
  onRemove,
  ...boxProps
}: Props) {
  const { t } = useTranslation()
  const members = useStoreState((state) => state.org.members)
  const excludeMembersIdsMemo = useMemo(
    () =>
      excludeMembersIds ? membersIds.concat(excludeMembersIds) : membersIds,
    [membersIds, excludeMembersIds]
  )

  // Get selected members
  const selectedMembers = useMemo(
    () =>
      membersIds
        .map((id) => members?.find((m) => m.id === id))
        .filter(Boolean) as MemberFragment[],
    [membersIds, members]
  )

  return (
    <VStack spacing={2} alignItems="start" {...boxProps}>
      {selectedMembers.map((m, i) => (
        <CircleMemberLink
          key={m.id}
          className={`userflow-member-${i}`}
          memberId={m.id}
          circleId={circleId}
          tabIndex={-1}
        >
          <ButtonGroup variant="ghost" size="sm" isAttached>
            <MemberButton member={m} pr={1} />
            {onRemove && (
              <IconButton
                aria-label={t('common.remove')}
                icon={<FiX />}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onRemove(m.id)
                }}
              />
            )}
          </ButtonGroup>
        </CircleMemberLink>
      ))}

      {onAdd && (!max || selectedMembers.length < max) ? (
        <MemberSearchButton
          excludeIds={excludeMembersIdsMemo}
          className="userflow-add-member-btn"
          size="sm"
          variant="outline"
          leftIcon={<FiPlus />}
          onSelect={onAdd}
        >
          {max === 1
            ? t(`MembersMultiSelect.choose`)
            : t(`MembersMultiSelect.add`)}
        </MemberSearchButton>
      ) : null}
    </VStack>
  )
}
