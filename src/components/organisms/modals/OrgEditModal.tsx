import { updateOrg } from '@api/entities/orgs'
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
  useDisclosure,
  UseModalProps,
  VStack,
} from '@chakra-ui/react'
import DurationSelect from '@components/atoms/DurationSelect'
import { yupResolver } from '@hookform/resolvers/yup'
import useOrg from '@hooks/useOrg'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import OrgDeleteModal from './OrgDeleteModal'

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

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

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

  if (!org) return null

  return (
    <>
      <Modal {...modalProps}>
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
              <Button colorScheme="red" variant="ghost" onClick={onDeleteOpen}>
                {t('common.delete')}
              </Button>
              <Button colorScheme="blue" type="submit">
                {t('common.save')}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {isDeleteOpen && (
        <OrgDeleteModal
          id={id}
          onDelete={modalProps.onClose}
          isOpen
          onClose={onDeleteClose}
        />
      )}
    </>
  )
}
