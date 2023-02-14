import NumberInputController from '@atoms/NumberInputController'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightAddon,
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
  MeetingRecurringFragment,
  Member_Scope_Enum,
  useCreateMeetingRecurringMutation,
  useUpdateMeetingRecurringMutation,
} from '@gql'
import { yupResolver } from '@hookform/resolvers/yup'
import useCurrentMember from '@hooks/useCurrentMember'
import { useOrgId } from '@hooks/useOrgId'
import CircleFormController from '@molecules/circle/CircleFormController'
import MeetingTemplateIdFormControl from '@molecules/meeting/MeetingTemplateIdFormControl'
import VideoConfFormControl from '@molecules/meeting/VideoConfFormControl'
import ParticipantsFormControl from '@molecules/ParticipantsFormControl'
import RRuleEditorController from '@molecules/rrule/RRuleEditorController'
import { VideoConf, VideoConfTypes } from '@shared/model/meeting'
import React, { useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

interface Props extends UseModalProps {
  meetingRecurring?: MeetingRecurringFragment // If provided, the recurring meeting will be updated
  defaultCircleId?: string
  onCreate?(meetingRecurringId: string): void
}

interface Values {
  circleId: string
  participantsScope: Member_Scope_Enum
  participantsMembersIds: Array<{ memberId: string }>
  templateId: string
  rrule: string
  duration: number // In minutes
  videoConfType: VideoConfTypes | null
  videoConfUrl: string
}

const resolver = yupResolver(
  yup.object().shape({
    circleId: yup.string().required(),
    templateId: yup.string().required(),
    rrule: yup.string().required(),
    duration: yup.number().required(),
    videoConf: yup.string().nullable(),
  })
)

export default function MeetingRecurringEditModal({
  meetingRecurring,
  defaultCircleId,
  onCreate,
  ...modalProps
}: Props) {
  const { t } = useTranslation()
  const orgId = useOrgId()
  const currentMember = useCurrentMember()
  const [createMeetingRecurring] = useCreateMeetingRecurringMutation()
  const [updateMeetingRecurring] = useUpdateMeetingRecurringMutation()

  const defaultValues: Values = useMemo(
    () => ({
      circleId: meetingRecurring?.circleId ?? (defaultCircleId || ''),
      participantsScope:
        meetingRecurring?.participantsScope ?? Member_Scope_Enum.CircleLeaders,
      participantsMembersIds:
        meetingRecurring?.participantsMembersIds.map((id) => ({
          memberId: id,
        })) ?? [],
      templateId: meetingRecurring?.templateId ?? '',
      rrule: meetingRecurring?.rrule ?? '',
      duration: meetingRecurring?.duration ?? 30,
      videoConfType: meetingRecurring?.videoConf?.type ?? null,
      videoConfUrl:
        meetingRecurring?.videoConf?.type === VideoConfTypes.Url
          ? meetingRecurring.videoConf.url
          : 'https://',
    }),
    [defaultCircleId, meetingRecurring]
  )

  const formMethods = useForm<Values>({
    resolver,
    defaultValues,
  })
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = formMethods

  // Submit
  const onSubmit = handleSubmit(
    async ({
      participantsMembersIds,
      videoConfType,
      videoConfUrl,
      ...data
    }) => {
      if (!orgId || !currentMember) return

      const videoConf: VideoConf | null =
        videoConfType === VideoConfTypes.Url
          ? {
              type: VideoConfTypes.Url,
              url: videoConfUrl,
            }
          : videoConfType
          ? {
              type: videoConfType,
            }
          : null

      const meetingUpdate = {
        ...data,
        participantsMembersIds: participantsMembersIds.map((m) => m.memberId),
        videoConf,
      }

      if (meetingRecurring) {
        // Update recurring meeting
        await updateMeetingRecurring({
          variables: { id: meetingRecurring.id, values: meetingUpdate },
        })
      } else {
        // Create recurring meeting
        const { data, errors } = await createMeetingRecurring({
          variables: {
            values: {
              orgId,
              ...meetingUpdate,
            },
          },
        })
        const newRecurringMeeting = data?.insert_meeting_recurring_one
        if (!newRecurringMeeting) return console.error(errors)

        onCreate?.(newRecurringMeeting.id)
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
                meetingRecurring
                  ? 'MeetingRecurringEditModal.headingEdit'
                  : 'MeetingRecurringEditModal.headingCreate'
              )}
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <VStack spacing={7} align="stretch">
                <MeetingTemplateIdFormControl />

                <FormControl isInvalid={!!errors.duration} ml={5}>
                  <FormLabel>{t('MeetingEditModal.duration')}</FormLabel>
                  <InputGroup>
                    <NumberInputController
                      name="duration"
                      control={control}
                      w="80px"
                      min={10}
                      max={600}
                      step={10}
                    />
                    <InputRightAddon>
                      {t('MeetingEditModal.durationSuffix')}
                    </InputRightAddon>
                  </InputGroup>
                </FormControl>

                <FormControl isInvalid={!!errors.rrule}>
                  <FormLabel>
                    {t('MeetingRecurringEditModal.recurrence')}
                  </FormLabel>
                  <Box p={3} borderWidth="1px" borderRadius="md">
                    <RRuleEditorController name="rrule" control={control} />
                  </Box>
                </FormControl>

                <CircleFormController singleMember={false} />

                <ParticipantsFormControl />

                <VideoConfFormControl />

                <Box textAlign="right" mt={2}>
                  <Button colorScheme="blue" type="submit">
                    {t(meetingRecurring ? 'common.save' : 'common.create')}
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
