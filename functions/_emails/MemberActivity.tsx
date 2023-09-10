import { Column, Img, Row, Section, Text } from '@react-email/components'
import React from 'react'
import i18n from '../_i18n'
import settings from '../_utils/settings'
import Card from './components/Card'
import CtaButton from './components/CtaButton'
import Layout from './components/Layout'

interface Props {
  type: string // i18n key
  lang: string
  picture: string
  ctaUrl: string
  replace: Record<string, string>
}

export default function MemberActivity({
  type = 'OrgInvitation',
  lang = 'en',
  picture = 'https://fsudktxishllphxeibqs.storage.eu-central-1.nhost.run/v1/files/77a2a4c8-ad11-41f9-8080-4e05fc575445',
  ctaUrl = settings.url,
  replace = {
    member: 'Alice',
    org: 'OrgaTest',
  },
}: Props) {
  const t = (key: string) =>
    i18n.t(`emails.MemberActivity.${type}.${key}`, { lng: lang, replace })
  const activity = t('activity')

  return (
    <Layout preview={activity}>
      <Card title={t('title')}>
        <Section>
          <Row>
            <Column align="right" className="pl-8 pr-5">
              <Img
                className="rounded-full"
                src={picture}
                width="40"
                height="40"
              />
            </Column>
            <Column>
              <Text dangerouslySetInnerHTML={{ __html: activity }} />
            </Column>
          </Row>
        </Section>
        <Section className="text-center mt-8">
          <CtaButton href={ctaUrl}>{t('cta')}</CtaButton>
        </Section>
      </Card>
    </Layout>
  )
}
