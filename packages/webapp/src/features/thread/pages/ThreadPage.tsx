import useOverflowHidden from '@/common/hooks/useOverflowHidden'
import Page404 from '@/common/pages/Page404'
import React from 'react'
import { useParams } from 'react-router-dom'
import ThreadContent from '../components/ThreadContent'

type Params = {
  threadId: string
}

export default function ThreadPage() {
  useOverflowHidden()
  const threadId = useParams<Params>().threadId
  if (!threadId) return <Page404 />

  return <ThreadContent id={threadId} changeTitle />
}
