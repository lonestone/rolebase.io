import { createThread, threadSchema, updateThread } from '@api/entities/threads'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  UseModalProps,
  VStack,
} from '@chakra-ui/react'
import ParticipantsNumber from '@components/atoms/ParticipantsNumber'
import MembersSelect from '@components/molecules/MembersSelect'
import EntityButtonCombobox from '@components/molecules/search/EntityButtonCombobox'
import { yupResolver } from '@hookform/resolvers/yup'
import useItemsArray from '@hooks/useItemsArray'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import { MembersScope } from '@shared/member'
import { ThreadEntry } from '@shared/thread'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

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

export default function ThreadModal({
  defaultCircleId,
  thread,
  ...modalProps
}: Props) {
  const navigateOrg = useNavigateOrg()
  const orgId = useStoreState((state) => state.orgs.currentId)
  const userId = useStoreState((state) => state.auth.user?.id)

  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = useForm<Values>({
    resolver: yupResolver(threadSchema),
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
    if (!orgId || !userId) return
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
        userId,
        ...threadUpdate,
      })
      // Go to thread page
      navigateOrg(`/threads/${thread.id}`)
    }
    modalProps.onClose()
  })

  return (
    <Modal size="xl" {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>
            {thread ? 'Modifier une discussion' : 'Nouvelle discussion'}
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
                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
              </FormControl>

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
                <FormErrorMessage>{errors.circleId?.message}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel
                  htmlFor="participantsScope"
                  display="flex"
                  alignItems="center"
                >
                  Inviter
                  <ParticipantsNumber
                    ml={2}
                    circleId={circleId}
                    participantsScope={participantsScope}
                    participantsMembersIds={participantsMembersIds}
                  />
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

              <FormControl>
                <FormLabel>Paramètres</FormLabel>
                <Checkbox {...register('archived')}>Archivé</Checkbox>
              </FormControl>

              <Box textAlign="right" mt={2}>
                <Button colorScheme="blue" type="submit">
                  {thread ? 'Enregistrer' : 'Créer'}
                </Button>
              </Box>
            </VStack>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  )
}
