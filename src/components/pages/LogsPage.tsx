import { subscribeAllLogs } from '@api/entities/logs'
import {
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spacer,
  StackItem,
  Text,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import { Title } from '@components/atoms/Title'
import LogText from '@components/molecules/LogText'
import useSubscription from '@hooks/useSubscription'
import { useStoreState } from '@store/hooks'
import { format } from 'date-fns'
import React, { MouseEventHandler, useState } from 'react'
import { FiRotateCcw } from 'react-icons/fi'
import { dateFnsLocale } from 'src/locale'
import { capitalizeFirstLetter } from 'src/utils'

export default function LogsPage() {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const { colorMode } = useColorMode()

  const subscribe = orgId ? subscribeAllLogs(orgId) : undefined
  const { data, error, loading } = useSubscription(subscribe)

  // Log modal
  const [logId, setLogId] = useState<string | undefined>()
  const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure()

  const handleOpen =
    (id: string): MouseEventHandler<HTMLAnchorElement> =>
    (event) => {
      event.preventDefault()
      setLogId(id)
      onOpen()
    }

  return (
    <Container maxW="xl" mt={10}>
      <Title>Historique</Title>

      <Flex mb={5} alignItems="center" flexWrap="wrap">
        <Heading as="h1" size="md">
          Historique
        </Heading>
      </Flex>

      {loading && <Loading active center />}
      <TextErrors errors={[error]} />

      {data?.map((log) => (
        <HStack
          key={log.id}
          py={3}
          alignItems="top"
          borderBottom="1px solid"
          borderBottomColor={colorMode === 'light' ? 'gray.200' : 'gray.550'}
        >
          <StackItem>
            <Text>
              <LogText log={log} />
            </Text>
            <Text fontSize="sm" color="gray.500">
              {capitalizeFirstLetter(
                format(log.createdAt.toDate(), 'PPpp ', {
                  locale: dateFnsLocale,
                })
              )}
            </Text>
          </StackItem>

          <Spacer />

          <IconButton
            aria-label=""
            size="sm"
            variant="ghost"
            icon={<FiRotateCcw />}
            onClick={() => {}}
          />
        </HStack>
      ))}
    </Container>
  )
}
