import { Card, CardProps, Flex, Text } from '@chakra-ui/react'
import { UpcomingInvoice } from '@shared/model/subscription'
import { format } from 'date-fns'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiExternalLink, FiHelpCircle } from 'react-icons/fi'

type SubscriptionUpcomingInvoiceCardProps = {
  upcomingInvoice: UpcomingInvoice
} & CardProps

export default function SubscriptionUpcomingInvoiceCard({
  upcomingInvoice,
  ...rest
}: SubscriptionUpcomingInvoiceCardProps) {
  const { t } = useTranslation()

  return (
    <Card p="4" variant="outline" {...rest}>
      <Flex p="4" w="100%" gap="5" flexDir="row">
        <Flex flexDir="column" gap="2" flexBasis="50%">
          <Text fontSize={16} fontWeight={700}>
            {t('SubscriptionPlans.upcomingInvoiceAmount')}
          </Text>
          <Text fontSize={26} fontWeight={700}>
            €{upcomingInvoice.totalInCents / 100}
          </Text>
        </Flex>

        <Flex flexDir="column" gap="2">
          <Text fontSize={16} fontWeight={700}>
            {t('SubscriptionPlans.upcomingInvoice')}
          </Text>
          <Text fontSize={26} fontWeight={700}>
            {format(new Date(upcomingInvoice.nextPayment), 'dd/MM/uuuu')}
          </Text>
        </Flex>
      </Flex>
      {/* TODO: Change it to an actual url */}
      <Flex
        as="a"
        href="https://google.fr"
        target="_blank"
        justifyContent="center"
        gap="2"
        alignItems="center"
        color="gray.400"
        flexDir="row"
      >
        <FiHelpCircle size="24" />
        <Text fontSize={14} fontWeight={700}>
          {t('SubscriptionPlans.upcomingInvoiceHelp')}
        </Text>
        <FiExternalLink />
      </Flex>
    </Card>
  )
}
