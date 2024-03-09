import { useOrgId } from '@/org/hooks/useOrgId'
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  useToast,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { trpc } from 'src/trpc'

type CancelSubscriptionModalProps = {
  onSubscriptionCanceled: () => void
} & Omit<ModalProps, 'children'>

export default function CancelSubscriptionModal({
  onSubscriptionCanceled,
  ...modalProps
}: CancelSubscriptionModalProps) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const orgId = useOrgId()

  const unsubscribe = async () => {
    setLoading(true)

    try {
      const { cancelAt } = await trpc.orgSubscription.unsubscribeOrg.mutate({
        orgId: orgId ?? '',
      })
      toast({
        title: t('SubscriptionPlans.unsubscribeDate', {
          date: format(new Date(cancelAt), 'dd/MM/uuuu'),
        }),
        status: 'success',
      })
      onSubscriptionCanceled()
    } catch (e) {
      toast({
        title: t('common.errorRetry'),
        description: t('common.errorContact'),
        status: 'error',
        duration: 10000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal size="2xl" {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>{t('SubscriptionTabs.cancelSubscriptionModal.title')}</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="4" fontSize={18} fontWeight="700">
            {t('SubscriptionTabs.cancelSubscriptionModal.subtitle')}
          </Text>
          <Flex flexDir="column" ml="1rem" gap="1">
            <Text fontWeight={600}>
              - {t('SubscriptionTabs.cancelSubscriptionModal.desc1')}
            </Text>
            <Text fontWeight={600}>
              - {t('SubscriptionTabs.cancelSubscriptionModal.desc2')}
            </Text>
            <Text fontWeight={600}>
              - {t('SubscriptionTabs.cancelSubscriptionModal.desc3')}
            </Text>
          </Flex>
        </ModalBody>
        <ModalFooter mt="4" justifyContent="center">
          <Button variant="ghost" onClick={() => modalProps.onClose()}>
            {t('common.cancel')}
          </Button>
          <Button
            onClick={unsubscribe}
            isLoading={loading}
            as="a"
            mr="2"
            href="subscription"
            colorScheme="purple"
          >
            {t('common.confirm')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
