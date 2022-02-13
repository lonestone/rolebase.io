import { updateRole } from '@api/entities/roles'
import { nameSchema } from '@api/schemas'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Checkbox,
  FormControl,
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
  UseModalProps,
  VStack,
} from '@chakra-ui/react'
import DurationSelect from '@components/atoms/DurationSelect'
import MarkdownEditorController from '@components/atoms/MarkdownEditorController'
import EntityButtonCombobox from '@components/molecules/search/EntityButtonCombobox'
import { yupResolver } from '@hookform/resolvers/yup'
import useCreateLog from '@hooks/useCreateLog'
import useRole from '@hooks/useRole'
import { EntityChangeType, getEntityChanges, LogType } from '@shared/log'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

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
  singleMember: boolean
  link: string | boolean
  defaultMinPerWeek: number | null
}

const resolver = yupResolver(
  yup.object().shape({
    name: nameSchema,
    purpose: yup.string(),
    domain: yup.string(),
    accountabilities: yup.string(),
    defaultMinPerWeek: yup.number().nullable(),
  })
)

enum LinkType {
  parent = 'parent',
  other = 'other',
}
const tmpCircleId = 'tmpCircleId'

export default function RoleEditModal({ id, ...modalProps }: Props) {
  const role = useRole(id)
  const createLog = useCreateLog()

  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Values>({
    resolver,
    defaultValues: role && {
      name: role.name,
      purpose: role.purpose,
      domain: role.domain,
      accountabilities: role.accountabilities,
      defaultMinPerWeek: role.defaultMinPerWeek || null,
      singleMember: role.singleMember || false,
      link: role.link || false,
    },
  })

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

  const onSubmit = handleSubmit(async (values) => {
    if (!role) return

    // Update role data
    await updateRole(id, values)
    modalProps.onClose()

    // Log changes
    createLog({
      display: {
        type: LogType.RoleUpdate,
        id,
        name: role.name,
      },
      changes: {
        roles: [
          {
            type: EntityChangeType.Update,
            id: role.id,
            ...getEntityChanges(role, values),
          },
        ],
      },
    })
  })

  if (!role) return null

  return (
    <>
      <Modal {...modalProps} size="xl">
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>Modifier le rôle {role.name}</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <VStack spacing={6}>
                {role.base ? (
                  <Alert status="warning">
                    <AlertIcon />
                    <AlertDescription>
                      Ce rôle est un <strong>rôle de base</strong>{' '}
                      potentiellement utilisé dans plusieurs cercles.
                    </AlertDescription>
                  </Alert>
                ) : null}

                <FormControl isInvalid={!!errors.name}>
                  <FormLabel>Nom du rôle</FormLabel>
                  <Input {...register('name')} placeholder="Nom..." autoFocus />
                </FormControl>

                <FormControl isInvalid={!!errors.purpose}>
                  <FormLabel>Raison d'être</FormLabel>
                  <MarkdownEditorController
                    name="purpose"
                    placeholder="But qu'il poursuit..."
                    control={control}
                  />
                </FormControl>

                <FormControl isInvalid={!!errors.domain}>
                  <FormLabel>Domaine</FormLabel>
                  <MarkdownEditorController
                    name="domain"
                    placeholder="Ce qu'il est seul à pouvoir faire..."
                    control={control}
                  />
                </FormControl>

                <FormControl isInvalid={!!errors.accountabilities}>
                  <FormLabel>Redevabilités</FormLabel>
                  <MarkdownEditorController
                    name="accountabilities"
                    placeholder="Ce qu'il doit faire..."
                    control={control}
                  />
                </FormControl>

                <FormControl isInvalid={!!errors.notes}>
                  <FormLabel>Notes</FormLabel>
                  <MarkdownEditorController
                    name="notes"
                    placeholder="Notes, liens..."
                    control={control}
                  />
                </FormControl>

                <FormControl>
                  <Stack spacing={1}>
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
                  <FormLabel>Temps par défaut</FormLabel>
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
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter align="end">
              <Button colorScheme="blue" type="submit">
                Enregistrer
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
