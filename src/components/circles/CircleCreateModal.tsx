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
  Radio,
  RadioGroup,
  Select,
  Stack,
  UseModalProps,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { createCircle } from '../../api/entities/circles'
import { createRole, roleCreateSchema } from '../../api/entities/roles'
import { nameSchema } from '../../api/schemas'
import { useNavigateOrg } from '../../hooks/useNavigateOrg'
import { useStoreState } from '../store/hooks'

interface Props extends UseModalProps {
  parentId: string | null
}

enum RoleAction {
  ReUse = 'ReUse',
  New = 'New',
}

interface Values {
  roleAction: RoleAction
  roleId: string
  roleName: string
}

const schema = yup.object({
  roleAction: yup.string(),
  roleName: yup.string().when('roleAction', {
    is: RoleAction.New,
    then: nameSchema,
  }),
})

export default function CircleCreateModal({ parentId, ...props }: Props) {
  const navigateOrg = useNavigateOrg()
  const orgId = useStoreState((state) => state.orgs.currentId)
  const roles = useStoreState((state) => state.roles.entries)

  const {
    handleSubmit,
    control,
    register,
    errors,
    reset,
    watch,
  } = useForm<Values>({
    resolver: yupResolver(schema),
  })
  const roleAction = watch('roleAction')

  const onSubmit = handleSubmit(async ({ roleAction, roleId, roleName }) => {
    if (!orgId) return
    try {
      if (roleAction === RoleAction.New) {
        await roleCreateSchema.validate({ name: roleName })
        const role = await createRole(orgId, roleName)
        if (!role) throw new Error('Error creating new role')
        roleId = role.id
      }
      if (roleId) {
        props.onClose()
        const circle = await createCircle(orgId, roleId, parentId)
        navigateOrg(`?circleId=${circle.id}`)
      }
    } catch (error) {
      console.error(error)
    }
  })

  // Init form data
  useEffect(() => {
    if (roles) {
      if (roles[0]) {
        reset({ roleAction: RoleAction.ReUse, roleId: roles[0].id })
      } else {
        reset({ roleAction: RoleAction.New })
      }
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
            <VStack spacing={3}>
              <FormControl>
                <Controller
                  name="roleAction"
                  control={control}
                  render={({ onChange, value }) => (
                    <RadioGroup
                      value={value}
                      onChange={onChange}
                      marginBottom="1rem"
                    >
                      <Stack>
                        <Radio value={RoleAction.ReUse}>
                          Utiliser un rôle existant
                        </Radio>
                        <Radio value={RoleAction.New}>
                          Créer un nouveau rôle
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  )}
                />
              </FormControl>

              {roleAction === RoleAction.ReUse ? (
                <FormControl>
                  <FormLabel htmlFor="roleId">Rôle à utiliser</FormLabel>
                  {roles && (
                    <Select name="roleId" ref={register()} autoFocus>
                      {roles?.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </Select>
                  )}
                </FormControl>
              ) : (
                <FormControl isInvalid={!!errors.roleName}>
                  <FormLabel htmlFor="roleName">Nom du rôle</FormLabel>
                  <Input
                    name="roleName"
                    placeholder="Nom..."
                    ref={register}
                    autoFocus
                  />
                  <FormErrorMessage>
                    {errors.roleName && errors.roleName.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" type="submit">
              Créer
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
