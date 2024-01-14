import { Title } from '@/common/atoms/Title'
import DashboardMyMeetings from '@/dashboard/components/DashboardMyMeetings'
import DashboardMyRoles from '@/dashboard/components/DashboardMyRoles'
import DashboardMyTasks from '@/dashboard/components/DashboardMyTasks'
import DashboardMyThreads from '@/dashboard/components/DashboardMyThreads'
import DashboardNews from '@/dashboard/components/DashboardNews'
import useCurrentOrg from '@/org/hooks/useCurrentOrg'
import { Flex, VStack } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const margin = 10

const DashboardPage = () => {
  const { t } = useTranslation()
  const org = useCurrentOrg()

  if (!org) return null

  return (
    <>
      <Title>{org?.name ?? t('DashboardPage.title')}</Title>

      <Flex
        w="100%"
        minH="100%"
        px={{ base: 3, md: margin }}
        py={margin}
        flexDirection={{ base: 'column-reverse', lg: 'row' }}
        justifyContent="center"
        bg="menulight"
        _dark={{ bg: 'menudark' }}
      >
        <DashboardNews
          w={{ lg: '600px' }}
          mr={{ base: 0, lg: margin }}
          mt={{ base: margin, lg: 0 }}
        />

        <VStack spacing={margin} align="stretch" w={{ lg: '500px' }}>
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
