import CircleButton from '@components/atoms/CircleButton'
import React, { useContext } from 'react'
import { Trans } from 'react-i18next'
import { MeetingContext } from 'src/contexts/MeetingContext'

export default function MeetingTitle() {
  const { meeting, circle } = useContext(MeetingContext)!

  return (
    <Trans
      i18nKey="MeetingContent.heading"
      values={{ title: meeting?.title || '…' }}
      components={{
        circle: circle ? <CircleButton circle={circle} mx={1} /> : <></>,
      }}
    />
  )
}
