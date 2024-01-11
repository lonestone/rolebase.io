import BrandModal from '@/common/atoms/BrandModal'
import useQueryParams from '@/common/hooks/useQueryParams'
import { SimpleGrid, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import settings from 'src/settings'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'

type Params = {
  email: string
}

export default function AuthPage() {
  const queryParams = useQueryParams<Params>()
  const [isSmallScreen] = useMediaQuery('(max-width: 900px)')

  const handleClose = () => {
    window.open(settings.websiteUrl, '_self')
  }

  return (
    <BrandModal
      size="4xl"
      bodyProps={{ mx: 10 }}
      isOpen
      trapFocus={false /* Allow password managers to work */}
      closeOnEsc={false}
      onClose={handleClose}
    >
      <SimpleGrid columns={isSmallScreen ? 1 : 2} spacing="150px">
        <LoginForm defaultEmail={queryParams.email || ''} />
        <SignupForm defaultEmail={queryParams.email} />
      </SimpleGrid>
    </BrandModal>
  )
}
