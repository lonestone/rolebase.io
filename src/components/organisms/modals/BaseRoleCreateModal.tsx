import { createRole } from '@api/entities/roles'
import { nameSchema } from '@api/schemas'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import useCreateLog from '@hooks/useCreateLog'
import { useOrgId } from '@hooks/useOrgId'
import { EntityChangeType, LogType } from '@shared/model/log'
import { Role } from '@shared/model/role'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

interface Props extends UseModalProps {
  onCreate?: (id: string) => void
}

const resolver = yupResolver(
  yup.object().shape({
    name: nameSchema,
  })
)

export default function BaseRoleCreateModal({
  onCreate,
  ...modalProps
}: Props) {
  const { t } = useTranslation()
  const orgId = useOrgId()
  const createLog = useCreateLog()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Role>({
    resolver,
  })

  const onSubmit = handleSubmit(async ({ name }) => {
    if (!orgId) return
    const role = await createRole({
      orgId,
      base: true,
      name,
      singleMember: true,
    })
    onCreate?.(role.id)

    modalProps.onClose()

    // Log change
    createLog({
      display: {
        type: LogType.RoleCreate,
        id: role.id,
        name: role.name,
      },
      changes: {
        roles: [{ type: EntityChangeType.Create, id: role.id, data: role }],
      },
    })
  })

  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>
            {t('organisms.modals.BaseRoleCreateModal.heading')}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>
                {t('organisms.modals.BaseRoleCreateModal.name')}
              </FormLabel>
              <Input {...register('name')} placeholder="Nom..." autoFocus />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" type="submit">
              {t('common.create')}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
