import {
  Column,
  Heading,
  Img,
  Row,
  Section,
  Text,
} from '@react-email/components'
import { format } from 'date-fns'
import React, { Fragment } from 'react'
import i18n from '../_i18n'
import { getDateLocale } from '../_utils/getDateLocale'
import settings from '../_utils/settings'
import Card from './components/Card'
import CircleButton from './components/CircleButton'
import Layout from './components/Layout'

interface Props {
  lang: string
  orgDigests: OrgDigest[]
}

export interface OrgDigest {
  name: string
  threads: Array<{
    title: string
    url: string
    activities: number
    circle: Circle
  }>
  meetings: Array<{
    title: string
    date: string
    url: string
    circle: Circle
  }>
}

interface Circle {
  name: string
  colorHue: number
  url: string
}

const testOrgDigests: OrgDigest[] = [
  {
    name: 'OrgaTest',
    threads: [
      {
        title: 'Topic 1',
        url: settings.url,
        activities: 3,
        circle: {
          name: 'Circle 1',
          colorHue: 0,
          url: '',
        },
      },
      {
        title: 'Topic <b>2</b>',
        url: settings.url,
        activities: 1,
        circle: {
          name: 'Circle 2',
          colorHue: 120,
          url: '',
        },
      },
    ],
    meetings: [
      {
        title: 'Tactical',
        date: '2021-09-20T18:00:00.000Z',
        url: '',
        circle: {
          name: 'Circle 1',
          colorHue: 0,
          url: '',
        },
      },
      {
        title: 'Governance',
        date: '2021-09-21T18:00:00.000Z',
        url: '',
        circle: {
          name: 'Circle 2',
          colorHue: 120,
          url: '',
        },
      },
    ],
  },
  {
    name: 'OrgaTest2',
    threads: [
      {
        title: 'Topic 3',
        url: settings.url,
        activities: 0,
        circle: {
          name: 'Circle 3',
          colorHue: 240,
          url: '',
        },
      },
      {
        title: 'Topic 4',
        url: settings.url,
        activities: 1,
        circle: {
          name: 'Circle 4',
          colorHue: 0,
          url: '',
        },
      },
    ],
    meetings: [],
  },
]

export default function Digest({
  lang = 'en',
  orgDigests = testOrgDigests,
}: Props) {
  const t = (key: string, replace?: Record<string, string | number>) =>
    i18n.t(`emails.Digest.${key}`, {
      lng: lang,
      count: typeof replace?.count === 'number' ? replace.count : undefined,
      replace,
    })
  const dateLocale = getDateLocale(lang)

  return (
    <Layout>
      {orgDigests.map((org, i) => (
        <Card title={org.name} key={i}>
          {org.threads.length > 0 && (
            <Section className="px-3">
              <Heading as="h2" className="text-lg font-medium my-0">
                {t('threads.heading')}
              </Heading>
              <Text className="mt-1 mb-5 text-gray-400">
                {t('threads.description')}
              </Text>
              {org.threads.map((thread, j) => (
                <Fragment key={j}>
                  <Row className="mb-4">
                    <Column align="left" className="w-8 align-top">
                      <Img
                        src={settings.url + '/emails/icons/ThreadIcon.png'}
                        width="20"
                        height="20"
                      />
                    </Column>
                    <Column>
                      <Text className="m-0 h-5 leading-5 font-medium">
                        <a href={thread.url} className="text-inherit">
                          {thread.title}
                        </a>
                      </Text>
                      <Text className="text-sm text-gray-400 m-0">
                        {t('threads.activities', {
                          count: thread.activities,
                        })}
                      </Text>
                    </Column>
                    <Column align="right" className="align-top">
                      <CircleButton {...thread.circle} />
                    </Column>
                  </Row>
                </Fragment>
              ))}
            </Section>
          )}

          {org.meetings.length > 0 && (
            <Section className="px-3 mt-8">
              <Heading as="h2" className="text-lg font-medium my-0">
                {t('meetings.heading')}
              </Heading>
              <Text className="mt-1 mb-5 text-gray-400">
                {t('meetings.description')}
              </Text>
              {org.meetings.map((meeting, j) => (
                <Fragment key={j}>
                  <Row className="mb-4">
                    <Column align="left" className="w-8 align-top">
                      <Img
                        src={settings.url + '/emails/icons/MeetingIcon.png'}
                        width="20"
                        height="20"
                      />
                    </Column>
                    <Column>
                      <Text className="m-0 h-5 leading-5 font-medium">
                        <a href={meeting.url} className="text-inherit">
                          {t('meetings.title', { title: meeting.title })}
                        </a>
                      </Text>
                      <Text className="text-sm text-gray-400 m-0">
                        {format(new Date(meeting.date), 'PPPP, HH:mm', {
                          locale: dateLocale,
                        })}
                      </Text>
                    </Column>
                    <Column align="right" className="align-top">
                      <CircleButton {...meeting.circle} />
                    </Column>
                  </Row>
                </Fragment>
              ))}
            </Section>
          )}
        </Card>
      ))}
    </Layout>
  )
}
