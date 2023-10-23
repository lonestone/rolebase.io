import { NewsFragment } from '@gql'
import React from 'react'
import NewsDecision from './NewsDecision'
import NewsMeeting from './NewsMeeting'
import NewsThread from './NewsThread'

interface Props {
  item: NewsFragment
}

export default function NewsItem({ item }: Props) {
  if (item.thread) return <NewsThread thread={item.thread} />
  if (item.meeting) return <NewsMeeting meeting={item.meeting} />
  if (item.decision) return <NewsDecision decision={item.decision} />
  return null
}
