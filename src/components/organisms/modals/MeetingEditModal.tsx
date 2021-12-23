import { createMeeting, updateMeeting } from '@api/entities/meetings'
import { subscribeAllMeetingTemplates } from '@api/entities/meetingTemplates'
import { Timestamp } from '@api/firebase'
import { nameSchema } from '@api/schemas'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
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
import MembersSelect from '@components/molecules/MembersSelect'
import EntityButtonCombobox from '@components/molecules/search/EntityButtonCombobox'
import { yupResolver } from '@hookform/resolvers/yup'
import useCurrentMember from '@hooks/useCurrentMember'
import useItemsArray from '@hooks/useItemsArray'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import useParticipants from '@hooks/useParticipants'
import useSubscription from '@hooks/useSubscription'
import { MeetingEntry } from '@shared/meeting'
import { MembersScope } from '@shared/member'
import { useStoreState } from '@store/hooks'
import React, { useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FiEdit3 } from 'react-icons/fi'
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
}

const resolver = yupResolver(
  yup.object().shape({
    title: nameSchema,
    circleId: yup.string().required(),
    facilitatorMemberId: yup.string().required(),
    startDate: yup.string().required(),
    duration: yup.number().required(),
    stepsConfig: stepsConfigSchema,
  })
)

export default function MeetingEditModal({
  defaultCircleId,
  meeting,
  defaultStartDate,
  onCreate,
  ...modalProps
}: Props) {
  const navigateOrg = useNavigateOrg()
  const orgId = useStoreState((state) => state.orgs.currentId)
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
        }
      : {
          title: '',
          circleId: defaultCircleId || '',
          facilitatorMemberId: '',
          participantsScope: MembersScope.CircleLeaders,
          startDate: getDateTimeLocal(initStartDate),
          duration: 60,
          ended: false,
          stepsConfig: [],
        },
  })

  const templateId = watch('templateId')
  const circleId = watch('circleId')
  const participantsScope = watch('participantsScope')
  const facilitatorMemberId = watch('facilitatorMemberId')

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
    } else {
      // Create meeting
      const meeting = await createMeeting({
        orgId,
        initiatorMemberId: currentMember.id,
        ...meetingUpdate,
      })
      onCreate?.(meeting.id)
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
            <VStack spacing={5} align="stretch">
              {!meeting && (
                <FormControl isInvalid={!!errors.title}>
                  <FormLabel htmlFor="title">Template</FormLabel>
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
                <FormLabel htmlFor="title">Titre</FormLabel>
                <Input {...register('title')} placeholder="Titre..." />
              </FormControl>

              <Flex>
                <FormControl isInvalid={!!errors.startDate}>
                  <FormLabel htmlFor="startDate">Début</FormLabel>
                  <Input
                    {...register('startDate')}
                    type="datetime-local"
                    w="250px"
                  />
                </FormControl>

                <FormControl isInvalid={!!errors.duration} ml={5}>
                  <FormLabel htmlFor="duration">Durée</FormLabel>
                  <InputGroup>
                    <NumberInputController
                      name="duration"
                      control={control}
                      w="80px"
                      min={10}
                      max={600}
                      step={10}
                    />
                    <InputRightAddon bg="transparent" children="minutes" />
                  </InputGroup>
                </FormControl>
              </Flex>

              <FormControl isInvalid={!!errors.circleId}>
                <FormLabel htmlFor="circleId">Cercle</FormLabel>
                <Controller
                  name="circleId"
                  control={control}
                  render={({ field }) => (
                    <EntityButtonCombobox
                      circles
                      circlesSingleMember={false}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </FormControl>

              <FormControl
                isInvalid={(circleId && participants.length === 0) || false}
              >
                <FormLabel
                  htmlFor="participantsScope"
                  display="flex"
                  alignItems="center"
                >
                  Inviter
                  <ParticipantsNumber ml={2} participants={participants} />
                </FormLabel>
                <ParticipantsScopeSelect {...register('participantsScope')} />

                <Box mt={2}>
                  <MembersSelect
                    membersIds={participantsMembersIds}
                    onAdd={addParticipant}
                    onRemove={removeParticipant}
                  />
                </Box>
              </FormControl>

              {participants.length !== 0 && (
                <FormControl isInvalid={!!errors.facilitatorMemberId} flex="1">
                  <FormLabel htmlFor="facilitatorMemberId">
                    Facilitateur
                  </FormLabel>
                  <Controller
                    name="facilitatorMemberId"
                    control={control}
                    render={({ field }) => (
                      <EntityButtonCombobox
                        members
                        membersOverride={participantsMembers}
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
