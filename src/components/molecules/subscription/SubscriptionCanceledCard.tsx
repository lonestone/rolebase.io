import { resumeSubscription } from '@api/functions'
import { Button, Card, CardProps, Flex, Text, useToast } from '@chakra-ui/react'
import { useOrgId } from '@hooks/useOrgId'
import { format } from 'date-fns'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import useCurrentMember from '../../../hooks/useCurrentMember'

type SubscriptionCanceledCardProps = {
  subscriptionEndDate: Date
  onSubscriptionResumed: () => void
} & CardProps

export default function SubscriptionCanceledCard({
  subscriptionEndDate,
  onSubscriptionResumed,
  ...rest
}: SubscriptionCanceledCardProps) {
  const { t } = useTranslation()
  const orgId = useOrgId()
  const currentMember = useCurrentMember()
  const toast = useToast()
  const [loading, setLoading] = useState<boolean>(false)

  const resumeSub = async () => {
    setLoading(true)

    try {
      await resumeSubscription({
        orgId: orgId ?? '',
        memberId: currentMember?.id ?? '',
      })
      toast({
        title: t('SubscriptionPlans.subscriptionResumed'),
        status: 'success',
      })
      onSubscriptionResumed()
    } catch (e) {
      toast({
        title: 'Something went wrong ' + e.message,
        status: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

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
      <Button onClick={resumeSub} isLoading={loading}>
        Reactivate my subscription
      </Button>
    </Card>
  )
}
