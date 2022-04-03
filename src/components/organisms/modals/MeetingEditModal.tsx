import { createMeeting, updateMeeting } from '@api/entities/meetings'
import { createMissingMeetingSteps } from '@api/entities/meetingSteps'
import { subscribeAllMeetingTemplates } from '@api/entities/meetingTemplates'
import { nameSchema } from '@api/schemas'
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
import ParticipantsNumber from '@components/atoms/ParticipantsNumber'
import ParticipantsScopeSelect from '@components/atoms/ParticipantsScopeSelect'
import TextErrors from '@components/atoms/TextErrors'
import MeetingStepsConfigController, {
  stepsConfigSchema,
  StepsValues,
} from '@components/molecules/MeetingStepsConfigController'
import MembersMultiSelect from '@components/molecules/MembersMultiSelect'
import CircleSearchInput from '@components/molecules/search/entities/circles/CircleSearchInput'
import MemberSearchInput from '@components/molecules/search/entities/members/MemberSearchInput'
import { yupResolver } from '@hookform/resolvers/yup'
import useCurrentMember from '@hooks/useCurrentMember'
import useItemsArray from '@hooks/useItemsArray'
import { useOrgId } from '@hooks/useOrgId'
import useParticipants from '@hooks/useParticipants'
import useSubscription from '@hooks/useSubscription'
import { MeetingEntry } from '@shared/meeting'
import { MeetingStepTypes } from '@shared/meetingStep'
import { MembersScope } from '@shared/member'
import { Timestamp } from 'firebase/firestore'
import { nanoid } from 'nanoid'
import React, { useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FiEdit3, FiHelpCircle } from 'react-icons/fi'
import { getDateTimeLocal } from 'src/utils'
import * as yup from 'yup'
import MeetingTemplatesModal from './MeetingTemplatesModal'

interface Props extends UseModalProps {
  defaultCircleId?: string
  meeting?: MeetingEntry
  defaultStartDate?: Date
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
  ended: boolean
  videoConf: boolean | string
}

const resolver = yupResolver(
  yup.object().shape({
    title: nameSchema,
    circleId: yup.string().required(),
    facilitatorMemberId: yup.string().required(),
    startDate: yup.string().required(),
    duration: yup.number().required(),
    stepsConfig: stepsConfigSchema,
    videoConf: yup.lazy((value) =>
      typeof value === 'boolean' ? yup.boolean() : yup.string().url().required()
    ),
  })
)

enum VideoConfType {
  generated = 'generated',
  url = 'url',
}

export default function MeetingEditModal({
  defaultCircleId,
  meeting,
  defaultStartDate,
  onCreate,
  ...modalProps
}: Props) {
  const orgId = useOrgId()
  const currentMember = useCurrentMember()

  // Default date is tomorrow 8:00
  const initStartDate = useMemo(() => {
    if (defaultStartDate) return defaultStartDate
    const date = new Date()
    date.setDate(date.getDate() + 1)
    date.setHours(8, 0, 0, 0)
    return date
  }, [])

  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Values>({
    resolver,
    defaultValues: meeting
      ? {
          title: meeting.title,
          circleId: meeting.circleId,
          facilitatorMemberId: meeting.facilitatorMemberId,
          participantsScope: meeting.participantsScope,
          startDate: getDateTimeLocal(meeting.startDate.toDate()),
          duration: Math.round(
            (meeting.endDate.seconds - meeting.startDate.seconds) / 60
          ),
          ended: meeting.ended,
          stepsConfig: meeting.stepsConfig,
          videoConf: meeting.videoConf || false,
        }
      : {
          title: '',
          circleId: defaultCircleId || '',
          facilitatorMemberId: '',
          participantsScope: MembersScope.CircleLeaders,
          startDate: getDateTimeLocal(initStartDate),
          duration: 60,
          ended: false,
          stepsConfig: [
            {
              id: nanoid(5),
              type: MeetingStepTypes.Threads,
              title: 'Ordre du jour',
            },
          ],
          videoConf: false,
        },
  })

  const templateId = watch('templateId')
  const circleId = watch('circleId')
  const participantsScope = watch('participantsScope')
  const facilitatorMemberId = watch('facilitatorMemberId')
  const videoConf = watch('videoConf')

  // Templates
  const {
    data: meetingTemplates,
    loading: meetingTemplatesLoading,
    error: meetingTemplatesError,
  } = useSubscription(orgId ? subscribeAllMeetingTemplates(orgId) : undefined)

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
    remove: removeParticipant,
  } = useItemsArray<string>(meeting ? meeting.participantsMembersIds : [])

  // Submit
  const onSubmit = handleSubmit(async ({ startDate, duration, ...data }) => {
    if (!orgId || !currentMember) return
    const startDateDate = new Date(startDate)
    const meetingUpdate = {
      ...data,
      startDate: Timestamp.fromDate(startDateDate),
      endDate: Timestamp.fromDate(
        new Date(startDateDate.getTime() + duration * 60 * 1000)
      ),
      participantsMembersIds,
    }
    if (meeting) {
      // Update meeting
      await updateMeeting(meeting.id, meetingUpdate)

      // Create missing steps
      await createMissingMeetingSteps(meeting.id, meetingUpdate.stepsConfig)
    } else {
      // Create meeting
      const meeting = await createMeeting({
        orgId,
        initiatorMemberId: currentMember.id,
        ...meetingUpdate,
      })
      onCreate?.(meeting.id)

      // Create missing steps
      await createMissingMeetingSteps(meeting.id, meeting.stepsConfig)
    }

    modalProps.onClose()
  })

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

  // Reset facilitator when not in participants anymore
  useEffect(() => {
    if (!participants.some((p) => p.member.id === facilitatorMemberId)) {
      setValue('facilitatorMemberId', '')
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
            {meeting ? 'Modifier une réunion' : 'Nouvelle réunion'}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={7} align="stretch">
              {!meeting && (
                <FormControl isInvalid={!!errors.title}>
                  <FormLabel>Template</FormLabel>
                  {meetingTemplatesLoading && <Loading active size="md" />}
                  <TextErrors errors={[meetingTemplatesError]} />
                  <HStack spacing={2}>
                    <Select {...register('templateId')} autoFocus>
                      <option value="">Aucun</option>
                      {meetingTemplates?.map((template) => (
                        <option key={template.id} value={template.id}>
                          {template.title}
                        </option>
                      ))}
                    </Select>
                    <IconButton
                      aria-label=""
                      icon={<FiEdit3 />}
                      onClick={onMeetingTemplatesOpen}
                    />
                  </HStack>
                </FormControl>
              )}

              <FormControl isInvalid={!!errors.title}>
                <FormLabel>Titre</FormLabel>
                <InputGroup>
                  <InputLeftAddon pointerEvents="none">Réunion</InputLeftAddon>
                  <Input {...register('title')} placeholder="Titre..." />
                </InputGroup>
              </FormControl>

              <Flex>
                <FormControl isInvalid={!!errors.startDate}>
                  <FormLabel>Début</FormLabel>
                  <Input
                    {...register('startDate')}
                    type="datetime-local"
                    w="250px"
                  />
                </FormControl>

                <FormControl isInvalid={!!errors.duration} ml={5}>
                  <FormLabel>Durée</FormLabel>
                  <InputGroup>
                    <NumberInputController
                      name="duration"
                      control={control}
                      w="80px"
                      min={10}
                      max={600}
                      step={10}
                    />
                    <InputRightAddon bg="transparent">minutes</InputRightAddon>
                  </InputGroup>
                </FormControl>
              </Flex>

              <FormControl isInvalid={!!errors.circleId}>
                <FormLabel>Cercle</FormLabel>
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

              <FormControl
                isInvalid={(circleId && participants.length === 0) || false}
              >
                <FormLabel display="flex" alignItems="center">
                  Inviter
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

              {participants.length !== 0 && (
                <FormControl isInvalid={!!errors.facilitatorMemberId} flex="1">
                  <FormLabel display="flex" alignItems="center">
                    Facilitateur
                    <Tooltip
                      hasArrow
                      p={2}
                      label={
                        'Le/la facilitateur anime la réunion en suivant le déroulé et en donnant la parole.'
                      }
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
                <FormLabel>Déroulé</FormLabel>
                <MeetingStepsConfigController
                  control={control as any}
                  errors={errors}
                />
              </FormControl>

              <FormControl isInvalid={!!errors.videoConf}>
                <Stack spacing={1}>
                  <Checkbox
                    isChecked={!!videoConf}
                    onChange={() => setValue('videoConf', !videoConf)}
                  >
                    Activer la vidéo-conférence
                  </Checkbox>

                  <RadioGroup
                    display={videoConf ? '' : 'none'}
                    value={
                      videoConf === true
                        ? VideoConfType.generated
                        : VideoConfType.url
                    }
                    onChange={(value) =>
                      setValue(
                        'videoConf',
                        value === VideoConfType.generated ? true : 'https://'
                      )
                    }
                  >
                    <Stack pl={6} mt={1} spacing={1} direction="column">
                      <Radio value={VideoConfType.generated}>
                        Générer une URL Jitsi
                      </Radio>
                      <Radio value={VideoConfType.url}>URL personnalisée</Radio>
                      {typeof videoConf === 'string' && (
                        <Input pl={6} {...register('videoConf')} />
                      )}
                    </Stack>
                  </RadioGroup>
                </Stack>
              </FormControl>

              <Box textAlign="right" mt={2}>
                <Button colorScheme="blue" type="submit">
                  {meeting ? 'Enregistrer' : 'Créer'}
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
