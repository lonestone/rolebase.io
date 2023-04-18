import { searchReindexAll } from '@api/functions'
import { WarningIcon } from '@chakra-ui/icons'
import { Box, Button, Container, Heading } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function SuperAdminPage() {
  const { t } = useTranslation()

  // Reindex all entities in search engine
  const [searchReindexLoading, setSearchReindexLoading] = useState(false)
  const handleSearchReindex = async () => {
    setSearchReindexLoading(true)
    await searchReindexAll({})
    setSearchReindexLoading(false)
  }

  return (
    <Container maxW="md" mt="60px">
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
    </Container>
  )
}
