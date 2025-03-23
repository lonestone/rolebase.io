import Loading from '@/common/atoms/Loading'
import ScrollableLayout from '@/common/atoms/ScrollableLayout'
import TextErrors from '@/common/atoms/TextErrors'
import { Title } from '@/common/atoms/Title'
import { Container, Flex, Heading, VStack } from '@chakra-ui/react'
import { App_Type_Enum, useUserAppsSubscription } from '@gql'
import { useUserId } from '@nhost/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import AppCard from '../components/AppCard'
import APICard from '../components/APICard'

const apps = [
  {
    type: App_Type_Enum.Office365,
  },
  {
    type: App_Type_Enum.GoogleCalendar,
  },
]

export default function AppsPage() {
  const { t } = useTranslation()
  const userId = useUserId()

  // Get user apps
  const { data, error, loading } = useUserAppsSubscription({
    skip: !userId,
    variables: { userId: userId! },
  })
  const userApps = data?.user_app

  return (
    <>
      <Title>{t('AppsPage.heading')}</Title>

      <ScrollableLayout
        header={
          <Flex ml={5} my={2} w="100%" alignItems="center" flexWrap="wrap">
            <Heading as="h1" size="lg">
              {t('AppsPage.heading')}
            </Heading>
          </Flex>
        }
      >
        <Container maxW="3xl" my={10}>
          {loading && <Loading active center />}
          <TextErrors errors={[error]} />

          <VStack spacing={10} align="stretch">
            {apps.map(({ type }) => (
              <AppCard
                key={type}
                type={type}
                userApp={userApps?.find((app) => app.type === type)}
              />
            ))}
            <APICard />
          </VStack>
        </Container>
      </ScrollableLayout>
    </>
  )
}
