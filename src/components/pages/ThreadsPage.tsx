import { subscribeAllThreads } from '@api/entities/threads'
import {
  Button,
  Container,
  Flex,
  Heading,
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
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import { Title } from '@components/atoms/Title'
import ThreadItem from '@components/molecules/ThreadItem'
import ThreadEditModal from '@components/organisms/modals/ThreadEditModal'
import useEntitiesFilterMenu from '@hooks/useEntitiesFilterMenu'
import useFilterEntities from '@hooks/useFilterEntities'
import { useOrgId } from '@hooks/useOrgId'
import useSubscription from '@hooks/useSubscription'
import useThreadsWithStatus from '@hooks/useThreadsWithStatus'
import { EntityFilters } from '@shared/types'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronDown, FiPlus } from 'react-icons/fi'

export default function ThreadsPage() {
  const { t } = useTranslation()
  const orgId = useOrgId()

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
      <Title>{t('pages.ThreadsPage.heading')}</Title>

      <Flex mb={5} alignItems="center" flexWrap="wrap">
        <Heading as="h1" size="md">
          {t('pages.ThreadsPage.heading')}
        </Heading>

        {archives && <Tag ml={2}>{t('common.archives')}</Tag>}

        <Spacer />

        <Menu closeOnSelect={false}>
          <MenuButton
            as={Button}
            size="sm"
            variant="ghost"
            rightIcon={<FiChevronDown />}
          >
            {t('common.filters')}
          </MenuButton>
          <MenuList zIndex={2}>
            <MenuOptionGroup
              title={t('pages.ThreadsPage.participation.title')}
              type="checkbox"
              value={filterValue}
              onChange={handleFilterChange}
            >
              <MenuItemOption value={EntityFilters.Invited}>
                {t('pages.ThreadsPage.participation.invited')}
              </MenuItemOption>
              <MenuItemOption value={EntityFilters.NotInvited}>
                {t('pages.ThreadsPage.participation.notInvited')}
              </MenuItemOption>
            </MenuOptionGroup>
            <MenuDivider />
            <MenuOptionGroup
              title={t('pages.ThreadsPage.archives.title')}
              type="checkbox"
              value={archives ? ['archives'] : []}
              onChange={(value) => setArchives(value.includes('archives'))}
            >
              <MenuItemOption value="archives">
                {t('pages.ThreadsPage.archives.show')}
              </MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>

        <Button size="sm" ml={1} leftIcon={<FiPlus />} onClick={onCreateOpen}>
          {t('pages.ThreadsPage.create')}
        </Button>
      </Flex>

      {loading && <Loading active center />}
      <TextErrors errors={[error]} />

      {threads && (
        <VStack spacing={0} align="stretch">
          {threads.length === 0 && <i>{t('pages.ThreadsPage.empty')}</i>}

          {threads.map((thread) => (
            <ThreadItem
              key={thread.id}
              thread={thread}
              showCircle
              unread={thread.read === false}
            />
          ))}
        </VStack>
      )}

      {isCreateOpen && <ThreadEditModal isOpen onClose={onCreateClose} />}
    </Container>
  )
}
