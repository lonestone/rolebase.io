import { Title } from '@atoms/Title'
import { Container } from '@chakra-ui/react'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import MeetingRecurringModal from '@organisms/meeting/MeetingRecurringModal'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import Page404 from './Page404'

type Params = {
  id: string
}

export default function MeetingRecurringPage() {
  const { t } = useTranslation()
  const navigateOrg = useNavigateOrg()
  const id = useParams<Params>().id

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
