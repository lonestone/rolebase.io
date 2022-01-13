import { createMember } from '@api/entities/members'
import { nameSchema } from '@api/schemas'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import MembersToCopyList from '@components/molecules/MembersToCopyList'
import { yupResolver } from '@hookform/resolvers/yup'
import { MemberEntry } from '@shared/member'
import { useStoreState } from '@store/hooks'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

interface Props extends UseModalProps {
  onCreate?: (id: string) => void
}

interface Values {
  name: string
}

const resolver = yupResolver(
  yup.object().shape({
    name: nameSchema,
  })
)

export default function MemberCreateModal({ onCreate, ...modalProps }: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Values>({
    resolver,
  })

  const onSubmit = handleSubmit(async ({ name }) => {
    if (!orgId) return
    const member = await createMember({ orgId, name })
    onCreate?.(member.id)
    modalProps.onClose()
  })

  const handleCopy = useCallback(
    async (memberToCopy: MemberEntry) => {
      if (!orgId) return
      const member = await createMember({
        orgId,
        name: memberToCopy.name,
      })
      onCreate?.(member.id)
      modalProps.onClose()
    },
    [orgId]
  )

  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>Ajouter un membre</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>Nom</FormLabel>
              <Input {...register('name')} placeholder="Nom..." autoFocus />
            </FormControl>

            <Box textAlign="right" mt={2}>
              <Button colorScheme="blue" type="submit">
                Créer
              </Button>
            </Box>

            <MembersToCopyList onClick={handleCopy} />
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  )
}
