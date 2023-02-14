import CircleButton from '@atoms/CircleButton'
import { MeetingContext } from '@contexts/MeetingContext'
import React, { useContext } from 'react'
import { Trans } from 'react-i18next'

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
