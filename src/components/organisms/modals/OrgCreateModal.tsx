import { createOrg } from '@api/entities/orgs'
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
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import TextError from '@components/atoms/TextError'
import { yupResolver } from '@hookform/resolvers/yup'
import { useStoreActions, useStoreState } from '@store/hooks'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'

interface Values {
  name: string
}

const resolver = yupResolver(
  yup.object().shape({
    name: nameSchema,
  })
)

export default function OrgCreateModal(modalProps: UseModalProps) {
  const { t } = useTranslation()
  const user = useStoreState((state) => state.auth.user)
  const refreshClaims = useStoreActions((actions) => actions.auth.refreshClaims)
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | undefined>()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Values>({
    resolver,
  })

  const onSubmit = handleSubmit(async ({ name }) => {
    if (!user) {
      console.error('User not logged in')
      return
    }
    setLoading(true)
    setError(undefined)
    try {
      // Create org
      const orgId = await createOrg(name)

      // Refresh user claims
      await refreshClaims()

      modalProps.onClose()
      history.push(`/orgs/${orgId}`)
    } catch (e) {
      setError(e as Error)
    }
    setLoading(false)
  })

  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>
            {t('organisms.modals.OrgCreateModal.heading')}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>{t('organisms.modals.OrgCreateModal.name')}</FormLabel>
              <Input {...register('name')} autoFocus />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Box>
              <Button colorScheme="blue" type="submit" isLoading={loading}>
                {t('common.create')}
              </Button>
              {error && <TextError error={error} />}
            </Box>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
