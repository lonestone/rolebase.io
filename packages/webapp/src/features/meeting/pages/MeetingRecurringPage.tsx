import { Title } from '@/common/atoms/Title'
import Page404 from '@/common/pages/Page404'
import { useNavigateOrg } from '@/org/hooks/useNavigateOrg'
import { Container } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import MeetingRecurringModal from '../modals/MeetingRecurringModal'

type Params = {
  id: string
}

export default function MeetingRecurringPage() {
  const { t } = useTranslation()
  const navigateOrg = useNavigateOrg()
  const { id } = useParams<Params>()

  if (!id) return <Page404 />

  return (
    <Container
      maxW="sm"
      h="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Title>{t('MeetingRecurringPage.title')}</Title>
      <MeetingRecurringModal
        id={id}
        isOpen
        onClose={() => navigateOrg('meetings')}
      />
    </Container>
  )
}
