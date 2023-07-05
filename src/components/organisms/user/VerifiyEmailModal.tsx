import {
  Button,
  CloseButton,
  Flex,
  Heading,
  Spacer,
  Text,
  Wrap,
} from '@chakra-ui/react'
import { BottomFixedModal } from '@molecules/BottomFixedModal'
import { useSendVerificationEmail, useUserData } from '@nhost/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function VerifyEmailModal() {
  const user = useUserData()
  const { sendEmail } = useSendVerificationEmail()

  const [closed, setClosed] = useState(false)
  const { t } = useTranslation()

  // Show modal as long as the email is not verified

  const showVerifyEmailModal = user && !user.emailVerified && !closed

  return showVerifyEmailModal ? (
    <BottomFixedModal>
      <Flex justifyContent="space-between" alignItems="baseline">
        <Heading as="h2" fontSize="lg" mb={3}>
          {t('VerifyEmailModal.heading')}
        </Heading>
        <Spacer />
        <CloseButton onClick={() => setClosed(true)} />
      </Flex>

      <Text mb={3}>{t('VerifyEmailModal.text')}</Text>
      <Wrap>
        <Button
          variant={'solid'}
          onClick={async () => await sendEmail(user?.email!)}
        >
          {t('VerifyEmailModal.resend')}
        </Button>
      </Wrap>
    </BottomFixedModal>
  ) : null
}
