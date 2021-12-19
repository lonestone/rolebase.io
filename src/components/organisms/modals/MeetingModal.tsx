import {
  createMeeting,
  meetingSchema,
  updateMeeting,
} from '@api/entities/meetings'
import { Timestamp } from '@api/firebase'
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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Spacer,
  Stack,
  UseModalProps,
  VStack,
} from '@chakra-ui/react'
import ParticipantsNumber from '@components/atoms/ParticipantsNumber'
import MembersSelect from '@components/molecules/MembersSelect'
import EntityButtonCombobox from '@components/molecules/search/EntityButtonCombobox'
import { yupResolver } from '@hookform/resolvers/yup'
import useCurrentMember from '@hooks/useCurrentMember'
import useItemsArray from '@hooks/useItemsArray'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import useParticipants from '@hooks/useParticipants'
import { MeetingEntry, MeetingStepConfig } from '@shared/meeting'
import { MembersScope } from '@shared/member'
import { useStoreState } from '@store/hooks'
import React, { useEffect, useMemo } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { FiPlus } from 'react-icons/fi'
import { getDateTimeLocal } from 'src/utils'

interface Props extends UseModalProps {
  defaultCircleId?: string
  meeting?: MeetingEntry
}

interface Values {
  title: string
  circleId: string
  facilitatorMemberId: string
  participantsScope: MembersScope
  startDate: string
  endDate: string
  ended: boolean
  stepsConfig: MeetingStepConfig[]
}

export default function MeetingModal({
  defaultCircleId,
  meeting,
  ...modalProps
}: Props) {
  const navigateOrg = useNavigateOrg()
  const orgId = useStoreState((state) => state.orgs.currentId)
  const currentMember = useCurrentMember()

  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Values>({
    resolver: yupResolver(meetingSchema),
    defaultValues: meeting
      ? {
          title: meeting.title,
          circleId: meeting.circleId,
          facilitatorMemberId: meeting.facilitatorMemberId,
          participantsScope: meeting.participantsScope,
          startDate: meeting.startDate
            ? getDateTimeLocal(meeting.startDate.toDate())
            : '',
          endDate: meeting.endDate
            ? getDateTimeLocal(meeting.endDate.toDate())
            : '',
          ended: meeting.ended,
          stepsConfig: meeting.stepsConfig,
        }
      : {
          title: '',
          circleId: defaultCircleId || '',
          facilitatorMemberId: '',
          participantsScope: MembersScope.CircleLeaders,
          startDate: '',
          endDate: '',
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
  const onSubmit = handleSubmit(async ({ startDate, endDate, ...data }) => {
    if (!orgId || !currentMember) return
    const meetingUpdate = {
      ...data,
      startDate: Timestamp.fromDate(new Date(startDate)),
      endDate: Timestamp.fromDate(new Date(endDate)),
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
                <FormControl isInvalid={!!errors.startDate} flex="1">
                  <FormLabel htmlFor="startDate">Début</FormLabel>
                  <Input {...register('startDate')} type="datetime-local" />
                </FormControl>
                <Spacer />

                <FormControl isInvalid={!!errors.endDate} flex="1">
                  <FormLabel htmlFor="endDate">Fin</FormLabel>
                  <Input {...register('endDate')} type="datetime-local" />
                </FormControl>
              </Flex>

              <FormControl isInvalid={!!errors.circleId}>
                <FormLabel htmlFor="circleId">Cercle / Rôle</FormLabel>
                <Controller
                  name="circleId"
                  control={control}
                  render={({ field }) => (
                    <EntityButtonCombobox
                      circles
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
                <Select flex={1} {...register('participantsScope')}>
                  <option value={MembersScope.Organization}>
                    Tous les membres de l'Organisation
                  </option>
                  <option value={MembersScope.CircleLeaders}>
                    Les membres Leaders de Rôles et de sous-Cercles
                  </option>
                  <option value={MembersScope.CircleMembers}>
                    Tous les membres du Cercle et des sous-Cercles
                  </option>
                  <option value={MembersScope.None}>
                    Seulement les membres invités (ci-dessous)
                  </option>
                </Select>

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
                    <FormControl
                      isInvalid={!!errors.stepsConfig?.[index]}
                      key={field.id}
                    >
                      <Stack spacing={2} direction="row">
                        <Input
                          {...register(`stepsConfig.${index}.title`)}
                          placeholder={`Étape n°${index + 1}`}
                          control={control}
                        />
                        {stepsFields.length > 1 ? (
                          <IconButton
                            aria-label=""
                            icon={<CloseIcon />}
                            onClick={() => removeStep(index)}
                          />
                        ) : null}
                      </Stack>
                    </FormControl>
                  ))}
                  <Button
                    leftIcon={<FiPlus />}
                    onClick={() => appendStep({ title: '' })}
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
