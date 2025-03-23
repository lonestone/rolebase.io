import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Icon,
  Input,
  Link,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { useApiKeysSubscription, useCreateApiKeyMutation } from '@gql'
import { useUserId } from '@nhost/react'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ApiIcon } from 'src/icons'
import APIKeyCard from './APIKeyCard'

export default function APICard() {
  const { t } = useTranslation()
  const toast = useToast()
  const userId = useUserId()

  // Subscribe to API keys
  const { data } = useApiKeysSubscription({
    skip: !userId,
    variables: {
      userId: userId!,
    },
  })
  const apiKeys = data?.api_key || []

  // Mutations
  const [createApiKey] = useCreateApiKeyMutation()

  // State
  const [isCreating, setIsCreating] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const newKeyInputRef = useRef<HTMLInputElement>(null)

  const handleCreateKey = async () => {
    if (!newKeyName || !userId) return

    try {
      await createApiKey({
        variables: {
          userId,
          name: newKeyName,
        },
      })

      setNewKeyName('')
      setIsCreating(false)
      toast({
        title: t('APICard.createSuccess'),
        status: 'success',
      })
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('common.errorRetry'),
        status: 'error',
      })
    }
  }

  const handleCancel = () => {
    setNewKeyName('')
    setIsCreating(false)
  }

  const handleEnterKey = (action: () => void) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      action()
    }
  }

  React.useEffect(() => {
    if (isCreating) {
      // Focus the input on next render after it's shown
      setTimeout(() => {
        newKeyInputRef.current?.focus()
      }, 0)
    }
  }, [isCreating])

  return (
    <Card>
      <CardHeader>
        <Flex alignItems="center" flexWrap="wrap">
          <Icon as={ApiIcon} boxSize={8} mr={3} />
          <Heading as="h2" size="md">
            {t('APICard.title')}
          </Heading>
        </Flex>
      </CardHeader>
      <CardBody pt={0}>
        <Text mb={5}>{t('APICard.description')}</Text>

        <VStack spacing={4} align="stretch">
          {apiKeys.length !== 0 && (
            <Text fontWeight="bold">{t('APICard.keys')}</Text>
          )}

          {apiKeys.map((apiKey) => (
            <APIKeyCard key={apiKey.id} apiKey={apiKey} />
          ))}

          {isCreating ? (
            <Flex gap={3}>
              <Input
                ref={newKeyInputRef}
                placeholder={t('APICard.keyNamePlaceholder')}
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                onKeyDown={handleEnterKey(handleCreateKey)}
                size="sm"
              />
              <Button size="sm" colorScheme="blue" onClick={handleCreateKey}>
                {t('common.create')}
              </Button>
              <Button size="sm" variant="ghost" onClick={handleCancel}>
                {t('common.cancel')}
              </Button>
            </Flex>
          ) : (
            <Button size="sm" onClick={() => setIsCreating(true)}>
              {t('APICard.createKey')}
            </Button>
          )}

          <Link
            href="https://github.com/lonestone/rolebase.io/blob/main/docs/public-api.md"
            isExternal
            fontSize="sm"
            color="blue.500"
            display="flex"
            alignItems="center"
          >
            {t('APICard.viewDocs')} <Icon as={ExternalLinkIcon} ml={1} />
          </Link>
        </VStack>
      </CardBody>
    </Card>
  )
}
