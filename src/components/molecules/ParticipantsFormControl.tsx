import ParticipantsScopeSelect from '@atoms/ParticipantsScopeSelect'
import { Alert, Box, Button, FormControl, FormLabel } from '@chakra-ui/react'
import { Member_Scope_Enum } from '@gql'
import useCurrentMember from '@hooks/useCurrentMember'
import useParticipants from '@hooks/useParticipants'
import ParticipantsNumber from '@molecules/ParticipantsNumber'
import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FiPlus } from 'react-icons/fi'
import MembersMultiSelect from './member/MembersMultiSelect'

interface Values {
  circleId: string
  participantsScope: Member_Scope_Enum
  participantsMembersIds: Array<{ memberId: string }>
}

export default function ParticipantsFormControl() {
  const { t } = useTranslation()
  const currentMember = useCurrentMember()
  const { register, watch, control } = useFormContext<Values>()

  // Participants members ids
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'participantsMembersIds',
  })
  const participantsMembersIds = fields.map((field) => field.memberId)

  const circleId = watch('circleId')
  const participantsScope = watch('participantsScope')

  // Participants
  const participants = useParticipants(
    circleId,
    participantsScope,
    participantsMembersIds
  )

  return (
    <>
      <FormControl isInvalid={(circleId && participants.length === 0) || false}>
        <FormLabel display="flex" alignItems="center">
          {t('ParticipantsFormControl.invite')}
          <ParticipantsNumber ml={2} participants={participants} />
        </FormLabel>
        <ParticipantsScopeSelect {...register('participantsScope')} />

        <Box mt={2}>
          <MembersMultiSelect
            membersIds={participantsMembersIds}
            excludeMembersIds={participants.map((p) => p.member.id)}
            onAdd={(id) => append({ memberId: id })}
            onRemove={(id) =>
              remove(fields.findIndex((field) => field.memberId === id))
            }
          />
        </Box>

        {circleId &&
          currentMember &&
          !participants.some((p) => p.member.id === currentMember.id) && (
            <Alert status="warning" mt={2}>
              {t('ParticipantsFormControl.inviteWarning')}
              <Button
                variant="solid"
                colorScheme="yellow"
                leftIcon={<FiPlus />}
                ml={5}
                onClick={() => append({ memberId: currentMember.id })}
              >
                {t('ParticipantsFormControl.inviteButton')}
              </Button>
            </Alert>
          )}
      </FormControl>
    </>
  )
}
