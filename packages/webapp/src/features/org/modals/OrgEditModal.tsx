import DurationSelect from '@/common/atoms/DurationSelect'
import IconTextButton from '@/common/atoms/IconTextButton'
import SwitchController from '@/common/atoms/SwitchController'
import useCopyUrl from '@/common/hooks/useCopyUrl'
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  UseModalProps,
  VStack,
} from '@chakra-ui/react'
import { useUpdateOrgMutation } from '@gql'
import { yupResolver } from '@hookform/resolvers/yup'
import { getOrgPath } from '@rolebase/shared/helpers/getOrgPath'
import { nameSchema } from '@rolebase/shared/schemas'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CopyIcon, EditIcon } from 'src/icons'
import settings from 'src/settings'
import * as yup from 'yup'
import useOrg from '../hooks/useOrg'
import { useOrgId } from '../hooks/useOrgId'
import OrgDeleteModal from './OrgDeleteModal'
import OrgSlugModal from './OrgSlugModal '

interface Props extends UseModalProps {
  id?: string
}

interface Values {
  name: string
  defaultWorkedMinPerWeek: number
  protectGovernance: boolean
}

const resolver = yupResolver(
  yup.object().shape({
    name: nameSchema.required(),
    defaultWorkedMinPerWeek: yup.number(),
  })
)

export default function OrgEditModal({ id: maybeId, ...modalProps }: Props) {
  const orgId = useOrgId()
  const id = maybeId || orgId
  if (!id) {
    throw new Error('No org id')
  }
  const org = useOrg(id)
  const { t } = useTranslation()
  const [editOrg] = useUpdateOrgMutation()

  const deleteModal = useDisclosure()
  const slugModal = useDisclosure()

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<Values>({
    resolver,
  })

  // Init form data
  useEffect(() => {
    if (!org) return
    reset({
      name: org.name,
      defaultWorkedMinPerWeek: org.defaultWorkedMinPerWeek,
      protectGovernance: org.protectGovernance,
    })
  }, [org])

  const onSubmit = handleSubmit((values) => {
    editOrg({ variables: { id, values } })
    modalProps.onClose()
  })

  // URL
  const url = settings.url + (org ? getOrgPath(org) : '')
  const copyUrl = useCopyUrl(url)

  if (!org) return null

  return (
    <>
      <Modal size="lg" {...modalProps}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>
              {t('OrgEditModal.heading', { org: org.name })}
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <VStack spacing={7} align="start">
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel>{t('common.name')}</FormLabel>
                  <Input {...register('name')} autoFocus autoComplete="off" />
                </FormControl>

                <FormControl>
                  <FormLabel>{t('OrgEditModal.slug')}</FormLabel>
                  <Flex>
                    <InputGroup>
                      <Input value={url} isReadOnly />
                      <InputRightElement>
                        <IconTextButton
                          aria-label={t('common.copy')}
                          icon={<CopyIcon size={20} />}
                          onClick={copyUrl}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <Button
                      ml={1}
                      leftIcon={<EditIcon size={20} />}
                      onClick={slugModal.onOpen}
                    >
                      {t('common.edit')}
                    </Button>
                  </Flex>
                </FormControl>

                <FormControl isInvalid={!!errors.defaultWorkedMinPerWeek}>
                  <FormLabel>{t('OrgEditModal.workingTime')}</FormLabel>
                  <Controller
                    name="defaultWorkedMinPerWeek"
                    control={control}
                    render={({ field }) => (
                      <DurationSelect
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>{t('OrgEditModal.security')}</FormLabel>
                  <SwitchController name="protectGovernance" control={control}>
                    {t('OrgEditModal.protectGovernance')}
                  </SwitchController>
                  <FormHelperText ml="40px">
                    {t('OrgEditModal.protectGovernanceHelp')}
                  </FormHelperText>
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="red"
                variant="ghost"
                mr={2}
                onClick={deleteModal.onOpen}
              >
                {t('common.delete')}
              </Button>
              <Button colorScheme="blue" type="submit">
                {t('common.save')}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {deleteModal.isOpen && (
        <OrgDeleteModal id={id} isOpen onClose={deleteModal.onClose} />
      )}

      {slugModal.isOpen && (
        <OrgSlugModal id={id} isOpen onClose={slugModal.onClose} />
      )}
    </>
  )
}
