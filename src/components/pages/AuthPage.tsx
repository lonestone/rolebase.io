import { SimpleGrid, useMediaQuery } from '@chakra-ui/react'
import useQueryParams from '@hooks/useQueryParams'
import BrandModal from '@molecules/BrandModal'
import LoginForm from '@organisms/user/LoginForm'
import SignupForm from '@organisms/user/SignupForm'
import React from 'react'
import settings from 'src/settings'

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
