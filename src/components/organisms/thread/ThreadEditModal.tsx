import {
  Box,
  Button,
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
import {
  Member_Scope_Enum,
  Thread_Status_Enum,
  ThreadFragment,
  useCreateThreadMutation,
  useUpdateThreadMutation,
} from '@gql'
import { yupResolver } from '@hookform/resolvers/yup'
import useCurrentMember from '@hooks/useCurrentMember'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import { useOrgId } from '@hooks/useOrgId'
import CircleFormController from '@molecules/circle/CircleFormController'
import ParticipantsFormControl from '@molecules/ParticipantsFormControl'
import { ThreadStatusMenu } from '@molecules/thread/ThreadStatusMenu'
import { nameSchema } from '@shared/schemas'
import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

interface Props extends UseModalProps {
  defaultCircleId?: string
  thread?: ThreadFragment
  onCreate?(threadId: string): void
}

interface Values {
  title: string
  circleId: string
  participantsScope: Member_Scope_Enum
  participantsMembersIds: Array<{ memberId: string }>
  status: Thread_Status_Enum
}

const resolver = yupResolver(
  yup.object().shape({
    title: nameSchema.required(),
    circleId: yup.string().required(),
  })
)

export default function ThreadEditModal({
  defaultCircleId,
  thread,
  onCreate,
  ...modalProps
}: Props) {
  const { t } = useTranslation()
  const navigateOrg = useNavigateOrg()
  const orgId = useOrgId()
  const currentMember = useCurrentMember()
  const [updateThread] = useUpdateThreadMutation()
  const [createThread] = useCreateThreadMutation()

  const formMethods = useForm<Values>({
    resolver,
    defaultValues: thread
      ? {
          title: thread.title,
          circleId: thread.circleId,
          participantsScope: thread.participantsScope,
          participantsMembersIds: thread.participantsMembersIds.map((id) => ({
            memberId: id,
          })),
          status: thread.status,
        }
      : {
          title: '',
          circleId: defaultCircleId || '',
          participantsScope: Member_Scope_Enum.CircleLeaders,
          participantsMembersIds: [],
          status: Thread_Status_Enum.Active,
        },
  })

  const {
    handleSubmit,
    register,
    watch,
    control,
    formState: { errors },
  } = formMethods

  const circleId = watch('circleId')

  const onSubmit = handleSubmit(
    async ({ participantsMembersIds, ...values }) => {
      if (!orgId || !currentMember) return
      const threadUpdate = {
        ...values,
        participantsMembersIds: participantsMembersIds.map((m) => m.memberId),
      }
      if (thread) {
        // Update thread
        await updateThread({
          variables: { id: thread.id, values: threadUpdate },
        })
      } else {
        // Create thread
        const { data } = await createThread({
          variables: {
            values: {
              orgId,
              initiatorMemberId: currentMember.id,
              ...threadUpdate,
            },
          },
        })
        const createdThreadId = data?.insert_thread_one?.id
        if (!createdThreadId) return

        if (onCreate) {
          onCreate(createdThreadId)
        } else {
          // Go to thread page
          navigateOrg(`threads/${createdThreadId}`)
        }
      }
      modalProps.onClose()
    }
  )

  return (
    <FormProvider {...formMethods}>
      <Modal size="xl" {...modalProps}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>
              {t(
                thread
                  ? 'ThreadEditModal.headingEdit'
                  : 'ThreadEditModal.headingCreate'
              )}
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <VStack spacing={5} align="stretch">
                <FormControl isInvalid={!!errors.title}>
                  <FormLabel>{t('ThreadEditModal.title')}</FormLabel>
                  <Input
                    {...register('title')}
                    placeholder={t('ThreadEditModal.titlePlaceholder')}
                    autoFocus
                  />
                </FormControl>

                <CircleFormController />

                {circleId && <ParticipantsFormControl />}

                {!thread && (
                  <FormControl>
                    <FormLabel>{t('ThreadEditModal.status')}</FormLabel>
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <ThreadStatusMenu
                          size="md"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
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
    </FormProvider>
  )
}
