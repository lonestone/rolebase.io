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
