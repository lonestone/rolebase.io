import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
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
import ColorController from '@components/atoms/ColorController'
import DurationSelect from '@components/atoms/DurationSelect'
import EditorController from '@components/molecules/editor/EditorController'
import { EditorHandle } from '@components/molecules/editor2/plugins/EditorRefPlugin'
import CircleSearchInput from '@components/molecules/search/entities/circles/CircleSearchInput'
import { yupResolver } from '@hookform/resolvers/yup'
import useCreateLog from '@hooks/useCreateLog'
import useRole from '@hooks/useRole'
import { EntityChangeType, getEntityChanges, LogType } from '@shared/model/log'
import { RoleLink } from '@shared/model/role'
import { nameSchema } from '@shared/schemas'
import React, { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FaPlus } from 'react-icons/fa'
import { useUpdateRoleMutation } from 'src/graphql.generated'
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
  checklist: string
  indicators: string
  notes: string
  singleMember: boolean
  autoCreate: boolean
  link: string
  defaultMinPerWeek: number | null
  colorHue: number | null
}

const resolver = yupResolver(
  yup.object().shape({
    name: nameSchema.required(),
    defaultMinPerWeek: yup.number().nullable(),
  })
)

enum LinkType {
  parent = 'parent',
  other = 'other',
}
const tmpCircleId = 'tmpCircleId'

export default function RoleEditModal({ id, ...modalProps }: Props) {
  const { t } = useTranslation()
  const role = useRole(id)
  const [updateRole] = useUpdateRoleMutation()
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
      checklist: role.checklist,
      indicators: role.indicators,
      defaultMinPerWeek: role.defaultMinPerWeek,
      singleMember: role.singleMember,
      autoCreate: role.autoCreate,
      link: role.link,
      colorHue: role.colorHue,
    },
  })

  // Register some fields
  const link = watch('link')
  useEffect(() => {
    register('link')
  }, [register])

  // Checklist and indicators items
  const checklistEditor = useRef<EditorHandle>(null)
  const indicatorsEditor = useRef<EditorHandle>(null)

  const onSubmit = handleSubmit(async (values) => {
    if (!role) return
    modalProps.onClose()

    // Update role data
    await updateRole({ variables: { id, values } })

    // Log change
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
                <Input
                  {...register('name')}
                  placeholder={t('RoleEditModal.namePlaceholder')}
                  autoFocus
                />
              </FormControl>

              <FormControl isInvalid={!!errors.purpose}>
                <FormLabel>{t('RoleEditModal.purpose')}</FormLabel>
                <EditorController
                  name="purpose"
                  placeholder={t('RoleEditModal.purposePlaceholder')}
                  control={control}
                />
              </FormControl>

              <FormControl isInvalid={!!errors.domain}>
                <FormLabel>{t('RoleEditModal.domain')}</FormLabel>
                <EditorController
                  name="domain"
                  placeholder={t('RoleEditModal.domainPlaceholder')}
                  control={control}
                />
              </FormControl>

              <FormControl isInvalid={!!errors.accountabilities}>
                <FormLabel>{t('RoleEditModal.accountabilities')}</FormLabel>
                <EditorController
                  name="accountabilities"
                  placeholder={t('RoleEditModal.accountabilitiesPlaceholder')}
                  control={control}
                />
              </FormControl>

              <FormControl isInvalid={!!errors.checklist}>
                <FormLabel>
                  {t('RoleEditModal.checklist')}
                  <IconButton
                    aria-label={t('RoleEditModal.checklistAdd')}
                    icon={<FaPlus />}
                    size="xs"
                    ml={2}
                    onClick={() => checklistEditor.current?.addCheckboxList()}
                  />
                </FormLabel>
                <EditorController
                  ref={checklistEditor}
                  name="checklist"
                  placeholder={t('RoleEditModal.checklistPlaceholder')}
                  control={control}
                />
              </FormControl>

              <FormControl isInvalid={!!errors.indicators}>
                <FormLabel>
                  {t('RoleEditModal.indicator')}
                  <IconButton
                    aria-label={t('RoleEditModal.indicatorAdd')}
                    icon={<FaPlus />}
                    size="xs"
                    ml={2}
                    onClick={() => indicatorsEditor.current?.addBulletList()}
                  />
                </FormLabel>
                <EditorController
                  ref={indicatorsEditor}
                  name="indicators"
                  placeholder={t('RoleEditModal.indicatorPlaceholder')}
                  control={control}
                />
              </FormControl>

              <FormControl isInvalid={!!errors.notes}>
                <FormLabel>{t('RoleEditModal.notes')}</FormLabel>
                <EditorController
                  name="notes"
                  placeholder={t('RoleEditModal.notesPlaceholder')}
                  control={control}
                />
              </FormControl>

              <FormControl>
                <Stack spacing={1}>
                  <Checkbox {...register('singleMember')}>
                    {t('RoleEditModal.singleMember')}
                  </Checkbox>

                  {/* role.base && (
                    <Checkbox {...register('autoCreate')}>
                      {t('RoleEditModal.autoCreate')}
                    </Checkbox>
                  ) */}

                  <Checkbox
                    name="link"
                    isChecked={link !== RoleLink.No}
                    onChange={() =>
                      setValue(
                        'link',
                        link === RoleLink.No ? RoleLink.Parent : RoleLink.No
                      )
                    }
                  >
                    {t('RoleEditModal.linkParent')}
                  </Checkbox>
                  <RadioGroup
                    display={link !== RoleLink.No ? '' : 'none'}
                    value={
                      link === RoleLink.Parent
                        ? LinkType.parent
                        : LinkType.other
                    }
                    onChange={(value) =>
                      setValue(
                        'link',
                        value === LinkType.parent
                          ? RoleLink.Parent
                          : tmpCircleId
                      )
                    }
                  >
                    <Stack pl={6} mt={1} spacing={1} direction="column">
                      <Radio value={LinkType.parent}>
                        {t('RoleEditModal.linkToParent')}
                      </Radio>
                      <Radio value={LinkType.other} isDisabled={role.base}>
                        {t('RoleEditModal.linkToCircle')}
                      </Radio>
                      {typeof link === 'string' && (
                        <StackItem pl={6}>
                          <CircleSearchInput
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
