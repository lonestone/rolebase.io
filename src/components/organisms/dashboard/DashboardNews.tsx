import {
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Heading,
  Stack,
  useMediaQuery,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useOrgId } from '@hooks/useOrgId'
import { useGetOrgNewsQuery } from '@gql'
import DashboardNewsItem from '@molecules/news/DashboardNewsItem'

export const defaultDashboardNewsWidth = 300

export type DashboardNewsProps = CardProps

const DashboardNews = ({ ...rest }: DashboardNewsProps) => {
  const { t } = useTranslation()
  const [isMobile] = useMediaQuery('(max-width: 730px)')

  const orgId = useOrgId()

  // Get last news for : decisions, threads, meetings
  const { data } = useGetOrgNewsQuery({
    variables: { orgId: orgId || '' },
  })

  return (
    <Card w={isMobile ? '100%' : `${defaultDashboardNewsWidth}px`} {...rest}>
      <CardHeader>
        <Heading as="h2" size="md">
          {t('DashboardNews.heading')}
        </Heading>
      </CardHeader>

      <CardBody p={4}>
        <Stack spacing={1}>
          {data?.org_by_pk?.news?.map((news) => {
            if (news.thread) {
              return <DashboardNewsItem key={news.id} fragment={news.thread} />
            }

            if (news.meeting) {
              return <DashboardNewsItem key={news.id} fragment={news.meeting} />
            }

            if (news.decision) {
              return (
                <DashboardNewsItem key={news.id} fragment={news.decision} />
              )
            }

            return <></>
          })}
        </Stack>
      </CardBody>
    </Card>
  )
}

export default DashboardNews
