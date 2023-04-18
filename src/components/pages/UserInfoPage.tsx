import { Title } from '@atoms/Title'
import { Container } from '@chakra-ui/react'
import CurrentUserModal from '@organisms/user/CurrentUserModal'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function UserInfoPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Container
      maxW="sm"
      h="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Title>{t('CurrentUserModal.heading')}</Title>
      <CurrentUserModal isOpen onClose={() => navigate('/')} />
    </Container>
  )
}
