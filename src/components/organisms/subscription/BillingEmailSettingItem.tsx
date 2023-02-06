import { updateSubscriptionBillingEmail } from '@api/functions'
import ModalCloseStaticButton from '@atoms/ModalCloseStaticButton'
import {
  Button,
  FormControl,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  StackProps,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import useCurrentMember from '@hooks/useCurrentMember'
import { useOrgId } from '@hooks/useOrgId'
import SettingItem from '@molecules/SettingItem'
import { emailSchema } from '@shared/schemas'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

type BillingEmailSettingItemProps = {
  email: string | null
  onUpdate: () => void
} & StackProps

const resolver = yupResolver(
  yup.object().shape({
    email: emailSchema.required(),
  })
)

const toastDefault = { duration: 4000, isClosable: true }

export default function BillingEmailSettingItem({
  email,
  onUpdate,
  ...rest
}: BillingEmailSettingItemProps) {
  const { t } = useTranslation()
  const orgId = useOrgId()
  const currentMember = useCurrentMember()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver,
    mode: 'onChange',
    defaultValues: {
      email: email ?? '',
    },
  })

  const updateEmail = handleSubmit(async ({ email: newEmail }) => {
    if (!newEmail) return

    setLoading(true)

    try {
      await updateSubscriptionBillingEmail({
        memberId: currentMember?.id ?? '',
        orgId: orgId ?? '',
        email: newEmail,
      })
      toast({
        title: t('SubscriptionTabs.accountTab.billingEmailUpdated'),
        status: 'success',
        ...toastDefault,
      })
      onUpdate()
      onClose()
    } catch (e) {
      toast({
        title: t('SubscriptionTabs.accountTab.billingEmailUpdateError'),
        status: 'error',
        ...toastDefault,
      })
    } finally {
      setLoading(false)
    }
  })

  return (
    <>
      <SettingItem
        pt="0"
        displayName={t('SubscriptionTabs.accountTab.billingEmail')}
        onEdit={onOpen}
        value={email}
        editable
      />
      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack justifyContent="space-between">
              <Text>{t('SubscriptionTabs.accountTab.updateBillingEmail')}</Text>
              <ModalCloseStaticButton />
            </HStack>
          </ModalHeader>
          <FormControl>
            <ModalBody>
              <Input
                {...register('email')}
                placeholder={t('CurrentUserModal.emailPlaceholder')}
                autoFocus
              />
            </ModalBody>
            <ModalFooter>
              <HStack>
                <Button
                  disabled={!!errors.email}
                  onClick={updateEmail}
                  isLoading={loading}
                  colorScheme="orange"
                >
                  {t('common.save')}
                </Button>
              </HStack>
            </ModalFooter>
          </FormControl>
        </ModalContent>
      </Modal>
    </>
  )
}
