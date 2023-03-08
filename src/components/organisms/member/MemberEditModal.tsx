import { inviteMember, updateMemberRole } from '@api/functions'
import DurationSelect from '@atoms/DurationSelect'
import ModalCloseStaticButton from '@atoms/ModalCloseStaticButton'
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
import { Member_Role_Enum, useUpdateMemberMutation } from '@gql'
import { yupResolver } from '@hookform/resolvers/yup'
import useCreateLog from '@hooks/useCreateLog'
import useCurrentMember from '@hooks/useCurrentMember'
import useCurrentOrg from '@hooks/useCurrentOrg'
import useMember from '@hooks/useMember'
import useOrgAdmin from '@hooks/useOrgAdmin'
import ActionsMenu from '@molecules/ActionsMenu'
import EditorController from '@molecules/editor/EditorController'
import MemberPictureEdit from '@molecules/member/MemberPictureEdit'
import SubscriptionReachedMemberLimitModal from '@organisms/subscription/SubscriptionReachedMemberLimitModal'
import { getEntityChanges } from '@shared/helpers/log/getEntityChanges'
import { EntityChangeType, LogType } from '@shared/model/log'
import { nameSchema } from '@shared/schemas'
import { format } from 'date-fns'
import React, { useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import MemberDeleteModal from './MemberDeleteModal'

interface Props extends UseModalProps {
  id: string
}

interface Values {
  name: string
  description: string
  workedMinPerWeek?: number | null
  role: Member_Role_Enum | ''
  inviteEmail: string
}

const resolver = yupResolver(
  yup.object().shape({
    name: nameSchema.required(),
    description: yup.string(),
    workedMinPerWeek: yup.number().nullable(),
    inviteEmail: yup.string().email(),
  })
)

export default function MemberEditModal({ id, ...modalProps }: Props) {
  const { t } = useTranslation()
  const member = useMember(id)
  const org = useCurrentOrg()
  const isAdmin = useOrgAdmin()
  const currentMember = useCurrentMember()
  const toast = useToast()
  const createLog = useCreateLog()
  const [updateMember] = useUpdateMemberMutation()

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  const {
    isOpen: isLimitReachedOpen,
    onOpen: onLimitReachedOpen,
    onClose: onLimitReachedClose,
  } = useDisclosure()

  const {
    handleSubmit,
    register,
    control,
    watch,
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

  const [loading, setLoading] = useState(false)
  const role = watch('role')

  const onSubmit = handleSubmit(
    async ({ role, inviteEmail, ...memberUpdate }) => {
      if (!org || !member) return

      setLoading(true)

      // Update member data
      await updateMember({ variables: { id, values: memberUpdate } })

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
      try {
        const newRole = role || undefined
        if (newRole !== member.role) {
          if (member.userId) {
            // Update role
            await updateMemberRole({
              memberId: id,
              orgId: org?.id ?? '',
              role: newRole,
            })
          } else if (newRole && inviteEmail) {
            // Invite member
            await inviteMember({
              memberId: member.id,
              role: newRole,
              email: inviteEmail,
            })
            toast({
              title: t('MemberEditModal.toastInvited', {
                member: member.name,
              }),
              status: 'success',
              duration: 4000,
              isClosable: true,
            })
          }
        }

        modalProps.onClose()
      } catch (error: any) {
        if (error?.response?.status === 402) {
          onLimitReachedOpen()
        } else {
          toast({
            title: t('common.error'),
            description: error?.response?.data || error?.message || undefined,
            status: 'error',
          })
        }
      }
      setLoading(false)
    }
  )

  const handleReInvite = useCallback(async () => {
    if (!member?.inviteEmail || !member.role) return
    setLoading(true)
    try {
      await inviteMember({
        memberId: member.id,
        role: member.role,
        email: member.inviteEmail,
      })
      toast({
        title: t('MemberEditModal.toastReInvited', {
          member: member.name,
        }),
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
    } catch (error: any) {
      toast({
        title: t('common.error'),
        description: error?.response?.data || error?.message || undefined,
        status: 'error',
      })
    }
    setLoading(false)
  }, [member])

  const handleRevokeInvite = useCallback(async () => {
    if (!member?.inviteEmail || !member.role) return
    setLoading(true)
    await updateMemberRole({
      memberId: member.id,
      orgId: org?.id ?? '',
    })
    setLoading(false)
    toast({
      title: t('MemberEditModal.toastRevocated'),
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
              {t('MemberEditModal.heading', {
                member: member.name,
              })}
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
                  size="lg"
                />

                <FormControl isInvalid={!!errors.name}>
                  <FormLabel>{t('common.name')}</FormLabel>
                  <Input
                    {...register('name')}
                    placeholder={t('common.namePlaceholder')}
                    autoFocus
                  />
                </FormControl>
              </HStack>
              <FormControl isInvalid={!!errors.description}>
                <FormLabel>{t('MemberEditModal.description')}</FormLabel>
                <EditorController
                  name="description"
                  placeholder={t('MemberEditModal.descriptionPlaceholder', {
                    name: member.name,
                  })}
                  control={control}
                />
              </FormControl>
              <FormControl isInvalid={!!errors.workedMinPerWeek}>
                <FormLabel>{t('MemberEditModal.workingTime')}</FormLabel>
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

              {isAdmin &&
                (member.userId ? (
                  <FormControl>
                    <FormLabel>
                      {t('MemberEditModal.invitation.userInvited')}
                    </FormLabel>
                    <Select {...register('role')}>
                      <option value={''}>
                        {t('MemberEditModal.invitation.options.revoke')}
                      </option>
                      <option value={Member_Role_Enum.Readonly}>
                        {t('MemberEditModal.invitation.options.readonly')}
                      </option>
                      <option value={Member_Role_Enum.Member}>
                        {t('MemberEditModal.invitation.options.member')}
                      </option>
                      <option value={Member_Role_Enum.Admin}>
                        {t('MemberEditModal.invitation.options.admin')}
                      </option>
                      <option value={Member_Role_Enum.Owner}>
                        {t('MemberEditModal.invitation.options.owner')}
                      </option>
                    </Select>
                  </FormControl>
                ) : member.inviteDate && member.inviteEmail ? (
                  <Alert status="info">
                    <AlertIcon />
                    <Box>
                      {t('MemberEditModal.invitation.awaiting', {
                        email: member.inviteEmail,
                        date: format(new Date(member.inviteDate), 'P'),
                      })}
                      <Button
                        variant="link"
                        colorScheme="blue"
                        ml={3}
                        isLoading={loading}
                        onClick={handleReInvite}
                      >
                        {t('MemberEditModal.invitation.resend')}
                      </Button>
                      <Button
                        variant="link"
                        colorScheme="blue"
                        ml={3}
                        isLoading={loading}
                        onClick={handleRevokeInvite}
                      >
                        {t('MemberEditModal.invitation.revoke')}
                      </Button>
                    </Box>
                  </Alert>
                ) : (
                  <FormControl isInvalid={!!errors.inviteEmail}>
                    <FormLabel>
                      {t('MemberEditModal.invitation.invite')}
                    </FormLabel>
                    <HStack>
                      <Select
                        {...register('role')}
                        placeholder={t(
                          'MemberEditModal.invitation.rolePlaceholder'
                        )}
                      >
                        <option value={Member_Role_Enum.Readonly}>
                          {t('MemberEditModal.invitation.options.readonly')}
                        </option>
                        <option value={Member_Role_Enum.Member}>
                          {t('MemberEditModal.invitation.options.member')}
                        </option>
                        <option value={Member_Role_Enum.Admin}>
                          {t('MemberEditModal.invitation.options.admin')}
                        </option>
                        <option value={Member_Role_Enum.Owner}>
                          {t('MemberEditModal.invitation.options.owner')}
                        </option>
                      </Select>
                      {role && (
                        <Input
                          {...register('inviteEmail')}
                          placeholder={t(
                            'MemberEditModal.invitation.emailPlaceholder'
                          )}
                        />
                      )}
                    </HStack>
                  </FormControl>
                ))}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" isLoading={loading} onClick={onSubmit}>
              {t('common.save')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {isLimitReachedOpen && (
        <SubscriptionReachedMemberLimitModal
          isOpen
          onClose={onLimitReachedClose}
        />
      )}

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
