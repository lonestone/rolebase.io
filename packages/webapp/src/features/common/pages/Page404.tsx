import { Button, Container, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronLeftIcon } from 'src/icons'
import { Title } from '../atoms/Title'

interface Props {
  to?: string
}

export default function Page404({ to }: Props) {
  const { t } = useTranslation()

  return (
    <Container maxW="sm" mt="100px">
      <Title>{t('Page404.heading')}</Title>

      <VStack spacing={10}>
        <iframe
          width="157"
          height="277"
          style={{
            // Fix transparency
            colorScheme: 'light',
          }}
          src="https://rive.app/s/_KTEFCoAdECSya8cB_ofqQ/embed"
        />

        <Heading as="h1" size="lg">
          {t('Page404.heading')}
        </Heading>

        <a href={to || '/'}>
          <Button leftIcon={<ChevronLeftIcon size="1em" />}>
            {t('Page404.home')}
          </Button>
        </a>
      </VStack>
    </Container>
  )
}
