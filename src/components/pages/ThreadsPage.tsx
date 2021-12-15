import { AddIcon } from '@chakra-ui/icons'
import {
  Button,
  Container,
  Heading,
  HStack,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react'
import ThreadModal from '@components/organisms/modals/ThreadModal'
import ThreadsList, { ThreadsFilter } from '@components/organisms/ThreadsList'
import React from 'react'

export default function ThreadsPage() {
  // Create modal
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

  return (
    <Container maxW="3xl" mt="60px">
      <HStack mt="30px" mb="15px">
        <Heading as="h2" size="md">
          Discussions
        </Heading>
        <Spacer />
        <Button leftIcon={<AddIcon />} onClick={onCreateOpen}>
          Nouvelle discussion
        </Button>
      </HStack>

      <Tabs isLazy>
        <TabList>
          <Tab>Dans mes Cercles</Tab>
          <Tab>Autres</Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={0}>
            <ThreadsList filter={ThreadsFilter.MyCircles} />
          </TabPanel>
          <TabPanel px={0}>
            <ThreadsList filter={ThreadsFilter.Others} />
          </TabPanel>
        </TabPanels>
      </Tabs>

      {isCreateOpen && <ThreadModal isOpen onClose={onCreateClose} />}
    </Container>
  )
}
