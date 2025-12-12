import Switch from '@/common/atoms/Switch'
import { Title } from '@/common/atoms/Title'
import RRuleEditor from '@/rrule/components/RRuleEditor'
import { useAuth } from '@/user/hooks/useAuth'
import {
  Alert,
  Box,
  Button,
  Collapse,
  Heading,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { getDefaultDigestRRule } from '@rolebase/shared/model/notifications'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import useUserMetadata from '../hooks/useUserMetadata'

export default function NotificationsSettingsPage() {
  const { t } = useTranslation()
  const toast = useToast()
  const { user } = useAuth()
  const { metadata, setMetadata } = useUserMetadata()

  const [enabled, setEnabled] = useState(metadata?.digestRrule !== false)
  const [saving, setSaving] = useState(false)

  const [rrule, setRrule] = useState(
    () =>
      metadata?.digestRrule ||
      (user ? getDefaultDigestRRule(user.createdAt).toString() : '')
  )

  const handleSubmit = async () => {
    setSaving(true)
    await setMetadata('digestRrule', (enabled && rrule) || false)

    toast({
      title: t('NotificationsSettingsModal.toastSuccess'),
      status: 'success',
    })
    setSaving(false)
  }

  if (!user) return null

  return (
    <>
      <Title>{t('NotificationsSettingsModal.heading')}</Title>

      <VStack spacing={10} align="stretch" maxW="xl">
        <Heading as="h1" size="lg">
          {t('NotificationsSettingsModal.heading')}
        </Heading>

        <Switch
          isChecked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        >
          {t('NotificationsSettingsModal.digest')}
        </Switch>

        <Collapse in={enabled}>
          <RRuleEditor hideStartDate value={rrule} onChange={setRrule} />
        </Collapse>

        <Collapse in={!enabled}>
          <Alert status="info">
            {t('NotificationsSettingsModal.disabledInfo')}
          </Alert>
        </Collapse>

        <Box textAlign="right">
          <Button colorScheme="blue" isLoading={saving} onClick={handleSubmit}>
            {t('common.save')}
          </Button>
        </Box>
      </VStack>
    </>
  )
}
