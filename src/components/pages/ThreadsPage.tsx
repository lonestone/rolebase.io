import { AddIcon } from '@chakra-ui/icons'
import {
  Button,
  Checkbox,
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
import ThreadsList from '@components/molecules/ThreadsList'
import ThreadModal from '@components/organisms/modals/ThreadModal'
import { ThreadsFilter } from '@hooks/useThreadsList'
import React, { useState } from 'react'

export default function ThreadsPage() {
  const [archives, setArchives] = useState(false)

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

      <Tabs isLazy variant="enclosed">
        <TabList>
          <Tab>Dans mes Cercles</Tab>
          <Tab>Autres</Tab>
          <Spacer />
          <Checkbox
            isChecked={archives}
            onChange={() => setArchives(!archives)}
          >
            Archives
          </Checkbox>
        </TabList>

        <TabPanels>
          <TabPanel px={0}>
            <ThreadsList filter={ThreadsFilter.MyCircles} archives={archives} />
          </TabPanel>
          <TabPanel px={0}>
            <ThreadsList filter={ThreadsFilter.Others} archives={archives} />
          </TabPanel>
        </TabPanels>
      </Tabs>

      {isCreateOpen && <ThreadModal isOpen onClose={onCreateClose} />}
    </Container>
  )
}
