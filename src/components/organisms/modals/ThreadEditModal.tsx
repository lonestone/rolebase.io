import { createThread, updateThread } from '@api/entities/threads'
import { nameSchema } from '@api/schemas'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  UseModalProps,
  VStack,
} from '@chakra-ui/react'
import ParticipantsNumber from '@components/atoms/ParticipantsNumber'
import ParticipantsScopeSelect from '@components/atoms/ParticipantsScopeSelect'
import MembersMultiSelect from '@components/molecules/MembersMultiSelect'
import CircleSearchInput from '@components/molecules/search/entities/circles/CircleSearchInput'
import { yupResolver } from '@hookform/resolvers/yup'
import useCurrentMember from '@hooks/useCurrentMember'
import useItemsArray from '@hooks/useItemsArray'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import { useOrgId } from '@hooks/useOrgId'
import useParticipants from '@hooks/useParticipants'
import { MembersScope } from '@shared/model/member'
import { ThreadEntry } from '@shared/model/thread'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

interface Props extends UseModalProps {
  defaultCircleId?: string
  thread?: ThreadEntry
}

interface Values {
  title: string
  circleId: string
  participantsScope: MembersScope
  archived: boolean
}

const resolver = yupResolver(
  yup.object().shape({
    title: nameSchema,
    circleId: yup.string().required(),
    archived: yup.boolean(),
  })
)

export default function ThreadEditModal({
  defaultCircleId,
  thread,
  ...modalProps
}: Props) {
  const { t } = useTranslation()
  const navigateOrg = useNavigateOrg()
  const orgId = useOrgId()
  const currentMember = useCurrentMember()

  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = useForm<Values>({
    resolver,
    defaultValues: thread
      ? {
          title: thread.title,
          circleId: thread.circleId,
          participantsScope: thread.participantsScope,
          archived: thread.archived,
        }
      : {
          title: '',
          circleId: defaultCircleId || '',
          participantsScope: MembersScope.CircleLeaders,
          archived: false,
        },
  })

  const circleId = watch('circleId')
  const participantsScope = watch('participantsScope')

  // Participants members ids
  const {
    items: participantsMembersIds,
    add: addParticipant,
    remove: removeParticipant,
  } = useItemsArray<string>(thread ? thread.participantsMembersIds : [])

  const onSubmit = handleSubmit(async (values) => {
    if (!orgId || !currentMember) return
    const threadUpdate = {
      ...values,
      participantsMembersIds,
    }
    if (thread) {
      // Update thread
      await updateThread(thread.id, threadUpdate)
    } else {
      // Create thread
      const thread = await createThread({
        orgId,
        initiatorMemberId: currentMember.id,
        ...threadUpdate,
      })
      // Go to thread page
      navigateOrg(`/threads/${thread.id}`)
    }
    modalProps.onClose()
  })

  // Participants
  const participants = useParticipants(
    circleId,
    participantsScope,
    participantsMembersIds
  )

  return (
    <Modal size="xl" {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>
            {t(
              thread
                ? 'organisms.modals.ThreadEditModal.headingEdit'
                : 'organisms.modals.ThreadEditModal.headingCreate'
            )}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={5} align="stretch">
              <FormControl isInvalid={!!errors.title}>
                <FormLabel>
                  {t('organisms.modals.ThreadEditModal.title')}
                </FormLabel>
                <Input
                  {...register('title')}
                  placeholder={t(
                    'organisms.modals.ThreadEditModal.titlePlaceholder'
                  )}
                  autoFocus
                />
              </FormControl>

              <FormControl isInvalid={!!errors.circleId}>
                <FormLabel>
                  {t('organisms.modals.ThreadEditModal.circle')}
                </FormLabel>
                <Controller
                  name="circleId"
                  control={control}
                  render={({ field }) => (
                    <CircleSearchInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </FormControl>

              <FormControl
                isInvalid={(circleId && participants.length === 0) || false}
              >
                <FormLabel display="flex" alignItems="center">
                  {t('organisms.modals.ThreadEditModal.invite')}
                  <ParticipantsNumber ml={2} participants={participants} />
                </FormLabel>
                <ParticipantsScopeSelect {...register('participantsScope')} />

                <Box mt={2}>
                  <MembersMultiSelect
                    membersIds={participantsMembersIds}
                    excludeMembersIds={participants.map((p) => p.member.id)}
                    onAdd={addParticipant}
                    onRemove={removeParticipant}
                  />
                </Box>
              </FormControl>

              {thread && (
                <FormControl>
                  <FormLabel>
                    {t('organisms.modals.ThreadEditModal.settings')}
                  </FormLabel>
                  <Checkbox {...register('archived')}>
                    {t('organisms.modals.ThreadEditModal.archived')}
                  </Checkbox>
                </FormControl>
              )}

              <Box textAlign="right" mt={2}>
                <Button colorScheme="blue" type="submit">
                  {t(thread ? 'common.save' : 'common.create')}
                </Button>
              </Box>
            </VStack>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  )
}
