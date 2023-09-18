import ThreadContent from '@organisms/thread/ThreadContent'
import React from 'react'
import { useParams } from 'react-router-dom'
import Page404 from './Page404'

type Params = {
  threadId: string
}

export default function ThreadPage() {
  const threadId = useParams<Params>().threadId
  if (!threadId) return <Page404 />

  return <ThreadContent id={threadId} changeTitle />
}
