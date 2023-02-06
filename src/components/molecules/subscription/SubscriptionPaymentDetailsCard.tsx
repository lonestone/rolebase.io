import CreditCardIcon from '@atoms/CreditCardIcon'
import {
  Box,
  Button,
  Card,
  CardProps,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import UpdatePaymentMethodModal from '@organisms/subscription/UpdatePaymentMethodModal'
import { SubscriptionCard } from '@shared/model/subscription'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiEdit2, FiMail } from 'react-icons/fi'

type SubscriptionPaymentDetailsCardProps = {
  card: SubscriptionCard
  email?: string | null
  onCardUpdated: () => void
} & CardProps

export default function SubscriptionPaymentDetailsCard({
  card,
  email,
  onCardUpdated,
  ...rest
}: SubscriptionPaymentDetailsCardProps) {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Card p="4" variant="outline" {...rest}>
        <Text fontSize={16} fontWeight={700}>
          {t('SubscriptionPlans.paymentMethod')}
        </Text>
        <Card
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          gap="4"
          mt="2"
          h="100%"
          p="2"
          variant="outline"
        >
          <Card variant="outline" p="1" minW="60px">
            <CreditCardIcon name={card.brand} style={{ width: 50 }} />
          </Card>
          <Box w="100%">
            <Text fontWeight={700} fontSize={18}>
              {t('SubscriptionPlans.card')} ···· {card.last4}
            </Text>
            <Text fontWeight={600} color="gray.400">
              {t('SubscriptionPlans.expiresAt')}{' '}
              {card.expMonth.toString().padStart(2, '0')}/{card.expYear}
            </Text>
            {email && (
              <Flex flexDir="row" alignItems="center" gap="2">
                <FiMail color={`var(--chakra-colors-gray-400)`} />
                <Text fontWeight={600} color="gray.400">
                  {email}
                </Text>
              </Flex>
            )}
          </Box>
          <Flex h="100%" justifyContent="end" alignItems="end">
            <Button
              onClick={onOpen}
              leftIcon={<FiEdit2 />}
              size="sm"
              variant="outline"
            >
              Modifier
            </Button>
          </Flex>
        </Card>
      </Card>
      {isOpen && (
        <UpdatePaymentMethodModal
          size="lg"
          isOpen={isOpen}
          onClose={onClose}
          onUpdate={onCardUpdated}
        />
      )}
    </>
  )
}
