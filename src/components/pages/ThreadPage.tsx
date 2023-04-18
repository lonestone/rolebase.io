import useOverflowHidden from '@hooks/useOverflowHidden'
import ThreadContent from '@organisms/thread/ThreadContent'
import { useParams } from 'react-router-dom'
import Page404 from './Page404'

type Params = {
  threadId: string
}

export default function ThreadPage() {
  useOverflowHidden()

  const threadId = useParams<Params>().threadId
  if (!threadId) return <Page404 />

  return <ThreadContent id={threadId} changeTitle h="100%" />
}
