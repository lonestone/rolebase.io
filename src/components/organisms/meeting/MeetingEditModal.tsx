import { updateMeeting } from '@api/functions'
import NumberInputController from '@atoms/NumberInputController'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  UseModalProps,
  VStack,
} from '@chakra-ui/react'
import {
  MeetingFragment,
  MeetingTemplateFragment,
  Meeting_Step_Type_Enum,
  Member_Scope_Enum,
} from '@gql'
import { yupResolver } from '@hookform/resolvers/yup'
import useCircle from '@hooks/useCircle'
import useCreateMeeting from '@hooks/useCreateMeeting'
import useCurrentMember from '@hooks/useCurrentMember'
import { useOrgId } from '@hooks/useOrgId'
import CircleFormController from '@molecules/circle/CircleFormController'
import MeetingStepsConfigController, {
  StepsValues,
} from '@molecules/meeting/MeetingStepsConfigController'
import MeetingTemplateMenu from '@molecules/meeting/MeetingTemplateMenu'
import VideoConfFormControl from '@molecules/meeting/VideoConfFormControl'
import ParticipantsFormControl from '@molecules/ParticipantsFormControl'
import { VideoConf, VideoConfTypes } from '@shared/model/meeting'
import { nameSchema, stepsConfigSchema } from '@shared/schemas'
import { getDateTimeLocal } from '@utils/getDateTimeLocal'
import { nanoid } from 'nanoid'
import React, { useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

interface Props extends UseModalProps {
  meeting?: MeetingFragment // If provided, the meeting will be updated
  duplicate?: boolean // If true and meeting provided, the meeting will be duplicated
  defaultCircleId?: string
  defaultStartDate?: Date
  defaultDuration?: number
  onCreate?(meetingId: string): void
}

interface Values extends StepsValues {
  title: string
  circleId: string
  participantsScope: Member_Scope_Enum
  participantsMembersIds: Array<{ memberId: string }>
  startDate: string
  duration: number // In minutes
  videoConfType: VideoConfTypes | null
  videoConfUrl: string
}

const resolver = yupResolver(
  yup.object().shape({
    title: nameSchema.required(),
    circleId: yup.string().required(),
    startDate: yup.string().required(),
    duration: yup.number().required(),
    stepsConfig: stepsConfigSchema,
    videoConf: yup.string().nullable(),
  })
)

export default function MeetingEditModal({
  meeting,
  duplicate,
  defaultCircleId,
  defaultStartDate,
  defaultDuration,
  onCreate,
  ...modalProps
}: Props) {
  const { t } = useTranslation()
  const orgId = useOrgId()
  const currentMember = useCurrentMember()
  const navigate = useNavigate()
  const createMeeting = useCreateMeeting()

  const defaultValues: Values = useMemo(
    () => ({
      title: meeting?.title ?? '',
      circleId: meeting?.circleId ?? (defaultCircleId || ''),
      participantsScope:
        meeting?.participantsScope ?? Member_Scope_Enum.CircleLeaders,
      participantsMembersIds:
        meeting?.participantsMembersIds.map((id) => ({ memberId: id })) ?? [],
      startDate: getDateTimeLocal(
        duplicate || !meeting
          ? defaultStartDate || getRoundedDate()
          : new Date(meeting.startDate)
      ),
      duration: meeting
        ? Math.round(
            (new Date(meeting.endDate).getTime() -
              new Date(meeting.startDate).getTime()) /
              60000
          )
        : defaultDuration || 30,
      stepsConfig: meeting?.stepsConfig ?? [
        {
          id: nanoid(8),
          type: Meeting_Step_Type_Enum.Threads,
          title: 'Ordre du jour',
        },
      ],
      videoConfType: meeting?.videoConf?.type ?? null,
      videoConfUrl:
        meeting?.videoConf?.type === VideoConfTypes.Url
          ? meeting.videoConf.url
          : 'https://',
    }),
    [defaultCircleId, defaultStartDate, meeting]
  )

  const formMethods = useForm<Values>({
    resolver,
    defaultValues,
  })
  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = formMethods

  // Watch selected circle
  const circleId = watch('circleId')
  const circle = useCircle(circleId)

  // Template change
  const handleTemplateSelect = (template: MeetingTemplateFragment) => {
    setValue('title', template.title)
    setValue('stepsConfig', template.stepsConfig)
  }

  // Submit
  const onSubmit = handleSubmit(
    async ({
      participantsMembersIds,
      startDate,
      duration,
      videoConfType,
      videoConfUrl,
      ...data
    }) => {
      if (!orgId || !currentMember || !circle) return
      const startDateDate = new Date(startDate)

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
        startDate: startDateDate.toISOString(),
        endDate: new Date(
          startDateDate.getTime() + duration * 60 * 1000
        ).toISOString(),
        participantsMembersIds: participantsMembersIds.map((m) => m.memberId),
        videoConf,
      }

      if (meeting && !duplicate) {
        // Update meeting
        await updateMeeting({
          meetingId: meeting.id,
          values: meetingUpdate,
        })
      } else {
        // Create meeting
        const result = await createMeeting(
          {
            orgId,
            ...meetingUpdate,
          },
          meeting && duplicate ? meeting.id : undefined
        )
        if (!result) return

        if (onCreate) {
          onCreate(result.id)
        } else {
          navigate(result.path)
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
                meeting && !duplicate
                  ? 'MeetingEditModal.headingEdit'
                  : 'MeetingEditModal.headingCreate'
              )}
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <VStack spacing={7} align="stretch">
                <FormControl isInvalid={!!errors.title}>
                  <FormLabel>
                    <Flex>
                      {t('MeetingEditModal.title')}
                      <Spacer />
                      {!meeting && (
                        <MeetingTemplateMenu onSelect={handleTemplateSelect} />
                      )}
                    </Flex>
                  </FormLabel>
                  <InputGroup>
                    <InputLeftAddon pointerEvents="none">
                      {t('MeetingEditModal.titlePrefix')}
                    </InputLeftAddon>
                    <Input
                      {...register('title')}
                      placeholder={t('MeetingEditModal.titlePlaceholder')}
                      autoFocus
                    />
                  </InputGroup>
                </FormControl>

                <Flex>
                  <FormControl isInvalid={!!errors.startDate} maxW="50%">
                    <FormLabel>{t('MeetingEditModal.start')}</FormLabel>
                    <Input
                      {...register('startDate')}
                      type="datetime-local"
                      w="250px"
                      maxW="100%"
                    />
                  </FormControl>

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
                </Flex>

                <CircleFormController singleMember={false} />

                {(!meeting?.attendees || duplicate) && (
                  <ParticipantsFormControl />
                )}

                <FormControl>
                  <FormLabel>{t('MeetingEditModal.steps')}</FormLabel>
                  <MeetingStepsConfigController
                    control={control as any}
                    errors={errors}
                  />
                </FormControl>

                <VideoConfFormControl />

                <Box textAlign="right" mt={2}>
                  <Button colorScheme="blue" type="submit">
                    {t(meeting ? 'common.save' : 'common.create')}
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

// Returns current date with hour rounded up to the quarter hour
function getRoundedDate(): Date {
  const date = new Date()
  const rounded = date.getHours() * 4 + Math.round(date.getMinutes() / 15)
  date.setHours(Math.floor(rounded / 4), (rounded % 4) * 15, 0, 0)
  return date
}
