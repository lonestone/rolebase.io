import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { Title } from '@atoms/Title'
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Spacer,
  Tag,
  TagCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { Thread_Status_Enum } from '@gql'
import useEntitiesFilterMenu from '@hooks/useEntitiesFilterMenu'
import useFilterEntities from '@hooks/useFilterEntities'
import useOrgMember from '@hooks/useOrgMember'
import useThreads from '@hooks/useThreads'
import ThreadEditModal from '@organisms/thread/ThreadEditModal'
import ThreadsList from '@organisms/thread/ThreadsList'
import { EntityFilters } from '@shared/model/participants'
import { threadStatusList } from '@shared/model/thread'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronDown, FiPlus } from 'react-icons/fi'

const entityFiltersList = [EntityFilters.Invited, EntityFilters.NotInvited]

// Thread Status filter
const threadStatusNotClosed = 'NotClosed'
type ThreadStatusFilter = Thread_Status_Enum | typeof threadStatusNotClosed

const threadStatusFiltersList: ThreadStatusFilter[] = [
  threadStatusNotClosed,
  ...threadStatusList,
]

export default function ThreadsPage() {
  const { t } = useTranslation()
  const isMember = useOrgMember()

  // Circles filter menu
  const {
    filter,
    value: filterValue,
    handleChange: handleFilterChange,
  } = useEntitiesFilterMenu()

  // Archives filter menu
  const [archives, setArchives] = useState(false)

  const [status, setStatus] = useState<Thread_Status_Enum | undefined>()

  // Subscribe to threads
  const { threads, error, loading } = useThreads({ archived: archives, status })

  // Filter threads
  const filteredThreads = useFilterEntities(filter, threads)

  // Create modal
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

  const handleThreadStatusChange = useCallback((status: string | string[]) => {
    if (typeof status !== 'string') return
    setStatus(
      status === threadStatusNotClosed
        ? undefined
        : (status as Thread_Status_Enum)
    )
  }, [])

  return (
    <Box p={5}>
      <Title>{t('ThreadsPage.heading')}</Title>

      <Flex mb={16} alignItems="center" flexWrap="wrap">
        <Heading as="h1" size="md">
          {t('ThreadsPage.heading')}
        </Heading>

        {archives && (
          <Tag ml={2}>
            {t('common.archives')}
            <TagCloseButton onClick={() => setArchives(false)} />
          </Tag>
        )}

        <Spacer />
        <ButtonGroup size="sm" variant="outline" spacing={2}>
          <Box>
            <Menu closeOnSelect={false}>
              <MenuButton
                as={Button}
                className="userflow-threads-filter"
                rightIcon={<FiChevronDown />}
              >
                {t(`ThreadsFilterMenu.participation.${filter}` as any)}
              </MenuButton>
              <MenuList zIndex={2}>
                <MenuOptionGroup
                  type="checkbox"
                  value={filterValue}
                  onChange={(value) => handleFilterChange(value)}
                >
                  {entityFiltersList.map((filter) => (
                    <MenuItemOption key={filter} value={filter}>
                      {t(`ThreadsFilterMenu.participation.${filter}` as any)}
                    </MenuItemOption>
                  ))}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </Box>

          <Box>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<FiChevronDown />}
                className="userflow-threads-status-filter"
              >
                {t(`common.threadStatus.${status ?? threadStatusNotClosed}`)}
              </MenuButton>
              <MenuList zIndex={2000}>
                <MenuOptionGroup
                  type="radio"
                  value={status ?? threadStatusNotClosed}
                  onChange={handleThreadStatusChange}
                >
                  {threadStatusFiltersList.map((status) => (
                    <MenuItemOption key={status} value={status}>
                      {t(`common.threadStatus.${status}`)}
                    </MenuItemOption>
                  ))}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </Box>
        </ButtonGroup>

        {isMember && (
          <Button
            className="userflow-threads-create"
            size="sm"
            colorScheme="blue"
            ml={5}
            leftIcon={<FiPlus />}
            onClick={onCreateOpen}
          >
            {t('ThreadsPage.create')}
          </Button>
        )}
      </Flex>

      {loading && <Loading active center />}
      <TextErrors errors={[error]} />

      <Container maxW="3xl" p={0}>
        {filteredThreads && (
          <ThreadsList threads={filteredThreads} showCircle />
        )}
      </Container>

      {isCreateOpen && <ThreadEditModal isOpen onClose={onCreateClose} />}
    </Box>
  )
}
