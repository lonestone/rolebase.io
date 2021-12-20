import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
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
import CircleAndParentsButton from '@components/atoms/CircleAndParentsButton'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import ThreadModal from '@components/organisms/modals/ThreadModal'
import useCirclesFilterMenu from '@hooks/useCirclesFilterMenu'
import useThreadsList from '@hooks/useThreadsList'
import { CirclesFilters } from '@shared/circle'
import { useStoreState } from '@store/hooks'
import React, { useState } from 'react'
import { FiChevronDown, FiPlus } from 'react-icons/fi'
import { Link as ReachLink } from 'react-router-dom'

export default function ThreadsPage() {
  const orgId = useStoreState((state) => state.orgs.currentId)

  // Circles filter menu
  const {
    circlesFilter,
    value: filterCirclesValue,
    handleChange: handleFilterCirclesChange,
  } = useCirclesFilterMenu()

  // Archives filter menu
  const [archives, setArchives] = useState(false)

  // Create modal
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

  // Subscribe to threads
  const { threads, error, loading } = useThreadsList(circlesFilter, archives)

  return (
    <Container maxW="3xl" mt="90px">
      <Flex mb={1}>
        <Heading as="h1" size="md" display="flex" alignItems="center">
          Discussions
          {archives && <Tag ml={2}>Archives</Tag>}
        </Heading>

        <Spacer />

        <Menu closeOnSelect={false}>
          <MenuButton as={Button} variant="ghost" rightIcon={<FiChevronDown />}>
            Filtres
          </MenuButton>
          <MenuList zIndex={2}>
            <MenuOptionGroup
              title="Cercles"
              type="checkbox"
              value={filterCirclesValue}
              onChange={handleFilterCirclesChange}
            >
              <MenuItemOption value={CirclesFilters.MyCircles}>
                Dans mes cercles
              </MenuItemOption>
              <MenuItemOption value={CirclesFilters.Others}>
                Dans les autres cercles
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

        <Button ml={1} leftIcon={<FiPlus />} onClick={onCreateOpen}>
          Nouvelle discussion
        </Button>
      </Flex>

      {loading && <Loading active center />}
      <TextErrors errors={[error]} />

      {threads && (
        <VStack spacing={0} align="stretch">
          {threads.length === 0 && <i>Aucune discussion.</i>}

          {threads.map((thread) => (
            <LinkBox
              key={thread.id}
              px={2}
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

      {isCreateOpen && <ThreadModal isOpen onClose={onCreateClose} />}
    </Container>
  )
}
