import Page404 from '@/common/pages/Page404'
import { Container } from '@chakra-ui/react'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DecisionContent from '../components/DecisionContent'

type Params = {
  decisionId: string
}

export default function DecisionPage() {
  const decisionId = useParams<Params>().decisionId
  const navigate = useNavigate()

  if (!decisionId) return <Page404 />

  return (
    <Container maxW="xl" py={10}>
      <DecisionContent
        id={decisionId}
        changeTitle
        onClose={() => navigate('..')}
      />
    </Container>
  )
}
