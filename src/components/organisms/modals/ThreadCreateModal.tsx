import { createThread, threadCreateSchema } from '@api/entities/threads'
import {
  Alert,
  AlertIcon,
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
  VStack,
} from '@chakra-ui/react'
import CircleComboboxController from '@components/molecules/search/CircleComboboxController'
import { yupResolver } from '@hookform/resolvers/yup'
import { Thread } from '@shared/thread'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { useForm } from 'react-hook-form'

interface Props extends UseModalProps {
  circleId?: string
  onCreate?: (id: string) => void
}

export default function ThreadCreateModal(props: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const userId = useStoreState((state) => state.auth.user?.id)

  const { handleSubmit, errors, register, control } = useForm<Thread>({
    resolver: yupResolver(threadCreateSchema),
    defaultValues: {
      title: '',
      circleId: props.circleId || '',
    },
  })

  const onSubmit = handleSubmit(async ({ circleId, title }) => {
    if (!orgId || !userId) return
    const thread = await createThread({ orgId, circleId, userId, title })
    props.onCreate?.(thread.id)
    props.onClose()
  })

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>Nouvelle discussion</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={5} align="stretch">
              <FormControl isInvalid={!!errors.title}>
                <FormLabel htmlFor="title">Titre</FormLabel>
                <Input name="title" placeholder="Titre..." ref={register()} />
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

              <Alert status="info">
                <AlertIcon />
                La discussion sera créée en brouillon, visible par vous
                uniquement.
              </Alert>

              <Box textAlign="right" mt={2}>
                <Button colorScheme="blue" type="submit">
                  Créer
                </Button>
              </Box>
            </VStack>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  )
}
