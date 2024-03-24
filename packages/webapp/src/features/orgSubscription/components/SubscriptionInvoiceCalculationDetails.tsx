import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function SubscriptionInvoiceCalculationDetails(
  modalProps: Omit<ModalProps, 'children'>
) {
  const { t } = useTranslation()

  return (
    <Modal size="4xl" {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          <Text marginTop={5} fontSize={28} fontWeight={600} lineHeight={1}>
            {t('SubscriptionInvoiceCalculationDetails.title')}
          </Text>
        </ModalHeader>
        <ModalBody mt="4">
          <VStack alignItems="start">
            <Text mb="2" fontSize={18}>
              {t('SubscriptionInvoiceCalculationDetails.explaination')}
            </Text>
            <VStack spacing={4} alignItems="start" marginLeft="8 !important">
              <Text>- {t('SubscriptionInvoiceCalculationDetails.desc1')}</Text>
              <Text>- {t('SubscriptionInvoiceCalculationDetails.desc2')}</Text>
              <Text>- {t('SubscriptionInvoiceCalculationDetails.desc3')}</Text>
            </VStack>
          </VStack>
        </ModalBody>
        <ModalFooter mt="4" justifyContent="end">
          <Button onClick={() => modalProps.onClose()}>
            {t('common.close')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
