import { threadEditSchema, updateThread } from '@api/entities/threads'
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
  UseModalProps,
  VStack,
} from '@chakra-ui/react'
import CircleComboboxController from '@components/molecules/search/CircleComboboxController'
import { yupResolver } from '@hookform/resolvers/yup'
import { Thread, ThreadEntry } from '@shared/thread'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface Props extends UseModalProps {
  thread: ThreadEntry
}

export default function ThreadEditModal({ thread, ...modalProps }: Props) {
  const { handleSubmit, errors, register, control, reset } = useForm<Thread>({
    resolver: yupResolver(threadEditSchema),
  })

  // Init form data
  useEffect(() => {
    if (!modalProps.isOpen) return
    reset(thread)
  }, [thread, modalProps.isOpen])

  const onSubmit = handleSubmit(
    async ({ circleId, title, draft, archived }) => {
      await updateThread(thread.id, { circleId, title, draft, archived })
      modalProps.onClose()
    }
  )

  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>Modifier une discussion</ModalHeader>
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
                <CircleComboboxController name="circleId" control={control} />
                <FormErrorMessage>
                  {errors.circleId && errors.circleId.message}
                </FormErrorMessage>
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
                  Enregistrer
                </Button>
              </Box>
            </VStack>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  )
}
