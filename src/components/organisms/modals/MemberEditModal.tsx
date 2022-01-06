import {
  inviteMember,
  updateMember,
  uploadPicture,
} from '@api/entities/members'
import { nameSchema } from '@api/schemas'
import {
  Alert,
  AlertIcon,
  Avatar,
  Box,
  Button,
  FormControl,
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
  useToast,
  VStack,
} from '@chakra-ui/react'
import DurationSelect from '@components/atoms/DurationSelect'
import { yupResolver } from '@hookform/resolvers/yup'
import useCurrentOrg from '@hooks/useCurrentOrg'
import useMember from '@hooks/useMember'
import { format } from 'date-fns'
import React, { useCallback, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import MemberDeleteModal from './MemberDeleteModal'
import MemberModal from './MemberModal'

interface Props extends UseModalProps {
  id: string
}

interface Values {
  name: string
  picture?: string | null
  workedMinPerWeek?: number | null
}

const resolver = yupResolver(
  yup.object().shape({
    name: nameSchema,
    workedMinPerWeek: yup.number().nullable(),
  })
)

export default function MemberEditModal({ id, ...modalProps }: Props) {
  const member = useMember(id)
  const org = useCurrentOrg()
  const toast = useToast()

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<Values>({
    resolver,
    defaultValues: member && {
      name: member.name,
      workedMinPerWeek: member.workedMinPerWeek || null,
    },
  })

  const [picture, setPicture] = useState<string | undefined | null>(
    member?.picture
  )
  const pictureInputRef = useRef<HTMLInputElement>(null)
  const [pictureError, setPictureError] = useState<Error | undefined>()

  const onSubmit = handleSubmit(async (memberUpdate) => {
    // Upload picture
    const pictureFile = pictureInputRef.current?.files?.[0]
    if (pictureFile) {
      try {
        setPictureError(undefined)
        memberUpdate.picture = await uploadPicture(id, pictureFile)
        setPicture(memberUpdate.picture)
      } catch (error) {
        setPictureError(error as Error)
      }
    }

    // Update member data
    await updateMember(id, memberUpdate)
    modalProps.onClose()
  })

  const {
    isOpen: isMemberOpen,
    onOpen: onMemberOpen,
    onClose: onMemberClose,
  } = useDisclosure()

  const handleInvite = useCallback(() => {
    if (!member?.inviteEmail) return
    inviteMember(member.id, member.inviteEmail)
    toast({
      title: 'Membre invité',
      description: `Vous avez invité ${member.name} à rejoindre l'organisation`,
      status: 'success',
      duration: 4000,
      isClosable: true,
    })
  }, [member])

  if (!member) return null

  return (
    <>
      <Modal {...modalProps}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>Modifier le membre {member.name}</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <VStack spacing={5} align="stretch">
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel>Nom</FormLabel>
                  <Input {...register('name')} placeholder="Nom..." autoFocus />
                </FormControl>

                <FormControl isInvalid={!!pictureError}>
                  <FormLabel>Photo</FormLabel>
                  <HStack spacing={3}>
                    {picture && (
                      <Avatar name={member.name} src={picture} size="lg" />
                    )}
                    <Input
                      type="file"
                      name="pictureFiles"
                      ref={pictureInputRef}
                    />
                  </HStack>
                </FormControl>

                <FormControl isInvalid={!!errors.workedMinPerWeek}>
                  <FormLabel>Temps de travail pour l'organisation</FormLabel>
                  <Controller
                    name="workedMinPerWeek"
                    control={control}
                    render={({ field }) => (
                      <DurationSelect
                        placeholderValue={org?.defaultWorkedMinPerWeek}
                        value={field.value ?? null}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </FormControl>

                {member.userId && (
                  <Alert status="info">
                    <AlertIcon />
                    Ce membre est lié à un compte utilisateur.
                  </Alert>
                )}

                {!member.userId && member.inviteDate && member.inviteEmail && (
                  <Alert status="info">
                    <AlertIcon />
                    <Box>
                      Invitation envoyée à {member.inviteEmail} le{' '}
                      {format(member.inviteDate.toDate(), 'P')}, en attente
                      d'acceptation
                      <Button
                        variant="outline"
                        colorScheme="blue"
                        onClick={handleInvite}
                      >
                        Renvoyer
                      </Button>
                    </Box>
                  </Alert>
                )}

                <Box textAlign="right">
                  <Button
                    colorScheme="blue"
                    variant="ghost"
                    onClick={onMemberOpen}
                  >
                    Voir la fiche
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

      {isDeleteOpen && (
        <MemberDeleteModal
          id={id}
          onDelete={modalProps.onClose}
          isOpen
          onClose={onDeleteClose}
        />
      )}

      {isMemberOpen && <MemberModal id={id} isOpen onClose={onMemberClose} />}
    </>
  )
}
