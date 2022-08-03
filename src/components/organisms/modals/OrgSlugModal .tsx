import { updateOrgSlug } from '@api/entities/orgs'
import { slugSchema } from '@api/schemas'
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
import useOrg from '@hooks/useOrg'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import slugify from 'slugify'
import settings from 'src/settings'
import * as yup from 'yup'

interface Props extends UseModalProps {
  id: string
}

interface Values {
  slug: string
}

const resolver = yupResolver(
  yup.object().shape({
    slug: slugSchema,
  })
)

export default function OrgSlugModal({ id, ...modalProps }: Props) {
  const { t } = useTranslation()
  const org = useOrg(id)

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
    try {
      setLoading(true)
      await updateOrgSlug(id, slug)
      modalProps.onClose()
    } catch (e) {
      setLoading(false)
      if (e instanceof Error) {
        const message =
          (e as any).code === 'functions/already-exists'
            ? t('organisms.modals.OrgSlugModal.already-exists')
            : e.message
        setError('slug', { message })
      }
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
              {t('organisms.modals.OrgSlugModal.heading', { org: org.name })}
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <FormControl isInvalid={!!errors.slug}>
                <FormLabel>{t('organisms.modals.OrgSlugModal.slug')}</FormLabel>
                <InputGroup>
                  <InputLeftAddon>{settings.url}/</InputLeftAddon>
                  <Input
                    {...register('slug')}
                    placeholder={t(
                      'organisms.modals.OrgSlugModal.slugPlaceholder',
                      {
                        slug: slugify(org.name, {
                          strict: true,
                        }).toLowerCase(),
                      }
                    )}
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
