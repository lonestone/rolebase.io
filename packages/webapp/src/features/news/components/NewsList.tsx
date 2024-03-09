import { NewsFragment } from '@gql'
import { truthy } from '@rolebase/shared/helpers/truthy'
import React from 'react'
import NewsDecision from './NewsDecision'
import NewsMeeting from './NewsMeeting'
import { NewsSeparator } from './NewsSeparator'
import NewsThread from './NewsThread'

interface Props {
  items: NewsFragment[]
  showSeparatorTop?: boolean
}

export default function NewsList({ items, showSeparatorTop }: Props) {
  const elements = items.map((item) => getNewsElement(item)).filter(truthy)

  return (
    <>
      {elements.map((element, index) => (
        <React.Fragment key={index}>
          {(showSeparatorTop || index !== 0) && <NewsSeparator />}
          {element}
        </React.Fragment>
      ))}
    </>
  )
}

function getNewsElement(item: NewsFragment) {
  if (item.thread) return <NewsThread thread={item.thread} />
  if (item.meeting) return <NewsMeeting meeting={item.meeting} />
  if (item.decision) return <NewsDecision decision={item.decision} />
  return null
}
