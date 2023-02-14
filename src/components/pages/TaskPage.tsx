import { Container } from '@chakra-ui/react'
import TaskContent from '@organisms/task/TaskContent'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Page404 from './Page404'

type Params = {
  taskId: string
}

export default function TaskPage() {
  const taskId = useParams<Params>().taskId
  const navigate = useNavigate()

  if (!taskId) return <Page404 />

  return (
    <Container maxW="xl" py={10}>
      <TaskContent id={taskId} changeTitle onClose={() => navigate('..')} />
    </Container>
  )
}
