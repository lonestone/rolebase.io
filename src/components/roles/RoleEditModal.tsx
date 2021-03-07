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
  UseModalProps,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  RoleUpdate,
  roleUpdateSchema,
  updateRole,
} from '../../api/entities/roles'
import useRole from '../../hooks/useRole'
import RoleDeleteModal from './RoleDeleteModal'

interface Props extends UseModalProps {
  id: string
}

export default function RoleEditModal({ id, ...props }: Props) {
  const role = useRole(id)

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  const { handleSubmit, errors, register, reset } = useForm<RoleUpdate>({
    resolver: yupResolver(roleUpdateSchema),
  })

  // Init form data
  useEffect(() => {
    if (role && props.isOpen) {
      reset({
        name: role.name,
        purpose: role.purpose,
        domain: role.domain,
        accountabilities: role.accountabilities,
      })
    }
  }, [role, props.isOpen])

  const onSubmit = handleSubmit((values) => {
    updateRole(id, values)
    props.onClose()
  })

  if (!role) return null

  return (
    <>
      <Modal {...props}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>Editer le rôle {role.name}</ModalHeader>
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
                    {errors.accountabilities && errors.accountabilities.message}
                  </FormErrorMessage>
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" variant="ghost" onClick={onDeleteOpen}>
                Supprimer
              </Button>
              <Button colorScheme="blue" mr={3} type="submit">
                Enregistrer
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      <RoleDeleteModal
        id={id}
        onDelete={props.onClose}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
      />
    </>
  )
}
