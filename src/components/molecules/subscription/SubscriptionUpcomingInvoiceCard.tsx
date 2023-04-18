import {
  Box,
  Button,
  Card,
  CardProps,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { UpcomingInvoice } from '@shared/model/subscription'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { FiHelpCircle } from 'react-icons/fi'
import SubscriptionInvoiceCalculationDetails from './SubscriptionInvoiceCalculationDetails'

type SubscriptionUpcomingInvoiceCardProps = {
  upcomingInvoice: UpcomingInvoice
} & CardProps

export default function SubscriptionUpcomingInvoiceCard({
  upcomingInvoice,
  ...cardProps
}: SubscriptionUpcomingInvoiceCardProps) {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Card
        as={Flex}
        flexDir="column"
        justifyContent="space-between"
        p="4"
        variant="outline"
        {...cardProps}
      >
        <Box>
          <Text fontSize={16} fontWeight={700}>
            {t('SubscriptionPlans.upcomingInvoiceAmount')}
          </Text>
          <Flex
            p="4"
            w="100%"
            gap="5"
            justifyContent="space-between"
            flexDir="row"
            flexWrap={['wrap', 'nowrap']}
          >
            <Flex
              flexDir="column"
              alignItems="start"
              justifyContent="flex-start"
            >
              <Text color="gray.500" as="i" fontSize={14} fontWeight={500}>
                {t('SubscriptionTabs.invoiceTab.amount')}
              </Text>
              <Text fontSize={26} fontWeight={700} mt="-2">
                {(upcomingInvoice.totalInCents / 100).toFixed(2)}€
              </Text>
            </Flex>

            <Flex
              flexDir="column"
              alignItems={['start', 'end']}
              justifyContent={['flex-start', 'flex-end']}
            >
              <Text color="gray.500" as="i" fontSize={14} fontWeight={500}>
                {t('SubscriptionPlans.drawdownOn')}
              </Text>
              <Text fontSize={26} fontWeight={700} mt="-2">
                {format(new Date(upcomingInvoice.nextPayment), 'dd/MM/uuuu')}
              </Text>
            </Flex>
          </Flex>
        </Box>

        <Button
          variant="ghost"
          justifyContent="center"
          gap="2"
          alignItems="center"
          color="gray.400"
          flexDir="row"
          onClick={onOpen}
        >
          <FiHelpCircle size="24" />
          <Text fontSize={14} fontWeight={700}>
            {t('SubscriptionPlans.upcomingInvoiceHelp')}
          </Text>
        </Button>
      </Card>
      <SubscriptionInvoiceCalculationDetails
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}
