import { Title } from '@atoms/Title'
import { Grid, Heading, Stack, useMediaQuery } from '@chakra-ui/react'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { useUserData } from '@nhost/react'
import DashboardNews from '@organisms/dashboard/DashboardNews'
import React from 'react'
import { useTranslation } from 'react-i18next'

const DashboardPage = () => {
  const { t } = useTranslation()
  const org = useCurrentOrg()
  const user = useUserData()
  const [isMobile] = useMediaQuery('(max-width: 730px)')

  return (
    <Stack
      direction={isMobile ? 'column-reverse' : 'row'}
      h="100%"
      p={5}
      spacing={isMobile ? 4 : 'none'}
    >
      <Title>{org?.name ?? t('DashboardPage.title')}</Title>
      <Grid flexGrow={1}>
        <Heading as="h1" size="md">
          {t('DashboardPage.heading', {
            firstName: user?.displayName ?? '',
          })}
        </Heading>
      </Grid>
      <DashboardNews />
    </Stack>
  )
}

export default DashboardPage
