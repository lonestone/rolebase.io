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
  Spinner,
  useDisclosure,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  MemberUpdate,
  memberUpdateSchema,
  updateMember,
  useMember,
} from '../../data/members'
import TextError from '../TextError'
import MemberDeleteModal from './MemberDeleteModal'

interface Props {
  id: string
  isOpen: boolean
  onClose(): void
}

export default function MemberEditModal({ id, isOpen, onClose }: Props) {
  const [data, loading, error] = useMember(id)
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  const { handleSubmit, errors, register, setValue } = useForm<MemberUpdate>({
    resolver: yupResolver(memberUpdateSchema),
  })

  // Init form data
  useEffect(() => {
    if (data && isOpen) {
      // Wait 0ms to prevent bug where input is cleared
      setTimeout(() => {
        setValue('name', data.name)
      }, 0)
    }
  }, [data, isOpen])

  const onSubmit = handleSubmit((values) => {
    updateMember(id, values)
    onClose()
  })

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {error && <TextError error={error} />}
          {loading && <Spinner />}
          {data && (
            <form onSubmit={onSubmit}>
              <ModalHeader>Editer le membre {data.name}</ModalHeader>
              <ModalCloseButton />

              <ModalBody>
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel htmlFor="name">Nom</FormLabel>
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

      <MemberDeleteModal
        id={id}
        onDelete={onClose}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
      />
    </>
  )
}
