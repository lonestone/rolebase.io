import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { CircleUpdate, updateCircle, useCircle } from '../../data/circles'
import TextError from '../TextError'
import CircleDeleteModal from './CircleDeleteModal'

interface Props {
  id: string
  isOpen: boolean
  onClose(): void
}

export default function CircleEditModal({ id, isOpen, onClose }: Props) {
  const [data, loading, error] = useCircle(id)
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  const { handleSubmit, errors, register, setValue } = useForm<CircleUpdate>()

  // Init form data
  useEffect(() => {
    if (data && isOpen) {
      // Wait 0ms to prevent bug where input is cleared
      setTimeout(() => {
        setValue('roleId', data.roleId)
      }, 0)
    }
  }, [data, isOpen])

  const onSubmit = handleSubmit((values) => {
    updateCircle(id, values)
    onClose()
  })

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {error && <TextError error={error} />}
          {loading && <Spinner />}
          {data && (
            <form onSubmit={onSubmit}>
              <ModalHeader>Editer un cercle</ModalHeader>
              <ModalCloseButton />

              <ModalBody></ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="red"
                  variant="ghost"
                  onClick={onDeleteOpen}
                >
                  Supprimer
                </Button>
                <Button colorScheme="blue" mr={3} type="submit">
                  Enregistrer
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>

      <CircleDeleteModal
        id={id}
        onDelete={onClose}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
      />
    </>
  )
}
