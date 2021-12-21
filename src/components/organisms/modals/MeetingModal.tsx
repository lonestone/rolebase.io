import { createMeeting, updateMeeting } from '@api/entities/meetings'
import { Timestamp } from '@api/firebase'
import { nameSchema } from '@api/schemas'
import { CloseIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
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
  Stack,
  Tag,
  UseModalProps,
  VStack,
} from '@chakra-ui/react'
import MeetingStepTypeSelect from '@components/atoms/MeetingStepTypeSelect'
import NumberInputController from '@components/atoms/NumberInputController'
import ParticipantsNumber from '@components/atoms/ParticipantsNumber'
import ParticipantsScopeSelect from '@components/atoms/ParticipantsScopeSelect'
import MembersSelect from '@components/molecules/MembersSelect'
import EntityButtonCombobox from '@components/molecules/search/EntityButtonCombobox'
import { yupResolver } from '@hookform/resolvers/yup'
import useCurrentMember from '@hooks/useCurrentMember'
import useItemsArray from '@hooks/useItemsArray'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import useParticipants from '@hooks/useParticipants'
import {
  MeetingEntry,
  MeetingStepConfig,
  MeetingStepTypes,
} from '@shared/meeting'
import { MembersScope } from '@shared/member'
import { useStoreState } from '@store/hooks'
import React, { useEffect, useMemo } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { FiPlus } from 'react-icons/fi'
import { getDateTimeLocal } from 'src/utils'
import * as yup from 'yup'

interface Props extends UseModalProps {
  defaultCircleId?: string
  meeting?: MeetingEntry
  defaultStartDate?: Date
}

interface Values {
  title: string
  circleId: string
  facilitatorMemberId: string
  participantsScope: MembersScope
  startDate: string
  duration: number // In minutes
  ended: boolean
  stepsConfig: MeetingStepConfig[]
}

export const resolver = yupResolver(
  yup.object().shape({
    title: nameSchema,
    circleId: yup.string().required(),
    facilitatorMemberId: yup.string().required(),
    startDate: yup.string().required(),
    duration: yup.number().required(),
    stepsConfig: yup.array().of(
      yup.object().shape({
        title: yup.string().required(),
      })
    ),
  })
)

export default function MeetingModal({
  defaultCircleId,
  meeting,
  defaultStartDate,
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

  // Steps
  const {
    fields: stepsFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control,
    name: 'stepsConfig',
  })

  const circleId = watch('circleId')
  const participantsScope = watch('participantsScope')
  const facilitatorMemberId = watch('facilitatorMemberId')

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
        currentStepIndex: 0,
        ...meetingUpdate,
      })
      // Go to meeting page
      navigateOrg(`/meetings/${meeting.id}`)
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
              <FormControl isInvalid={!!errors.title}>
                <FormLabel htmlFor="title">Titre</FormLabel>
                <Input
                  {...register('title')}
                  placeholder="Titre..."
                  autoFocus
                />
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

              {meeting && (
                <FormControl>
                  <FormLabel>Paramètres</FormLabel>
                  <Checkbox {...register('ended')}>Terminée</Checkbox>
                </FormControl>
              )}

              <FormControl>
                <FormLabel>Déroulé</FormLabel>
                <Stack spacing={2}>
                  {stepsFields.map((field, index) => (
                    <Stack key={field.id} spacing={2} direction="row">
                      <Tag size="lg" borderRadius="full">
                        {index + 1}
                      </Tag>
                      <Stack spacing={2} direction="row" flex="1">
                        <MeetingStepTypeSelect
                          {...register(`stepsConfig.${index}.type`)}
                        />
                        <Input
                          {...register(`stepsConfig.${index}.title`)}
                          isInvalid={!!errors.stepsConfig?.[index]}
                          placeholder="Titre de l'étape..."
                          control={control}
                        />
                      </Stack>
                      {stepsFields.length > 1 ? (
                        <IconButton
                          aria-label=""
                          icon={<CloseIcon />}
                          onClick={() => removeStep(index)}
                        />
                      ) : null}
                    </Stack>
                  ))}
                  <Button
                    leftIcon={<FiPlus />}
                    onClick={() =>
                      appendStep({ type: MeetingStepTypes.Tour, title: '' })
                    }
                  >
                    Ajouter une étape
                  </Button>
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
    </Modal>
  )
}
