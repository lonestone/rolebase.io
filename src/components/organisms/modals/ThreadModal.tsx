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
import MembersSelect from '@components/molecules/MembersSelect'
import EntityButtonComboboxController from '@components/molecules/search/EntityButtonComboboxController'
import { yupResolver } from '@hookform/resolvers/yup'
import useItemsArray from '@hooks/useItemsArray'
import { MembersScope } from '@shared/member'
import { Thread, ThreadEntry } from '@shared/thread'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { useForm } from 'react-hook-form'

interface Props extends UseModalProps {
  defaultCircleId?: string
  thread?: ThreadEntry
  onCreate?: (id: string) => void
}

export default function ThreadModal({
  defaultCircleId,
  thread,
  onCreate,
  ...modalProps
}: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const userId = useStoreState((state) => state.auth.user?.id)

  const { handleSubmit, errors, register, control } = useForm<Thread>({
    resolver: yupResolver(threadSchema),
    defaultValues: thread || {
      title: '',
      circleId: defaultCircleId || '',
      participantsScope: MembersScope.CircleLeaders,
      draft: true,
      archived: false,
    },
  })

  // Participants members ids
  const {
    items: participantsMembersIds,
    add: addParticipant,
    remove: removeParticipant,
  } = useItemsArray<string>(thread ? thread.participantsMembersIds : [])

  const onSubmit = handleSubmit(
    async ({ circleId, title, participantsScope, draft, archived }) => {
      if (!orgId || !userId) return
      const threadUpdate = {
        circleId,
        title,
        draft,
        archived,
        participantsScope,
        participantsMembersIds,
      }
      if (thread) {
        await updateThread(thread.id, threadUpdate)
      } else {
        const thread = await createThread({
          orgId,
          userId,
          ...threadUpdate,
        })
        onCreate?.(thread.id)
      }
      modalProps.onClose()
    }
  )

  return (
    <Modal {...modalProps}>
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
                  name="title"
                  placeholder="Titre..."
                  autoFocus
                  ref={register()}
                />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.circleId}>
                <FormLabel htmlFor="circleId">Cercle / Rôle</FormLabel>
                <EntityButtonComboboxController
                  circles
                  name="circleId"
                  control={control}
                />
                <FormErrorMessage>
                  {errors.circleId && errors.circleId.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="participantsScope">Inviter</FormLabel>
                <Select name="participantsScope" ref={register()}>
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
                <Checkbox name="draft" ref={register()}>
                  Brouillon
                </Checkbox>
                <Checkbox name="archived" ml={5} ref={register()}>
                  Archivé
                </Checkbox>
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
