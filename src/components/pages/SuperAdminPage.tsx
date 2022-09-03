import { subscribeAllOrgs } from '@api/entities/orgs'
import { reindexAll } from '@api/entities/search'
import { WarningIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import useDateLocale from '@hooks/useDateLocale'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import useSubscription from '@hooks/useSubscription'
import { getOrgPath } from '@shared/helpers/getOrgPath'
import { formatRelative } from 'date-fns'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as ReachLink } from 'react-router-dom'

export default function SuperAdminPage() {
  const { t } = useTranslation()
  const hover = useHoverItemStyle()
  const dateLocale = useDateLocale()

  const { data, loading, error } = useSubscription(subscribeAllOrgs())

  const [searchReindexLoading, setSearchReindexLoading] = useState(false)
  const handleSearchReindex = async () => {
    setSearchReindexLoading(true)
    await reindexAll()
    setSearchReindexLoading(false)
  }

  return (
    <Container maxW="md" mt="60px">
      <Loading active={loading} center />
      <TextErrors errors={[error]} />

      <Heading size="md" mb={10}>
        {t('SuperAdminPage.heading')}
      </Heading>

      <Box mb={10}>
        <Button
          size="sm"
          leftIcon={<WarningIcon />}
          isLoading={searchReindexLoading}
          onClick={handleSearchReindex}
        >
          {t('SuperAdminPage.searchReindex')}
        </Button>
      </Box>

      <Heading size="sm" mb={2}>
        Organizations ({data?.length})
      </Heading>
      {data?.map((org) => (
        <LinkBox key={org.id} mx={-2} px={2} py={1} _hover={hover}>
          <Flex>
            <LinkOverlay as={ReachLink} flex={1} to={getOrgPath(org)}>
              {org.name}
            </LinkOverlay>
            <Text fontSize="sm" color="gray.500" ml={2}>
              {formatRelative(org.createdAt.toDate(), new Date(), {
                locale: dateLocale,
              })}
            </Text>
          </Flex>
        </LinkBox>
      ))}
    </Container>
  )
}
