import BrandModal from '@/common/atoms/BrandModal'
import useQueryParams from '@/common/hooks/useQueryParams'
import React from 'react'
import LoginForm from '../components/LoginForm'

type Params = {
  email: string
}

export default function LoginPage() {
  const queryParams = useQueryParams<Params>()

  return (
    <BrandModal
      size="md"
      bodyProps={{ mx: 10 }}
      isOpen
      trapFocus={false /* Allow password managers to work */}
      closeOnEsc={false}
      onClose={() => history.back()}
    >
      <LoginForm defaultEmail={queryParams.email} />
    </BrandModal>
  )
}
