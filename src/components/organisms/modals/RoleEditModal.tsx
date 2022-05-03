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
import { MarkdownEditorHandle } from '@components/molecules/editor/chunk/useMarkdownEditor'
import MarkdownEditorController from '@components/molecules/editor/MarkdownEditorController'
import CircleSearchInput from '@components/molecules/search/entities/circles/CircleSearchInput'
import { yupResolver } from '@hookform/resolvers/yup'
import useCreateLog from '@hooks/useCreateLog'
import useRole from '@hooks/useRole'
import { EntityChangeType, getEntityChanges, LogType } from '@shared/log'
import React, { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FaPlus } from 'react-icons/fa'
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
  link: string | boolean
  defaultMinPerWeek: number | null
  colorHue: number | null
}

const resolver = yupResolver(
  yup.object().shape({
    name: nameSchema,
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
      defaultMinPerWeek: role.defaultMinPerWeek ?? null,
      singleMember: role.singleMember ?? false,
      link: role.link ?? false,
      colorHue: role.colorHue ?? null,
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

  // Checklist and indicators items
  const checklistEditor = useRef<MarkdownEditorHandle>(null)
  const indicatorsEditor = useRef<MarkdownEditorHandle>(null)

  const onSubmit = handleSubmit(async (values) => {
    if (!role) return

    // Update role data
    await updateRole(id, values)
    modalProps.onClose()

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
            {t('organisms.modals.RoleEditModal.heading', { name: role.name })}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={6}>
              {role.base ? (
                <Alert status="warning">
                  <AlertIcon />
                  <AlertDescription>
                    {t('organisms.modals.RoleEditModal.baseInfo')}
                  </AlertDescription>
                </Alert>
              ) : null}

              <FormControl isInvalid={!!errors.name}>
                <FormLabel>
                  {t('organisms.modals.RoleEditModal.name')}
                </FormLabel>
                <Input
                  {...register('name')}
                  placeholder={t(
                    'organisms.modals.RoleEditModal.namePlaceholder'
                  )}
                  autoFocus
                />
              </FormControl>

              <FormControl isInvalid={!!errors.purpose}>
                <FormLabel>
                  {t('organisms.modals.RoleEditModal.purpose')}
                </FormLabel>
                <MarkdownEditorController
                  name="purpose"
                  placeholder={t(
                    'organisms.modals.RoleEditModal.purposePlaceholder'
                  )}
                  control={control}
                />
              </FormControl>

              <FormControl isInvalid={!!errors.domain}>
                <FormLabel>
                  {t('organisms.modals.RoleEditModal.domain')}
                </FormLabel>
                <MarkdownEditorController
                  name="domain"
                  placeholder={t(
                    'organisms.modals.RoleEditModal.domainPlaceholder'
                  )}
                  control={control}
                />
              </FormControl>

              <FormControl isInvalid={!!errors.accountabilities}>
                <FormLabel>
                  {t('organisms.modals.RoleEditModal.accountabilities')}
                </FormLabel>
                <MarkdownEditorController
                  name="accountabilities"
                  placeholder={t(
                    'organisms.modals.RoleEditModal.accountabilitiesPlaceholder'
                  )}
                  control={control}
                />
              </FormControl>

              <FormControl isInvalid={!!errors.checklist}>
                <FormLabel>
                  {t('organisms.modals.RoleEditModal.checklist')}
                  <IconButton
                    aria-label={t(
                      'organisms.modals.RoleEditModal.checklistAdd'
                    )}
                    icon={<FaPlus />}
                    size="xs"
                    ml={2}
                    onClick={() => checklistEditor.current?.addCheckboxList()}
                  />
                </FormLabel>
                <MarkdownEditorController
                  ref={checklistEditor}
                  name="checklist"
                  placeholder={t(
                    'organisms.modals.RoleEditModal.checklistPlaceholder'
                  )}
                  control={control}
                />
              </FormControl>

              <FormControl isInvalid={!!errors.indicators}>
                <FormLabel>
                  {t('organisms.modals.RoleEditModal.indicator')}
                  <IconButton
                    aria-label={t(
                      'organisms.modals.RoleEditModal.indicatorAdd'
                    )}
                    icon={<FaPlus />}
                    size="xs"
                    ml={2}
                    onClick={() => indicatorsEditor.current?.addBulletList()}
                  />
                </FormLabel>
                <MarkdownEditorController
                  ref={indicatorsEditor}
                  name="indicators"
                  placeholder={t(
                    'organisms.modals.RoleEditModal.indicatorPlaceholder'
                  )}
                  control={control}
                />
              </FormControl>

              <FormControl isInvalid={!!errors.notes}>
                <FormLabel>
                  {t('organisms.modals.RoleEditModal.notes')}
                </FormLabel>
                <MarkdownEditorController
                  name="notes"
                  placeholder={t(
                    'organisms.modals.RoleEditModal.notesPlaceholder'
                  )}
                  control={control}
                />
              </FormControl>

              <FormControl>
                <Stack spacing={1}>
                  <Checkbox {...register('singleMember')}>
                    {t('organisms.modals.RoleEditModal.singleMember')}
                  </Checkbox>

                  <Checkbox
                    name="link"
                    isDisabled={!singleMember}
                    isChecked={!!link}
                    onChange={() => setValue('link', !link)}
                  >
                    {t('organisms.modals.RoleEditModal.linkParent')}
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
                        {t('organisms.modals.RoleEditModal.linkToParent')}
                      </Radio>
                      <Radio value={LinkType.other} isDisabled={role.base}>
                        {t('organisms.modals.RoleEditModal.linkToCircle')}
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
                <FormLabel>
                  {t('organisms.modals.RoleEditModal.defaultWorkingTime')}
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
                  {t('organisms.modals.RoleEditModal.defaultWorkingTimeHelp')}
                </FormHelperText>
              </FormControl>

              <FormControl>
                <ColorController name="colorHue" control={control}>
                  {t('organisms.modals.RoleEditModal.color')}
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
