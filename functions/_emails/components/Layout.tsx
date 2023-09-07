import {
  Body,
  Container,
  Font,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
} from '@react-email/components'
import React, { ReactNode } from 'react'
import settings from '../../_utils/settings'

interface Props {
  preview?: string
  children: ReactNode
}

export default function Layout({ preview, children }: Props) {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Basiercircle"
          fallbackFontFamily="Arial"
          webFont={{
            url: `${settings.url}/emails/basiercircle-regular-webfont.woff2`,
            format: 'woff2',
          }}
          fontWeight={400}
        />
        <Font
          fontFamily="Basiercircle"
          fallbackFontFamily="Arial"
          webFont={{
            url: `${settings.url}/emails/basiercircle-medium-webfont.woff2`,
            format: 'woff2',
          }}
          fontWeight={500}
        />
        <Font
          fontFamily="Basiercircle"
          fallbackFontFamily="Arial"
          webFont={{
            url: `${settings.url}/emails/basiercircle-semibold-webfont.woff2`,
            format: 'woff2',
          }}
          fontWeight={600}
        />
      </Head>
      {preview && <Preview>{preview}</Preview>}
      <Tailwind
        config={{
          theme: {
            extend: {
              fontFamily: {
                basier: ['Basiercircle'],
              },
            },
          },
        }}
      >
        <Body className="bg-[#f9f6f3] text-[#29241f] font-basier">
          <Container
            className="bg-[#f9f6f3] py-8 w-full max-w-none"
            style={{ backgroundColor: '#f9f6f3' }}
          >
            <Section>
              <a href={settings.url}>
                <Img
                  src={`${settings.url}/logo.png`}
                  width="150"
                  alt="Rolebase"
                  className="my-0 mx-auto"
                />
              </a>
            </Section>

            {children}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
