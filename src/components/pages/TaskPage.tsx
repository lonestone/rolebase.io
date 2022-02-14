import { Container } from '@chakra-ui/react'
import TaskContent from '@components/organisms/TaskContent'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Page404 from './Page404'

interface Params {
  taskId: string
}

export default function TaskPage() {
  const taskId = useParams<Params>().taskId
  const history = useHistory()

  if (!taskId) {
    return <Page404 />
  }

  return (
    <Container maxW="xl" py={10}>
      <TaskContent id={taskId} changeTitle onClose={() => history.push('.')} />
    </Container>
  )
}
