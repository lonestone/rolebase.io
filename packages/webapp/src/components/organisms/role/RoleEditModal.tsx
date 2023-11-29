import ColorController from '@atoms/ColorController'
import DurationSelect from '@atoms/DurationSelect'
import Loading from '@atoms/Loading'
import Switch from '@atoms/Switch'
import TextError from '@atoms/TextError'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
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
  Stack,
  UseModalProps,
  VStack,
} from '@chakra-ui/react'
import {
  RoleSummaryFragment,
  useGetRoleQuery,
  useUpdateRoleMutation,
} from '@gql'
import { yupResolver } from '@hookform/resolvers/yup'
import useCreateLog from '@hooks/useCreateLog'
import { getEntityChanges } from '@shared/helpers/log/getEntityChanges'
import { EntityChangeType, LogType } from '@shared/model/log'
import { nameSchema } from '@shared/schemas'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

interface Props extends UseModalProps {
  id?: string
  role?: RoleSummaryFragment
}

interface Values {
  name: string
  singleMember: boolean
  parentLink: boolean
  defaultMinPerWeek: number | null
  colorHue: number | null
}

const resolver = yupResolver(
  yup.object().shape({
    name: nameSchema.required(),
    defaultMinPerWeek: yup.number().nullable(),
  })
)

function getDefaultValues(role: RoleSummaryFragment): Values {
  return {
    name: role.name,
    defaultMinPerWeek: role.defaultMinPerWeek ?? null,
    singleMember: role.singleMember,
    parentLink: role.parentLink,
    colorHue: role.colorHue ?? null,
  }
}

export default function RoleEditModal({ id, role, ...modalProps }: Props) {
  const { t } = useTranslation()
  const [updateRole] = useUpdateRoleMutation()
  const createLog = useCreateLog()

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<Values>({
    resolver,
    defaultValues: role && getDefaultValues(role),
  })

  // Get role if not provided
  const { data, loading, error } = useGetRoleQuery({
    skip: !id,
    variables: { id: id || '' },
  })
  const fetchedRole = data?.role_by_pk
  if (fetchedRole) {
    role = fetchedRole
  }
  useEffect(() => {
    if (!fetchedRole) return
    reset(fetchedRole && getDefaultValues(fetchedRole))
  }, [fetchedRole])

  const onSubmit = handleSubmit(async (values) => {
    if (!role) return
    modalProps.onClose()

    // Update role data
    await updateRole({ variables: { id: role.id, values } })

    // Log change
    createLog({
      display: {
        type: LogType.RoleUpdate,
        id: role.id,
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

  if (loading) return <Loading size="sm" active center />
  if (error) return <TextError error={error} />
  if (!role) return null

  return (
    <>
      <Modal {...modalProps} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {t('RoleEditModal.heading', { name: role.name })}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={6}>
              {role.base ? (
                <Alert status="warning">
                  <AlertIcon />
                  <AlertDescription>
                    {t('RoleEditModal.baseInfo')}
                  </AlertDescription>
                </Alert>
              ) : null}

              <FormControl isInvalid={!!errors.name}>
                <FormLabel>{t('RoleEditModal.name')}</FormLabel>
                <Input {...register('name')} autoFocus />
              </FormControl>

              <FormControl>
                <Stack spacing={1}>
                  <Switch {...register('singleMember')}>
                    {t('RoleEditModal.singleMember')}
                  </Switch>

                  <Switch {...register('parentLink')}>
                    {t('RoleEditModal.parentLink')}{' '}
                  </Switch>
                </Stack>
              </FormControl>

              <FormControl isInvalid={!!errors.defaultMinPerWeek}>
                <FormLabel>{t('RoleEditModal.defaultWorkingTime')}</FormLabel>
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
                  {t('RoleEditModal.defaultWorkingTimeHelp')}
                </FormHelperText>
              </FormControl>

              <FormControl>
                <ColorController name="colorHue" control={control}>
                  {t('RoleEditModal.color')}
                </ColorController>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter alignItems="end">
            <Button colorScheme="blue" onClick={onSubmit}>
              {t('common.save')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
