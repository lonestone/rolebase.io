import { Title } from '@atoms/Title'
import { Container, Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import useQueryParams from '@hooks/useQueryParams'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function SubscriptionSuccessPage() {
  const { t } = useTranslation()
  const params = useQueryParams()

  useEffect(() => {
    console.log('Params:', params)
  }, [params])

  // TODO: Style + translation when figma is ready
  return (
    <Container maxW="xl" py={10}>
      <Title>{t('SubscriptionPage.heading')}</Title>

      <Flex mb={5} alignItems="center" flexWrap="wrap">
        <Heading as="h1" size="md">
          {t('SubscriptionPage.heading')}
        </Heading>
        <Spacer />
        <Text color="green">Subscription successfull</Text>
      </Flex>
    </Container>
  )
}
