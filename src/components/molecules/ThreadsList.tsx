import { HStack, LinkBox, LinkOverlay, Spacer, VStack } from '@chakra-ui/react'
import CircleAndParentsButton from '@components/atoms/CircleAndParentsButton'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'
import useThreadsList, { ThreadsFilter } from '../../hooks/useThreadsList'

interface Props {
  filter: ThreadsFilter
}

export default function ThreadsList({ filter }: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)

  // Subscribe to threads
  const { threads, error, loading } = useThreadsList(filter)

  return (
    <>
      {loading && <Loading active center />}
      <TextErrors errors={[error]} />

      {threads && (
        <VStack spacing={0} align="stretch">
          {threads.length === 0 && <i>Aucune discussion pour le moment</i>}

          {threads.map((thread) => (
            <LinkBox
              key={thread.id}
              py={1}
              borderBottomWidth="1px"
              _hover={{ background: '#fafafa' }}
            >
              <HStack>
                <LinkOverlay
                  as={ReachLink}
                  to={`/orgs/${orgId}/threads/${thread.id}`}
                  fontWeight={thread.read ? 'normal' : 'bold'}
                >
                  {thread.title}
                </LinkOverlay>
                <Spacer />
                <CircleAndParentsButton id={thread.circleId} />
              </HStack>
            </LinkBox>
          ))}
        </VStack>
      )}
    </>
  )
}
