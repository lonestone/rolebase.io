import {
  Box,
  Button,
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
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Thread } from '@shared/thread'
import React from 'react'
import { useForm } from 'react-hook-form'
import { createThread, threadSchema } from '../../api/entities/threads'
import { useStoreState } from '../store/hooks'

interface Props extends UseModalProps {
  circleId?: string
  onCreate?: (id: string) => void
}

export default function ThreadCreateModal(props: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const userId = useStoreState((state) => state.auth.user?.id)

  const { handleSubmit, errors, register } = useForm<Thread>({
    resolver: yupResolver(threadSchema),
    defaultValues: {
      title: '',
      circleId: props.circleId,
    },
  })

  const onSubmit = handleSubmit(async ({ circleId, title }) => {
    if (!orgId || !userId || !circleId) return
    const thread = await createThread({ orgId, circleId, userId, title })
    props.onCreate?.(thread.id)
    props.onClose()
  })

  console.log(errors)

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>Nouvelle discussion</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl isInvalid={!!errors.title}>
              <FormLabel htmlFor="title">Titre</FormLabel>
              <Input
                name="title"
                placeholder="Titre..."
                ref={register()}
                autoFocus
              />
              <FormErrorMessage>
                {errors.title && errors.title.message}
              </FormErrorMessage>
            </FormControl>

            <Box textAlign="right" mt={2}>
              <Button colorScheme="blue" type="submit">
                Créer
              </Button>
            </Box>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  )
}
