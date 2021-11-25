import { roleUpdateSchema, updateRole } from '@api/entities/roles'
import {
  Alert,
  AlertIcon,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
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
  Stack,
  StackItem,
  useDisclosure,
  UseModalProps,
  VStack,
} from '@chakra-ui/react'
import DurationSelect from '@components/atoms/DurationSelect'
import MarkdownEditorController from '@components/atoms/MarkdownEditorController'
import EntityButtonCombobox from '@components/molecules/search/EntityButtonCombobox'
import { yupResolver } from '@hookform/resolvers/yup'
import useCurrentOrg from '@hooks/useCurrentOrg'
import useRole from '@hooks/useRole'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import RoleDeleteModal from './RoleDeleteModal'

interface Props extends UseModalProps {
  id: string
}

interface Values {
  base: boolean
  name: string
  purpose: string
  domain: string
  accountabilities: string
  notes: string
  singleMember?: boolean
  link?: string | boolean
  defaultMinPerWeek?: number | null
}

enum LinkType {
  parent = 'parent',
  other = 'other',
}
const tmpCircleId = 'tmpCircleId'

export default function RoleEditModal({ id, ...props }: Props) {
  const org = useCurrentOrg()
  const role = useRole(id)

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Values>({
    resolver: yupResolver(roleUpdateSchema),
  })

  // Init form data
  useEffect(() => {
    if (role && props.isOpen) {
      reset({
        name: role.name,
        purpose: role.purpose,
        domain: role.domain,
        accountabilities: role.accountabilities,
        defaultMinPerWeek: role.defaultMinPerWeek || null,
        singleMember: role.singleMember || false,
        link: role.link || false,
      })
    }
  }, [role, props.isOpen])

  // Single member
  const singleMember = watch('singleMember')
  useEffect(() => {
    if (!singleMember) {
      setValue('link', false)
    }
  }, [singleMember])

  // Register some fields
  const link = watch('link')
  useEffect(() => {
    register('link')
  }, [register])

  const onSubmit = handleSubmit((values) => {
    updateRole(id, values)
    props.onClose()
  })

  if (!role) return null

  return (
    <>
      <Modal {...props} size="xl">
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>Modifier le rôle {role.name}</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <VStack spacing={6}>
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel htmlFor="name">Nom du rôle</FormLabel>
                  <Input {...register('name')} placeholder="Nom..." autoFocus />
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.purpose}>
                  <FormLabel htmlFor="purpose">Raison d'être</FormLabel>
                  <MarkdownEditorController
                    name="purpose"
                    placeholder="But qu'il poursuit..."
                    control={control}
                  />
                  <FormErrorMessage>{errors.purpose?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.domain}>
                  <FormLabel htmlFor="domain">Domaine</FormLabel>
                  <MarkdownEditorController
                    name="domain"
                    placeholder="Ce qu'il est seul à pouvoir faire..."
                    control={control}
                  />
                  <FormErrorMessage>{errors.domain?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.accountabilities}>
                  <FormLabel htmlFor="accountabilities">
                    Redevabilités
                  </FormLabel>
                  <MarkdownEditorController
                    name="accountabilities"
                    placeholder="Ce qu'il doit faire..."
                    control={control}
                  />
                  <FormErrorMessage>
                    {errors.accountabilities?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.notes}>
                  <FormLabel htmlFor="notes">Notes</FormLabel>
                  <MarkdownEditorController
                    name="notes"
                    placeholder="Notes, liens..."
                    control={control}
                  />
                  <FormErrorMessage>{errors.notes?.message}</FormErrorMessage>
                </FormControl>

                <FormControl>
                  <Stack spacing={1} direction="column">
                    <Checkbox {...register('singleMember')}>
                      Ne peut être occupé que par un seul membre
                    </Checkbox>

                    <Checkbox
                      name="link"
                      isDisabled={!singleMember}
                      isChecked={!!link}
                      onChange={() => setValue('link', !link)}
                    >
                      Représente son cercle parent (lien)
                    </Checkbox>
                    <RadioGroup
                      display={link ? '' : 'none'}
                      value={link !== true ? LinkType.other : LinkType.parent}
                      onChange={(value) =>
                        setValue(
                          'link',
                          value === LinkType.parent ? true : tmpCircleId
                        )
                      }
                    >
                      <Stack pl={6} mt={1} spacing={1} direction="column">
                        <Radio value={LinkType.parent}>
                          Dans le cercle parent
                        </Radio>
                        <Radio value={LinkType.other} isDisabled={role.base}>
                          Dans un autre cercle
                        </Radio>
                        {typeof link === 'string' && (
                          <StackItem pl={6}>
                            <EntityButtonCombobox
                              circles
                              value={link !== tmpCircleId ? link : undefined}
                              onChange={(value) => setValue('link', value)}
                            />
                          </StackItem>
                        )}
                      </Stack>
                    </RadioGroup>
                  </Stack>
                </FormControl>

                <FormControl isInvalid={!!errors.defaultMinPerWeek}>
                  <FormLabel htmlFor="defaultMinPerWeek">
                    Temps par défaut
                  </FormLabel>
                  <Controller
                    name="defaultMinPerWeek"
                    control={control}
                    render={({ field }) => (
                      <DurationSelect
                        value={field.value ?? null}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <FormHelperText>
                    Temps alloué par défaut à chaque membre ayant ce rôle.
                  </FormHelperText>
                  <FormErrorMessage>
                    {errors.defaultMinPerWeek &&
                      errors.defaultMinPerWeek.message}
                  </FormErrorMessage>
                </FormControl>

                {role.base ? (
                  <Alert status="warning">
                    <AlertIcon />
                    Ce rôle est un rôle de base potentiellement utilisé dans
                    plusieurs cercles
                  </Alert>
                ) : null}
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

      <RoleDeleteModal
        id={id}
        onDelete={props.onClose}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
      />
    </>
  )
}
