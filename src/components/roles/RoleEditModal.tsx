import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  RoleUpdate,
  roleUpdateSchema,
  updateRole,
  useRole,
} from '../../data/roles'
import Loading from '../Loading'
import TextErrors from '../TextErrors'
import RoleDeleteModal from './RoleDeleteModal'

interface Props {
  id: string
  isOpen: boolean
  onClose(): void
}

export default function RoleEditModal({ id, isOpen, onClose }: Props) {
  const [data, loading, error] = useRole(id)
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  const { handleSubmit, errors, register, setValue } = useForm<RoleUpdate>({
    resolver: yupResolver(roleUpdateSchema),
  })

  // Init form data
  useEffect(() => {
    if (data && isOpen) {
      // Wait 0ms to prevent bug where input is cleared
      setTimeout(() => {
        setValue('name', data.name)
        setValue('purpose', data.purpose)
        setValue('domain', data.domain)
        setValue('accountabilities', data.accountabilities)
      }, 0)
    }
  }, [data, isOpen])

  const onSubmit = handleSubmit((values) => {
    updateRole(id, values)
    onClose()
  })

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Loading active={loading} />
          <TextErrors errors={[error]} />

          {data && (
            <form onSubmit={onSubmit}>
              <ModalHeader>Editer le rôle {data.name}</ModalHeader>
              <ModalCloseButton />

              <ModalBody>
                <VStack spacing={3}>
                  <FormControl isInvalid={!!errors.name}>
                    <FormLabel htmlFor="name">Nom du rôle</FormLabel>
                    <Input
                      name="name"
                      placeholder="Nom..."
                      ref={register}
                      autoFocus
                    />
                    <FormErrorMessage>
                      {errors.name && errors.name.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.purpose}>
                    <FormLabel htmlFor="purpose">Raison d'être</FormLabel>
                    <Input
                      name="purpose"
                      placeholder="But qu'il poursuit..."
                      ref={register}
                      autoFocus
                    />
                    <FormErrorMessage>
                      {errors.purpose && errors.purpose.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.domain}>
                    <FormLabel htmlFor="domain">Domaine</FormLabel>
                    <Input
                      name="domain"
                      placeholder="Ce qu'il est seul à pouvoir faire..."
                      ref={register}
                      autoFocus
                    />
                    <FormErrorMessage>
                      {errors.domain && errors.domain.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.accountabilities}>
                    <FormLabel htmlFor="accountabilities">
                      Redevabilités
                    </FormLabel>
                    <Input
                      name="accountabilities"
                      placeholder="Ce qu'il doit faire..."
                      ref={register}
                      autoFocus
                    />
                    <FormErrorMessage>
                      {errors.accountabilities &&
                        errors.accountabilities.message}
                    </FormErrorMessage>
                  </FormControl>
                </VStack>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="red"
                  variant="ghost"
                  onClick={onDeleteOpen}
                >
                  Supprimer
                </Button>
                <Button colorScheme="blue" mr={3} type="submit">
                  Enregistrer
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>

      <RoleDeleteModal
        id={id}
        onDelete={onClose}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
      />
    </>
  )
}
