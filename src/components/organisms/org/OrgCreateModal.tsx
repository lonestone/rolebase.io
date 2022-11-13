import { createOrg } from '@api/functions'
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
import TextError from '@components/atoms/TextError'
import { yupResolver } from '@hookform/resolvers/yup'
import { nameSchema } from '@shared/schemas'
import { useStoreState } from '@store/hooks'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'

interface Values {
  name: string
}

const resolver = yupResolver(
  yup.object().shape({
    name: nameSchema.required(),
  })
)

export default function OrgCreateModal(modalProps: UseModalProps) {
  const { t } = useTranslation()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | undefined>()
  const orgs = useStoreState((state) => state.orgs.entries)
  const [orgId, setOrgId] = useState<string | undefined>()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Values>({
    resolver,
  })

  const onSubmit = handleSubmit(async ({ name }) => {
    setLoading(true)
    setError(undefined)
    try {
      // Create org
      const orgId = await createOrg({ name })
      setOrgId(orgId)
    } catch (e) {
      setError(e as Error)
      setLoading(false)
    }
  })

  // Redirect after creation and loading of new organization
  useEffect(() => {
    if (orgId && orgs?.some((org) => org.id === orgId)) {
      modalProps.onClose()
      history.push(`/orgs/${orgId}`)
    }
  }, [orgs])

  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>{t('OrgCreateModal.heading')}</ModalHeader>
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
          </ModalBody>

          <ModalFooter>
            {error && <TextError error={error} />}
            <Button colorScheme="blue" type="submit" isLoading={loading} ml={3}>
              {t('common.create')}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
