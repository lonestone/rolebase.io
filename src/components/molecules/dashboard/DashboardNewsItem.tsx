import { Link, Tag, Text, VStack } from '@chakra-ui/react'
import {
  DecisionNewsFragment,
  MeetingNewsFragment,
  ThreadNewsFragment,
} from '@gql'
import { usePathInOrg } from '@hooks/usePathInOrg'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link as ReachLink } from 'react-router-dom'

const mappedUrlPath: Record<
  NonNullable<DashboardNewsItemProps['fragment']['__typename']>,
  string
> = {
  decision: 'decisions',
  thread: 'threads',
  meeting: 'meetings',
}

export type DashboardNewsItemProps = {
  fragment: ThreadNewsFragment | DecisionNewsFragment | MeetingNewsFragment
}

const DashboardNewsItem = ({ fragment }: DashboardNewsItemProps) => {
  const { t } = useTranslation()

  const rootPath = usePathInOrg('')
  const toUrl =
    fragment.__typename && fragment.id
      ? `${rootPath}${mappedUrlPath[fragment.__typename]}/${fragment.id}`
      : rootPath

  return (
    <Link
      as={ReachLink}
      to={toUrl}
      border="2px solid"
      borderColor="gray.200"
      _dark={{ borderColor: 'gray.550' }}
      borderRadius="md"
      p={2}
      _hover={{
        textDecoration: 'none',
        opacity: 0.8,
      }}
    >
      <VStack spacing={2} alignItems="start">
        <Tag>
          {t(`DashboardNewsItem.tag.${fragment.__typename ?? 'default'}`)}
        </Tag>
        <Text>{fragment?.title}</Text>
      </VStack>
    </Link>
  )
}

export default DashboardNewsItem
