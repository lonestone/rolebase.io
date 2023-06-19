import GlassBox from '@atoms/GlassBox'
import { Box, Button, Heading, Text } from '@chakra-ui/react'
import { useUserData } from '@nhost/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function VerifyEmailModal() {
  const user = useUserData()
  const [closed, setClosed] = useState(false)
  const { t } = useTranslation()

  // Show modal as long as the email is not verified

  const showRateModal = user && !user.emailVerified && !closed

  return showRateModal ? (
    <>
      <Box
        position="fixed"
        zIndex="2000"
        h="200px"
        left={0}
        right={0}
        bottom={0}
        bgGradient="linear(to-b, rgba(255,255,255,0), rgba(255,255,255,0.9))"
        _dark={{
          bgGradient: 'linear(to-b, rgba(0,0,0,0), rgba(0,0,0,0.9))',
        }}
        pointerEvents="none"
      />

      <GlassBox
        position="fixed"
        zIndex="2000"
        w="340px"
        ml="-170px"
        left="50%"
        bottom={2}
        p={5}
        borderRadius="lg"
        borderWidth="1px"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Heading as="h2" fontSize="lg" mb={3}>
          {t('VerifyEmailModal.heading')}
        </Heading>
        <Text mb={3}>{t('VerifyEmailModal.text')}</Text>
        <Button variant={'solid'} onClick={() => setClosed(true)}>
          {t('VerifyEmailModal.close')}
        </Button>
      </GlassBox>
    </>
  ) : null
}
