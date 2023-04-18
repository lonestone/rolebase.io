import { Container } from '@chakra-ui/react'
import DecisionContent from '@organisms/decision/DecisionContent'
import { useNavigate, useParams } from 'react-router-dom'
import Page404 from './Page404'

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
