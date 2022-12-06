import { Container } from '@chakra-ui/react'
import { Title } from '@components/atoms/Title'
import MeetingRecurringModal from '@components/organisms/meeting/MeetingRecurringModal'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

interface Params {
  id: string
}

export default function MeetingRecurringPage() {
  const { t } = useTranslation()
  const navigateOrg = useNavigateOrg()
  const id = useParams<Params>().id

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
