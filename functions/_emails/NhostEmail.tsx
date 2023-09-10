import { Section, Text } from '@react-email/components'
import React from 'react'
import i18n from '../_i18n'
import Card from './components/Card'
import CtaButton from './components/CtaButton'
import Layout from './components/Layout'

interface Props {
  type: string // i18n key
  lang: string
}

export default function NhostEmail({
  type = 'email-confirm-change',
  lang = 'en',
}: Props) {
  const t = (key: string) =>
    i18n.t(`emails.NhostEmail.${type}.${key}`, { lng: lang })

  return (
    <Layout preview={t('description')}>
      <Card title={t('title')}>
        <Section className="px-5">
          <Text>{t('description')}</Text>
        </Section>
        <Section className="text-center mt-8">
          <CtaButton href="${link}">{t('cta')}</CtaButton>
        </Section>
      </Card>
    </Layout>
  )
}
