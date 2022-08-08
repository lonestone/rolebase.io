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
import useCreateMember from '@hooks/useCreateMember'
import { useOrgId } from '@hooks/useOrgId'
import { MemberEntry } from '@shared/model/member'
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
  const createMember = useCreateMember()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Values>({
    resolver,
  })

  const handleCreate = async ({ name }: Values) => {
    if (!orgId) return
    const memberId = await createMember(name)
    onCreate?.(memberId)
    modalProps.onClose()
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
          <ModalHeader>{t('MemberCreateModal.heading')}</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>{t('common.name')}</FormLabel>
              <Input
                {...register('name')}
                placeholder={t('common.namePlaceholder')}
                autoFocus
              />
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
