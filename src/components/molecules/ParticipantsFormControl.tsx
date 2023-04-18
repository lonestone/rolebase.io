import ParticipantsScopeSelect from '@atoms/ParticipantsScopeSelect'
import { Box, FormControl, FormLabel } from '@chakra-ui/react'
import { Member_Scope_Enum } from '@gql'
import useParticipants from '@hooks/useParticipants'
import ParticipantsNumber from '@molecules/ParticipantsNumber'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import MembersMultiSelect from './member/MembersMultiSelect'

interface Values {
  circleId: string
  participantsScope: Member_Scope_Enum
  participantsMembersIds: Array<{ memberId: string }>
}

export default function ParticipantsFormControl() {
  const { t } = useTranslation()
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
          {t('MeetingEditModal.invite')}
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
      </FormControl>
    </>
  )
}
