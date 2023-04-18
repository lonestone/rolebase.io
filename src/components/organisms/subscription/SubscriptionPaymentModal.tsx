import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react'
import { Subscription_Plan_Type_Enum } from '@gql'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import { useTranslation } from 'react-i18next'
import SubscriptionPaymentStepper from './SubscriptionPaymentStepper'

type SubscriptionPaymentModalProps = {
  planType: Subscription_Plan_Type_Enum
} & Omit<ModalProps, 'children'>

export default function SubscriptionPaymentModal({
  planType,
  ...modalProps
}: SubscriptionPaymentModalProps) {
  const { t } = useTranslation()

  return (
    <Modal size="xl" {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {t('SubscriptionTabs.paymentModal.subscribeToPlan', {
            plan: capitalizeFirstLetter(planType.toLocaleLowerCase()),
          })}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SubscriptionPaymentStepper planType={planType} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
