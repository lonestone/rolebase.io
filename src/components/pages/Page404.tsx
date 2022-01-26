import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Container,
  Flex,
} from '@chakra-ui/react'
import { Title } from '@components/atoms/Title'
import React from 'react'
import { FiChevronRight } from 'react-icons/fi'

export default function Page404() {
  return (
    <Container maxW="sm" mt="100px">
      <Title>Page introuvable</Title>

      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        py={10}
      >
        <AlertTitle mb={10} fontSize="lg">
          Page introuvable !
        </AlertTitle>
        <AlertDescription maxWidth="sm" fontStyle="italic" textAlign="left">
          <Flex alignItems="flex-start">
            <Box mr={2}>
              <FiChevronRight />
            </Box>
            <p>Elle est où ma page ?</p>
          </Flex>
          <Flex alignItems="flex-start">
            <Box mr={2}>
              <FiChevronRight />
            </Box>
            <p>Je sais pas, t'as regardé dans le placard à pages ?</p>
          </Flex>
        </AlertDescription>
      </Alert>
    </Container>
  )
}
