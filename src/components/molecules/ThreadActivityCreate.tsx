import { Button, HStack, Spacer } from '@chakra-ui/react'
import MarkdownEditor from '@components/atoms/MarkdownEditor'
import React, { useState } from 'react'

interface Props {
  threadId: string
}

export default function ThreadActivityCreate({ threadId }: Props) {
  const [message, setMessage] = useState('')

  return (
    <div>
      <MarkdownEditor
        placeholder="Message..."
        value={message}
        onChange={setMessage}
      />

      <HStack spacing={2} my={2}>
        <Button size="sm">Réunion</Button>
        <Button size="sm">Proposition</Button>
        <Button size="sm">Election</Button>
        <Button size="sm">Sondage</Button>
        <Button size="sm">Décision</Button>
        <Spacer />
        <Button colorScheme="blue" size="sm">
          Envoyer
        </Button>
      </HStack>
    </div>
  )
}
