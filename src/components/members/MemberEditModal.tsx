import {
  Avatar,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
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
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  MemberUpdate,
  memberUpdateSchema,
  updateMember,
  uploadPicture,
  useMember,
} from '../../data/members'
import TextError from '../TextError'
import MemberDeleteModal from './MemberDeleteModal'

interface Props {
  id: string
  isOpen: boolean
  onClose(): void
}

interface Values {
  name: string
  picture: string
  pictureFiles: FileList
}

export default function MemberEditModal({ id, isOpen, onClose }: Props) {
  const [data, loading, error] = useMember(id)
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  const { handleSubmit, errors, register, setValue } = useForm<Values>({
    resolver: yupResolver(memberUpdateSchema),
  })
  const [picture, setPicture] = useState<string | undefined | null>()

  // Init form data
  useEffect(() => {
    if (data && isOpen) {
      // Wait 0ms to prevent bug where input is cleared
      setTimeout(() => {
        setValue('name', data.name)
        setPicture(data.picture)
      }, 0)
    }
  }, [data, isOpen])

  const onSubmit = handleSubmit(async ({ name, pictureFiles }) => {
    const memberUpdate: MemberUpdate = { name }

    // Upload picture
    if (pictureFiles && pictureFiles[0]) {
      memberUpdate.picture = await uploadPicture(id, pictureFiles[0])
      setPicture(memberUpdate.picture)
    }

    // Update member data
    await updateMember(id, memberUpdate)
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
                <VStack spacing={3}>
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

                  <FormControl isInvalid={!!errors.pictureFiles}>
                    <FormLabel htmlFor="pictureFiles">Photo</FormLabel>
                    <HStack spacing={3}>
                      {picture && (
                        <Avatar name={data.name} src={picture} size="lg" />
                      )}
                      <Input name="pictureFiles" type="file" ref={register} />
                    </HStack>
                    <FormErrorMessage>
                      {errors.pictureFiles && errors.pictureFiles.message}
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

      <MemberDeleteModal
        id={id}
        onDelete={onClose}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
      />
    </>
  )
}
