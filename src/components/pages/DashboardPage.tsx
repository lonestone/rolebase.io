import { Title } from '@atoms/Title'
import { Flex, VStack } from '@chakra-ui/react'
import useCurrentMember from '@hooks/useCurrentMember'
import useCurrentOrg from '@hooks/useCurrentOrg'
import DashboardMyMeetings from '@organisms/dashboard/DashboardMyMeetings'
import DashboardMyRoles from '@organisms/dashboard/DashboardMyRoles'
import DashboardMyTasks from '@organisms/dashboard/DashboardMyTasks'
import DashboardMyThreads from '@organisms/dashboard/DashboardMyThreads'
import DashboardNews from '@organisms/dashboard/DashboardNews'
import DashboardOrgChart from '@organisms/dashboard/DashboardOrgChart'
import React from 'react'
import { useTranslation } from 'react-i18next'

const margin = 10

const DashboardPage = () => {
  const { t } = useTranslation()
  const org = useCurrentOrg()
  const currentMember = useCurrentMember()

  if (!currentMember || !org) return null

  return (
    <>
      <Title>{org?.name ?? t('DashboardPage.title')}</Title>

      <Flex
        w="100%"
        px={{ base: 3, md: margin }}
        py={margin}
        flexDirection={{ base: 'column-reverse', lg: 'row' }}
      >
        <Flex
          flex={1}
          mr={{ base: 0, lg: margin }}
          mt={{ base: margin, lg: 0 }}
          flexDirection="column"
          alignItems="center"
        >
          <DashboardNews maxW={{ lg: '600px' }} w="100%" />
        </Flex>

        <VStack
          spacing={margin}
          align="stretch"
          maxW={{ lg: 'calc(min(45%, 500px))' }}
        >
          <DashboardOrgChart display={{ base: 'none', lg: 'flex' }} />
          <DashboardMyMeetings />
          <DashboardMyTasks />
          <DashboardMyThreads />
          <DashboardMyRoles />
        </VStack>
      </Flex>
    </>
  )
}

export default DashboardPage
