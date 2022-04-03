import { subscribeAllThreads } from '@api/entities/threads'
import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  LinkBox,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Spacer,
  Tag,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import CircleByIdButton from '@components/atoms/CircleByIdButton'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import ThreadLinkOverlay from '@components/atoms/ThreadLinkOverlay'
import { Title } from '@components/atoms/Title'
import ThreadEditModal from '@components/organisms/modals/ThreadEditModal'
import useEntitiesFilterMenu from '@hooks/useEntitiesFilterMenu'
import useFilterEntities from '@hooks/useFilterEntities'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import { useOrgId } from '@hooks/useOrgId'
import useSubscription from '@hooks/useSubscription'
import useThreadsWithStatus from '@hooks/useThreadsWithStatus'
import { EntityFilters } from '@shared/types'
import React, { useState } from 'react'
import { FiChevronDown, FiMessageSquare, FiPlus } from 'react-icons/fi'

export default function ThreadsPage() {
  const orgId = useOrgId()
  const hover = useHoverItemStyle()

  // Circles filter menu
  const {
    filter,
    value: filterValue,
    handleChange: handleFilterChange,
  } = useEntitiesFilterMenu()

  // Archives filter menu
  const [archives, setArchives] = useState(false)

  // Subscribe to threads
  const { data, error, loading } = useSubscription(
    orgId ? subscribeAllThreads(orgId, archives) : undefined
  )

  // Filter threads
  const filteredThreads = useFilterEntities(filter, data)

  // Enrich with status and sort
  const threads = useThreadsWithStatus(filteredThreads)

  // Create modal
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

  return (
    <Container maxW="3xl" py={10}>
      <Title>Discussions</Title>

      <Flex mb={5} alignItems="center" flexWrap="wrap">
        <Heading as="h1" size="md">
          Discussions
        </Heading>

        {archives && <Tag ml={2}>Archives</Tag>}

        <Spacer />

        <Menu closeOnSelect={false}>
          <MenuButton
            as={Button}
            size="sm"
            variant="ghost"
            rightIcon={<FiChevronDown />}
          >
            Filtres
          </MenuButton>
          <MenuList zIndex={2}>
            <MenuOptionGroup
              title="Participation"
              type="checkbox"
              value={filterValue}
              onChange={handleFilterChange}
            >
              <MenuItemOption value={EntityFilters.Invited}>
                Mes discussions
              </MenuItemOption>
              <MenuItemOption value={EntityFilters.NotInvited}>
                Autres discussions
              </MenuItemOption>
            </MenuOptionGroup>
            <MenuDivider />
            <MenuOptionGroup
              title="Archives"
              type="checkbox"
              value={archives ? ['archives'] : []}
              onChange={(value) => setArchives(value.includes('archives'))}
            >
              <MenuItemOption value="archives">
                Afficher les archives
              </MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>

        <Button size="sm" ml={1} leftIcon={<FiPlus />} onClick={onCreateOpen}>
          Nouvelle discussion
        </Button>
      </Flex>

      {loading && <Loading active center />}
      <TextErrors errors={[error]} />

      {threads && (
        <VStack spacing={0} align="stretch">
          {threads.length === 0 && <i>Aucune discussion.</i>}

          {threads.map((thread) => (
            <LinkBox key={thread.id} px={2} py={1} _hover={hover}>
              <HStack>
                <FiMessageSquare />
                <ThreadLinkOverlay
                  thread={thread}
                  fontWeight={thread.read !== false ? 'normal' : 'bold'}
                />
                <CircleByIdButton circleId={thread.circleId} />
              </HStack>
            </LinkBox>
          ))}
        </VStack>
      )}

      {isCreateOpen && <ThreadEditModal isOpen onClose={onCreateClose} />}
    </Container>
  )
}
