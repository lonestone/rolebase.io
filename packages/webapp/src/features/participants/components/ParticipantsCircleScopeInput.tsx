import CircleByIdButton from '@/circle/components/CircleByIdButton'
import CircleMemberLink from '@/circle/components/CircleMemberLink'
import MemberButton from '@/member/components/MemberButton'
import {
  Box,
  ButtonGroup,
  Checkbox,
  Flex,
  IconButton,
  Spacer,
  VStack,
} from '@chakra-ui/react'
import { ParticipantsCircleScope } from '@shared/model/participants'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus, FiX } from 'react-icons/fi'
import useCircleParticipants from '../hooks/useCircleParticipants'

interface Props {
  circleScope: ParticipantsCircleScope
  onRemove(): void
  onToggleChildren(): void
  onToggleMember(memberId: string): void
}

export default function ParticipantsCircleScopeInput({
  circleScope,
  onRemove,
  onToggleChildren,
  onToggleMember,
}: Props) {
  const { t } = useTranslation()

  const participants = useCircleParticipants(
    circleScope.id,
    circleScope.children
  )

  const sortedParticipants = useMemo(
    () =>
      participants.sort((a, b) => a.member.name.localeCompare(b.member.name)),
    [participants]
  )

  return (
    <Box w="100%">
      <Flex w="100%">
        <CircleByIdButton id={circleScope.id} />
        <IconButton
          aria-label={t('common.remove')}
          icon={<FiX />}
          variant="ghost"
          size="sm"
          onClick={onRemove}
        />
        <Spacer />
        <Checkbox
          size="sm"
          color="gray.500"
          ml={2}
          isChecked={circleScope.children}
          onChange={onToggleChildren}
        >
          {t('ParticipantScopeInput.includeChildren')}
        </Checkbox>
      </Flex>

      <VStack
        alignItems="start"
        ml={5}
        pl={3}
        pt={2}
        borderLeftWidth="2px"
        borderBottomLeftRadius="10px"
        borderColor="gray.100"
        _dark={{ borderColor: 'whiteAlpha.400' }}
      >
        {sortedParticipants.length === 0 ? (
          <Flex color="gray.500" fontSize="sm" fontStyle="italic">
            {t('ParticipantScopeInput.noParticipant')}
          </Flex>
        ) : (
          sortedParticipants.map((p) => {
            const isExcluded = circleScope.excludeMembers.includes(p.member.id)
            return (
              <CircleMemberLink
                key={p.member.id}
                memberId={p.member.id}
                circleId={p.circlesIds[0]}
                tabIndex={-1}
              >
                <ButtonGroup variant="ghost" size="sm" isAttached>
                  <MemberButton
                    member={p.member}
                    pr={1}
                    opacity={isExcluded ? 0.3 : undefined}
                  />
                  <IconButton
                    aria-label={
                      isExcluded ? t('common.add') : t('common.remove')
                    }
                    icon={isExcluded ? <FiPlus /> : <FiX />}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      onToggleMember(p.member.id)
                    }}
                  />
                </ButtonGroup>
              </CircleMemberLink>
            )
          })
        )}
      </VStack>
    </Box>
  )
}
