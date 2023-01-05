import { Container } from '@chakra-ui/react'
import { Title } from '@components/atoms/Title'
import CurrentUserModal from '@components/organisms/user/CurrentUserModal'
import React from 'react'
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
