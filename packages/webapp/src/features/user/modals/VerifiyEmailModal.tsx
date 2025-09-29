import BottomFixedModal from '@/common/atoms/BottomFixedModal'
import {
  Button,
  CloseButton,
  Flex,
  Heading,
  Spacer,
  Text,
  Wrap,
} from '@chakra-ui/react'
import { useSendVerificationEmail, useUserData } from '@nhost/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function VerifyEmailModal() {
  const user = useUserData()
  const { sendEmail } = useSendVerificationEmail()

  const [closed, setClosed] = useState(false)
  const { t } = useTranslation()

  const handleResendEmail = async () => {
    await sendEmail(user?.email!)
    setClosed(true)
  }

  // Show modal only if the user email is not verified
  const showModal = user ? !user.emailVerified && !closed : false

  return (
    <BottomFixedModal isOpen={showModal} width={600}>
      <Flex justifyContent="space-between" alignItems="baseline">
        <Heading as="h2" fontSize="lg" mb={3}>
          {t('VerifyEmailModal.heading')}
        </Heading>
        <Spacer />
        <CloseButton onClick={() => setClosed(true)} />
      </Flex>

      <Text mb={3}>{t('VerifyEmailModal.text')}</Text>
      <Wrap>
        <Button variant="solid" onClick={handleResendEmail}>
          {t('VerifyEmailModal.resend')}
        </Button>
      </Wrap>
    </BottomFixedModal>
  )
}
