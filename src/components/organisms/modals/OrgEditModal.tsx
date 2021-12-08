import { orgUpdateSchema, updateOrg } from '@api/entities/orgs'
import {
  Button,
  FormControl,
  FormErrorMessage,
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
import OrgDeleteModal from './OrgDeleteModal'

interface Props extends UseModalProps {
  id: string
}

interface Values {
  name: string
  defaultWorkedMinPerWeek: number
}

export default function OrgEditModal({ id, ...props }: Props) {
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
    resolver: yupResolver(orgUpdateSchema),
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
    props.onClose()
  })

  if (!org) return null

  return (
    <>
      <Modal {...props}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>Modifier l'organisation {org.name}</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <VStack spacing={5}>
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel htmlFor="name">Nom</FormLabel>
                  <Input {...register('name')} placeholder="Nom..." autoFocus />
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.defaultWorkedMinPerWeek}>
                  <FormLabel htmlFor="defaultWorkedMinPerWeek">
                    Temps de travail par défaut
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
                  <FormErrorMessage>
                    {errors.defaultWorkedMinPerWeek &&
                      errors.defaultWorkedMinPerWeek.message}
                  </FormErrorMessage>
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" variant="ghost" onClick={onDeleteOpen}>
                Supprimer
              </Button>
              <Button colorScheme="blue" type="submit">
                Enregistrer
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {isDeleteOpen && (
        <OrgDeleteModal
          id={id}
          onDelete={props.onClose}
          isOpen
          onClose={onDeleteClose}
        />
      )}
    </>
  )
}
