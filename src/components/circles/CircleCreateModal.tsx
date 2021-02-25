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
  Spinner,
  Stack,
  UseModalProps,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { createCircle } from '../../data/circles'
import { createRole, roleCreateSchema, useRoles } from '../../data/roles'
import { nameSchema } from '../../data/schemas'
import TextError from '../TextError'

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
  const [roles, rolesLoading, rolesError] = useRoles()

  const {
    handleSubmit,
    control,
    register,
    errors,
    setValue,
    watch,
  } = useForm<Values>({
    defaultValues: {
      roleAction: RoleAction.ReUse,
    },
    resolver: yupResolver(schema),
  })
  const roleAction = watch('roleAction')

  const onSubmit = handleSubmit(async ({ roleAction, roleId, roleName }) => {
    try {
      if (roleAction === RoleAction.New) {
        await roleCreateSchema.validate({ name: roleName })
        const role = await createRole(roleName)
        if (!role) throw new Error('Error creating new role')
        roleId = role.id
      }
      if (roleId) {
        createCircle(roleId, parentId)
        props.onClose()
      }
    } catch (error) {
      console.error(error)
    }
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
                {rolesError && <TextError error={rolesError} />}
                {rolesLoading && <Spinner />}
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
