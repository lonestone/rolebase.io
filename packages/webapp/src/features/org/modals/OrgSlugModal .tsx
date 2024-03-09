import { updateOrgSlug } from '@/org/api/org_functions'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
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
import { slugSchema } from '@rolebase/shared/schemas'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import slugify from 'slugify'
import settings from 'src/settings'
import * as yup from 'yup'
import useOrg from '../hooks/useOrg'

interface Props extends UseModalProps {
  id: string
}

interface Values {
  slug: string | null
}

const resolver = yupResolver(
  yup.object().shape({
    slug: slugSchema.required(),
  })
)

export default function OrgSlugModal({ id, ...modalProps }: Props) {
  const { t } = useTranslation()
  const org = useOrg(id)
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty },
    setError,
  } = useForm<Values>({
    resolver,
  })
  const [loading, setLoading] = useState(false)

  // Init form data
  useEffect(() => {
    if (!org) return
    reset({
      slug: org.slug,
    })
  }, [org])

  const onSubmit = handleSubmit(async ({ slug }) => {
    if (!slug) return
    try {
      setLoading(true)
      await updateOrgSlug({ orgId: id, slug })

      // Redirect to new path
      navigate(`/${slug}`)

      modalProps.onClose()
    } catch (e: any) {
      setLoading(false)
      const message =
        e.message === 'Conflict'
          ? t('OrgSlugModal.already-exists')
          : e.message || e.toString()
      setError('slug', { message })
    }
  })

  if (!org) return null

  return (
    <>
      <Modal size="lg" {...modalProps}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>
              {t('OrgSlugModal.heading', { org: org.name })}
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <FormControl isInvalid={!!errors.slug}>
                <FormLabel>{t('OrgSlugModal.slug')}</FormLabel>
                <InputGroup>
                  <InputLeftAddon _dark={{ borderColor: 'whiteAlpha.400' }}>
                    {settings.url}/
                  </InputLeftAddon>
                  <Input
                    {...register('slug')}
                    placeholder={t('OrgSlugModal.slugPlaceholder', {
                      slug: slugify(org.name, {
                        strict: true,
                      }).toLowerCase(),
                    })}
                    maxLength={30}
                    autoFocus
                  />
                </InputGroup>
                {errors.slug && (
                  <FormErrorMessage>{errors.slug.message}</FormErrorMessage>
                )}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                type="submit"
                isDisabled={!isDirty}
                isLoading={loading}
              >
                {t('common.save')}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
