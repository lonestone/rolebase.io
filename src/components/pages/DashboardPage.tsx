import { Title } from '@atoms/Title'
import { Box, SimpleGrid, VStack, useMediaQuery } from '@chakra-ui/react'
import useCurrentOrg from '@hooks/useCurrentOrg'
import DashboardMyMeetings from '@organisms/dashboard/DashboardMyMeetings'
import DashboardMyRoles from '@organisms/dashboard/DashboardMyRoles'
import DashboardMyTasks from '@organisms/dashboard/DashboardMyTasks'
import DashboardMyThreads from '@organisms/dashboard/DashboardMyThreads'
import DashboardNews from '@organisms/dashboard/DashboardNews'
import DashboardOrgChart from '@organisms/dashboard/DashboardOrgChart'
import React from 'react'
import { useTranslation } from 'react-i18next'

const minColumnWidth = 400

const DashboardPage = () => {
  const { t } = useTranslation()
  const org = useCurrentOrg()
  const [isSmall] = useMediaQuery(`(max-width: ${minColumnWidth + 100}px)`)

  return (
    <>
      <Title>{org?.name ?? t('DashboardPage.title')}</Title>

      <SimpleGrid
        columns={isSmall ? 1 : 3}
        spacing={10}
        minChildWidth={isSmall ? undefined : `${minColumnWidth}px`}
        p={isSmall ? 3 : 10}
      >
        <VStack spacing={10} align="stretch">
          <DashboardOrgChart />
          <DashboardMyRoles />
        </VStack>

        <VStack spacing={10} align="stretch">
          <DashboardMyMeetings />
          <DashboardMyThreads />
          <DashboardMyTasks />
        </VStack>

        <Box>
          <DashboardNews />
        </Box>
      </SimpleGrid>
    </>
  )
}

export default DashboardPage
