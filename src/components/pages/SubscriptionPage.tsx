import { Title } from '@atoms/Title'
import { Container, Flex, Heading, Spinner, Text } from '@chakra-ui/react'
import useCurrentMember from '@hooks/useCurrentMember'
import useOrgOwner from '@hooks/useOrgOwner'
import SubscriptionTabs from '@organisms/subscription/SubscriptionTabs'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export default function SubscriptionPage() {
  const { t } = useTranslation()
  const currentMember = useCurrentMember()
  const isOwner = useOrgOwner()
  const isLoading = useMemo(() => !currentMember, [currentMember])

  return (
    <Container w="100%" maxW="100%" p="0">
      <Title>{t('SubscriptionPage.heading')}</Title>

      <Flex flexDir="column" gap="10">
        <Heading as="h1" size="md" px="10" pt="10">
          {t('SubscriptionPage.heading')}
        </Heading>

        {isOwner && !isLoading && <SubscriptionTabs w="100%" />}

        {!isOwner && !isLoading && (
          <Text px="10" as="b" color="red.500">
            {/* TODO: translate */}
            You must be an owner of this org to manage the subscription
          </Text>
        )}

        {isLoading && <Spinner m="auto" />}
      </Flex>
    </Container>
  )
}
