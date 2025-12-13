import ColorController from '@/common/atoms/ColorController'
import Loading from '@/common/atoms/Loading'
import SwitchController from '@/common/atoms/SwitchController'
import TextError from '@/common/atoms/TextError'
import useCreateLog from '@/log/hooks/useCreateLog'
import useCurrentMember from '@/member/hooks/useCurrentMember'
import useOrgOwner from '@/member/hooks/useOrgOwner'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
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
  Stack,
  Tooltip,
  UseModalProps,
  VStack,
} from '@chakra-ui/react'
import {
  RoleSummaryFragment,
  useGetRoleQuery,
  useUpdateRoleMutation,
} from '@gql'
import { yupResolver } from '@hookform/resolvers/yup'
import { getCircleLeaders } from '@rolebase/shared/helpers/getCircleLeaders'
import { getEntityChanges } from '@rolebase/shared/helpers/log/getEntityChanges'
import { EntityChangeType, LogType } from '@rolebase/shared/model/log'
import { nameSchema } from '@rolebase/shared/schemas'
import { useStoreState } from '@store/hooks'
import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
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
  colorHue: number | null
}

const resolver = yupResolver(
  yup.object().shape({
    name: nameSchema.required(),
  })
)

function getDefaultValues(role: RoleSummaryFragment): Values {
  return {
    name: role.name,
    singleMember: role.singleMember,
    parentLink: role.parentLink,
    colorHue: role.colorHue ?? null,
  }
}

export default function RoleEditModal({ id, role, ...modalProps }: Props) {
  const { t } = useTranslation()
  const [updateRole] = useUpdateRoleMutation()
  const createLog = useCreateLog()
  const currentMember = useCurrentMember()
  const isOrgOwner = useOrgOwner()
  const circles = useStoreState((state) => state.org.circles)

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

  // Can change parent link?
  const canChangeParentLink = useMemo(() => {
    if (isOrgOwner) return true
    if (!role || !circles || !currentMember) return false
    // Get parent circle and grand parent circle
    const roleId = role.id
    const circle = circles.find((c) => c.roleId === roleId)
    if (!circle) return false
    const parentCircle = circles.find((c) => c.id === circle.parentId)
    const grandParentCircleId = parentCircle?.parentId
    if (!grandParentCircleId) return false

    // Get leaders of parent circle and grand parent circle
    const parentLeaders = getCircleLeaders(parentCircle, circles)
    const grandParentLeaders = getCircleLeaders(grandParentCircleId, circles)

    // Can change parent link if leader of parent circle and grand parent circle
    return (
      parentLeaders.some((p) => p.member.id === currentMember.id) &&
      grandParentLeaders.some((p) => p.member.id === currentMember.id)
    )
  }, [isOrgOwner, role, circles, currentMember])

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
                <Input {...register('name')} autoFocus autoComplete="off" />
              </FormControl>

              <FormControl>
                <Stack spacing={4}>
                  <SwitchController name="singleMember" control={control}>
                    {t('RoleEditModal.singleMember')}
                  </SwitchController>

                  <Tooltip
                    label={
                      canChangeParentLink || role.base
                        ? ''
                        : t('RoleEditModal.parentLinkHelp')
                    }
                    hasArrow
                  >
                    <Box>
                      <SwitchController
                        name="parentLink"
                        control={control}
                        isDisabled={!canChangeParentLink}
                      >
                        {t('RoleEditModal.parentLink')}
                      </SwitchController>
                    </Box>
                  </Tooltip>
                </Stack>
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
