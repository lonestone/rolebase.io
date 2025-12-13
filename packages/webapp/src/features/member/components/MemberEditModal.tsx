import {
  AVATAR_HEADING_WIDTH,
  getResizedImageUrl,
} from '@/common/api/storage_images'
import DurationSelect from '@/common/atoms/DurationSelect'
import ModalCloseStaticButton from '@/common/atoms/ModalCloseStaticButton'
import EditorController from '@/editor/components/EditorController'
import useCreateLog from '@/log/hooks/useCreateLog'
import useCurrentOrg from '@/org/hooks/useCurrentOrg'
import {
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
  Spacer,
  UseModalProps,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { useUpdateMemberMutation } from '@gql'
import { yupResolver } from '@hookform/resolvers/yup'
import { getEntityChanges } from '@rolebase/shared/helpers/log/getEntityChanges'
import { EntityChangeType, LogType } from '@rolebase/shared/model/log'
import { nameSchema } from '@rolebase/shared/schemas'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import useMember from '../hooks/useMember'
import useOrgAdmin from '../hooks/useOrgAdmin'
import MemberDeleteModal from '../modals/MemberDeleteModal'
import MemberOrgRoleSelect from './MemberOrgRoleSelect'
import MemberPictureEdit from './MemberPictureEdit'

interface Props extends UseModalProps {
  id: string
}

interface Values {
  name: string
  description: string
  workedMinPerWeek?: number | null
}

const resolver = yupResolver(
  yup.object().shape({
    name: nameSchema.required(),
    description: yup.string(),
    workedMinPerWeek: yup.number().nullable(),
  })
)

export default function MemberEditModal({ id, ...modalProps }: Props) {
  const { t } = useTranslation()
  const member = useMember(id)
  const org = useCurrentOrg()
  const isAdmin = useOrgAdmin()
  const createLog = useCreateLog()
  const [updateMember] = useUpdateMemberMutation()

  const deleteModal = useDisclosure()

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
    },
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = handleSubmit(async (memberUpdate) => {
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

    modalProps.onClose()
    setLoading(false)
  })

  if (!member) return null

  return (
    <>
      <Modal size="xl" {...modalProps}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex>
              {t('MemberEditModal.heading', {
                member: member.name,
              })}
              <Spacer />
              <ModalCloseStaticButton />
            </Flex>
          </ModalHeader>

          <ModalBody>
            <VStack spacing={5} align="stretch">
              <HStack spacing={5} align="center">
                <MemberPictureEdit
                  id={id}
                  name={member.name}
                  src={
                    getResizedImageUrl(member.picture, AVATAR_HEADING_WIDTH) ||
                    undefined
                  }
                  size="lg"
                />

                <FormControl isInvalid={!!errors.name}>
                  <FormLabel>{t('common.name')}</FormLabel>
                  <Input {...register('name')} autoFocus autoComplete="off" />
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

              {isAdmin && (
                <FormControl>
                  <FormLabel>
                    {t('MemberEditModal.invitation.heading')}
                  </FormLabel>
                  <MemberOrgRoleSelect member={member} />
                </FormControl>
              )}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              variant="ghost"
              mr={2}
              onClick={deleteModal.onOpen}
            >
              {t('common.delete')}
            </Button>
            <Button colorScheme="blue" isLoading={loading} onClick={onSubmit}>
              {t('common.save')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {deleteModal.isOpen && (
        <MemberDeleteModal
          id={id}
          onDelete={modalProps.onClose}
          isOpen
          onClose={deleteModal.onClose}
        />
      )}
    </>
  )
}
