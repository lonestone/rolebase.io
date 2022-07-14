import { updateOrg } from '@api/entities/orgs'
import { nameSchema } from '@api/schemas'
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
  UseModalProps,
  VStack,
} from '@chakra-ui/react'
import DurationSelect from '@components/atoms/DurationSelect'
import { yupResolver } from '@hookform/resolvers/yup'
import useOrg from '@hooks/useOrg'
import { getOrgPath } from '@shared/helpers/getOrgPath'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FiCopy, FiEdit3 } from 'react-icons/fi'
import settings from 'src/settings'
import * as yup from 'yup'
import OrgDeleteModal from './OrgDeleteModal'
import OrgSlugModal from './OrgSlugModal '
import useCopyUrl from './useCopyUrl'

interface Props extends UseModalProps {
  id: string
}

interface Values {
  name: string
  defaultWorkedMinPerWeek: number
}

const resolver = yupResolver(
  yup.object().shape({
    name: nameSchema,
    defaultWorkedMinPerWeek: yup.number(),
  })
)

export default function OrgEditModal({ id, ...modalProps }: Props) {
  const { t } = useTranslation()
  const org = useOrg(id)

  const deleteModal = useDisclosure()
  const slugModal = useDisclosure()

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<Values>({
    resolver,
  })

  // Init form data
  useEffect(() => {
    if (!org) return
    reset({
      name: org.name,
      defaultWorkedMinPerWeek: org.defaultWorkedMinPerWeek,
    })
  }, [org])

  const onSubmit = handleSubmit((values) => {
    updateOrg(id, values)
    modalProps.onClose()
  })

  // URL
  const url = settings.url + (org ? getOrgPath(org) : '')
  const copyUrl = useCopyUrl(url)

  if (!org) return null

  return (
    <>
      <Modal size="lg" {...modalProps}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>
              {t('organisms.modals.OrgEditModal.heading', { org: org.name })}
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <VStack spacing={5}>
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel>{t('common.name')}</FormLabel>
                  <Input
                    {...register('name')}
                    placeholder={t('common.namePlaceholder')}
                    autoFocus
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>
                    {t('organisms.modals.OrgEditModal.slug')}
                  </FormLabel>
                  <Flex>
                    <InputGroup>
                      <Input value={url} isReadOnly />
                      <InputRightElement>
                        <Tooltip
                          label={t('common.copy')}
                          placement="top"
                          hasArrow
                        >
                          <IconButton
                            aria-label={t('common.copy')}
                            icon={<FiCopy />}
                            onClick={copyUrl}
                          />
                        </Tooltip>
                      </InputRightElement>
                    </InputGroup>
                    <Button
                      ml={1}
                      leftIcon={<FiEdit3 />}
                      onClick={slugModal.onOpen}
                    >
                      {t('common.edit')}
                    </Button>
                  </Flex>
                </FormControl>

                <FormControl isInvalid={!!errors.defaultWorkedMinPerWeek}>
                  <FormLabel>
                    {t('organisms.modals.OrgEditModal.workingTime')}
                  </FormLabel>
                  <Controller
                    name="defaultWorkedMinPerWeek"
                    control={control}
                    render={({ field }) => (
                      <DurationSelect
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="red"
                variant="ghost"
                onClick={deleteModal.onOpen}
              >
                {t('common.delete')}
              </Button>
              <Button colorScheme="blue" type="submit">
                {t('common.save')}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {deleteModal.isOpen && (
        <OrgDeleteModal
          id={id}
          isOpen
          onDelete={modalProps.onClose}
          onClose={deleteModal.onClose}
        />
      )}

      {slugModal.isOpen && (
        <OrgSlugModal id={id} isOpen onClose={slugModal.onClose} />
      )}
    </>
  )
}
