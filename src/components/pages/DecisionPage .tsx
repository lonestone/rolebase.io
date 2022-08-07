import { Container } from '@chakra-ui/react'
import DecisionContent from '@components/organisms/DecisionContent'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Page404 from './Page404'

interface Params {
  decisionId: string
}

export default function DecisionPage() {
  const decisionId = useParams<Params>().decisionId
  const history = useHistory()

  if (!decisionId) {
    return <Page404 />
  }

  return (
    <Container maxW="xl" py={10}>
      <DecisionContent
        id={decisionId}
        changeTitle
        onClose={() => history.push('.')}
      />
    </Container>
  )
}
