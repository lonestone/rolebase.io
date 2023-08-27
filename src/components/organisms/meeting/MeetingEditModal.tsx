import NumberInputController from '@atoms/NumberInputController'
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Collapse,
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
  useToast,
  VStack,
} from '@chakra-ui/react'
import {
  Meeting_Set_Input,
  Meeting_Step_Type_Enum,
  MeetingFragment,
  MeetingTemplateFragment,
  Member_Scope_Enum,
  useUpdateMeetingMutation,
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
import { getDateTimeLocal } from '@utils/dates'
import { nanoid } from 'nanoid'
import React, { useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FiChevronDown } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

interface Props extends UseModalProps {
  meeting?: MeetingFragment // If provided, the meeting will be updated
  duplicate?: boolean // If true and meeting provided, the meeting will be duplicated
  defaultCircleId?: string
  defaultStartDate?: Date
  defaultDuration?: number
  onCreate?(meetingId: string): void
  onRecurring?(): void
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
  onRecurring,
  ...modalProps
}: Props) {
  const { t } = useTranslation()
  const toast = useToast()
  const orgId = useOrgId()
  const currentMember = useCurrentMember()
  const navigate = useNavigate()
  const createMeeting = useCreateMeeting()
  const [updateMeeting] = useUpdateMeetingMutation()

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

      const meetingUpdate: Meeting_Set_Input = {
        ...data,
        startDate: startDateDate.toISOString(),
        endDate: new Date(
          startDateDate.getTime() + duration * 60 * 1000
        ).toISOString(),
        participantsMembersIds: participantsMembersIds.map((m) => m.memberId),
        videoConf,
      }

      if (meeting && !duplicate) {
        // Reset meeting when date is in the future
        if (startDateDate > new Date()) {
          meetingUpdate.ended = false
          meetingUpdate.currentStepId = null
          meetingUpdate.attendees = null
        }

        // Update meeting
        await updateMeeting({
          variables: {
            id: meeting.id,
            values: meetingUpdate,
          },
        })

        toast({
          title: t('MeetingEditModal.toastUpdated'),
          status: 'success',
          duration: 4000,
          isClosable: true,
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

        toast({
          title: t('MeetingEditModal.toastCreated'),
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
      }

      modalProps.onClose()
    }
  )

  return (
    <FormProvider {...formMethods}>
      <Modal size="xl" blockScrollOnMount={false} {...modalProps}>
        <ModalOverlay />
        <ModalContent>
          <form>
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
                {duplicate && (
                  <Alert status="info">
                    <AlertIcon />
                    {t('MeetingEditModal.duplicateInfo')}
                  </Alert>
                )}

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

                <Box>
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
                      <FormLabel display="flex">
                        {t('MeetingEditModal.duration')}
                        <Spacer />
                        {onRecurring && (
                          <Button
                            variant="link"
                            size="sm"
                            rightIcon={<FiChevronDown />}
                            onClick={onRecurring}
                          >
                            {t('MeetingEditModal.recurrence')}
                          </Button>
                        )}
                      </FormLabel>
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
                </Box>

                <CircleFormController singleMember={false} />

                <Collapse in={(!meeting?.attendees || duplicate) && !!circleId}>
                  <ParticipantsFormControl />
                </Collapse>

                <FormControl>
                  <FormLabel>{t('MeetingEditModal.steps')}</FormLabel>
                  <MeetingStepsConfigController
                    control={control as any}
                    errors={errors}
                  />
                </FormControl>

                <VideoConfFormControl />

                <Box textAlign="right" mt={2}>
                  <Button colorScheme="blue" onClick={onSubmit}>
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
