import { Button, Card, CardProps, Flex, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import React from 'react'
import { useTranslation } from 'react-i18next'

type SubscriptionCancelledCardProps = {
  subscriptionEndDate: Date
} & CardProps

export default function SubscriptionCancelledCard({
  subscriptionEndDate,
  ...rest
}: SubscriptionCancelledCardProps) {
  const { t } = useTranslation()

  return (
    <Card p="4" variant="outline" {...rest}>
      <Flex p="4" w="100%" gap="5" flexDir="row">
        <Flex flexDir="column" gap="1">
          <Text fontSize={16} fontWeight={500}>
            {t('SubscriptionPlans.subscriptionActiveUntil')}
          </Text>
          <Text fontSize={26} fontWeight={700}>
            {format(new Date(subscriptionEndDate), 'dd/MM/uuuu')}
          </Text>
        </Flex>
      </Flex>
      {/* TODO: Implement */}
      <Button>Reactivate my subscription</Button>
    </Card>
  )
}
