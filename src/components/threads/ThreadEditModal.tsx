import {
  Alert,
  AlertIcon,
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
  useToast,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Member } from '@shared/member'
import { format } from 'date-fns'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { threadSchema } from 'src/api/entities/threads'
import {
  inviteMember,
  updateMember,
  uploadPicture,
} from '../../api/entities/members'
import useCurrentOrg from '../../hooks/useCurrentOrg'
import useMember from '../../hooks/useMember'
import { useNavigateOrg } from '../../hooks/useNavigateOrg'
import DurationSelect from '../common/DurationSelect'
import MemberDeleteModal from './ThreadDeleteModal'

interface Props extends UseModalProps {
  id: string
}

interface Values extends Partial<Member> {
  pictureFiles: FileList
}

export default function ThreadEditModal({ id, ...props }: Props) {
  const member = useMember(id)
  if (!member) return null

  const toast = useToast()
  const org = useCurrentOrg()

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  const { handleSubmit, errors, register, watch, setValue, reset } =
    useForm<Values>({
      resolver: yupResolver(threadSchema),
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

  const handleInvite = useCallback(() => {
    if (!member.inviteEmail) return
    inviteMember(member.id, member.inviteEmail)
    toast({
      title: 'Membre invité',
      description: `Vous avez invité ${member.name} à rejoindre l'organisation`,
      status: 'success',
      duration: 4000,
      isClosable: true,
    })
  }, [member])

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

      <MemberDeleteModal
        id={id}
        onDelete={props.onClose}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
      />
    </>
  )
}
