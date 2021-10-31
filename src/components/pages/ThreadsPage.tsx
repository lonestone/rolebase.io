import { AddIcon } from '@chakra-ui/icons'
import { Button, Container, Heading, HStack, Spacer } from '@chakra-ui/react'
import React from 'react'

export default function ThreadsPage() {
  return (
    <Container maxW="3xl" marginTop="60px">
      <HStack margin="30px 0">
        <Heading as="h2" size="md">
          Discussions
        </Heading>
        <Spacer />
        <Button leftIcon={<AddIcon />}>Nouvelle discussion</Button>
      </HStack>
    </Container>
  )
}
