import { sendNotification } from '@api/functions'
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
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
  Radio,
  RadioGroup,
  Select,
  Stack,
  Tooltip,
  useDisclosure,
  UseModalProps,
  VStack,
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import NumberInputController from '@components/atoms/NumberInputController'
import ParticipantsScopeSelect from '@components/atoms/ParticipantsScopeSelect'
import TextErrors from '@components/atoms/TextErrors'
import MeetingStepsConfigController, {
  stepsConfigSchema,
  StepsValues,
} from '@components/molecules/MeetingStepsConfigController'
import MembersMultiSelect from '@components/molecules/MembersMultiSelect'
import ParticipantsNumber from '@components/molecules/ParticipantsNumber'
import CircleSearchInput from '@components/molecules/search/entities/circles/CircleSearchInput'
import MemberSearchInput from '@components/molecules/search/entities/members/MemberSearchInput'
import { yupResolver } from '@hookform/resolvers/yup'
import useCircle from '@hooks/useCircle'
import useCreateMissingMeetingSteps from '@hooks/useCreateMissingMeetingSteps'
import useCurrentMember from '@hooks/useCurrentMember'
import { useDuplicateMeetingSteps } from '@hooks/useDuplicateMeetingSteps'
import useItemsArray from '@hooks/useItemsArray'
import { useOrgId } from '@hooks/useOrgId'
import useParticipants from '@hooks/useParticipants'
import { usePathInOrg } from '@hooks/usePathInOrg'
import {
  Meeting,
  MeetingEntry,
  VideoConf,
  VideoConfTypes,
} from '@shared/model/meeting'
import { MeetingStepTypes } from '@shared/model/meeting_step'
import { MeetingTempalteEntry } from '@shared/model/meeting_template'
import { MembersScope } from '@shared/model/member'
import { NotificationCategories } from '@shared/model/notification'
import { nameSchema } from '@shared/schemas'
import { store } from '@store/index'
import { nanoid } from 'nanoid'
import React, { useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FiEdit3, FiHelpCircle } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import {
  useCreateMeetingMutation,
  useSubscribeMeetingTemplatesSubscription,
  useUpdateMeetingMutation,
} from 'src/graphql.generated'
import settings from 'src/settings'
import { getDateTimeLocal, omit } from 'src/utils'
import * as yup from 'yup'
import MeetingTemplatesModal from './MeetingTemplatesModal'

interface Props extends UseModalProps {
  meeting?: MeetingEntry // If provided, the meeting will be updated
  duplicate?: boolean // If true and meeting provided, the meeting will be duplicated
  defaultCircleId?: string
  defaultStartDate?: Date
  defaultDuration?: number
  onCreate?(meetingId: string): void
}

interface Values extends StepsValues {
  templateId: string
  title: string
  circleId: string
  facilitatorMemberId: string
  participantsScope: MembersScope
  startDate: string
  duration: number // In minutes
  videoConfType: VideoConfTypes | null
  videoConfUrl: string
}

const resolver = yupResolver(
  yup.object().shape({
    title: nameSchema.required(),
    circleId: yup.string().required(),
    facilitatorMemberId: yup.string().required(),
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
  const history = useHistory()
  const meetingsPath = usePathInOrg('meetings')
  const [createMeeting] = useCreateMeetingMutation()
  const [updateMeeting] = useUpdateMeetingMutation()
  const createMissingMeetingSteps = useCreateMissingMeetingSteps()
  const duplicateMeetingSteps = useDuplicateMeetingSteps()

  const defaultValues: Values = useMemo(
    () => ({
      templateId: '',
      title: meeting?.title ?? '',
      circleId: meeting?.circleId ?? (defaultCircleId || ''),
      facilitatorMemberId: meeting?.facilitatorMemberId ?? '',
      participantsScope:
        meeting?.participantsScope ?? MembersScope.CircleLeaders,
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
          type: MeetingStepTypes.Threads,
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

  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Values>({
    resolver,
    defaultValues,
  })

  const templateId = watch('templateId')
  const circleId = watch('circleId')
  const participantsScope = watch('participantsScope')
  const facilitatorMemberId = watch('facilitatorMemberId')
  const videoConfType = watch('videoConfType')

  const circle = useCircle(circleId)

  // Templates
  const {
    data,
    loading: meetingTemplatesLoading,
    error: meetingTemplatesError,
  } = useSubscribeMeetingTemplatesSubscription({
    skip: !orgId,
    variables: { orgId: orgId! },
  })
  const meetingTemplates = data?.meeting_template as
    | MeetingTempalteEntry[]
    | undefined

  // Template change
  useEffect(() => {
    const template = meetingTemplates?.find((t) => t.id === templateId)
    if (template) {
      setValue('title', template.title)
      setValue('stepsConfig', template.stepsConfig)
    }
  }, [templateId])

  // Participants members ids
  const {
    items: participantsMembersIds,
    add: addParticipant,
    removeItem: removeParticipant,
  } = useItemsArray<string>(meeting ? meeting.participantsMembersIds : [])

  // Submit
  const onSubmit = handleSubmit(
    async ({ startDate, duration, videoConfType, videoConfUrl, ...data }) => {
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

      const meetingUpdate: Partial<Meeting> = {
        ...omit(data, 'templateId'),
        startDate: startDateDate.toISOString(),
        endDate: new Date(
          startDateDate.getTime() + duration * 60 * 1000
        ).toISOString(),
        participantsMembersIds,
        videoConf,
      }

      if (meeting && !duplicate) {
        // Update meeting
        await updateMeeting({
          variables: { id: meeting.id, values: meetingUpdate },
        })

        // Create missing steps
        await createMissingMeetingSteps(meeting.id, data.stepsConfig, circle)
      } else {
        // Create meeting
        const { data, errors } = await createMeeting({
          variables: {
            values: {
              orgId,
              initiatorMemberId: currentMember.id,
              attendees: participants.map((participant) => ({
                memberId: participant.member.id,
                circlesIds: participant.circlesIds,
                present: null,
              })),
              ...meetingUpdate,
            },
          },
        })
        const newMeeting = data?.insert_meeting_one as MeetingEntry | undefined
        if (!newMeeting) return console.error(errors)

        const path = `${meetingsPath}/${newMeeting.id}`

        if (meeting && duplicate) {
          // Duplicate steps
          await duplicateMeetingSteps(meeting.id, newMeeting)
        }

        // Create missing steps
        await createMissingMeetingSteps(
          newMeeting.id,
          newMeeting.stepsConfig,
          circle
        )

        // Send notification
        const notifParams = {
          role: circle.role.name,
          title: newMeeting.title,
          sender: currentMember.name,
        }
        sendNotification({
          category: NotificationCategories.MeetingInvited,
          title: t('notifications.MeetingInvited.title', notifParams),
          content: t('notifications.MeetingInvited.content', notifParams),
          recipientMemberIds: (
            newMeeting.attendees?.map((a) => a.memberId) || []
          ).filter((id) => id !== currentMember.id),
          topic: newMeeting.id,
          url: `${settings.url}${path}`,
        })

        if (onCreate) {
          onCreate(newMeeting.id)
        } else {
          history.push(path)
        }
      }

      modalProps.onClose()
    }
  )

  // Participants
  const participants = useParticipants(
    circleId,
    participantsScope,
    participantsMembersIds
  )
  const participantsMembers = useMemo(
    () => participants.map((p) => p.member),
    [participants]
  )

  // Reset facilitator when empty or not in participants anymore
  useEffect(() => {
    if (
      !facilitatorMemberId ||
      !participants.some((p) => p.member.id === facilitatorMemberId)
    ) {
      const {
        circles: { entries: circles },
        roles: { entries: roles },
      } = store.getState()
      setValue(
        'facilitatorMemberId',
        // Find a member with a role having name "Facil*"
        participants.find((p) =>
          circles?.some((c) => {
            if (!p.circlesIds.includes(c.id)) return false
            const role = roles?.find((r) => r.id === c.roleId)
            return role && /Facil/i.test(role.name)
          })
        )?.member.id ||
          // Or use current member
          (participants.find((p) => p.member.id === currentMember?.id)
            ? currentMember?.id
            : // Or use first participant
              participants[0]?.member.id) ||
          ''
      )
    }
  }, [participants, facilitatorMemberId])

  // Meeting templates modal
  const {
    isOpen: isMeetingTemplatesOpen,
    onOpen: onMeetingTemplatesOpen,
    onClose: onMeetingTemplatesClose,
  } = useDisclosure()

  return (
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
              {!meeting && (
                <FormControl isInvalid={!!errors.title}>
                  <FormLabel>{t('MeetingEditModal.template')}</FormLabel>
                  {meetingTemplatesLoading && <Loading active size="md" />}
                  <TextErrors errors={[meetingTemplatesError]} />
                  <HStack spacing={2}>
                    <Select {...register('templateId')} autoFocus>
                      <option value="">
                        {t('MeetingEditModal.noTemplate')}
                      </option>
                      {meetingTemplates?.map((template) => (
                        <option key={template.id} value={template.id}>
                          {template.title}
                        </option>
                      ))}
                    </Select>
                    <IconButton
                      aria-label={t('common.edit')}
                      icon={<FiEdit3 />}
                      onClick={onMeetingTemplatesOpen}
                    />
                  </HStack>
                </FormControl>
              )}

              <FormControl isInvalid={!!errors.title}>
                <FormLabel>{t('MeetingEditModal.title')}</FormLabel>
                <InputGroup>
                  <InputLeftAddon pointerEvents="none">
                    {t('MeetingEditModal.titlePrefix')}
                  </InputLeftAddon>
                  <Input
                    {...register('title')}
                    placeholder={t('MeetingEditModal.titlePlaceholder')}
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
                    <InputRightAddon bg="transparent">
                      {t('MeetingEditModal.durationSuffix')}
                    </InputRightAddon>
                  </InputGroup>
                </FormControl>
              </Flex>

              <FormControl isInvalid={!!errors.circleId}>
                <FormLabel>{t('MeetingEditModal.circle')}</FormLabel>
                <Controller
                  name="circleId"
                  control={control}
                  render={({ field }) => (
                    <CircleSearchInput
                      singleMember={false}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </FormControl>

              {(!meeting?.attendees || duplicate) && (
                <FormControl
                  isInvalid={(circleId && participants.length === 0) || false}
                >
                  <FormLabel display="flex" alignItems="center">
                    {t('MeetingEditModal.invite')}
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
              )}

              {participants.length !== 0 && (
                <FormControl isInvalid={!!errors.facilitatorMemberId} flex="1">
                  <FormLabel display="flex" alignItems="center">
                    {t('MeetingEditModal.facilitator')}
                    <Tooltip
                      hasArrow
                      p={2}
                      label={t('MeetingEditModal.facilitatorHelp')}
                    >
                      <Box ml={3}>
                        <FiHelpCircle />
                      </Box>
                    </Tooltip>
                  </FormLabel>
                  <Controller
                    name="facilitatorMemberId"
                    control={control}
                    render={({ field }) => (
                      <MemberSearchInput
                        members={participantsMembers}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </FormControl>
              )}

              <FormControl>
                <FormLabel>{t('MeetingEditModal.steps')}</FormLabel>
                <MeetingStepsConfigController
                  control={control as any}
                  errors={errors}
                />
              </FormControl>

              <FormControl
                isInvalid={!!errors.videoConfType || !!errors.videoConfUrl}
              >
                <Stack spacing={1}>
                  <Checkbox
                    isChecked={!!videoConfType}
                    onChange={() =>
                      setValue(
                        'videoConfType',
                        videoConfType ? null : VideoConfTypes.Jitsi
                      )
                    }
                  >
                    {t('MeetingEditModal.videoConf')}
                  </Checkbox>

                  <RadioGroup
                    display={videoConfType ? '' : 'none'}
                    value={videoConfType || VideoConfTypes.Jitsi}
                    onChange={(value) =>
                      setValue('videoConfType', value as VideoConfTypes)
                    }
                  >
                    <Stack pl={6} mt={1} spacing={1} direction="column">
                      <Radio value={VideoConfTypes.Jitsi}>
                        {t('MeetingEditModal.videoConfJitsi')}
                      </Radio>
                      <Radio value={VideoConfTypes.Url}>
                        {t('MeetingEditModal.videoConfUrl')}
                      </Radio>
                      {videoConfType === VideoConfTypes.Url && (
                        <Input pl={6} {...register('videoConfUrl')} />
                      )}
                    </Stack>
                  </RadioGroup>
                </Stack>
              </FormControl>

              <Box textAlign="right" mt={2}>
                <Button colorScheme="blue" type="submit">
                  {t(meeting ? 'common.save' : 'common.create')}
                </Button>
              </Box>
            </VStack>
          </ModalBody>
        </form>
      </ModalContent>

      {isMeetingTemplatesOpen && (
        <MeetingTemplatesModal isOpen onClose={onMeetingTemplatesClose} />
      )}
    </Modal>
  )
}

// Returns current date with hour rounded up to the quarter hour
function getRoundedDate(): Date {
  const date = new Date()
  const rounded = date.getHours() * 4 + Math.round(date.getMinutes() / 15)
  date.setHours(Math.floor(rounded / 4), (rounded % 4) * 15, 0, 0)
  return date
}
