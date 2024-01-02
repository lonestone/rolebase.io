import { BoxProps, ButtonGroup } from '@chakra-ui/react'
import CircleSearchButton from '@molecules/search/entities/circles/CircleSearchButton'
import CircleSearchInput from '@molecules/search/entities/circles/CircleSearchInput'
import MemberSearchButton from '@molecules/search/entities/members/MemberSearchButton'
import MemberSearchInput from '@molecules/search/entities/members/MemberSearchInput'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDownIcon } from 'src/icons'

interface Props extends BoxProps {
  circleId: string | undefined
  memberId: string | undefined
  onCircleChange?(circleId: string | undefined): void
  onMemberChange?(memberId: string | undefined): void
}

export default function CircleAndMemberFilters({
  circleId,
  memberId,
  onCircleChange,
  onMemberChange,
  children,
  ...boxProps
}: Props) {
  const { t } = useTranslation()

  return (
    <ButtonGroup size="sm" variant="outline" spacing={2} {...boxProps}>
      {onCircleChange &&
        (circleId ? (
          <CircleSearchInput
            value={circleId}
            placeholder={t('CircleAndMemberFilters.circle')}
            maxW="170px"
            className="userflow-filter-role"
            onChange={onCircleChange}
            onClear={() => onCircleChange(undefined)}
          />
        ) : (
          <CircleSearchButton
            rightIcon={<ChevronDownIcon size="1em" />}
            fontWeight="normal"
            className="userflow-filter-role"
            onSelect={onCircleChange}
          >
            {t('CircleAndMemberFilters.circle')}
          </CircleSearchButton>
        ))}

      {onMemberChange &&
        (memberId ? (
          <MemberSearchInput
            value={memberId}
            placeholder={t('CircleAndMemberFilters.member')}
            maxW="170px"
            className="userflow-filter-member"
            onChange={onMemberChange}
            onClear={() => onMemberChange(undefined)}
          />
        ) : (
          <MemberSearchButton
            rightIcon={<ChevronDownIcon size="1em" />}
            fontWeight="normal"
            className="userflow-filter-member"
            onSelect={onMemberChange}
          >
            {t('CircleAndMemberFilters.member')}
          </MemberSearchButton>
        ))}

      {children}
    </ButtonGroup>
  )
}
