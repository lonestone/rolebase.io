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
  useDisclosure,
  UseModalProps,
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
  useContextMember,
} from '../../api/entities/members'
import Loading from '../common/Loading'
import TextErrors from '../common/TextErrors'
import MemberDeleteModal from './MemberDeleteModal'

interface Props extends UseModalProps {
  id: string
}

interface Values {
  name: string
  picture: string
  pictureFiles: FileList
}

export default function MemberEditModal({ id, ...props }: Props) {
  const [member, loading, error] = useContextMember(id)
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  const { handleSubmit, errors, register, reset } = useForm<Values>({
    resolver: yupResolver(memberUpdateSchema),
  })
  const [picture, setPicture] = useState<string | undefined | null>()

  // Init form data
  useEffect(() => {
    if (member && props.isOpen) {
      reset({ name: member.name })
      setPicture(member.picture)
    }
  }, [member, props.isOpen])

  const onSubmit = handleSubmit(async ({ name, pictureFiles }) => {
    const memberUpdate: MemberUpdate = { name }

    // Upload picture
    if (pictureFiles && pictureFiles[0]) {
      memberUpdate.picture = await uploadPicture(id, pictureFiles[0])
      setPicture(memberUpdate.picture)
    }

    // Update member data
    await updateMember(id, memberUpdate)
    props.onClose()
  })

  return (
    <>
      <Modal {...props}>
        <ModalOverlay />
        <ModalContent>
          <Loading active={loading} />
          <TextErrors errors={[error]} />

          {member && (
            <form onSubmit={onSubmit}>
              <ModalHeader>Editer le membre {member.name}</ModalHeader>
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
                        <Avatar name={member.name} src={picture} size="lg" />
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
        onDelete={props.onClose}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
      />
    </>
  )
}
