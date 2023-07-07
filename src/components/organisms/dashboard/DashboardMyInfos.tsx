import { Grid, VStack, useMediaQuery } from '@chakra-ui/react'
import useCurrentMember from '@hooks/useCurrentMember'
import React from 'react'
import DashboardMyMeetings from '@organisms/dashboard/DashboardMyMeetings'
import DashboardMyThreads from '@organisms/dashboard/DashboardMyThreads'
import DashboardMyTasks from '@organisms/dashboard/DashboardMyTasks'
import DashboardMyRoles from '@organisms/dashboard/DashboardMyRoles'
import { usePathInOrg } from '@hooks/usePathInOrg'
import DashboardOrgChart from './DashboardOrgChart'

const DashboardMyInfos = () => {
  const [isMobile] = useMediaQuery('(max-width: 730px)')
  const rootPath = usePathInOrg('')

  const member = useCurrentMember()
  if (!member) {
    return null
  }

  return (
    <Grid
      w="100%"
      gridTemplateColumns={
        isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))'
      }
      gap={4}
    >
      <VStack w="100%" spacing={4}>
        <DashboardOrgChart path={`${rootPath}roles`} />
        <DashboardMyRoles
          path={`${rootPath}roles?memberId=${member?.id}`}
          member={member}
        />
      </VStack>

      <VStack w="100%" spacing={4}>
        <DashboardMyMeetings path={`${rootPath}meetings`} />
        <DashboardMyThreads path={`${rootPath}threads`} />
        <DashboardMyTasks
          path={`${rootPath}tasks?member=${member?.id}`}
          member={member}
        />
      </VStack>
    </Grid>
  )
}

export default DashboardMyInfos
