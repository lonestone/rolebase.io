import {
  inviteMember,
  memberUpdateSchema,
  updateMember,
  uploadPicture,
} from '@api/entities/members'
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
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import { format } from 'date-fns'
import React, { useCallback, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import MemberDeleteModal from './MemberDeleteModal'

interface Props extends UseModalProps {
  id: string
}

interface Values {
  name: string
  picture?: string | null
  workedMinPerWeek?: number | null
}

export default function MemberEditModal({ id, ...props }: Props) {
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
    resolver: yupResolver(memberUpdateSchema),
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
    props.onClose()
  })

  // Go to member panel with roles
  const navigateOrg = useNavigateOrg()
  const navigateToMember = useCallback(() => {
    props.onClose()
    navigateOrg(`?memberId=${id}`)
  }, [id])

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
      <Modal {...props}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>Modifier le membre {member.name}</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <VStack spacing={5} align="stretch">
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel htmlFor="name">Nom</FormLabel>
                  <Input {...register('name')} placeholder="Nom..." autoFocus />
                </FormControl>

                <FormControl isInvalid={!!pictureError}>
                  <FormLabel htmlFor="pictureFiles">Photo</FormLabel>
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
                  <FormLabel htmlFor="workedMinPerWeek">
                    Temps de travail pour l'organisation
                  </FormLabel>
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

      {isDeleteOpen && (
        <MemberDeleteModal
          id={id}
          onDelete={props.onClose}
          isOpen
          onClose={onDeleteClose}
        />
      )}
    </>
  )
}
