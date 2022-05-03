import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Container,
  Flex,
} from '@chakra-ui/react'
import { Title } from '@components/atoms/Title'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronRight } from 'react-icons/fi'

export default function Page404() {
  const { t } = useTranslation()

  return (
    <Container maxW="sm" mt="100px">
      <Title>{t('pages.Page404.heading')}</Title>

      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        py={10}
      >
        <AlertTitle mb={10} fontSize="lg">
          {t('pages.Page404.heading')}
        </AlertTitle>
        <AlertDescription maxWidth="sm" fontStyle="italic" textAlign="left">
          <Flex alignItems="flex-start">
            <Box mr={2}>
              <FiChevronRight />
            </Box>
            <p>{t('pages.Page404.dialog1')}</p>
          </Flex>
          <Flex alignItems="flex-start">
            <Box mr={2}>
              <FiChevronRight />
            </Box>
            <p>{t('pages.Page404.dialog2')}</p>
          </Flex>
        </AlertDescription>
      </Alert>
    </Container>
  )
}
