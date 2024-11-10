import BrandModal from '@/common/atoms/BrandModal'
import useQueryParams from '@/common/hooks/useQueryParams'
import React from 'react'
import SignupForm from '../components/SignupForm'

type Params = {
  email: string
}

export default function SignupPage() {
  const queryParams = useQueryParams<Params>()

  return (
    <BrandModal
      size="lg"
      bodyProps={{ mx: 10 }}
      isOpen
      trapFocus={false /* Allow password managers to work */}
      closeOnEsc={false}
      onClose={() => history.back()}
    >
      <SignupForm defaultEmail={queryParams.email} />
    </BrandModal>
  )
}
