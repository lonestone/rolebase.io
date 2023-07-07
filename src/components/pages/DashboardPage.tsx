import { Title } from '@atoms/Title'
import { Stack, useMediaQuery } from '@chakra-ui/react'
import useCurrentOrg from '@hooks/useCurrentOrg'
import DashboardNews from '@organisms/dashboard/DashboardNews'
import DashboardMyInfos from '@organisms/dashboard/DashboardMyInfos'
import React from 'react'
import { useTranslation } from 'react-i18next'

const DashboardPage = () => {
  const { t } = useTranslation()
  const org = useCurrentOrg()

  const [isMobile] = useMediaQuery('(max-width: 730px)')

  return (
    <Stack
      direction={isMobile ? 'column-reverse' : 'row'}
      h="100%"
      p={5}
      spacing={4}
      overflow="scroll"
    >
      <Title>{org?.name ?? t('DashboardPage.title')}</Title>

      <DashboardMyInfos />
      <DashboardNews />
    </Stack>
  )
}

export default DashboardPage
