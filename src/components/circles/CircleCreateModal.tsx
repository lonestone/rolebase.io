import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  UseModalProps,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { CircleCreate, createCircle, useCircles } from '../../data/circles'
import { useRoles } from '../../data/roles'

interface Props extends UseModalProps {
  parentId: string | null
}

export default function CircleCreateModal({ parentId, ...props }: Props) {
  const [roles, rolesLoading, rolesError] = useRoles()
  const [circles, circlesLoading, circlesError] = useCircles()

  const { handleSubmit, errors, register, setValue } = useForm<CircleCreate>()

  const onSubmit = handleSubmit(({ roleId }) => {
    createCircle(roleId, parentId)
    props.onClose()
  })

  // Init form data
  useEffect(() => {
    if (roles && roles[0]) {
      // Wait 0ms to prevent bug where input is cleared
      setTimeout(() => {
        setValue('roleId', roles[0].id)
      }, 0)
    }
  }, [roles])

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>Ajouter un cercle</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="roleId">Rôle</FormLabel>
              <Select name="roleId" ref={register()} autoFocus>
                {roles?.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Créer
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
