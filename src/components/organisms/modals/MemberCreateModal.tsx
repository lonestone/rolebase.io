import { createMember } from '@api/entities/members'
import { nameSchema } from '@api/schemas'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import MembersToCopyList from '@components/molecules/MembersToCopyList'
import { yupResolver } from '@hookform/resolvers/yup'
import useCreateLog from '@hooks/useCreateLog'
import { useOrgId } from '@hooks/useOrgId'
import { EntityChangeType, LogType } from '@shared/log'
import { MemberEntry } from '@shared/member'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

interface Props extends UseModalProps {
  onCreate?: (id: string) => void
}

interface Values {
  name: string
}

const resolver = yupResolver(
  yup.object().shape({
    name: nameSchema,
  })
)

export default function MemberCreateModal({ onCreate, ...modalProps }: Props) {
  const { t } = useTranslation()
  const orgId = useOrgId()
  const createLog = useCreateLog()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Values>({
    resolver,
  })

  const handleCreate = async ({ name }: Values) => {
    if (!orgId) return
    const member = await createMember({ orgId, name })
    onCreate?.(member.id)
    modalProps.onClose()

    // Log change
    createLog({
      display: {
        type: LogType.MemberCreate,
        id: member.id,
        name: member.name,
      },
      changes: {
        members: [
          { type: EntityChangeType.Create, id: member.id, data: member },
        ],
      },
    })
  }

  const handleCopy = (memberToCopy: MemberEntry) =>
    handleCreate({
      name: memberToCopy.name,
    })

  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(handleCreate)}>
          <ModalHeader>
            {t('organisms.modals.MemberCreateModal.heading')}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>
                {t('organisms.modals.MemberCreateModal.name')}
              </FormLabel>
              <Input {...register('name')} placeholder="Nom..." autoFocus />
            </FormControl>

            <Box textAlign="right" mt={2}>
              <Button colorScheme="blue" type="submit">
                {t('common.create')}
              </Button>
            </Box>

            <MembersToCopyList onClick={handleCopy} />
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  )
}
