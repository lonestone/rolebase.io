import Page404 from '@/common/pages/Page404'
import { Container } from '@chakra-ui/react'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TaskContent from '../components/TaskContent'

type Params = {
  taskId: string
}

export default function TaskPage() {
  const { taskId } = useParams<Params>()
  const navigate = useNavigate()

  if (!taskId) return <Page404 />

  return (
    <Container maxW="xl" py={10}>
      <TaskContent id={taskId} changeTitle onClose={() => navigate('..')} />
    </Container>
  )
}
