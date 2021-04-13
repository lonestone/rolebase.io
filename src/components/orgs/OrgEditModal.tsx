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
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { OrgUpdate, orgUpdateSchema, updateOrg } from '../../api/entities/orgs'
import useOrg from '../../hooks/useOrg'
import OrgDeleteModal from './OrgDeleteModal'

interface Props extends UseModalProps {
  id: string
}

export default function OrgEditModal({ id, ...props }: Props) {
  const org = useOrg(id)

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  const { handleSubmit, errors, register, reset } = useForm<OrgUpdate>({
    resolver: yupResolver(orgUpdateSchema),
  })

  // Init form data
  useEffect(() => {
    if (org && props.isOpen) {
      reset({
        name: org.name,
      })
    }
  }, [org, props.isOpen])

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
            <ModalHeader>Editer l'organisation {org.name}</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel htmlFor="name">Nom</FormLabel>
                <Input
                  name="name"
                  placeholder="Nom..."
                  ref={register}
                  autoFocus
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
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

      <OrgDeleteModal
        id={id}
        onDelete={props.onClose}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
      />
    </>
  )
}
