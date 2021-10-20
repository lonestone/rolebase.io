import {
  Avatar,
  Box,
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
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  UseModalProps,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  MemberUpdate,
  memberUpdateSchema,
  updateMember,
  uploadPicture,
} from '../../api/entities/members'
import useCurrentOrg from '../../hooks/useCurrentOrg'
import useMember from '../../hooks/useMember'
import { useNavigateOrg } from '../../hooks/useNavigateOrg'
import DurationSelect from '../common/DurationSelect'
import MemberDeleteModal from './MemberDeleteModal'

interface Props extends UseModalProps {
  id: string
}

interface Values extends MemberUpdate {
  pictureFiles: FileList
}

export default function MemberEditModal({ id, ...props }: Props) {
  const member = useMember(id)
  const org = useCurrentOrg()

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  const { handleSubmit, errors, register, watch, setValue, reset } =
    useForm<Values>({
      resolver: yupResolver(memberUpdateSchema),
    })
  const [picture, setPicture] = useState<string | undefined | null>()

  // Init form data
  useEffect(() => {
    if (member && props.isOpen) {
      reset({
        name: member.name,
        workedMinPerWeek: member.workedMinPerWeek || null,
      })
      setPicture(member.picture)
    }
  }, [member, props.isOpen])

  // Register duration select
  const workedMinPerWeek = watch('workedMinPerWeek')
  useEffect(() => {
    register({ name: 'workedMinPerWeek' })
  }, [register])

  const onSubmit = handleSubmit(async ({ pictureFiles, ...memberUpdate }) => {
    // Upload picture
    if (pictureFiles && pictureFiles[0]) {
      memberUpdate.picture = await uploadPicture(id, pictureFiles[0])
      setPicture(memberUpdate.picture)
    }

    // Update member data
    await updateMember(id, memberUpdate)
    props.onClose()
  })

  // Go to member panel with roles
  const navigateOrg = useNavigateOrg()
  const navigateToMember = useCallback(() => {
    props.onClose()
    navigateOrg(`?memberId=${id}`)
  }, [id])

  if (!member) return null

  return (
    <>
      <Modal {...props}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>Editer le membre {member.name}</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <VStack spacing={5} align="stretch">
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

                <FormControl isInvalid={!!errors.workedMinPerWeek}>
                  <FormLabel htmlFor="workedMinPerWeek">
                    Temps de travail pour l'organisation
                  </FormLabel>
                  <DurationSelect
                    placeholderValue={org?.defaultWorkedMinPerWeek}
                    value={workedMinPerWeek ?? null}
                    onChange={(value) => setValue('workedMinPerWeek', value)}
                  />
                  <FormErrorMessage>
                    {errors.workedMinPerWeek && errors.workedMinPerWeek.message}
                  </FormErrorMessage>
                </FormControl>

                <Box textAlign="right">
                  <Button
                    colorScheme="blue"
                    variant="ghost"
                    onClick={navigateToMember}
                  >
                    Voir les rôles
                  </Button>
                  <Button
                    colorScheme="red"
                    variant="ghost"
                    onClick={onDeleteOpen}
                  >
                    Supprimer
                  </Button>
                  <Button colorScheme="blue" type="submit">
                    Enregistrer
                  </Button>
                </Box>
              </VStack>
            </ModalBody>
          </form>
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
