import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { Title } from '@atoms/Title'
import {
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
  useDisclosure,
} from '@chakra-ui/react'
import { Thread_Status_Enum } from '@gql'
import useEntitiesFilterMenu from '@hooks/useEntitiesFilterMenu'
import useFilterEntities from '@hooks/useFilterEntities'
import useOrgMember from '@hooks/useOrgMember'
import useThreads from '@hooks/useThreads'
import ScrollableLayout from '@molecules/ScrollableLayout'
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

  const [status, setStatus] = useState<Thread_Status_Enum | undefined>()

  // Subscribe to threads
  const { threads, error, loading } = useThreads({ status })

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
    <>
      <Title>{t('ThreadsPage.heading')}</Title>

      <ScrollableLayout
        header={
          <Flex ml={5} w="100%" alignItems="center" flexWrap="wrap">
            <Heading as="h1" size="lg">
              {t('ThreadsPage.heading')}
            </Heading>

            <ButtonGroup size="sm" variant="outline" spacing={2} my={2} ml={7}>
              <Menu closeOnSelect={false}>
                <MenuButton
                  as={Button}
                  className="userflow-threads-filter"
                  rightIcon={<FiChevronDown />}
                  fontWeight="normal"
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

              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<FiChevronDown />}
                  className="userflow-threads-status-filter"
                  fontWeight="normal"
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
            </ButtonGroup>

            <Spacer />

            {isMember && (
              <Button
                className="userflow-threads-create"
                size="sm"
                colorScheme="blue"
                ml={5}
                my={2}
                leftIcon={<FiPlus />}
                onClick={onCreateOpen}
              >
                {t('ThreadsPage.create')}
              </Button>
            )}
          </Flex>
        }
      >
        <Container maxW="3xl" my={10}>
          {loading && <Loading active center />}
          <TextErrors errors={[error]} />

          {filteredThreads && (
            <ThreadsList threads={filteredThreads} showCircle />
          )}
        </Container>
      </ScrollableLayout>

      {isCreateOpen && <ThreadEditModal isOpen onClose={onCreateClose} />}
    </>
  )
}
