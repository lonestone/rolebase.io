import {
  inviteMember,
  updateMember,
  updateMemberRole,
} from '@api/entities/members'
import { nameSchema } from '@api/schemas'
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spacer,
  useDisclosure,
  UseModalProps,
  useToast,
  VStack,
} from '@chakra-ui/react'
import DurationSelect from '@components/atoms/DurationSelect'
import ActionsMenu from '@components/molecules/ActionsMenu'
import MarkdownEditorController from '@components/molecules/editor/MarkdownEditorController'
import MemberPictureEdit from '@components/molecules/MemberPictureEdit'
import { yupResolver } from '@hookform/resolvers/yup'
import useCreateLog from '@hooks/useCreateLog'
import useCurrentOrg from '@hooks/useCurrentOrg'
import useMember from '@hooks/useMember'
import { useOrgRole } from '@hooks/useOrgRole'
import { EntityChangeType, getEntityChanges, LogType } from '@shared/log'
import { ClaimRole } from '@shared/userClaims'
import { format } from 'date-fns'
import React, { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import MemberDeleteModal from './MemberDeleteModal'
import ModalCloseStaticButton from './ModalCloseStaticButton'

interface Props extends UseModalProps {
  id: string
}

interface Values {
  name: string
  description: string
  workedMinPerWeek?: number | null
  role: ClaimRole | ''
  inviteEmail: string
}

const resolver = yupResolver(
  yup.object().shape({
    name: nameSchema,
    description: yup.string(),
    workedMinPerWeek: yup.number().nullable(),
    inviteEmail: yup.string().email(),
  })
)

export default function MemberEditModal({ id, ...modalProps }: Props) {
  const member = useMember(id)
  const org = useCurrentOrg()
  const userRole = useOrgRole()
  const toast = useToast()
  const createLog = useCreateLog()

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
      description: member.description,
      workedMinPerWeek: member.workedMinPerWeek || null,
      role: member.role || '',
      inviteEmail: '',
    },
  })

  const onSubmit = handleSubmit(
    async ({ role, inviteEmail, ...memberUpdate }) => {
      if (!org || !member) return

      // Update member data
      await updateMember(id, memberUpdate)

      // Log change
      createLog({
        display: {
          type: LogType.MemberUpdate,
          id,
          name: member.name,
        },
        changes: {
          members: [
            {
              type: EntityChangeType.Update,
              id,
              ...getEntityChanges(member, memberUpdate),
            },
          ],
        },
      })

      // Change role
      const newRole = role || undefined
      if (newRole !== member.role) {
        if (member.userId) {
          // Update role
          updateMemberRole(id, newRole)
        } else if (newRole && inviteEmail) {
          // Invite member
          inviteMember(member.id, newRole, inviteEmail)
          toast({
            title: 'Membre invité',
            description: `Vous avez invité ${member.name} à rejoindre l'organisation`,
            status: 'success',
            duration: 4000,
            isClosable: true,
          })
        }
      }

      modalProps.onClose()
    }
  )

  const handleReInvite = useCallback(() => {
    if (!member?.inviteEmail || !member.role) return
    inviteMember(member.id, member.role, member.inviteEmail)
    toast({
      title: 'Membre invité',
      description: `Vous avez ré-invité ${member.name} à rejoindre l'organisation`,
      status: 'success',
      duration: 4000,
      isClosable: true,
    })
  }, [member])

  const handleRevokeInvite = useCallback(() => {
    if (!member?.inviteEmail || !member.role) return
    updateMemberRole(member.id, undefined)
    toast({
      title: 'Invitation révoquée',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }, [member])

  if (!member) return null

  return (
    <>
      <Modal {...modalProps}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex>
              Modifier le membre {member.name}
              <Spacer />
              <ActionsMenu onDelete={onDeleteOpen} />
              <ModalCloseStaticButton />
            </Flex>
          </ModalHeader>

          <ModalBody>
            <VStack spacing={5} align="stretch">
              <HStack spacing={5} align="center">
                <MemberPictureEdit
                  id={id}
                  name={member.name}
                  src={member.picture || undefined}
                />

                <FormControl isInvalid={!!errors.name}>
                  <FormLabel>Nom</FormLabel>
                  <Input {...register('name')} placeholder="Nom..." autoFocus />
                </FormControl>
              </HStack>
              <FormControl isInvalid={!!errors.description}>
                <FormLabel>Description</FormLabel>
                <MarkdownEditorController
                  name="description"
                  placeholder={`Qui est ${member.name} ?`}
                  control={control}
                />
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

              {userRole === ClaimRole.Admin &&
                (member.userId ? (
                  <FormControl>
                    <FormLabel>Utilisateur invité</FormLabel>
                    <Select {...register('role')}>
                      <option value={''}>Révoquer l'invitation</option>
                      <option value={ClaimRole.Readonly}>Lecture seule</option>
                      <option value={ClaimRole.Member}>Membre</option>
                      <option value={ClaimRole.Admin}>Admin</option>
                    </Select>
                  </FormControl>
                ) : member.inviteDate && member.inviteEmail ? (
                  <Alert status="info">
                    <AlertIcon />
                    <Box>
                      Invitation envoyée à {member.inviteEmail} le{' '}
                      {format(member.inviteDate.toDate(), 'P')}, en attente
                      d'acceptation
                      <Button
                        variant="link"
                        colorScheme="blue"
                        ml={3}
                        onClick={handleReInvite}
                      >
                        Renvoyer
                      </Button>
                      <Button
                        variant="link"
                        colorScheme="blue"
                        ml={3}
                        onClick={handleRevokeInvite}
                      >
                        Révoquer
                      </Button>
                    </Box>
                  </Alert>
                ) : (
                  <FormControl isInvalid={!!errors.inviteEmail}>
                    <FormLabel>Inviter</FormLabel>
                    <HStack>
                      <Select
                        {...register('role')}
                        placeholder="Choisir un rôle"
                      >
                        <option value={ClaimRole.Readonly}>
                          Lecture seule
                        </option>
                        <option value={ClaimRole.Member}>Membre</option>
                        <option value={ClaimRole.Admin}>Admin</option>
                      </Select>
                      <Input
                        {...register('inviteEmail')}
                        placeholder="Adresse email..."
                      />
                    </HStack>
                  </FormControl>
                ))}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={onSubmit}>
              Enregistrer
            </Button>
          </ModalFooter>
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
    </>
  )
}
